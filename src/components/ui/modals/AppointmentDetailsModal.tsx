"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Video,
  User,
  Stethoscope,
  FileText,
  AlertCircle,
} from "lucide-react";

interface AppointmentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: {
    id: string;
    start: Date;
    extendedProps: {
      status: string;
      doctorName: string;
      specialty: string;
      clinicName: string;
      clinicAddress?: string;
      notes?: string;
      type: string;
      meetingLink?: string;
    };
  } | null;
}

export default function AppointmentDetailsModal({
  isOpen,
  onClose,
  appointment,
}: AppointmentDetailsModalProps) {
  const t = useTranslations("modals");

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !appointment) return null;

  const { extendedProps, start } = appointment;

  // Get status styling
  const getStatusStyling = (status: string) => {
    switch (status) {
      case "PENDING":
        return {
          bg: "bg-yellow-50",
          text: "text-yellow-800",
          border: "border-yellow-200",
          icon: "text-yellow-600",
          label: t("appointmentDetailsStatusPending"),
        };
      case "CONFIRMED":
        return {
          bg: "bg-blue-50",
          text: "text-blue-800",
          border: "border-blue-200",
          icon: "text-blue-600",
          label: t("appointmentDetailsStatusConfirmed"),
        };
      case "COMPLETED":
        return {
          bg: "bg-green-50",
          text: "text-green-800",
          border: "border-green-200",
          icon: "text-green-600",
          label: t("appointmentDetailsStatusCompleted"),
        };
      case "CANCELED":
        return {
          bg: "bg-red-50",
          text: "text-red-800",
          border: "border-red-200",
          icon: "text-red-600",
          label: t("appointmentDetailsStatusCanceled"),
        };
      default:
        return {
          bg: "bg-gray-50",
          text: "text-gray-800",
          border: "border-gray-200",
          icon: "text-gray-600",
          label: status,
        };
    }
  };

  const statusStyle = getStatusStyling(extendedProps.status);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {t("appointmentDetailsTitle")}
                </h2>
                <p className="text-sm text-gray-600">
                  {start.toLocaleDateString("es-ES", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Status Badge */}
            <div
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border} border`}
            >
              <AlertCircle className={`w-4 h-4 mr-2 ${statusStyle.icon}`} />
              {statusStyle.label}
            </div>

            {/* Main Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Doctor Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <User className="w-5 h-5 text-blue-600 mr-2" />
                  {t("appointmentDetailsDoctorInfo")}
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      {t("appointmentDetailsDoctor")}
                    </label>
                    <p className="text-gray-900 font-medium">
                      Dr. {extendedProps.doctorName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      {t("appointmentDetailsSpecialty")}
                    </label>
                    <div className="flex items-center space-x-2">
                      <Stethoscope className="w-4 h-4 text-blue-600" />
                      <p className="text-gray-900">{extendedProps.specialty}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Appointment Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Clock className="w-5 h-5 text-blue-600 mr-2" />
                  {t("appointmentDetailsDetails")}
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      {t("appointmentDetailsDateTime")}
                    </label>
                    <p className="text-gray-900 font-medium">
                      {start.toLocaleDateString("es-ES")} a las{" "}
                      {start.toLocaleTimeString("es-ES", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      {t("appointmentDetailsType")}
                    </label>
                    <div className="flex items-center space-x-2">
                      {extendedProps.type === "ONLINE" ? (
                        <Video className="w-4 h-4 text-green-600" />
                      ) : (
                        <MapPin className="w-4 h-4 text-blue-600" />
                      )}
                      <p className="text-gray-900">
                        {extendedProps.type === "ONLINE"
                          ? t("appointmentDetailsTypeOnline")
                          : t("appointmentDetailsTypeInPerson")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                {t("appointmentDetailsClinic")}
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-medium text-gray-900">
                  {extendedProps.clinicName}
                </p>
                {extendedProps.clinicAddress && (
                  <p className="text-gray-600 mt-1">
                    {extendedProps.clinicAddress}
                  </p>
                )}
              </div>
            </div>

            {/* Meeting Link (for online appointments) */}
            {extendedProps.type === "ONLINE" && extendedProps.meetingLink && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Video className="w-5 h-5 text-green-600 mr-2" />
                  {t("appointmentDetailsMeetingLink")}
                </h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-800 mb-2">
                    {t("appointmentDetailsMeetingJoinText")}
                  </p>
                  <a
                    href={extendedProps.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-green-700 hover:text-green-800 font-medium underline"
                  >
                    <Video className="w-4 h-4 mr-1" />
                    {t("appointmentDetailsMeetingJoin")}
                  </a>
                </div>
              </div>
            )}

            {/* Notes */}
            {extendedProps.notes && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <FileText className="w-5 h-5 text-blue-600 mr-2" />
                  {t("appointmentDetailsNotes")}
                </h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-900">{extendedProps.notes}</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
              {extendedProps.status === "CONFIRMED" && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex-1">
                  <p className="text-amber-800 text-sm">
                    <strong>{t("appointmentDetailsReminderTitle")}</strong>{" "}
                    {t("appointmentDetailsReminderText")}
                  </p>
                </div>
              )}

              {extendedProps.status === "PENDING" && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex-1">
                  <p className="text-blue-800 text-sm">
                    <strong>{t("appointmentDetailsPendingTitle")}</strong>{" "}
                    {t("appointmentDetailsPendingText")}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-3 p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              {t("appointmentDetailsClose")}
            </button>
            {extendedProps.type === "ONLINE" && extendedProps.meetingLink && (
              <a
                href={extendedProps.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium inline-flex items-center"
              >
                <Video className="w-4 h-4 mr-2" />
                {t("appointmentDetailsMeetingJoinNow")}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
