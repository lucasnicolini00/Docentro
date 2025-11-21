"use client";
import React from "react";
import {
  Calendar,
  Clock,
  ChevronUp,
  ChevronDown,
  Trash2,
  Loader2,
  Lock,
  Unlock,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Schedule } from "./types";

interface ScheduleCardProps {
  schedule: Schedule;
  isExpanded: boolean;
  onToggleExpand: (id: string) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
  isPending: boolean;
  updatingTimeSlots: Set<string>;
  onToggleTimeSlot: (timeSlotId: string, currentlyBlocked: boolean) => void;
}

export function ScheduleCard({
  schedule,
  isExpanded,
  onToggleExpand,
  onDelete,
  isDeleting,
  isPending,
  updatingTimeSlots,
  onToggleTimeSlot,
}: ScheduleCardProps) {
  const t = useTranslations("dashboard_doctor");
  return (
    <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 hover:shadow-md hover:border-blue-500 transition-all duration-200 min-w-0">
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-200 to-blue-400 p-3 rounded-xl shadow-md">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-lg">
                {t(`day.${schedule.dayOfWeek}`)}
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
            onClick={() => onDelete(schedule.id)}
            disabled={isPending || isDeleting}
            className="p-3 text-gray-400 hover:text-red-500 rounded-xl hover:bg-red-50 disabled:opacity-50 transition-all duration-200 group"
            title={isDeleting ? t("deleting") : t("deleteSchedule")}
          >
            {isDeleting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
            )}
          </button>
        </div>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-200">
            {schedule.timeSlots.length} {t("spacesLabel")}
          </span>
          <button
            onClick={() => onToggleExpand(schedule.id)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-semibold transition-all duration-200 px-3 py-2 rounded-lg hover:bg-blue-50 border border-transparent hover:border-blue-200"
          >
            <span>{isExpanded ? t("hideSchedule") : t("viewSpaces")}</span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className="p-6 pt-0">
          <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-100">
            {t("timeSlotsHint")}
          </p>
          <div className="p-1 grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-64 overflow-y-auto overflow-x-hidden">
            {schedule.timeSlots.map((slot) => {
              const isUpdating = updatingTimeSlots.has(slot.id);
              return (
                <button
                  key={slot.id}
                  onClick={() =>
                    !slot.isBooked &&
                    !isUpdating &&
                    onToggleTimeSlot(slot.id, slot.isBlocked)
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
                      ? t("updating")
                      : slot.isBooked
                        ? t("reservedSlot")
                        : slot.isBlocked
                          ? t("tooltipEnableSlot", { fallback: "Habilitar" })
                          : t("tooltipBlockSlot", { fallback: "Bloquear" })
                  }
                >
                  <div className="font-bold text-base mb-1">
                    {slot.startTime}
                  </div>
                  <div className="text-xs opacity-80 font-medium">
                    {isUpdating
                      ? t("updating")
                      : slot.isBooked
                        ? t("reservedSlot")
                        : slot.isBlocked
                          ? t("blockedSlot")
                          : t("availableSlot")}
                  </div>
                  {isUpdating && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-xl">
                      <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                    </div>
                  )}
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
        </div>
      )}
    </div>
  );
}
