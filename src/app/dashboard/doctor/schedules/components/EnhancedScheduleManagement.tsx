"use client";

import { useState, useTransition } from "react";
import { createSchedule, getDoctorSchedules } from "@/lib/actions/schedules";
import {
  ScheduleTemplatesModal,
  ScheduleCreateForm,
  ScheduleList,
  ScheduleManagementProps,
  Schedule,
} from "./components";

export default function EnhancedScheduleManagement({
  initialSchedules,
  clinics,
}: ScheduleManagementProps) {
  const [schedules, setSchedules] = useState<Schedule[]>(initialSchedules);
  const [showTemplates, setShowTemplates] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleCreateSchedule = async (formData: FormData) => {
    startTransition(async () => {
      setError(null);
      setSuccess(null);

      const data = {
        clinicId: formData.get("clinicId") as string,
        dayOfWeek: formData.get("dayOfWeek") as string,
        startTime: formData.get("startTime") as string,
        endTime: formData.get("endTime") as string,
        slotDuration: parseInt(formData.get("slotDuration") as string) || 30,
      };

      const result = await createSchedule(data.clinicId, {
        dayOfWeek: data.dayOfWeek as any,
        startTime: data.startTime,
        endTime: data.endTime,
        slotDuration: data.slotDuration,
      });

      if (result.success && result.data) {
        setSchedules((prev) => [...prev, result.data!]);
        setSuccess("Horario creado exitosamente");
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(result.error || "Error al crear el horario");
        // Clear error message after 5 seconds
        setTimeout(() => setError(null), 5000);
      }
    });
  };

  const handleSchedulesUpdated = async () => {
    // Refresh the schedules data from server
    try {
      const result = await getDoctorSchedules();
      if (result.success && result.data) {
        setSchedules(result.data);
      }
    } catch (error) {
      console.error("Error refreshing schedules:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.236 4.53L7.53 10.53a.75.75 0 00-1.06 1.06l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-800">{success}</p>
            </div>
          </div>
        </div>
      )}

      {/* Create Schedule Form */}
      <ScheduleCreateForm
        clinics={clinics}
        onSubmit={handleCreateSchedule}
        isPending={isPending}
        onShowTemplates={() => setShowTemplates(true)}
      />

      {/* Schedule List */}
      <ScheduleList
        schedules={schedules}
        onScheduleUpdated={handleSchedulesUpdated}
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
