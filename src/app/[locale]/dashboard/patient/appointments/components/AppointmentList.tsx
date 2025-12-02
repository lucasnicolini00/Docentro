"use client";

import { useState, useTransition } from "react";
import { cancelAppointment } from "@/lib/actions/appointments";
import { AppointmentStatus, AppointmentType } from "@prisma/client";
import { useTranslations, useLocale } from "next-intl";
import type { PatientAppointment as BasePatientAppointment } from "@/lib/types";

// Extend base type with additional fields used in dashboard
interface Appointment
  extends Omit<BasePatientAppointment, "doctor" | "clinic"> {
  doctor: {
    id: string;
    name: string;
    surname: string;
    user: {
      firstName: string;
      lastName: string;
    };
  };
  clinic: {
    id: string;
    name: string;
    address: string;
  };
}

interface AppointmentListProps {
  appointments: Appointment[];
  title: string;
  showActions?: boolean;
}

export default function AppointmentList({
  appointments,
  title,
  showActions = true,
}: AppointmentListProps) {
  const t = useTranslations("dashboard_patient");
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();
  const [cancelingId, setCancelingId] = useState<string | null>(null);

  const handleCancelAppointment = async (appointmentId: string) => {
    if (!confirm(t("confirmCancelPrompt"))) {
      return;
    }

    setCancelingId(appointmentId);
    startTransition(async () => {
      try {
        const result = await cancelAppointment(appointmentId);
        if (result.success) {
          // The page will be revalidated automatically
          window.location.reload();
        } else {
          alert(result.error || t("cancelErrorGeneric"));
        }
      } catch {
        alert(t("cancelErrorGeneric"));
      } finally {
        setCancelingId(null);
      }
    });
  };

  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case AppointmentStatus.PENDING:
        return "bg-yellow-100 text-yellow-800";
      case AppointmentStatus.CONFIRMED:
        return "bg-blue-100 text-blue-800";
      case AppointmentStatus.CANCELED:
        return "bg-red-100 text-red-800";
      case AppointmentStatus.COMPLETED:
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: AppointmentStatus) => {
    switch (status) {
      case AppointmentStatus.PENDING:
        return "Pendiente";
      case AppointmentStatus.CONFIRMED:
        return "Confirmada";
      case AppointmentStatus.CANCELED:
        return "Cancelada";
      case AppointmentStatus.COMPLETED:
        return "Completada";
      default:
        return status;
    }
  };

  const getTypeText = (type: AppointmentType) => {
    return type === AppointmentType.ONLINE
      ? t("virtualType", { fallback: "Virtual" })
      : t("inPersonType", { fallback: "Presencial" });
  };

  const formatDateTime = (datetime: Date) => {
    const date = new Date(datetime);
    return {
      date: date.toLocaleDateString(locale === "es" ? "es-ES" : "en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: date.toLocaleTimeString(locale === "es" ? "es-ES" : "en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  if (appointments.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-4">📅</div>
          <p className="text-gray-500">{t("emptyAppointmentsTitle")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">
          {appointments.length} {t("appointmentsCountSuffix")}
        </p>
      </div>

      <div className="divide-y divide-gray-200">
        {appointments.map((appointment) => {
          const { date, time } = formatDateTime(appointment.datetime);
          const canCancel =
            showActions &&
            appointment.status === AppointmentStatus.PENDING &&
            new Date(appointment.datetime) > new Date();

          return (
            <div key={appointment.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Doctor Info */}
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-blue-600">
                        {appointment.doctor.user.firstName[0]}
                        {appointment.doctor.user.lastName[0]}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {appointment.doctor.user.firstName}{" "}
                        {appointment.doctor.user.lastName}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {appointment.clinic.name}
                      </p>
                    </div>
                  </div>

                  {/* Appointment Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-gray-600">
                        {t("dateLabel", { fallback: "Date" })}
                      </p>
                      <p className="font-medium text-gray-900 capitalize">
                        {date}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        {t("timeLabel", { fallback: "Time" })}
                      </p>
                      <p className="font-medium text-gray-900">{time}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        {t("typeLabel", { fallback: "Type" })}
                      </p>
                      <p className="font-medium text-gray-900">
                        {getTypeText(appointment.type)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        {t("locationLabel")}
                      </p>
                      <p className="font-medium text-gray-900 text-sm">
                        {appointment.clinic.address}
                      </p>
                    </div>
                  </div>

                  {/* Notes */}
                  {appointment.notes && (
                    <div className="mb-3">
                      <p className="text-sm text-gray-600">
                        {t("notesLabel", { fallback: "Notes" })}
                      </p>
                      <p className="text-sm text-gray-900">
                        {appointment.notes}
                      </p>
                    </div>
                  )}
                </div>

                {/* Status and Actions */}
                <div className="flex flex-col items-end space-y-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      appointment.status
                    )}`}
                  >
                    {getStatusText(appointment.status)}
                  </span>

                  {canCancel && (
                    <button
                      onClick={() => handleCancelAppointment(appointment.id)}
                      disabled={cancelingId === appointment.id || isPending}
                      className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
                    >
                      {cancelingId === appointment.id
                        ? t("processing", { fallback: "Processing..." })
                        : t("cancelButton")}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
