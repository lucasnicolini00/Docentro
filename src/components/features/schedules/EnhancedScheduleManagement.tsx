"use client";

import { useState, useTransition } from "react";
import { DayOfWeek } from "@prisma/client";
import {
  createSchedule,
  deleteSchedule,
  toggleTimeSlotBlock,
  createBulkSchedules,
} from "@/lib/actions/schedules";

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  isBlocked: boolean;
}

interface Schedule {
  id: string;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  isActive: boolean;
  clinic: {
    id: string;
    name: string;
    address: string | null;
  };
  timeSlots: TimeSlot[];
}

interface Clinic {
  id: string;
  name: string;
  address: string | null;
}

interface ScheduleManagementProps {
  initialSchedules: Schedule[];
  clinics: Clinic[];
}

const DAY_NAMES = {
  MONDAY: "Lunes",
  TUESDAY: "Martes",
  WEDNESDAY: "Miércoles",
  THURSDAY: "Jueves",
  FRIDAY: "Viernes",
  SATURDAY: "Sábado",
  SUNDAY: "Domingo",
};

const DAY_ORDER = [
  DayOfWeek.MONDAY,
  DayOfWeek.TUESDAY,
  DayOfWeek.WEDNESDAY,
  DayOfWeek.THURSDAY,
  DayOfWeek.FRIDAY,
  DayOfWeek.SATURDAY,
  DayOfWeek.SUNDAY,
];

const SCHEDULE_TEMPLATES = [
  {
    name: "Horario Estándar (9-17)",
    description: "Lunes a Viernes, 9:00 AM - 5:00 PM",
    schedules: [
      { dayOfWeek: DayOfWeek.MONDAY, startTime: "09:00", endTime: "17:00" },
      { dayOfWeek: DayOfWeek.TUESDAY, startTime: "09:00", endTime: "17:00" },
      { dayOfWeek: DayOfWeek.WEDNESDAY, startTime: "09:00", endTime: "17:00" },
      { dayOfWeek: DayOfWeek.THURSDAY, startTime: "09:00", endTime: "17:00" },
      { dayOfWeek: DayOfWeek.FRIDAY, startTime: "09:00", endTime: "17:00" },
    ],
  },
  {
    name: "Horario Matutino",
    description: "Lunes a Sábado, 8:00 AM - 1:00 PM",
    schedules: [
      { dayOfWeek: DayOfWeek.MONDAY, startTime: "08:00", endTime: "13:00" },
      { dayOfWeek: DayOfWeek.TUESDAY, startTime: "08:00", endTime: "13:00" },
      { dayOfWeek: DayOfWeek.WEDNESDAY, startTime: "08:00", endTime: "13:00" },
      { dayOfWeek: DayOfWeek.THURSDAY, startTime: "08:00", endTime: "13:00" },
      { dayOfWeek: DayOfWeek.FRIDAY, startTime: "08:00", endTime: "13:00" },
      { dayOfWeek: DayOfWeek.SATURDAY, startTime: "08:00", endTime: "13:00" },
    ],
  },
  {
    name: "Horario Vespertino",
    description: "Lunes a Viernes, 2:00 PM - 8:00 PM",
    schedules: [
      { dayOfWeek: DayOfWeek.MONDAY, startTime: "14:00", endTime: "20:00" },
      { dayOfWeek: DayOfWeek.TUESDAY, startTime: "14:00", endTime: "20:00" },
      { dayOfWeek: DayOfWeek.WEDNESDAY, startTime: "14:00", endTime: "20:00" },
      { dayOfWeek: DayOfWeek.THURSDAY, startTime: "14:00", endTime: "20:00" },
      { dayOfWeek: DayOfWeek.FRIDAY, startTime: "14:00", endTime: "20:00" },
    ],
  },
];

export default function EnhancedScheduleManagement({
  initialSchedules,
  clinics,
}: ScheduleManagementProps) {
  const [schedules, setSchedules] = useState<Schedule[]>(initialSchedules);
  const [isCreating, setIsCreating] = useState(false);
  const [expandedSchedule, setExpandedSchedule] = useState<string | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showBulkCreate, setShowBulkCreate] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleCreateSchedule = async (formData: FormData) => {
    setIsCreating(true);
    try {
      const data = {
        clinicId: formData.get("clinicId") as string,
        dayOfWeek: formData.get("dayOfWeek") as DayOfWeek,
        startTime: formData.get("startTime") as string,
        endTime: formData.get("endTime") as string,
        slotDuration: parseInt(formData.get("slotDuration") as string) || 30,
      };

      const result = await createSchedule(data.clinicId, {
        dayOfWeek: data.dayOfWeek,
        startTime: data.startTime,
        endTime: data.endTime,
        slotDuration: data.slotDuration,
      });

      if (result.success && result.data) {
        setSchedules((prev) => [...prev, result.data as Schedule]);
        // Reset form
        (document.getElementById("schedule-form") as HTMLFormElement)?.reset();
      }
    } catch (error) {
      console.error("Error creating schedule:", error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleApplyTemplate = async (
    template: (typeof SCHEDULE_TEMPLATES)[0],
    clinicId: string
  ) => {
    startTransition(async () => {
      try {
        const result = await createBulkSchedules(clinicId, template.schedules);
        if (result.success && result.data) {
          setSchedules((prev) => [...prev, ...(result.data as Schedule[])]);
          setShowTemplates(false);
        }
      } catch (error) {
        console.error("Error applying template:", error);
      }
    });
  };

  const handleDeleteSchedule = async (scheduleId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este horario?")) {
      try {
        await deleteSchedule(scheduleId);
        setSchedules((prev) => prev.filter((s) => s.id !== scheduleId));
      } catch (error) {
        console.error("Error deleting schedule:", error);
      }
    }
  };

  const handleToggleTimeSlot = async (
    timeSlotId: string,
    isBlocked: boolean
  ) => {
    try {
      await toggleTimeSlotBlock(timeSlotId, !isBlocked);
      setSchedules((prev) =>
        prev.map((schedule) => ({
          ...schedule,
          timeSlots: schedule.timeSlots.map((slot) =>
            slot.id === timeSlotId ? { ...slot, isBlocked: !isBlocked } : slot
          ),
        }))
      );
    } catch (error) {
      console.error("Error toggling time slot:", error);
    }
  };

  const handleBulkTimeSlotAction = async (
    scheduleId: string,
    action: "block" | "unblock"
  ) => {
    const schedule = schedules.find((s) => s.id === scheduleId);
    if (!schedule) return;

    const slotsToUpdate = schedule.timeSlots.filter(
      (slot) =>
        !slot.isBooked &&
        (action === "block" ? !slot.isBlocked : slot.isBlocked)
    );

    try {
      await Promise.all(
        slotsToUpdate.map((slot) =>
          toggleTimeSlotBlock(slot.id, action === "block")
        )
      );

      setSchedules((prev) =>
        prev.map((s) =>
          s.id === scheduleId
            ? {
                ...s,
                timeSlots: s.timeSlots.map((slot) =>
                  !slot.isBooked
                    ? { ...slot, isBlocked: action === "block" }
                    : slot
                ),
              }
            : s
        )
      );
    } catch (error) {
      console.error("Error with bulk action:", error);
    }
  };

  // Group schedules by clinic
  const schedulesByClinic = schedules.reduce((acc, schedule) => {
    const clinicId = schedule.clinic.id;
    if (!acc[clinicId]) {
      acc[clinicId] = {
        clinic: schedule.clinic,
        schedules: [],
      };
    }
    acc[clinicId].schedules.push(schedule);
    return acc;
  }, {} as Record<string, { clinic: Clinic; schedules: Schedule[] }>);

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Gestión de Horarios
            </h1>
            <p className="text-gray-600 mt-2">
              Configura tus horarios de atención y disponibilidad por clínica.
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowTemplates(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              📋 Usar Plantilla
            </button>
            <button
              onClick={() => setShowBulkCreate(!showBulkCreate)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              ⚡ Creación Masiva
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600 font-medium">Total Horarios</p>
            <p className="text-2xl font-bold text-blue-900">
              {schedules.length}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600 font-medium">
              Horarios Activos
            </p>
            <p className="text-2xl font-bold text-green-900">
              {schedules.filter((s) => s.isActive).length}
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-yellow-600 font-medium">Clínicas</p>
            <p className="text-2xl font-bold text-yellow-900">
              {Object.keys(schedulesByClinic).length}
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-purple-600 font-medium">
              Total Citas Disponibles
            </p>
            <p className="text-2xl font-bold text-purple-900">
              {schedules.reduce(
                (total, s) =>
                  total +
                  s.timeSlots.filter(
                    (slot) => !slot.isBooked && !slot.isBlocked
                  ).length,
                0
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Template Modal */}
      {showTemplates && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full m-4 max-h-[80vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Plantillas de Horarios
              </h2>
            </div>
            <div className="p-6">
              {clinics.length === 0 ? (
                <p className="text-gray-500">
                  Necesitas tener al menos una clínica registrada para usar
                  plantillas.
                </p>
              ) : (
                <div className="space-y-4">
                  {clinics.map((clinic) => (
                    <div
                      key={clinic.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <h3 className="font-medium text-gray-900 mb-3">
                        {clinic.name}
                      </h3>
                      <div className="grid grid-cols-1 gap-3">
                        {SCHEDULE_TEMPLATES.map((template, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div>
                              <p className="font-medium text-gray-900">
                                {template.name}
                              </p>
                              <p className="text-sm text-gray-600">
                                {template.description}
                              </p>
                            </div>
                            <button
                              onClick={() =>
                                handleApplyTemplate(template, clinic.id)
                              }
                              disabled={isPending}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
                            >
                              {isPending ? "..." : "Aplicar"}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setShowTemplates(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create New Schedule Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Crear Nuevo Horario
        </h2>
        <form
          id="schedule-form"
          action={handleCreateSchedule}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Clinic Selection */}
            <div>
              <label
                htmlFor="clinicId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Clínica
              </label>
              <select
                id="clinicId"
                name="clinicId"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar clínica</option>
                {clinics.map((clinic) => (
                  <option key={clinic.id} value={clinic.id}>
                    {clinic.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Day Selection */}
            <div>
              <label
                htmlFor="dayOfWeek"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Día de la Semana
              </label>
              <select
                id="dayOfWeek"
                name="dayOfWeek"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar día</option>
                {DAY_ORDER.map((day) => (
                  <option key={day} value={day}>
                    {DAY_NAMES[day]}
                  </option>
                ))}
              </select>
            </div>

            {/* Start Time */}
            <div>
              <label
                htmlFor="startTime"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Hora de Inicio
              </label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* End Time */}
            <div>
              <label
                htmlFor="endTime"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Hora de Fin
              </label>
              <input
                type="time"
                id="endTime"
                name="endTime"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Slot Duration */}
          <div className="w-full md:w-48">
            <label
              htmlFor="slotDuration"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Duración de Citas (minutos)
            </label>
            <select
              id="slotDuration"
              name="slotDuration"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="15">15 minutos</option>
              <option value="30" defaultValue={"30"}>
                30 minutos
              </option>
              <option value="45">45 minutos</option>
              <option value="60">60 minutos</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isCreating}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            {isCreating ? "Creando..." : "Crear Horario"}
          </button>
        </form>
      </div>

      {/* Existing Schedules */}
      {Object.values(schedulesByClinic).map(
        ({ clinic, schedules: clinicSchedules }) => (
          <div
            key={clinic.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100"
          >
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                {clinic.name}
              </h3>
              {clinic.address && (
                <p className="text-sm text-gray-500">{clinic.address}</p>
              )}
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {DAY_ORDER.map((dayOfWeek) => {
                  const daySchedule = clinicSchedules.find(
                    (s) => s.dayOfWeek === dayOfWeek
                  );

                  if (!daySchedule) {
                    return (
                      <div
                        key={dayOfWeek}
                        className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="font-medium text-gray-900 w-20">
                            {DAY_NAMES[dayOfWeek]}
                          </span>
                          <span className="text-gray-500">
                            Sin horario configurado
                          </span>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={daySchedule.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="font-medium text-gray-900 w-20">
                            {DAY_NAMES[daySchedule.dayOfWeek]}
                          </span>
                          <span className="text-gray-600">
                            {daySchedule.startTime} - {daySchedule.endTime}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              daySchedule.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {daySchedule.isActive ? "Activo" : "Inactivo"}
                          </span>
                          <span className="text-sm text-gray-500">
                            {
                              daySchedule.timeSlots.filter(
                                (slot) => !slot.isBooked && !slot.isBlocked
                              ).length
                            }{" "}
                            libres / {daySchedule.timeSlots.length} total
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              setExpandedSchedule(
                                expandedSchedule === daySchedule.id
                                  ? null
                                  : daySchedule.id
                              )
                            }
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            {expandedSchedule === daySchedule.id
                              ? "Ocultar"
                              : "Ver horarios"}
                          </button>
                          <button
                            onClick={() =>
                              alert("Función de edición próximamente")
                            }
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDeleteSchedule(daySchedule.id)}
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>

                      {/* Time Slots Grid */}
                      {expandedSchedule === daySchedule.id && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-sm font-medium text-gray-900">
                              Horarios de Citas
                            </h4>
                            <div className="flex space-x-2">
                              <button
                                onClick={() =>
                                  handleBulkTimeSlotAction(
                                    daySchedule.id,
                                    "block"
                                  )
                                }
                                className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded hover:bg-yellow-200"
                              >
                                Bloquear Todos
                              </button>
                              <button
                                onClick={() =>
                                  handleBulkTimeSlotAction(
                                    daySchedule.id,
                                    "unblock"
                                  )
                                }
                                className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded hover:bg-green-200"
                              >
                                Desbloquear Todos
                              </button>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                            {daySchedule.timeSlots.map((slot) => (
                              <button
                                key={slot.id}
                                onClick={() =>
                                  handleToggleTimeSlot(slot.id, slot.isBlocked)
                                }
                                disabled={slot.isBooked}
                                className={`p-2 text-xs rounded-lg border transition-colors ${
                                  slot.isBooked
                                    ? "bg-red-100 text-red-800 border-red-200 cursor-not-allowed"
                                    : slot.isBlocked
                                    ? "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200"
                                    : "bg-green-100 text-green-800 border-green-200 hover:bg-green-200"
                                }`}
                                title={
                                  slot.isBooked
                                    ? "Horario reservado"
                                    : slot.isBlocked
                                    ? "Click para habilitar"
                                    : "Click para bloquear"
                                }
                              >
                                {slot.startTime}
                                <br />
                                <span className="text-xs">
                                  {slot.isBooked
                                    ? "Reservado"
                                    : slot.isBlocked
                                    ? "Bloqueado"
                                    : "Libre"}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )
      )}

      {/* Empty State */}
      {schedules.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="text-gray-400 text-6xl mb-4">📅</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No tienes horarios configurados
          </h3>
          <p className="text-gray-500 mb-6">
            Crea tu primer horario para comenzar a recibir citas médicas.
          </p>
          <button
            onClick={() => setShowTemplates(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Usar Plantilla de Horarios
          </button>
        </div>
      )}
    </div>
  );
}
