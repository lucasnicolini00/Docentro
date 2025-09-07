"use client";

import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

interface AvailableTimeSlot {
  id: string;
  start: string;
  end: string;
  available: boolean;
  blocked?: boolean;
}

interface CalendarBookingProps {
  doctorName: string;
  availableSlots: AvailableTimeSlot[];
  onTimeSlotSelect: (slot: AvailableTimeSlot) => void;
  selectedSlot?: AvailableTimeSlot | null;
  minDate?: Date;
  maxDate?: Date;
}

export default function CalendarBooking({
  doctorName,
  availableSlots,
  onTimeSlotSelect,
  selectedSlot,
  minDate = new Date(),
  maxDate,
}: CalendarBookingProps) {
  const [currentView, setCurrentView] = useState("timeGridWeek");

  // Transform available slots to FullCalendar events
  const calendarEvents = availableSlots.map((slot) => ({
    id: slot.id,
    start: slot.start,
    end: slot.end,
    title: slot.available ? "Disponible" : "Ocupado",
    backgroundColor: getSlotColor(slot).bg,
    borderColor: getSlotColor(slot).border,
    textColor: getSlotColor(slot).text,
    classNames: [
      slot.available ? "available-slot" : "unavailable-slot",
      selectedSlot?.id === slot.id ? "selected-slot" : "",
    ],
    extendedProps: {
      available: slot.available,
      blocked: slot.blocked,
      slotData: slot,
    },
  }));

  // Get colors based on slot availability
  function getSlotColor(slot: AvailableTimeSlot) {
    if (selectedSlot?.id === slot.id) {
      return {
        bg: "#3b82f6",
        border: "#1d4ed8",
        text: "#ffffff",
      };
    }

    if (!slot.available || slot.blocked) {
      return {
        bg: "#f3f4f6",
        border: "#d1d5db",
        text: "#9ca3af",
      };
    }

    return {
      bg: "#d1fae5",
      border: "#10b981",
      text: "#065f46",
    };
  }

  // Handle event click (time slot selection)
  const handleEventClick = (clickInfo: any) => {
    const slotData = clickInfo.event.extendedProps.slotData;

    if (slotData.available && !slotData.blocked) {
      onTimeSlotSelect(slotData);
    }
  };

  // Handle date selection for navigation
  const handleDateSelect = (selectInfo: any) => {
    selectInfo.view.calendar.unselect();
  };

  // Get available slots for a specific date
  const getSlotsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return availableSlots.filter(
      (slot) =>
        slot.start.startsWith(dateStr) && slot.available && !slot.blocked
    );
  };

  // Format time for display
  function formatTime(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // Calculate available dates
  const availableDates = Array.from(
    new Set(
      availableSlots
        .filter((slot) => slot.available && !slot.blocked)
        .map((slot) => slot.start.split("T")[0])
    )
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Selecciona el horario de tu cita
        </h2>
        <p className="text-gray-600">Dr. {doctorName} • Horarios disponibles</p>
      </div>

      {/* View Toggle */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setCurrentView("dayGridMonth")}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
            currentView === "dayGridMonth"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Vista Mensual
        </button>
        <button
          onClick={() => setCurrentView("timeGridWeek")}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
            currentView === "timeGridWeek"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Vista Semanal
        </button>
        <button
          onClick={() => setCurrentView("timeGridDay")}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
            currentView === "timeGridDay"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Vista Diaria
        </button>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded bg-green-200 border border-green-500"></div>
          <span className="text-sm text-gray-700">Disponible</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded bg-blue-600 border border-blue-700"></div>
          <span className="text-sm text-gray-700">Seleccionado</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded bg-gray-200 border border-gray-400"></div>
          <span className="text-sm text-gray-700">No disponible</span>
        </div>
      </div>

      {/* Selected Slot Display */}
      {selectedSlot && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-sm font-medium text-blue-900 mb-1">
            Horario seleccionado:
          </h3>
          <p className="text-blue-800">
            {new Date(selectedSlot.start).toLocaleDateString("es-ES", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
            {" a las "}
            {formatTime(selectedSlot.start)}
          </p>
        </div>
      )}

      {/* FullCalendar Component */}
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "",
          }}
          initialView={currentView}
          views={{
            dayGridMonth: {
              dayMaxEvents: 4,
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
          editable={false}
          selectable={true}
          selectMirror={false}
          dayMaxEvents={true}
          weekends={true}
          select={handleDateSelect}
          eventClick={handleEventClick}
          height="auto"
          locale="es"
          buttonText={{
            today: "Hoy",
            month: "Mes",
            week: "Semana",
            day: "Día",
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
          validRange={{
            start: minDate,
            end: maxDate,
          }}
          selectConstraint={{
            start: new Date().toISOString(),
          }}
          dayCellDidMount={(info) => {
            const dateStr = info.date.toISOString().split("T")[0];
            const hasAvailableSlots = availableDates.includes(dateStr);

            if (!hasAvailableSlots && info.date > new Date()) {
              info.el.style.backgroundColor = "#f9fafb";
              info.el.style.color = "#9ca3af";
            }
          }}
          eventDidMount={(info) => {
            const slot = info.event.extendedProps.slotData;

            if (slot.available && !slot.blocked) {
              info.el.style.cursor = "pointer";
              info.el.title = "Haz clic para seleccionar este horario";
            } else {
              info.el.style.cursor = "not-allowed";
              info.el.title = "Este horario no está disponible";
            }

            info.el.addEventListener("mouseenter", () => {
              if (
                slot.available &&
                !slot.blocked &&
                selectedSlot?.id !== slot.id
              ) {
                info.el.style.backgroundColor = "#10b981";
                info.el.style.borderColor = "#059669";
              }
            });

            info.el.addEventListener("mouseleave", () => {
              if (
                slot.available &&
                !slot.blocked &&
                selectedSlot?.id !== slot.id
              ) {
                info.el.style.backgroundColor = "#d1fae5";
                info.el.style.borderColor = "#10b981";
              }
            });
          }}
        />
      </div>

      {/* Available Dates Sidebar */}
      {currentView === "dayGridMonth" && availableDates.length > 0 && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-sm font-medium text-green-900 mb-3">
            📅 Fechas con disponibilidad:
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {availableDates.slice(0, 8).map((dateStr) => {
              const date = new Date(dateStr);
              const slotsCount = getSlotsForDate(date).length;
              return (
                <div
                  key={dateStr}
                  className="text-center p-2 bg-white rounded border border-green-300 cursor-pointer hover:bg-green-100 transition-colors"
                >
                  <div className="text-xs font-medium text-green-800">
                    {date.toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "short",
                    })}
                  </div>
                  <div className="text-xs text-green-600">
                    {slotsCount} horario{slotsCount !== 1 ? "s" : ""}
                  </div>
                </div>
              );
            })}
          </div>
          {availableDates.length > 8 && (
            <p className="text-xs text-green-700 mt-2 text-center">
              Y {availableDates.length - 8} fechas más disponibles...
            </p>
          )}
        </div>
      )}

      {/* No Available Slots */}
      {availableSlots.filter((slot) => slot.available).length === 0 && (
        <div className="mt-6 text-center py-8">
          <div className="text-gray-400 text-5xl mb-4">⏰</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No hay horarios disponibles
          </h3>
          <p className="text-gray-600">
            Este doctor no tiene horarios disponibles en el rango de fechas
            seleccionado.
          </p>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="text-sm font-medium text-blue-900 mb-2">
          💡 Cómo reservar tu cita:
        </h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>
            • <strong>Verde:</strong> Horarios disponibles para reservar
          </li>
          <li>
            • <strong>Azul:</strong> Horario que has seleccionado
          </li>
          <li>
            • <strong>Gris:</strong> Horarios no disponibles u ocupados
          </li>
          <li>• Haz clic en un horario verde para seleccionarlo</li>
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

        .calendar-container .fc-today-button {
          background-color: #10b981;
          border-color: #10b981;
        }

        .calendar-container .fc-event {
          border-radius: 4px;
          border-width: 1px;
          font-size: 11px;
          padding: 1px 3px;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .calendar-container .available-slot {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .calendar-container .selected-slot {
          animation: none !important;
          box-shadow: 0 0 0 2px #3b82f6;
        }

        .calendar-container .unavailable-slot {
          opacity: 0.5;
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
      `}</style>
    </div>
  );
}
