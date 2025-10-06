"use client";

import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import {
  Calendar,
  Clock,
  MapPin,
  ChevronDown,
  ChevronUp,
  Trash2,
  Lock,
  Unlock,
  Loader2,
} from "lucide-react";
import { deleteSchedule, toggleTimeSlotBlock } from "@/lib/actions/schedules";
import { Schedule, DAY_NAMES, DAY_ORDER } from "./types";
import { ConfirmationModal } from "@/components/ui";

interface ScheduleListProps {
  schedules: Schedule[];
  onScheduleUpdated: () => void;
}

export default function ScheduleList({
  schedules,
  onScheduleUpdated,
}: ScheduleListProps) {
  const [expandedSchedules, setExpandedSchedules] = useState<Set<string>>(
    new Set()
  );
  const [isPending, startTransition] = useTransition();
  const [updatingTimeSlots, setUpdatingTimeSlots] = useState<Set<string>>(
    new Set()
  );

  // Modal and optimistic update states
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [scheduleToDelete, setScheduleToDelete] = useState<string | null>(null);
  const [deletingSchedule, setDeletingSchedule] = useState<string | null>(null);
  const [optimisticallyDeletedSchedules, setOptimisticallyDeletedSchedules] =
    useState<Set<string>>(new Set());

  // Toggle expansion for individual schedules
  const toggleScheduleExpansion = (scheduleId: string) => {
    setExpandedSchedules((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(scheduleId)) {
        newSet.delete(scheduleId);
      } else {
        newSet.add(scheduleId);
      }
      return newSet;
    });
  };

  // Toggle all schedules for a clinic
  const toggleAllSchedulesForClinic = (clinicSchedules: Schedule[]) => {
    const clinicScheduleIds = clinicSchedules.map((s) => s.id);
    const allExpanded = clinicScheduleIds.every((id) =>
      expandedSchedules.has(id)
    );

    setExpandedSchedules((prev) => {
      const newSet = new Set(prev);
      if (allExpanded) {
        // Collapse all schedules for this clinic
        clinicScheduleIds.forEach((id) => newSet.delete(id));
      } else {
        // Expand all schedules for this clinic
        clinicScheduleIds.forEach((id) => newSet.add(id));
      }
      return newSet;
    });
  };

  // Modal handlers
  const openDeleteModal = (scheduleId: string) => {
    setScheduleToDelete(scheduleId);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setScheduleToDelete(null);
  };

  const confirmDelete = () => {
    if (scheduleToDelete) {
      setDeleteModalOpen(false);
      handleDeleteSchedule(scheduleToDelete);
    }
  };

  // Optimistic delete handler
  const handleDeleteSchedule = async (scheduleId: string) => {
    setDeletingSchedule(scheduleId);

    // Optimistic update: immediately hide the schedule from UI
    setOptimisticallyDeletedSchedules((prev) => new Set([...prev, scheduleId]));
    toast.loading("Eliminando horario...");

    startTransition(async () => {
      try {
        const result = await deleteSchedule(scheduleId);

        if (result.success) {
          toast.dismiss();
          toast.success("Horario eliminado exitosamente");
          onScheduleUpdated(); // reload or refetch data

          // Clean up local state (server data will make optimistic set irrelevant)
          setDeletingSchedule(null);
        } else {
          // Revert optimistic update on error
          setOptimisticallyDeletedSchedules((prev) => {
            const newSet = new Set(prev);
            newSet.delete(scheduleId);
            return newSet;
          });
          setDeletingSchedule(null);
          toast.dismiss();
          toast.error(`Error al eliminar el horario: ${result.error}`);
        }
      } catch {
        // Revert optimistic update on unexpected error
        setOptimisticallyDeletedSchedules((prev) => {
          const newSet = new Set(prev);
          newSet.delete(scheduleId);
          return newSet;
        });
        setDeletingSchedule(null);
        toast.dismiss();
        toast.error("Error inesperado al eliminar el horario");
      }
    });
  };

  // Early return if no schedules
  if (!schedules || schedules.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="text-center">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No hay horarios configurados
          </h3>
          <p className="text-gray-600">
            Crea tu primer horario para comenzar a recibir citas.
          </p>
        </div>
      </div>
    );
  }

  const handleToggleTimeSlot = async (
    timeSlotId: string,
    currentlyBlocked: boolean
  ) => {
    setUpdatingTimeSlots((prev) => new Set([...prev, timeSlotId]));

    startTransition(async () => {
      try {
        const result = await toggleTimeSlotBlock(timeSlotId, !currentlyBlocked);
        if (result.success) {
          onScheduleUpdated();
        }
      } finally {
        setUpdatingTimeSlots((prev) => {
          const newSet = new Set(prev);
          newSet.delete(timeSlotId);
          return newSet;
        });
      }
    });
  };

  // Group schedules by clinic, filtering out optimistically deleted ones
  const schedulesByClinic = schedules
    .filter((schedule) => !optimisticallyDeletedSchedules.has(schedule.id))
    .reduce(
      (acc, schedule) => {
        // Handle cases where clinic might be undefined
        if (!schedule.clinic || !schedule.clinic.id) {
          console.warn("Schedule missing clinic information:", schedule);
          return acc;
        }

        const clinicId = schedule.clinic.id;
        if (!acc[clinicId]) {
          acc[clinicId] = {
            clinic: schedule.clinic,
            schedules: [],
          };
        }
        acc[clinicId].schedules.push(schedule);
        return acc;
      },
      {} as Record<string, { clinic: any; schedules: Schedule[] }>
    );

  // Sort schedules by day
  const sortSchedulesByDay = (schedules: Schedule[]) => {
    return schedules.sort((a, b) => {
      const indexA = DAY_ORDER.indexOf(a.dayOfWeek);
      const indexB = DAY_ORDER.indexOf(b.dayOfWeek);
      return indexA - indexB;
    });
  };

  // Filter out any remaining schedules with missing clinic data
  const validSchedulesByClinic = Object.values(schedulesByClinic)
    .filter(({ clinic }) => clinic && clinic.id && clinic.name)
    .sort((a, b) =>
      a.clinic.name.localeCompare(b.clinic.name, "es", { sensitivity: "base" })
    );

  if (validSchedulesByClinic.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <div className="bg-blue-100 p-4 rounded-lg w-fit mx-auto mb-4">
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No hay horarios válidos configurados
          </h3>
          <p className="text-gray-600">
            Crea un horario con una clínica asignada para comenzar.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 overflow-hidden">
      {validSchedulesByClinic.map(({ clinic, schedules: clinicSchedules }) => {
        return (
          <div
            key={clinic.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
          >
            {/* Modern Clinic Header */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-500 p-3 rounded-xl shadow-md">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {clinic.name || "Clínica sin nombre"}
                    </h3>
                    {clinic.address && (
                      <p className="text-gray-600 text-sm mt-1 flex items-center">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                        {clinic.address}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-blue-200 shadow-sm">
                    <span className="text-sm font-semibold text-blue-700">
                      {clinicSchedules.length} horario
                      {clinicSchedules.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleAllSchedulesForClinic(clinicSchedules)}
                    className="bg-white hover:bg-blue-50 border border-blue-200 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 text-blue-700 hover:text-blue-800 shadow-sm hover:shadow-md"
                  >
                    {clinicSchedules.every((s) =>
                      expandedSchedules.has(s.id)
                    ) ? (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        <span>Ocultar Todo</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        <span>Ver Todo</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Improved Schedules Grid */}
            <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50/30">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 min-w-0">
                {sortSchedulesByDay(clinicSchedules).map((schedule) => (
                  <div
                    key={schedule.id}
                    className="bg-white rounded-xl shadow-sm border-2 border-gray-200 hover:shadow-md hover:border-blue-500 transition-all duration-200 min-w-0"
                  >
                    {/* Enhanced Schedule Card Header */}
                    <div className="p-5 ">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="bg-gradient-to-br from-blue-200 to-blue-400 p-3 rounded-xl shadow-md">
                            <Calendar className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 text-lg">
                              {DAY_NAMES[schedule.dayOfWeek]}
                            </h4>
                            <div className="flex items-center space-x-2 text-gray-600 mt-1">
                              <Clock className="w-4 h-4" />
                              <span className="font-medium text-sm">
                                {schedule.startTime} - {schedule.endTime}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => openDeleteModal(schedule.id)}
                          disabled={
                            isPending || deletingSchedule === schedule.id
                          }
                          className="p-3 text-gray-400 hover:text-red-500 rounded-xl hover:bg-red-50 disabled:opacity-50 transition-all duration-200 group"
                          title={
                            deletingSchedule === schedule.id
                              ? "Eliminando..."
                              : "Eliminar horario"
                          }
                        >
                          {deletingSchedule === schedule.id ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                          )}
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-200">
                          {schedule.timeSlots.length} espacios
                        </span>
                        <button
                          onClick={() => toggleScheduleExpansion(schedule.id)}
                          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-semibold transition-all duration-200 px-3 py-2 rounded-lg hover:bg-blue-50 border border-transparent hover:border-blue-200"
                        >
                          <span>
                            {expandedSchedules.has(schedule.id)
                              ? "Ocultar"
                              : "Ver espacios"}
                          </span>
                          {expandedSchedules.has(schedule.id) ? (
                            <ChevronUp className="w-4 h-4 transition-transform" />
                          ) : (
                            <ChevronDown className="w-4 h-4 transition-transform" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Enhanced Time Slots Details */}
                    {expandedSchedules.has(schedule.id) && (
                      <div className="p-6 pt-0 ">
                        <div className="mb-5">
                          <h5 className="text-base font-bold text-gray-800 mb-3 flex items-center">
                            <div className="bg-blue-500 p-2 rounded-lg mr-3">
                              <Clock className="w-4 h-4 text-white" />
                            </div>
                            Espacios de Tiempo
                          </h5>
                          <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-100">
                            💡 Haz clic en un espacio para
                            bloquearlo/habilitarlo. Los espacios reservados no
                            se pueden modificar.
                          </p>
                        </div>

                        <div className="p-1 grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-64 overflow-y-auto overflow-x-hidden">
                          {schedule.timeSlots.map((slot) => {
                            const isUpdating = updatingTimeSlots.has(slot.id);
                            return (
                              <button
                                key={slot.id}
                                onClick={() =>
                                  !slot.isBooked &&
                                  !isUpdating &&
                                  handleToggleTimeSlot(slot.id, slot.isBlocked)
                                }
                                disabled={slot.isBooked || isUpdating}
                                className={`relative text-sm p-3 rounded-xl border-2 transition-all duration-200 font-semibold disabled:cursor-not-allowed min-w-0 ${
                                  slot.isBooked
                                    ? "bg-gradient-to-br from-red-50 to-red-100 text-red-800 border-red-300"
                                    : slot.isBlocked
                                      ? "bg-gradient-to-br from-yellow-50 to-amber-100 text-amber-800 border-amber-300 hover:from-yellow-100 hover:to-amber-200 hover:border-amber-400 cursor-pointer"
                                      : "bg-gradient-to-br from-green-50 to-emerald-100 text-emerald-800 border-emerald-300 hover:from-green-100 hover:to-emerald-200 hover:border-emerald-400 cursor-pointer"
                                } ${isUpdating ? "opacity-70" : ""}`}
                                title={
                                  isUpdating
                                    ? "Actualizando..."
                                    : slot.isBooked
                                      ? "Horario reservado - No modificable"
                                      : slot.isBlocked
                                        ? "Click para habilitar este horario"
                                        : "Click para bloquear este horario"
                                }
                              >
                                {/* Content */}
                                <div className="relative">
                                  <div className="font-bold text-base mb-1">
                                    {slot.startTime}
                                  </div>
                                  <div className="text-xs opacity-80 font-medium">
                                    {isUpdating
                                      ? "Actualizando..."
                                      : slot.isBooked
                                        ? "🔒 Reservado"
                                        : slot.isBlocked
                                          ? "⏸️ Bloqueado"
                                          : "✅ Disponible"}
                                  </div>
                                </div>

                                {/* Loading Spinner */}
                                {isUpdating && (
                                  <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-xl">
                                    <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                                  </div>
                                )}

                                {/* Hover Icons - Only show when not updating */}
                                {!slot.isBooked && !isUpdating && (
                                  <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-xl">
                                    <div className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-md">
                                      {slot.isBlocked ? (
                                        <Unlock className="w-3 h-3 text-green-600" />
                                      ) : (
                                        <Lock className="w-3 h-3 text-amber-600" />
                                      )}
                                    </div>
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Enhanced Stats Summary */}
                        <div className="mt-6 pt-5 border-t border-gray-200">
                          <div className="grid grid-cols-3 gap-4">
                            <div className="flex flex-col items-center justify-center bg-green-50 p-4 rounded-xl border border-green-200">
                              <div className="text-2xl font-bold text-green-600 mb-1">
                                {
                                  schedule.timeSlots.filter(
                                    (slot) => !slot.isBooked && !slot.isBlocked
                                  ).length
                                }
                              </div>
                              <div className="text-sm font-medium text-green-700">
                                Disponibles
                              </div>
                            </div>
                            <div className="flex flex-col items-center justify-center bg-amber-50 p-4 rounded-xl border border-amber-200">
                              <div className="text-2xl font-bold text-amber-600 mb-1">
                                {
                                  schedule.timeSlots.filter(
                                    (slot) =>
                                      slot.isBlocked === true && !slot.isBooked
                                  ).length
                                }
                              </div>
                              <div className="text-sm font-medium text-amber-700">
                                Bloqueados
                              </div>
                            </div>
                            <div className="flex flex-col items-center justify-center bg-red-50 p-4 rounded-xl border border-red-200">
                              <div className="text-2xl font-bold text-red-600 mb-1">
                                {
                                  schedule.timeSlots.filter(
                                    (slot) => slot.isBooked === true
                                  ).length
                                }
                              </div>
                              <div className="text-sm font-medium text-red-700">
                                Reservados
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <ConfirmationModal
          isOpen={deleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={confirmDelete}
          isLoading={deletingSchedule !== null}
          title="Eliminar Horario"
          message="¿Estás seguro de que deseas eliminar este horario? Esta acción no se puede deshacer."
          confirmText="Eliminar"
          cancelText="Cancelar"
          type="danger"
        />
      )}
    </div>
  );
}
