"use client";
import React from "react";
import { MapPin, ChevronUp, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Schedule, Clinic } from "./types";
import { ScheduleCard } from "./ScheduleCard";

interface ClinicSectionProps {
  clinic: Clinic;
  schedules: Schedule[];
  expandedSchedules: Set<string>;
  onToggleAll: (schedules: Schedule[]) => void;
  onToggleExpand: (id: string) => void;
  onDelete: (id: string) => void;
  deletingSchedule: string | null;
  isPending: boolean;
  updatingTimeSlots: Set<string>;
  onToggleTimeSlot: (timeSlotId: string, currentlyBlocked: boolean) => void;
}

export function ClinicSection({
  clinic,
  schedules,
  expandedSchedules,
  onToggleAll,
  onToggleExpand,
  onDelete,
  deletingSchedule,
  isPending,
  updatingTimeSlots,
  onToggleTimeSlot,
}: ClinicSectionProps) {
  const t = useTranslations("dashboard_doctor");
  const allExpanded = schedules.every((s) => expandedSchedules.has(s.id));
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-500 p-3 rounded-xl shadow-md">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {clinic.name || t("unnamedClinicFallback")}
              </h3>
              {clinic.address && (
                <p className="text-gray-600 text-sm mt-1 flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2" />
                  {clinic.address}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-blue-200 shadow-sm">
              <span className="text-sm font-semibold text-blue-700">
                {schedules.length}{" "}
                {schedules.length === 1
                  ? t("singleScheduleLabel", { fallback: "horario" })
                  : t("pluralSchedulesLabel", { fallback: "horarios" })}
              </span>
            </div>
            <button
              onClick={() => onToggleAll(schedules)}
              className="bg-white hover:bg-blue-50 border border-blue-200 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 text-blue-700 hover:text-blue-800 shadow-sm hover:shadow-md"
            >
              {allExpanded ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  <span>{t("hideAll")}</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  <span>{t("showAll")}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 min-w-0">
          {schedules.map((schedule) => (
            <ScheduleCard
              key={schedule.id}
              schedule={schedule}
              isExpanded={expandedSchedules.has(schedule.id)}
              onToggleExpand={onToggleExpand}
              onDelete={onDelete}
              isDeleting={deletingSchedule === schedule.id}
              isPending={isPending}
              updatingTimeSlots={updatingTimeSlots}
              onToggleTimeSlot={onToggleTimeSlot}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
