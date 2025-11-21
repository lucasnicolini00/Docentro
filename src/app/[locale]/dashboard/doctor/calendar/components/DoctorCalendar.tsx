"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import SimpleModal from "@/components/ui/modals/SimpleModal";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { updateAppointmentStatus } from "@/lib/actions/appointments";
export interface CalendarAppointment {
  id: string;
  title: string;
  start: string;
  end: string;
  extendedProps: {
    status: string;
    patientName?: string;
    clinicName: string;
    notes?: string;
    phone?: string;
    type: string; // ONLINE | IN_PERSON
  };
}

interface DoctorCalendarProps {
  initialAppointments?: CalendarAppointment[];
  onDateSelect?: (selectInfo: any) => void;
  onEventClick?: (clickInfo: any) => void;
  onEventDrop?: (dropInfo: any) => void;
  editable?: boolean;
}

export default function DoctorCalendar({
  initialAppointments = [],
  onDateSelect,
  onEventClick,
  onEventDrop,
  editable = true,
}: DoctorCalendarProps) {
  const t = useTranslations("dashboard_doctor");
  const locale = useLocale();
  const [appointments, setAppointments] =
    useState<CalendarAppointment[]>(initialAppointments);
  const [currentView, setCurrentView] = useState("timeGridWeek");
  const calendarRef = useRef<FullCalendar | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [newAppointmentInfo, setNewAppointmentInfo] = useState<{
    start: string;
    end: string;
  } | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  useEffect(() => setAppointments(initialAppointments), [initialAppointments]);

  function statusColors(status: string) {
    switch (status) {
      case "PENDING":
        return { bg: "#fef3c7", border: "#f59e0b", text: "#92400e" };
      case "CONFIRMED":
        return { bg: "#d1fae5", border: "#10b981", text: "#065f46" };
      case "COMPLETED":
        return { bg: "#dbeafe", border: "#3b82f6", text: "#1e3a8a" };
      case "CANCELED":
        return { bg: "#fee2e2", border: "#ef4444", text: "#991b1b" };
      default:
        return { bg: "#f3f4f6", border: "#6b7280", text: "#374151" };
    }
  }

  function statusLabel(status: string) {
    switch (status) {
      case "PENDING":
        return t("pendingStatus");
      case "CONFIRMED":
        return t("confirmedStatus");
      case "COMPLETED":
        return t("completedStatus");
      case "CANCELED":
        return t("canceledStatus");
      default:
        return status;
    }
  }

  const calendarEvents = appointments.map((apt) => ({
    id: apt.id,
    title: apt.extendedProps.patientName || apt.title,
    start: apt.start,
    end: apt.end,
    backgroundColor: statusColors(apt.extendedProps.status).bg,
    borderColor: statusColors(apt.extendedProps.status).border,
    textColor: statusColors(apt.extendedProps.status).text,
    extendedProps: apt.extendedProps,
  }));

  const handleDateSelect = (info: any) => {
    if (onDateSelect) return onDateSelect(info);
    setNewAppointmentInfo({ start: info.startStr, end: info.endStr });
    setModalTitle(t("newAppointmentTitle"));
    setInputValue("");
    setModalOpen(true);
    info.view.calendar.unselect();
  };

  const handleCreateAppointment = () => {
    if (!newAppointmentInfo || !inputValue.trim()) return;
    const newEvent: CalendarAppointment = {
      id: Date.now().toString(),
      title: inputValue.trim(),
      start: newAppointmentInfo.start,
      end: newAppointmentInfo.end,
      extendedProps: {
        status: "PENDING",
        patientName: inputValue.trim(),
        clinicName: t("clinicLabelSchedule"),
        type: "IN_PERSON",
      },
    };
    setAppointments((prev) => [...prev, newEvent]);
    setModalOpen(false);
    setNewAppointmentInfo(null);
  };

  const handleEventClick = (clickInfo: any) => {
    if (onEventClick) return onEventClick(clickInfo);
    const ev = clickInfo.event;
    setSelectedEventId(ev.id);
    const details =
      `${t("appointmentPatientLabel")}: ${ev.extendedProps.patientName || ev.title}\n` +
      `${t("appointmentClinicLabel")}: ${ev.extendedProps.clinicName}\n` +
      `${t("appointmentStatusLabel")}: ${statusLabel(ev.extendedProps.status)}\n` +
      `${t("appointmentTypeLabel")}: ${ev.extendedProps.type === "ONLINE" ? t("virtualType") : t("inPersonType")}\n` +
      `${t("appointmentDateLabel")}: ${ev.start.toLocaleDateString(locale)}\n` +
      `${t("appointmentTimeLabel")}: ${ev.start.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" })}\n` +
      (ev.extendedProps.notes
        ? `${t("appointmentNotesLabel")}: ${ev.extendedProps.notes}\n`
        : "") +
      (ev.extendedProps.phone
        ? `${t("appointmentPhoneLabel")}: ${ev.extendedProps.phone}\n`
        : "");
    setModalTitle(t("appointmentDetailsTitle"));
    setModalContent(details);
    setModalOpen(true);
  };

  const handleEventDrop = (dropInfo: any) => {
    if (onEventDrop) return onEventDrop(dropInfo);
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === dropInfo.event.id
          ? {
              ...apt,
              start: dropInfo.event.startStr,
              end: dropInfo.event.endStr,
            }
          : apt
      )
    );
  };

  const handleAccept = async () => {
    if (!selectedEventId) return;
    const result = await updateAppointmentStatus(selectedEventId, "CONFIRMED");
    if (result.success) {
      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === selectedEventId
            ? {
                ...apt,
                extendedProps: { ...apt.extendedProps, status: "CONFIRMED" },
              }
            : apt
        )
      );
      setModalOpen(false);
      setSelectedEventId(null);
    } else alert(result.error || t("appointmentErrorUpdate"));
  };

  const handleCancel = async () => {
    if (!selectedEventId) return;
    const result = await updateAppointmentStatus(selectedEventId, "CANCELED");
    if (result.success) {
      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === selectedEventId
            ? {
                ...apt,
                extendedProps: { ...apt.extendedProps, status: "CANCELED" },
              }
            : apt
        )
      );
      setModalOpen(false);
      setSelectedEventId(null);
    } else alert(result.error || t("appointmentErrorUpdate"));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <SimpleModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setNewAppointmentInfo(null);
          setSelectedEventId(null);
        }}
        title={modalTitle}
      >
        {newAppointmentInfo && modalTitle === t("newAppointmentTitle") ? (
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              {t("appointmentTitleLabel")}
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
              placeholder={t("appointmentTitlePlaceholder")}
              autoFocus
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreateAppointment()}
            />
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              onClick={handleCreateAppointment}
            >
              {t("createAppointmentButton")}
            </button>
          </div>
        ) : modalTitle === t("appointmentDetailsTitle") && selectedEventId ? (
          (() => {
            const apt = appointments.find((a) => a.id === selectedEventId);
            if (!apt)
              return (
                <span className="whitespace-pre-wrap text-sm text-gray-700">
                  {modalContent}
                </span>
              );
            const colors = statusColors(apt.extendedProps.status);
            return (
              <div className="max-w-lg mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        {t("appointmentDetailsTitle")}
                      </h2>
                      <p className="text-xs text-gray-600">
                        {new Date(apt.start).toLocaleDateString(locale, {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <span
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: colors.bg,
                      color: colors.text,
                      border: `1px solid ${colors.border}`,
                    }}
                  >
                    {statusLabel(apt.extendedProps.status)}
                  </span>
                </div>
                <div className="space-y-2 mb-4 bg-green-50 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-gray-900 text-base font-medium">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {apt.extendedProps.patientName || apt.title}
                  </div>
                  <div className="text-gray-700 text-sm">
                    {t("appointmentClinicLabel")}:{" "}
                    <span className="font-medium">
                      {apt.extendedProps.clinicName}
                    </span>
                  </div>
                  <div className="text-gray-700 text-sm">
                    {t("appointmentTypeLabel")}:{" "}
                    <span className="font-medium">
                      {apt.extendedProps.type === "ONLINE"
                        ? t("virtualType")
                        : t("inPersonType")}
                    </span>
                  </div>
                  <div className="text-gray-700 text-sm">
                    {t("appointmentDateLabel")}:{" "}
                    <span className="font-medium">
                      {new Date(apt.start).toLocaleDateString(locale)}
                    </span>
                  </div>
                  <div className="text-gray-700 text-sm">
                    {t("appointmentTimeLabel")}:{" "}
                    <span className="font-medium">
                      {new Date(apt.start).toLocaleTimeString(locale, {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  {apt.extendedProps.notes && (
                    <div className="text-gray-700 text-sm">
                      {t("appointmentNotesLabel")}:{" "}
                      <span className="font-medium">
                        {apt.extendedProps.notes}
                      </span>
                    </div>
                  )}
                  {apt.extendedProps.phone && (
                    <div className="text-gray-700 text-sm">
                      {t("appointmentPhoneLabel")}:{" "}
                      <span className="font-medium">
                        {apt.extendedProps.phone}
                      </span>
                    </div>
                  )}
                </div>
                {apt.extendedProps.status === "PENDING" && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                    <p className="text-blue-800 text-sm">
                      {t("pendingConfirmationNote")}
                    </p>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row gap-3 justify-end pt-2 border-t border-gray-100 mt-4">
                  {apt.extendedProps.status === "PENDING" && (
                    <>
                      <button
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                        onClick={handleAccept}
                      >
                        {t("acceptAppointmentButton")}
                      </button>
                      <button
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
                        onClick={handleCancel}
                      >
                        {t("cancelAppointmentButton")}
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })()
        ) : (
          <span className="whitespace-pre-wrap text-sm text-gray-700">
            {modalContent}
          </span>
        )}
      </SimpleModal>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {t("doctorCalendarHeader")}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setCurrentView("dayGridMonth");
              calendarRef.current?.getApi().changeView("dayGridMonth");
            }}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${currentView === "dayGridMonth" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            {t("viewMonthLabel")}
          </button>
          <button
            onClick={() => {
              setCurrentView("timeGridWeek");
              calendarRef.current?.getApi().changeView("timeGridWeek");
            }}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${currentView === "timeGridWeek" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            {t("viewWeekLabel")}
          </button>
          <button
            onClick={() => {
              setCurrentView("timeGridDay");
              calendarRef.current?.getApi().changeView("timeGridDay");
            }}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${currentView === "timeGridDay" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            {t("viewDayLabel")}
          </button>
          <button
            onClick={() => {
              setCurrentView("listWeek");
              calendarRef.current?.getApi().changeView("listWeek");
            }}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${currentView === "listWeek" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            {t("viewListLabel")}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded bg-yellow-200 border border-yellow-500" />
          <span className="text-sm text-gray-700">
            {t("legendPendingLabel")}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded bg-green-200 border border-green-500" />
          <span className="text-sm text-gray-700">
            {t("legendConfirmedLabel")}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded bg-blue-200 border border-blue-500" />
          <span className="text-sm text-gray-700">
            {t("legendCompletedLabel")}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded bg-red-200 border border-red-500" />
          <span className="text-sm text-gray-700">
            {t("legendCanceledLabel")}
          </span>
        </div>
      </div>

      <FullCalendar
        ref={calendarRef as any}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView={currentView}
        selectable={editable}
        editable={editable}
        events={calendarEvents}
        select={handleDateSelect}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
        locale={locale}
        headerToolbar={false}
        height="auto"
      />
    </div>
  );
}
