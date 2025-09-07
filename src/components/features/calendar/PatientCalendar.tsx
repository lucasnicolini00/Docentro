"use client";

import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

interface PatientAppointment {
  id: string;
  title: string;
  start: string;
  end: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
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
}

interface PatientCalendarProps {
  initialAppointments?: PatientAppointment[];
  onEventClick?: (clickInfo: any) => void;
  showUpcoming?: boolean;
}

export default function PatientCalendar({
  initialAppointments = [],
  onEventClick,
  showUpcoming = true,
}: PatientCalendarProps) {
  const [appointments, setAppointments] =
    useState<PatientAppointment[]>(initialAppointments);
  const [currentView, setCurrentView] = useState("listWeek");

  // Update appointments when props change
  useEffect(() => {
    setAppointments(initialAppointments);
  }, [initialAppointments]);

  // Transform appointments to FullCalendar events
  const calendarEvents = appointments.map((appointment) => ({
    id: appointment.id,
    title: `${appointment.extendedProps.doctorName} - ${appointment.extendedProps.specialty}`,
    start: appointment.start,
    end: appointment.end,
    backgroundColor: getStatusColor(appointment.extendedProps.status).bg,
    borderColor: getStatusColor(appointment.extendedProps.status).border,
    textColor: getStatusColor(appointment.extendedProps.status).text,
    extendedProps: appointment.extendedProps,
  }));

  // Get upcoming appointments (next 7 days)
  const upcomingAppointments = appointments
    .filter((apt) => {
      const aptDate = new Date(apt.start);
      const now = new Date();
      const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      return (
        aptDate >= now &&
        aptDate <= nextWeek &&
        apt.extendedProps.status !== "CANCELED"
      );
    })
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
    .slice(0, 3);

  // Get colors based on appointment status
  function getStatusColor(status: string) {
    switch (status) {
      case "PENDING":
        return {
          bg: "#fef3c7",
          border: "#f59e0b",
          text: "#92400e",
        };
      case "CONFIRMED":
        return {
          bg: "#d1fae5",
          border: "#10b981",
          text: "#065f46",
        };
      case "COMPLETED":
        return {
          bg: "#dbeafe",
          border: "#3b82f6",
          text: "#1e3a8a",
        };
      case "CANCELED":
        return {
          bg: "#fee2e2",
          border: "#ef4444",
          text: "#991b1b",
        };
      default:
        return {
          bg: "#f3f4f6",
          border: "#6b7280",
          text: "#374151",
        };
    }
  }

  // Handle event click (for viewing appointment details)
  const handleEventClick = (clickInfo: any) => {
    if (onEventClick) {
      onEventClick(clickInfo);
    } else {
      // Default behavior - show appointment details
      const event = clickInfo.event;
      const details = `
Doctor: ${event.extendedProps.doctorName}
Especialidad: ${event.extendedProps.specialty}
Clínica: ${event.extendedProps.clinicName}
${
  event.extendedProps.clinicAddress
    ? `Dirección: ${event.extendedProps.clinicAddress}`
    : ""
}
Estado: ${getStatusText(event.extendedProps.status)}
Tipo: ${event.extendedProps.type === "ONLINE" ? "Virtual" : "Presencial"}
${
  event.extendedProps.meetingLink
    ? `Link de reunión: ${event.extendedProps.meetingLink}`
    : ""
}
Fecha: ${event.start.toLocaleDateString("es-ES")}
Hora: ${event.start.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      })}
${event.extendedProps.notes ? `Notas: ${event.extendedProps.notes}` : ""}
      `;
      alert(details);
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

  // Format date for display
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  }

  // Format time for display
  function formatTime(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="space-y-6">
      {/* Upcoming Appointments Section */}
      {showUpcoming && upcomingAppointments.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            📅 Próximas Citas
          </h2>
          <div className="space-y-3">
            {upcomingAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => {
                  const event = {
                    event: {
                      ...appointment,
                      start: new Date(appointment.start),
                      extendedProps: appointment.extendedProps,
                    },
                  };
                  handleEventClick(event);
                }}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: getStatusColor(
                        appointment.extendedProps.status
                      ).border,
                    }}
                  ></div>
                  <div>
                    <p className="font-medium text-gray-900">
                      Dr. {appointment.extendedProps.doctorName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {appointment.extendedProps.specialty} •{" "}
                      {appointment.extendedProps.clinicName}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    {formatDate(appointment.start)}
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatTime(appointment.start)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Calendar Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Todas mis Citas
          </h2>

          {/* View Toggle */}
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentView("dayGridMonth")}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                currentView === "dayGridMonth"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Mes
            </button>
            <button
              onClick={() => setCurrentView("listWeek")}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                currentView === "listWeek"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Lista
            </button>
            <button
              onClick={() => setCurrentView("listMonth")}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                currentView === "listMonth"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Lista Mensual
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
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "", // We handle view switching with our custom buttons
            }}
            initialView={currentView}
            views={{
              dayGridMonth: {
                dayMaxEvents: 2,
              },
              listWeek: {
                listDayFormat: {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                },
              },
              listMonth: {
                listDayFormat: {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                },
              },
            }}
            events={calendarEvents}
            editable={false} // Patients can't edit appointments
            selectable={false}
            dayMaxEvents={true}
            weekends={true}
            eventClick={handleEventClick}
            height="auto"
            locale="es"
            buttonText={{
              today: "Hoy",
              month: "Mes",
              week: "Semana",
              day: "Día",
              list: "Lista",
            }}
            eventTimeFormat={{
              hour: "2-digit",
              minute: "2-digit",
              meridiem: false,
            }}
            moreLinkText="más"
            noEventsText="No tienes citas programadas"
            // Custom rendering for list view
            eventDidMount={(info) => {
              // Add tooltip
              const props = info.event.extendedProps;
              info.el.title = `Dr. ${props.doctorName} - ${props.specialty} en ${props.clinicName}`;

              // Add status badge in list view
              if (currentView.includes("list")) {
                const statusBadge = document.createElement("span");
                statusBadge.className = `ml-2 px-2 py-1 text-xs font-medium rounded-full`;
                statusBadge.textContent = getStatusText(props.status);

                const colors = getStatusColor(props.status);
                statusBadge.style.backgroundColor = colors.bg;
                statusBadge.style.color = colors.text;
                statusBadge.style.border = `1px solid ${colors.border}`;

                info.el
                  .querySelector(".fc-list-event-title")
                  ?.appendChild(statusBadge);
              }
            }}
          />
        </div>

        {/* Empty State */}
        {appointments.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📅</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No tienes citas programadas
            </h3>
            <p className="text-gray-600 mb-6">
              Busca doctores y agenda tu primera consulta médica
            </p>
            <button
              onClick={() => (window.location.href = "/search")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Buscar Doctores
            </button>
          </div>
        )}

        {/* Instructions */}
        {appointments.length > 0 && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-2">
              💡 Información útil:
            </h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>
                • <strong>Ver detalles:</strong> Haz clic en cualquier cita para
                ver información completa
              </li>
              <li>
                • <strong>Citas virtuales:</strong> El link de la reunión
                aparecerá en los detalles
              </li>
              <li>
                • <strong>Recordatorios:</strong> Recibirás notificaciones antes
                de tu cita
              </li>
              <li>
                • <strong>Cancelar/Reprogramar:</strong> Contacta a la clínica
                con al menos 24h de anticipación
              </li>
            </ul>
          </div>
        )}
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
          cursor: pointer;
        }

        .calendar-container .fc-event:hover {
          opacity: 0.8;
        }

        .calendar-container .fc-event-title {
          font-weight: 500;
        }

        .calendar-container .fc-list-event-title {
          font-weight: 500;
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

        .calendar-container .fc-list-day-cushion {
          background-color: #f3f4f6;
          font-weight: 600;
          color: #374151;
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

          .calendar-container .fc-list-event-title {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
}
