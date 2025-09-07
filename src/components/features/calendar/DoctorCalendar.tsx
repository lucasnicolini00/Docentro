"use client";

import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

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

  // Handle date selection (for creating new appointments)
  const handleDateSelect = (selectInfo: any) => {
    if (onDateSelect) {
      onDateSelect(selectInfo);
    } else {
      // Default behavior - you could open a modal here
      const title = prompt("Título de la cita:");
      if (title) {
        const newEvent = {
          id: Date.now().toString(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          extendedProps: {
            status: "PENDING",
            patientName: title,
            clinicName: "Clínica Principal",
            type: "IN_PERSON",
          },
        };
        setAppointments([...appointments, newEvent]);
      }
    }
    selectInfo.view.calendar.unselect();
  };

  // Handle event click (for viewing/editing appointments)
  const handleEventClick = (clickInfo: any) => {
    if (onEventClick) {
      onEventClick(clickInfo);
    } else {
      // Default behavior - show appointment details
      const event = clickInfo.event;
      const details = `
Paciente: ${event.extendedProps.patientName || event.title}
Clínica: ${event.extendedProps.clinicName}
Estado: ${getStatusText(event.extendedProps.status)}
Tipo: ${event.extendedProps.type === "ONLINE" ? "Virtual" : "Presencial"}
Fecha: ${event.start.toLocaleDateString("es-ES")}
Hora: ${event.start.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      })}
${event.extendedProps.notes ? `Notas: ${event.extendedProps.notes}` : ""}
${event.extendedProps.phone ? `Teléfono: ${event.extendedProps.phone}` : ""}
      `;
      alert(details);
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
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Calendario de Citas
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
            onClick={() => setCurrentView("timeGridWeek")}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              currentView === "timeGridWeek"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Semana
          </button>
          <button
            onClick={() => setCurrentView("timeGridDay")}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              currentView === "timeGridDay"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Día
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

      {/* Instructions */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="text-sm font-medium text-blue-900 mb-2">
          💡 Cómo usar el calendario:
        </h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>
            • <strong>Crear cita:</strong> Haz clic y arrastra en un horario
            vacío
          </li>
          <li>
            • <strong>Ver detalles:</strong> Haz clic en una cita existente
          </li>
          <li>
            • <strong>Reprogramar:</strong> Arrastra una cita a otro horario
          </li>
          <li>
            • <strong>Cambiar vista:</strong> Usa los botones
            Mes/Semana/Día/Lista
          </li>
        </ul>
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
