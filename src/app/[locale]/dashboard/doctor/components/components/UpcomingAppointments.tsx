"use client";
import Link from "next/link";
import { Clock, Calendar } from "lucide-react";
import { UpcomingAppointment } from "./types";
import { useTranslations } from "next-intl";
import { useLocalePath } from "@/hooks";

interface UpcomingAppointmentsProps {
  appointments: UpcomingAppointment[];
  loading: boolean;
}

export default function UpcomingAppointments({
  appointments,
  loading,
}: UpcomingAppointmentsProps) {
  const t = useTranslations("dashboard_doctor");
  const localePath = useLocalePath();

  const formatTime = (datetime: Date) => {
    return new Date(datetime).toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (datetime: Date) => {
    const date = new Date(datetime);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // Check if it's today
    if (date.toDateString() === today.toDateString()) {
      return t("appointmentsStatToday");
    }

    // Check if it's tomorrow
    if (date.toDateString() === tomorrow.toDateString()) {
      return t("tomorrow");
    }

    // Check if it's this week
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 7 && diffDays > 0) {
      const dayNames = [
        t("day.SUNDAY"),
        t("day.MONDAY"),
        t("day.TUESDAY"),
        t("day.WEDNESDAY"),
        t("day.THURSDAY"),
        t("day.FRIDAY"),
        t("day.SATURDAY"),
      ];
      return dayNames[date.getDay()];
    }

    // Otherwise, return formatted date
    return date.toLocaleDateString("es-ES", {
      month: "short",
      day: "numeric",
    });
  };

  const getAppointmentType = (pricingTitle: string | null) => {
    return pricingTitle || t("serviceCommonGeneral");
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {t("upcomingAppointmentsTitle")}
            </h3>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          {t("upcomingAppointmentsTitle")}
        </h3>
      </div>
      <div className="p-6">
        {appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col items-center justify-center w-12 h-12 bg-blue-50 text-blue-600 rounded-lg">
                    <span className="text-xs font-semibold uppercase">
                      {formatDate(appointment.datetime).split(" ")[0].slice(0, 3)}
                    </span>
                    <span className="text-lg font-bold">
                      {new Date(appointment.datetime).getDate()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {appointment.patientName}
                    </p>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatTime(appointment.datetime)}
                      <span className="mx-2">•</span>
                      {getAppointmentType(appointment.pricingTitle)}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      appointment.status === "CONFIRMED"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {appointment.status === "CONFIRMED"
                      ? t("confirmedStatus")
                      : t("pendingStatus")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p>{t("noUpcomingAppointmentsTitle")}</p>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-gray-200">
          <Link
            href={localePath("/dashboard/doctor/appointments")}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            {t("viewAllLinkLabel")} →
          </Link>
        </div>
      </div>
    </div>
  );
}
