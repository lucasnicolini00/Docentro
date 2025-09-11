"use client";

import { useState, useTransition } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  ChevronDown,
  ChevronUp,
  Trash2,
} from "lucide-react";
import { deleteSchedule, toggleTimeSlotBlock } from "@/lib/actions/schedules";
import { Schedule, DAY_NAMES, DAY_ORDER } from "./types";

interface ScheduleListProps {
  schedules: Schedule[];
  onScheduleUpdated: () => void;
}

export default function ScheduleList({
  schedules,
  onScheduleUpdated,
}: ScheduleListProps) {
  const [expandedSchedule, setExpandedSchedule] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

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

  const handleDeleteSchedule = async (scheduleId: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este horario?")) {
      startTransition(async () => {
        const result = await deleteSchedule(scheduleId);
        if (result.success) {
          onScheduleUpdated();
        }
      });
    }
  };

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

  // Group schedules by clinic
  const schedulesByClinic = schedules.reduce((acc, schedule) => {
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
    <div className="space-y-6">
      {validSchedulesByClinic.map(({ clinic, schedules: clinicSchedules }) => (
        <div
          key={clinic.id}
          className="bg-white rounded-xl shadow-sm border border-gray-100"
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {clinic.name || "Clínica sin nombre"}
                  </h3>
                  {clinic.address && (
                    <p className="text-sm text-gray-500">{clinic.address}</p>
                  )}
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {clinicSchedules.length} horario
                {clinicSchedules.length !== 1 ? "s" : ""}
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {sortSchedulesByDay(clinicSchedules).map((schedule) => (
              <div key={schedule.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Calendar className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {DAY_NAMES[schedule.dayOfWeek]}
                      </h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>
                          {schedule.startTime} - {schedule.endTime}
                        </span>
                        <span className="text-gray-300">•</span>
                        <span>
                          {schedule.timeSlots.length} espacios disponibles
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        setExpandedSchedule(
                          expandedSchedule === schedule.id ? null : schedule.id
                        )
                      }
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                    >
                      {expandedSchedule === schedule.id ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDeleteSchedule(schedule.id)}
                      disabled={isPending}
                      className="p-2 text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50 disabled:opacity-50"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Time Slots Details */}
                {expandedSchedule === schedule.id && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h5 className="text-sm font-medium text-gray-700 mb-3">
                      Espacios de Tiempo
                    </h5>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                      {schedule.timeSlots.map((slot) => (
                        <button
                          key={slot.id}
                          onClick={() =>
                            !slot.isBooked &&
                            handleToggleTimeSlot(slot.id, slot.isBlocked)
                          }
                          disabled={slot.isBooked || isPending}
                          className={`text-xs p-2 rounded border transition-colors disabled:cursor-not-allowed ${
                            slot.isBooked
                              ? "bg-red-100 text-red-800 border-red-200"
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
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
