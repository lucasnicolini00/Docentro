"use client";

import { useState } from "react";
import {
  CalendarBooking,
  AvailableTimeSlot,
} from "@/components/features/calendar";

export default function CalendarBookingDemo() {
  const [selectedSlot, setSelectedSlot] = useState<AvailableTimeSlot | null>(
    null
  );

  // Generate sample available time slots for the next 2 weeks
  const generateSampleSlots = (): AvailableTimeSlot[] => {
    const slots: AvailableTimeSlot[] = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 1); // Start from tomorrow

    for (let day = 0; day < 14; day++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + day);

      // Skip weekends for this demo
      if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
        continue;
      }

      // Generate morning slots (9:00 AM - 12:00 PM)
      for (let hour = 9; hour < 12; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const slotStart = new Date(currentDate);
          slotStart.setHours(hour, minute, 0, 0);

          const slotEnd = new Date(slotStart);
          slotEnd.setMinutes(slotEnd.getMinutes() + 30);

          // Randomly make some slots unavailable or blocked
          const random = Math.random();
          const available = random > 0.3; // 70% available
          const blocked = !available && random > 0.15; // Some are blocked

          slots.push({
            id: `slot_${day}_${hour}_${minute}`,
            start: slotStart.toISOString(),
            end: slotEnd.toISOString(),
            available,
            blocked,
          });
        }
      }

      // Generate afternoon slots (2:00 PM - 6:00 PM)
      for (let hour = 14; hour < 18; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const slotStart = new Date(currentDate);
          slotStart.setHours(hour, minute, 0, 0);

          const slotEnd = new Date(slotStart);
          slotEnd.setMinutes(slotEnd.getMinutes() + 30);

          // Randomly make some slots unavailable or blocked
          const random = Math.random();
          const available = random > 0.4; // 60% available
          const blocked = !available && random > 0.2; // Some are blocked

          slots.push({
            id: `slot_${day}_${hour}_${minute}`,
            start: slotStart.toISOString(),
            end: slotEnd.toISOString(),
            available,
            blocked,
          });
        }
      }
    }

    return slots;
  };

  const [availableSlots] = useState<AvailableTimeSlot[]>(generateSampleSlots());

  const handleTimeSlotSelect = (slot: AvailableTimeSlot) => {
    setSelectedSlot(slot);
  };

  const handleBookAppointment = () => {
    if (!selectedSlot) return;

    // Simulate booking process
    alert(`¡Cita reservada exitosamente!

Doctor: Dr. Ana García
Especialidad: Cardiología
Fecha: ${new Date(selectedSlot.start).toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })}
Hora: ${new Date(selectedSlot.start).toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    })}

Recibirás un email de confirmación en breve.`);

    setSelectedSlot(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Demo: Reserva de Cita
        </h1>
        <p className="text-gray-600 mt-2">
          Ejemplo de integración del calendario FullCalendar para reservar citas
          médicas
        </p>
      </div>

      {/* Doctor Info Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">👩‍⚕️</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Dr. Ana García
            </h2>
            <p className="text-gray-600">Cardiología</p>
            <p className="text-sm text-gray-500">
              Clínica del Corazón • Las Condes, Santiago
            </p>
            <div className="flex items-center mt-2">
              <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
              <span className="text-sm text-gray-600 ml-2">
                4.9 (127 reviews)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Booking Component */}
        <div className="lg:col-span-2">
          <CalendarBooking
            doctorName="Ana García"
            availableSlots={availableSlots}
            onTimeSlotSelect={handleTimeSlotSelect}
            selectedSlot={selectedSlot}
            minDate={new Date()}
            maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)} // 30 days from now
          />
        </div>

        {/* Booking Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Resumen de la Cita
            </h3>

            {selectedSlot ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Doctor:
                  </label>
                  <p className="text-gray-900">Dr. Ana García</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Especialidad:
                  </label>
                  <p className="text-gray-900">Cardiología</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Fecha:
                  </label>
                  <p className="text-gray-900">
                    {new Date(selectedSlot.start).toLocaleDateString("es-ES", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Hora:
                  </label>
                  <p className="text-gray-900">
                    {new Date(selectedSlot.start).toLocaleTimeString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Clínica:
                  </label>
                  <p className="text-gray-900">Clínica del Corazón</p>
                  <p className="text-sm text-gray-600">Las Condes, Santiago</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Tipo de consulta:
                  </label>
                  <select className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                    <option>Consulta General</option>
                    <option>Control de Rutina</option>
                    <option>Primera Consulta</option>
                    <option>Urgencia</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Notas (opcional):
                  </label>
                  <textarea
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm h-20"
                    placeholder="Describe brevemente el motivo de tu consulta..."
                  />
                </div>

                <hr />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Consulta:</span>
                    <span className="font-medium">$50.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Reserva:</span>
                    <span className="font-medium">$10.000</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span>$60.000</span>
                  </div>
                </div>

                <button
                  onClick={handleBookAppointment}
                  className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Confirmar Reserva
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 text-4xl mb-3">📅</div>
                <p className="text-gray-600 text-sm">
                  Selecciona un horario en el calendario para continuar
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Demo Info */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          🚀 Características del Calendario Integrado
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-blue-800 mb-2">
              📱 Responsive Design
            </h4>
            <p className="text-blue-700">
              Funciona perfectamente en dispositivos móviles, tablets y desktop.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-blue-800 mb-2">
              🎨 Múltiples Vistas
            </h4>
            <p className="text-blue-700">
              Vista mensual, semanal y diaria para mejor navegación.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-blue-800 mb-2">⚡ Interactivo</h4>
            <p className="text-blue-700">
              Selección de horarios con feedback visual inmediato.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-blue-800 mb-2">🔄 Tiempo Real</h4>
            <p className="text-blue-700">
              Actualización automática de disponibilidad de horarios.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-blue-800 mb-2">🌐 Localizado</h4>
            <p className="text-blue-700">
              Completamente en español con formatos locales.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-blue-800 mb-2">♿ Accesible</h4>
            <p className="text-blue-700">
              Diseñado con estándares de accesibilidad web.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
