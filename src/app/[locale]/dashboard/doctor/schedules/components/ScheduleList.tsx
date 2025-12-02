"use client";

import React, { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { deleteSchedule, toggleTimeSlotBlock } from "@/lib/actions/schedules";
import { Schedule, DAY_ORDER, Clinic } from "./types";
import { ConfirmationModal } from "@/components/ui";
import { ClinicSection } from "./ClinicSection";

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
  const t = useTranslations("dashboard_doctor");
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
      const next = new Set(prev);
      if (next.has(scheduleId)) {
        next.delete(scheduleId);
      } else {
        next.add(scheduleId);
      }
      return next;
    });
  };

  // Toggle all schedules for a clinic
  const toggleAllSchedulesForClinic = (clinicSchedules: Schedule[]) => {
    const ids = clinicSchedules.map((s) => s.id);
    const all = ids.every((id) => expandedSchedules.has(id));
    setExpandedSchedules((prev) => {
      const next = new Set(prev);
      ids.forEach((id) => (all ? next.delete(id) : next.add(id)));
      return next;
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
    toast.loading(t("deletingScheduleToast"));

    startTransition(async () => {
      try {
        const result = await deleteSchedule(scheduleId);

        if (result.success) {
          toast.dismiss();
          toast.success(t("deleteScheduleSuccess"));
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
          toast.error(`${t("deleteScheduleErrorPrefix")} ${result.error}`);
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
        toast.error(t("unexpectedDeleteError"));
      }
    });
  };

  // Early return if no schedules
  if (!schedules || schedules.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {t("noSchedulesConfigured")}
        </h3>
        <p className="text-gray-600">{t("createFirstSchedulePrompt")}</p>
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
      {} as Record<string, { clinic: Clinic; schedules: Schedule[] }>
    );

  // Sort schedules by day
  const sortSchedulesByDay = (schedules: Schedule[]) => {
    return schedules.sort((a, b) => {
      const indexA = DAY_ORDER.indexOf(a.dayOfWeek);
      const indexB = DAY_ORDER.indexOf(b.dayOfWeek);
      return indexA - indexB;
    });
  };
  // Filter out any remaining schedules with missing clinic data and sort clinics alphabetically
  const validSchedulesByClinic = Object.values(schedulesByClinic)
    .filter(({ clinic }) => clinic && clinic.id && clinic.name)
    .sort((a, b) =>
      a.clinic.name.localeCompare(b.clinic.name, "es", { sensitivity: "base" })
    );
  if (validSchedulesByClinic.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {t("noValidSchedulesConfigured")}
        </h3>
        <p className="text-gray-600">{t("assignClinicPrompt")}</p>
      </div>
    );
  }
  return (
    <div className="space-y-8 overflow-hidden">
      {validSchedulesByClinic.map(({ clinic, schedules: clinicSchedules }) => (
        <ClinicSection
          key={clinic.id}
          clinic={clinic}
          schedules={sortSchedulesByDay(clinicSchedules)}
          expandedSchedules={expandedSchedules}
          onToggleAll={toggleAllSchedulesForClinic}
          onToggleExpand={toggleScheduleExpansion}
          onDelete={openDeleteModal}
          deletingSchedule={deletingSchedule}
          isPending={isPending}
          updatingTimeSlots={updatingTimeSlots}
          onToggleTimeSlot={handleToggleTimeSlot}
        />
      ))}
      {deleteModalOpen && (
        <ConfirmationModal
          isOpen={deleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={confirmDelete}
          isLoading={deletingSchedule !== null}
          title={t("deleteScheduleTitle")}
          message={t("deleteScheduleMessage")}
          confirmText={t("deleteSchedule")}
          cancelText={t("cancelSchedule")}
          type="danger"
        />
      )}
    </div>
  );
}
