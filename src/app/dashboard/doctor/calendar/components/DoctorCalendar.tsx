"use client";

import { useState, useEffect, useRef } from "react";
import SimpleModal from "@/components/ui/modals/SimpleModal";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { updateAppointmentStatus } from "@/lib/actions/appointments";

interface CalendarAppointment {
  id: string;
  title: string;
  start: string;
  end: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  extendedProps: {
    status: string;
    patientName?: string;
    clinicName: string;
    notes?: string;
    phone?: string;
    type: string;
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
  const [appointments, setAppointments] =
    useState<CalendarAppointment[]>(initialAppointments);
  const [currentView, setCurrentView] = useState("timeGridWeek");
  const calendarRef = useRef<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [newAppointmentInfo, setNewAppointmentInfo] = useState<{
    start: string;
    end: string;
  } | null>(null);
  const [inputValue, setInputValue] = useState("");

  // Update appointments when props change
  useEffect(() => {
    setAppointments(initialAppointments);
  }, [initialAppointments]);

  // Transform appointments to FullCalendar events
  const calendarEvents = appointments.map((appointment) => ({
    id: appointment.id,
    title: appointment.extendedProps.patientName || appointment.title,
    start: appointment.start,
    end: appointment.end,
    backgroundColor: getStatusColor(appointment.extendedProps.status).bg,
    borderColor: getStatusColor(appointment.extendedProps.status).border,
    textColor: getStatusColor(appointment.extendedProps.status).text,
    extendedProps: appointment.extendedProps,
  }));

  // Get colors based on appointment status
  function getStatusColor(status: string) {
    if (status === "PENDING") {
      return { bg: "#fef3c7", border: "#f59e0b", text: "#92400e" };
    } else if (status === "CONFIRMED") {
      return { bg: "#d1fae5", border: "#10b981", text: "#065f46" };
    } else if (status === "COMPLETED") {
      return { bg: "#dbeafe", border: "#3b82f6", text: "#1e3a8a" };
    } else if (status === "CANCELED") {
      return { bg: "#fee2e2", border: "#ef4444", text: "#991b1b" };
    } else {
      return { bg: "#f3f4f6", border: "#6b7280", text: "#374151" };
    }
  }

  // Modal-driven appointment creation
  const handleCreateAppointment = () => {
    if (newAppointmentInfo && inputValue.trim()) {
      const newEvent = {
        id: Date.now().toString(),
        title: inputValue.trim(),
        start: newAppointmentInfo.start,
        end: newAppointmentInfo.end,
        extendedProps: {
          status: "PENDING",
          patientName: inputValue.trim(),
          clinicName: "Clínica Principal",
          type: "IN_PERSON",
        },
      };
      setAppointments([...appointments, newEvent]);
      setNewAppointmentInfo(null);
      setModalOpen(false);
    }
  };

  // Date select handler for FullCalendar
  const handleDateSelect = (selectInfo: any) => {
    if (onDateSelect) {
      onDateSelect(selectInfo);
    } else {
      setNewAppointmentInfo({
        start: selectInfo.startStr,
        end: selectInfo.endStr,
      });
      setModalTitle("Nueva Cita");
      setInputValue("");
      setModalOpen(true);
    }
    selectInfo.view.calendar.unselect();
  };

  // Handle event click (for viewing/editing appointments)
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const handleEventClick = (clickInfo: any) => {
    if (onEventClick) {
      onEventClick(clickInfo);
    } else {
      // Default behavior - show appointment details in modal
      const event = clickInfo.event;
      setSelectedEventId(event.id);
      const details =
        `Paciente: ${event.extendedProps.patientName || event.title}\n` +
        `Clínica: ${event.extendedProps.clinicName}\n` +
        `Estado: ${getStatusText(event.extendedProps.status)}\n` +
        `Tipo: ${
          event.extendedProps.type === "ONLINE" ? "Virtual" : "Presencial"
        }\n` +
        `Fecha: ${event.start.toLocaleDateString("es-ES")}\n` +
        `Hora: ${event.start.toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
        })}\n` +
        (event.extendedProps.notes
          ? `Notas: ${event.extendedProps.notes}\n`
          : "") +
        (event.extendedProps.phone
          ? `Teléfono: ${event.extendedProps.phone}\n`
          : "");
      setModalTitle("Detalles de la cita");
      setModalContent(details);
      setModalOpen(true);
    }
  };

  // Accept or cancel appointment handlers
  const handleAcceptAppointment = async () => {
    if (!selectedEventId) return;
    const result = await updateAppointmentStatus(selectedEventId, "CONFIRMED");
    if (result.success) {
      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === selectedEventId
            ? {
                ...apt,
                extendedProps: {
                  ...apt.extendedProps,
                  status: "CONFIRMED",
                },
              }
            : apt
        )
      );
      setModalOpen(false);
      setSelectedEventId(null);
    } else {
      alert(result.error || "Error al actualizar la cita");
    }
  };
  const handleCancelAppointment = async () => {
    if (!selectedEventId) return;
    const result = await updateAppointmentStatus(selectedEventId, "CANCELED");
    if (result.success) {
      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === selectedEventId
            ? {
                ...apt,
                extendedProps: {
                  ...apt.extendedProps,
                  status: "CANCELED",
                },
              }
            : apt
        )
      );
      setModalOpen(false);
      setSelectedEventId(null);
    } else {
      alert(result.error || "Error al actualizar la cita");
    }
  };

  // Handle event drop (for rescheduling)
  const handleEventDrop = (dropInfo: any) => {
    if (onEventDrop) {
      onEventDrop(dropInfo);
    } else {
      // Default behavior - update appointment time
      const updatedAppointments = appointments.map((apt) =>
        apt.id === dropInfo.event.id
          ? {
              ...apt,
              start: dropInfo.event.startStr,
              end: dropInfo.event.endStr,
            }
          : apt
      );
      setAppointments(updatedAppointments);
    }
  };

  // Get status text in Spanish
  function getStatusText(status: string) {
    switch (status) {
      case "PENDING":
        return "Pendiente";
      case "CONFIRMED":
        return "Confirmada";
      case "COMPLETED":
        return "Completada";
      case "CANCELED":
        return "Cancelada";
      default:
        return status;
    }
  }

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
        {newAppointmentInfo && modalTitle === "Nueva Cita" ? (
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Título de la cita
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
              placeholder="Ej: Consulta médica"
              autoFocus
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCreateAppointment();
                }
              }}
            />
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              onClick={handleCreateAppointment}
            >
              Crear
            </button>
          </div>
        ) : modalTitle === "Detalles de la cita" && selectedEventId ? (
          (() => {
            const apt = appointments.find((a) => a.id === selectedEventId);
            if (!apt) return <span>{modalContent}</span>;
            const status = apt.extendedProps.status;
            const statusColor = getStatusColor(status);
            return (
              <div className="max-w-lg mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-4 ">
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
                        Detalles de la Cita
                      </h2>
                      <p className="text-xs text-gray-600">
                        {new Date(apt.start).toLocaleDateString("es-ES", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium`}
                    style={{
                      background: statusColor.bg,
                      color: statusColor.text,
                      border: `1px solid ${statusColor.border}`,
                    }}
                  >
                    {getStatusText(status)}
                  </span>
                </div>
                {/* Main Info */}
                <div className="space-y-2 mb-4  bg-green-50 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-gray-900 text-base font-medium ">
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
                    Clínica:{" "}
                    <span className="font-medium">
                      {apt.extendedProps.clinicName}
                    </span>
                  </div>
                  <div className="text-gray-700 text-sm">
                    Tipo:{" "}
                    <span className="font-medium">
                      {apt.extendedProps.type === "ONLINE"
                        ? "Virtual"
                        : "Presencial"}
                    </span>
                  </div>
                  <div className="text-gray-700 text-sm">
                    Fecha:{" "}
                    <span className="font-medium">
                      {new Date(apt.start).toLocaleDateString("es-ES")}
                    </span>
                  </div>
                  <div className="text-gray-700 text-sm">
                    Hora:{" "}
                    <span className="font-medium">
                      {new Date(apt.start).toLocaleTimeString("es-ES", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  {apt.extendedProps.notes && (
                    <div className="text-gray-700 text-sm">
                      Notas:{" "}
                      <span className="font-medium">
                        {apt.extendedProps.notes}
                      </span>
                    </div>
                  )}
                  {apt.extendedProps.phone && (
                    <div className="text-gray-700 text-sm">
                      Teléfono:{" "}
                      <span className="font-medium">
                        {apt.extendedProps.phone}
                      </span>
                    </div>
                  )}
                </div>
                {/* Info box for pending */}
                {status === "PENDING" && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                    <p className="text-blue-800 text-sm">
                      <strong>Pendiente de confirmación:</strong> Debes aceptar
                      o cancelar la cita.
                    </p>
                  </div>
                )}
                {/* Action Buttons & Footer */}
                <div className="flex flex-col sm:flex-row gap-3 justify-end pt-2 border-t border-gray-100 mt-4">
                  {status === "PENDING" && (
                    <>
                      <button
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                        onClick={handleAcceptAppointment}
                      >
                        Aceptar
                      </button>
                      <button
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
                        onClick={handleCancelAppointment}
                      >
                        Cancelar
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })()
        ) : (
          <span>{modalContent}</span>
        )}
      </SimpleModal>
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Calendario de Citas
        </h2>

        {/* View Toggle */}
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setCurrentView("dayGridMonth");
              calendarRef.current?.getApi().changeView("dayGridMonth");
            }}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              currentView === "dayGridMonth"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Mes
          </button>
          <button
            onClick={() => {
              setCurrentView("timeGridWeek");
              calendarRef.current?.getApi().changeView("timeGridWeek");
            }}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              currentView === "timeGridWeek"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Semana
          </button>
          <button
            onClick={() => {
              setCurrentView("timeGridDay");
              calendarRef.current?.getApi().changeView("timeGridDay");
            }}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              currentView === "timeGridDay"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Día
          </button>
          <button
            onClick={() => {
              setCurrentView("listWeek");
              calendarRef.current?.getApi().changeView("listWeek");
            }}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              currentView === "listWeek"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Lista
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded bg-yellow-200 border border-yellow-500"></div>
          <span className="text-sm text-gray-700">Pendiente</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded bg-green-200 border border-green-500"></div>
          <span className="text-sm text-gray-700">Confirmada</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded bg-blue-200 border border-blue-500"></div>
          <span className="text-sm text-gray-700">Completada</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded bg-red-200 border border-red-500"></div>
          <span className="text-sm text-gray-700">Cancelada</span>
        </div>
      </div>

      {/* FullCalendar Component */}
      <div className="calendar-container">
        <FullCalendar
          ref={calendarRef}
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "", // We handle view switching with our custom buttons
          }}
          initialView={currentView}
          views={{
            dayGridMonth: {
              dayMaxEvents: 3,
            },
            timeGridWeek: {
              slotMinTime: "07:00:00",
              slotMaxTime: "22:00:00",
              slotDuration: "00:30:00",
            },
            timeGridDay: {
              slotMinTime: "07:00:00",
              slotMaxTime: "22:00:00",
              slotDuration: "00:30:00",
            },
          }}
          events={calendarEvents}
          editable={editable}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          select={handleDateSelect}
          eventClick={handleEventClick}
          eventDrop={handleEventDrop}
          height="auto"
          locale="es"
          buttonText={{
            today: "Hoy",
            month: "Mes",
            week: "Semana",
            day: "Día",
            list: "Lista",
          }}
          slotLabelFormat={{
            hour: "2-digit",
            minute: "2-digit",
            meridiem: false,
          }}
          eventTimeFormat={{
            hour: "2-digit",
            minute: "2-digit",
            meridiem: false,
          }}
          moreLinkText="más"
          noEventsText="No hay citas programadas"
          // Custom rendering for better mobile experience
          eventDidMount={(info) => {
            // Add tooltip
            info.el.title = `${info.event.extendedProps.patientName} - ${info.event.extendedProps.clinicName}`;
          }}
        />
      </div>

      <style jsx global>{`
        .calendar-container .fc {
          font-family: inherit;
        }

        .calendar-container .fc-button {
          background-color: #3b82f6;
          border-color: #3b82f6;
          color: white;
          border-radius: 6px;
          padding: 4px 12px;
          font-size: 14px;
        }

        .calendar-container .fc-button:hover {
          background-color: #2563eb;
          border-color: #2563eb;
        }

        .calendar-container .fc-button:disabled {
          background-color: #9ca3af;
          border-color: #9ca3af;
        }

        .calendar-container .fc-today-button {
          background-color: #10b981;
          border-color: #10b981;
        }

        .calendar-container .fc-today-button:hover {
          background-color: #059669;
          border-color: #059669;
        }

        .calendar-container .fc-event {
          border-radius: 4px;
          border-width: 1px;
          font-size: 12px;
          padding: 1px 4px;
        }

        .calendar-container .fc-event-title {
          font-weight: 500;
        }

        .calendar-container .fc-timegrid-slot-label {
          font-size: 12px;
          color: #6b7280;
        }

        .calendar-container .fc-col-header-cell {
          background-color: #f9fafb;
          font-weight: 600;
          color: #374151;
        }

        .calendar-container .fc-scrollgrid {
          border-radius: 8px;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .calendar-container .fc-toolbar {
            flex-direction: column;
            gap: 8px;
          }

          .calendar-container .fc-toolbar-chunk {
            display: flex;
            justify-content: center;
          }

          .calendar-container .fc-event {
            font-size: 11px;
          }
        }
      `}</style>
    </div>
  );
}
