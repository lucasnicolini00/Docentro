"use client";

import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { createSchedule, getDoctorSchedules } from "@/lib/actions/schedules";
import {
  ScheduleTemplatesModal,
  ScheduleCreateModal,
  ScheduleList,
  ScheduleManagementProps,
  Schedule,
} from ".";

export default function EnhancedScheduleManagement({
  initialSchedules,
  clinics,
}: ScheduleManagementProps) {
  const [schedules, setSchedules] = useState<Schedule[]>(initialSchedules);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [optimisticSchedules, setOptimisticSchedules] = useState<Schedule[]>(
    []
  );

  // Combine real schedules with optimistic schedules for display
  const displaySchedules = [...schedules, ...optimisticSchedules];

  const handleCreateSchedule = async (formData: FormData) => {
    const selectedDaysString = formData.get("selectedDays") as string;
    const selectedDays = JSON.parse(selectedDaysString) as string[];

    const loadingToast = toast.loading(
      `Creando horarios para ${selectedDays.length} día${
        selectedDays.length > 1 ? "s" : ""
      }...`
    );

    const data = {
      clinicId: formData.get("clinicId") as string,
      selectedDays,
      startTime: formData.get("startTime") as string,
      endTime: formData.get("endTime") as string,
      slotDuration: parseInt(formData.get("slotDuration") as string) || 30,
    };

    // Find the clinic for optimistic update
    const clinic = clinics.find((c) => c.id === data.clinicId);

    // Create optimistic schedules for all selected days
    const optimisticSchedules = selectedDays.map((dayOfWeek, index) => {
      const tempId = `temp-${Date.now()}-${Math.random()}-${index}`;
      return {
        id: tempId,
        dayOfWeek: dayOfWeek as any,
        startTime: data.startTime,
        endTime: data.endTime,
        isActive: true,
        clinic: clinic || { id: data.clinicId, name: "Clínica", address: null },
        timeSlots: [
          {
            id: `temp-slot-${Date.now()}-${index}`,
            startTime: data.startTime,
            endTime: data.endTime,
            isBooked: false,
            isBlocked: false,
          },
        ],
      };
    });

    // Add optimistic schedules immediately
    setOptimisticSchedules(optimisticSchedules);

    // Close the modal
    setShowCreateModal(false);

    startTransition(async () => {
      try {
        const results = await Promise.all(
          selectedDays.map((dayOfWeek) =>
            createSchedule(data.clinicId, {
              dayOfWeek: dayOfWeek as any,
              startTime: data.startTime,
              endTime: data.endTime,
              slotDuration: data.slotDuration,
            })
          )
        );

        const successfulResults = results.filter(
          (result) => result.success && result.data
        );
        const failedCount = results.length - successfulResults.length;

        // Clear optimistic schedules
        setOptimisticSchedules([]);

        if (successfulResults.length > 0) {
          // Add the real schedules
          setSchedules((prev) => [
            ...prev,
            ...successfulResults.map((r) => r.data!),
          ]);

          if (failedCount === 0) {
            toast.success(
              `${successfulResults.length} horario${
                successfulResults.length > 1 ? "s" : ""
              } creado${successfulResults.length > 1 ? "s" : ""} exitosamente`,
              { id: loadingToast }
            );
          } else {
            toast.success(
              `${successfulResults.length} horario${
                successfulResults.length > 1 ? "s" : ""
              } creado${
                successfulResults.length > 1 ? "s" : ""
              }, ${failedCount} falló${failedCount > 1 ? "n" : ""}`,
              { id: loadingToast }
            );
          }
        } else {
          toast.error("Error al crear los horarios", { id: loadingToast });
        }
      } catch (error) {
        // Clear optimistic schedules on error
        setOptimisticSchedules([]);
        console.error("Error creating schedules:", error);
        toast.error("Error inesperado al crear los horarios", {
          id: loadingToast,
        });
      }
    });
  };

  const handleSchedulesUpdated = async () => {
    // Refresh the schedules data from server
    try {
      const result = await getDoctorSchedules();
      if (result.success && result.data) {
        setSchedules(result.data);
        // Clear any remaining optimistic schedules
        setOptimisticSchedules([]);
      }
    } catch (err) {
      console.error("Error refreshing schedules:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Simple Action Buttons */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Crear Nuevo Horario
          </button>

          <button
            onClick={() => setShowTemplates(true)}
            className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            Usar Plantilla
          </button>
        </div>
      </div>

      {/* Schedule List */}
      <ScheduleList
        schedules={displaySchedules}
        onScheduleUpdated={handleSchedulesUpdated}
      />

      {/* Create Schedule Modal */}
      <ScheduleCreateModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        clinics={clinics}
        onSubmit={handleCreateSchedule}
        isPending={isPending}
      />

      {/* Templates Modal */}
      <ScheduleTemplatesModal
        isOpen={showTemplates}
        onClose={() => setShowTemplates(false)}
        clinics={clinics}
        onSchedulesUpdated={handleSchedulesUpdated}
      />
    </div>
  );
}
