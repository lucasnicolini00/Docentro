"use client";

import { useState, useOptimistic } from "react";
import { useTranslations } from "next-intl";
import { DayOfWeek } from "@prisma/client";

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

// Server action wrappers
async function createScheduleWrapper(formData: FormData) {
  const data = {
    clinicId: formData.get("clinicId") as string,
    dayOfWeek: formData.get("dayOfWeek") as DayOfWeek,
    startTime: formData.get("startTime") as string,
    endTime: formData.get("endTime") as string,
    slotDuration: parseInt(formData.get("slotDuration") as string) || 30,
  };

  const { createSchedule } = await import("@/lib/actions/schedules");
  return createSchedule(data.clinicId, {
    dayOfWeek: data.dayOfWeek,
    startTime: data.startTime,
    endTime: data.endTime,
    slotDuration: data.slotDuration,
  });
}

async function updateScheduleWrapper(scheduleId: string, formData: FormData) {
  const data = {
    startTime: formData.get("startTime") as string,
    endTime: formData.get("endTime") as string,
    isActive: formData.get("isActive") === "true",
    slotDuration: parseInt(formData.get("slotDuration") as string) || 30,
  };

  const { updateSchedule } = await import("@/lib/actions/schedules");
  return updateSchedule(scheduleId, data);
}

async function deleteScheduleWrapper(scheduleId: string) {
  const { deleteSchedule } = await import("@/lib/actions/schedules");
  return deleteSchedule(scheduleId);
}

async function toggleTimeSlotBlockWrapper(
  timeSlotId: string,
  isBlocked: boolean
) {
  const { toggleTimeSlotBlock } = await import("@/lib/actions/schedules");
  return toggleTimeSlotBlock(timeSlotId, isBlocked);
}

// Day names are localized using t("day.<DAY>")

const DAY_ORDER = [
  DayOfWeek.MONDAY,
  DayOfWeek.TUESDAY,
  DayOfWeek.WEDNESDAY,
  DayOfWeek.THURSDAY,
  DayOfWeek.FRIDAY,
  DayOfWeek.SATURDAY,
  DayOfWeek.SUNDAY,
];

export default function ScheduleManagement({
  initialSchedules,
  clinics,
}: ScheduleManagementProps) {
  const t = useTranslations("dashboard_doctor");
  const [schedules] = useOptimistic(initialSchedules);
  const [isCreating, setIsCreating] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<string | null>(null);
  const [expandedSchedule, setExpandedSchedule] = useState<string | null>(null);

  const handleCreateSchedule = async (formData: FormData) => {
    setIsCreating(true);
    try {
      await createScheduleWrapper(formData);
      // The page will revalidate automatically
    } catch (error) {
      console.error("Error creating schedule:", error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdateSchedule = async (
    scheduleId: string,
    formData: FormData
  ) => {
    try {
      await updateScheduleWrapper(scheduleId, formData);
      setEditingSchedule(null);
    } catch (error) {
      console.error("Error updating schedule:", error);
    }
  };

  const handleDeleteSchedule = async (scheduleId: string) => {
    if (confirm(t("confirmDeleteSchedulePrompt"))) {
      try {
        await deleteScheduleWrapper(scheduleId);
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
      await toggleTimeSlotBlockWrapper(timeSlotId, !isBlocked);
    } catch (error) {
      console.error("Error toggling time slot:", error);
    }
  };

  // Group schedules by clinic
  const schedulesByClinic = schedules.reduce(
    (acc, schedule) => {
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

  return (
    <div className="space-y-6">
      {/* Create New Schedule Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {t("createNewScheduleHeading")}
        </h2>
        <form action={handleCreateSchedule} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Clinic Selection */}
            <div>
              <label
                htmlFor="clinicId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("clinicFieldLabelSimple")}
              </label>
              <select
                id="clinicId"
                name="clinicId"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{t("selectClinicPlaceholderSimple")}</option>
                {clinics.map((clinic) => (
                  <option key={clinic.id} value={clinic.id}>
                    {clinic.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Day of Week */}
            <div>
              <label
                htmlFor="dayOfWeek"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("dayOfWeekLabel")}
              </label>
              <select
                id="dayOfWeek"
                name="dayOfWeek"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{t("selectDayPlaceholder")}</option>
                {DAY_ORDER.map((day) => (
                  <option key={day} value={day}>
                    {t(`day.${day}`)}
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
                {t("startTimeFieldLabel")}
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
                {t("endTimeFieldLabel")}
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
              {t("slotDurationFieldLabel")}
            </label>
            <select
              id="slotDuration"
              name="slotDuration"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="15">15 minutos</option>
              <option value="30" selected>
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
            {isCreating
              ? t("creatingScheduleStatus")
              : t("createScheduleAction")}
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
                            {t(`day.${dayOfWeek}`)}
                          </span>
                          <span className="text-gray-500">
                            {t("noScheduleConfigured")}
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
                            {t(`day.${daySchedule.dayOfWeek}`)}
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
                            {daySchedule.isActive
                              ? t("activeStatusLabel")
                              : t("inactiveStatusLabel")}
                          </span>
                          <span className="text-sm text-gray-500">
                            {daySchedule.timeSlots.length}{" "}
                            {t("availableSchedulesSuffix")}
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
                              ? t("toggleHideLabel")
                              : t("toggleViewLabel")}
                          </button>
                          <button
                            onClick={() => setEditingSchedule(daySchedule.id)}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            {t("editActionLabel")}
                          </button>
                          <button
                            onClick={() => handleDeleteSchedule(daySchedule.id)}
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            {t("deleteActionLabel")}
                          </button>
                        </div>
                      </div>

                      {/* Time Slots Grid */}
                      {expandedSchedule === daySchedule.id && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <h4 className="text-sm font-medium text-gray-900 mb-3">
                            {t("timeSlotsSectionTitle")}
                          </h4>
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
                                    ? t("slotBookedTitle")
                                    : slot.isBlocked
                                      ? t("clickToEnable")
                                      : t("clickToBlock")
                                }
                              >
                                {slot.startTime}
                                <br />
                                <span className="text-xs">
                                  {slot.isBooked
                                    ? t("slotBookedLabel")
                                    : slot.isBlocked
                                      ? t("slotBlockedLabel")
                                      : t("slotFreeLabel")}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Edit Form */}
                      {editingSchedule === daySchedule.id && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <form
                            action={(formData) =>
                              handleUpdateSchedule(daySchedule.id, formData)
                            }
                            className="space-y-4"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  {t("startTimeFieldLabel")}
                                </label>
                                <input
                                  type="time"
                                  name="startTime"
                                  defaultValue={daySchedule.startTime}
                                  required
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  {t("endTimeFieldLabel")}
                                </label>
                                <input
                                  type="time"
                                  name="endTime"
                                  defaultValue={daySchedule.endTime}
                                  required
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  {t("appointmentStatusLabel")}
                                </label>
                                <select
                                  name="isActive"
                                  defaultValue={daySchedule.isActive.toString()}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                  <option value="true">
                                    {t("activeStatusLabel")}
                                  </option>
                                  <option value="false">
                                    {t("inactiveStatusLabel")}
                                  </option>
                                </select>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                              >
                                {t("saveChangesAction")}
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingSchedule(null)}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                              >
                                {t("cancelAction")}
                              </button>
                            </div>
                          </form>
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

      {Object.keys(schedulesByClinic).length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="text-gray-400 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 9l6-6m0 0l6 6m-6-6v12"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {t("noSchedulesTitle")}
          </h3>
          <p className="text-gray-500">{t("noSchedulesSubtitle")}</p>
        </div>
      )}
    </div>
  );
}
