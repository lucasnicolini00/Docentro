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
    startTransition(async () => {
      const result = await toggleTimeSlotBlock(timeSlotId, !currentlyBlocked);
      if (result.success) {
        onScheduleUpdated();
      }
    });
  };

  // Group schedules by clinic, filtering out optimistically deleted ones
  const schedulesByClinic = schedules
    .filter((schedule) => !optimisticallyDeletedSchedules.has(schedule.id))
    .reduce((acc, schedule) => {
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
    }, {} as Record<string, { clinic: any; schedules: Schedule[] }>);

  // Sort schedules by day
  const sortSchedulesByDay = (schedules: Schedule[]) => {
    return schedules.sort((a, b) => {
      const indexA = DAY_ORDER.indexOf(a.dayOfWeek);
      const indexB = DAY_ORDER.indexOf(b.dayOfWeek);
      return indexA - indexB;
    });
  };

  // Filter out any remaining schedules with missing clinic data
  const validSchedulesByClinic = Object.values(schedulesByClinic).filter(
    ({ clinic }) => clinic && clinic.id && clinic.name
  );

  if (validSchedulesByClinic.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="text-center">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
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
      {validSchedulesByClinic.map(({ clinic, schedules: clinicSchedules }) => (
        <div
          key={clinic.id}
          className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          {/* Clinic Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">
                    {clinic.name || "Clínica sin nombre"}
                  </h3>
                  {clinic.address && (
                    <p className="text-blue-100 text-sm mt-1">
                      {clinic.address}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => toggleAllSchedulesForClinic(clinicSchedules)}
                  className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors flex items-center space-x-1"
                >
                  {clinicSchedules.every((s) => expandedSchedules.has(s.id)) ? (
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
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-sm font-medium">
                    {clinicSchedules.length} horario
                    {clinicSchedules.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Schedules Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 min-w-0">
              {sortSchedulesByDay(clinicSchedules).map((schedule) => (
                <div
                  key={schedule.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:border-blue-200 min-w-0"
                >
                  {/* Schedule Card Header */}
                  <div className="p-5 border-b border-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-br from-green-400 to-green-500 p-2.5 rounded-lg shadow-sm">
                          <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-lg">
                            {DAY_NAMES[schedule.dayOfWeek]}
                          </h4>
                        </div>
                      </div>
                      <button
                        onClick={() => openDeleteModal(schedule.id)}
                        disabled={isPending || deletingSchedule === schedule.id}
                        className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 disabled:opacity-50 transition-all duration-200"
                        title={
                          deletingSchedule === schedule.id
                            ? "Eliminando..."
                            : "Eliminar horario"
                        }
                      >
                        {deletingSchedule === schedule.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium text-sm">
                        {schedule.startTime} - {schedule.endTime}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {schedule.timeSlots.length} espacios
                      </span>
                      <button
                        onClick={() => toggleScheduleExpansion(schedule.id)}
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                      >
                        <span>
                          {expandedSchedules.has(schedule.id)
                            ? "Ocultar"
                            : "Ver espacios"}
                        </span>
                        {expandedSchedules.has(schedule.id) ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Time Slots Details */}
                  {expandedSchedules.has(schedule.id) && (
                    <div className="p-5 bg-gray-50">
                      <div className="mb-4">
                        <h5 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-gray-500" />
                          Espacios de Tiempo
                        </h5>
                        <p className="text-xs text-gray-500">
                          Pasa el cursor sobre un espacio libre para ver las
                          opciones disponibles
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto overflow-x-hidden">
                        {schedule.timeSlots.map((slot) => (
                          <button
                            key={slot.id}
                            onClick={() =>
                              !slot.isBooked &&
                              handleToggleTimeSlot(slot.id, slot.isBlocked)
                            }
                            disabled={slot.isBooked || isPending}
                            className={`group relative text-xs p-2 rounded-lg border-2 transition-all duration-200 font-medium disabled:cursor-not-allowed min-w-0 ${
                              slot.isBooked
                                ? "bg-red-50 text-red-700 border-red-200 shadow-sm"
                                : slot.isBlocked
                                ? "bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100 hover:border-yellow-300 shadow-sm hover:shadow-md"
                                : "bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:border-green-300 shadow-sm hover:shadow-md"
                            }`}
                            title={
                              slot.isBooked
                                ? "Horario reservado"
                                : slot.isBlocked
                                ? "Click para habilitar"
                                : "Click para bloquear"
                            }
                          >
                            {/* Main Content */}
                            <div className="relative truncate">
                              <div className="font-semibold truncate">
                                {slot.startTime}
                              </div>
                              <div className="text-xs mt-1 opacity-75 truncate">
                                {slot.isBooked
                                  ? "Reservado"
                                  : slot.isBlocked
                                  ? "Bloqueado"
                                  : "Libre"}
                              </div>
                            </div>

                            {/* Hover Icons - Only show for actionable slots */}
                            {!slot.isBooked && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg">
                                <div className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-lg">
                                  {slot.isBlocked ? (
                                    <Unlock className="w-3 h-3 text-green-600" />
                                  ) : (
                                    <Lock className="w-3 h-3 text-yellow-600" />
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Hover Text Indicator - Fixed positioning */}
                            {!slot.isBooked && (
                              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20 max-w-xs">
                                {slot.isBlocked ? "Habilitar" : "Bloquear"}
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900"></div>
                              </div>
                            )}
                          </button>
                        ))}
                      </div>

                      {/* Stats Summary */}
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-lg font-bold text-green-600">
                              {
                                schedule.timeSlots.filter(
                                  (slot) => !slot.isBooked && !slot.isBlocked
                                ).length
                              }
                            </div>
                            <div className="text-xs text-gray-500">Libres</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-yellow-600">
                              {
                                schedule.timeSlots.filter(
                                  (slot) =>
                                    slot.isBlocked === true && !slot.isBooked
                                ).length
                              }
                            </div>
                            <div className="text-xs text-gray-500">
                              Bloqueados
                            </div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-red-600">
                              {
                                schedule.timeSlots.filter(
                                  (slot) => slot.isBooked === true
                                ).length
                              }
                            </div>
                            <div className="text-xs text-gray-500">
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
      ))}

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
