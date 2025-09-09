"use client";

import { useState, useTransition } from "react";
import { createSchedule } from "@/lib/actions/schedules";
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

  const handleCreateSchedule = async (formData: FormData) => {
    startTransition(async () => {
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
      }
    });
  };

  const handleSchedulesUpdated = () => {
    // Refresh schedules - in a real app you might want to re-fetch from server
    // For now, we'll just trigger a page refresh
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      {/* Templates Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowTemplates(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Usar Plantillas
        </button>
      </div>

      {/* Create Schedule Form */}
      <ScheduleCreateForm
        clinics={clinics}
        onSubmit={handleCreateSchedule}
        isPending={isPending}
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
        onSchedulesCreated={handleSchedulesUpdated}
      />
    </div>
  );
}
