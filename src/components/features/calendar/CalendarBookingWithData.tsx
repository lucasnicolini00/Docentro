"use client";

import { useState, useEffect } from "react";
import { createAppointmentAction } from "@/lib/actions/appointments";
import { getTimeSlotsForCalendarAction } from "@/lib/actions/timeSlots";
import {
  CalendarBooking,
  AvailableTimeSlot,
  generateTimeSlotEvents,
} from "@/components/features/calendar";

interface CalendarBookingWithDataProps {
  doctorId: string;
  clinicId: string;
  doctorName: string;
  specialty?: string;
}

export default function CalendarBookingWithData({
  doctorId,
  clinicId,
  doctorName,
  specialty = "Medicina General",
}: CalendarBookingWithDataProps) {
  const [selectedSlot, setSelectedSlot] = useState<AvailableTimeSlot | null>(
    null
  );
  const [availableSlots, setAvailableSlots] = useState<AvailableTimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [consultationType, setConsultationType] = useState("REGULAR");
  const [notes, setNotes] = useState("");

  // Fetch available time slots using server action
  const fetchTimeSlots = async () => {
    try {
      setLoading(true);
      setError(null);

      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 30); // Next 30 days

      // Use server action instead of API fetch
      const result = await getTimeSlotsForCalendarAction(doctorId, clinicId, {
        startDate: new Date(),
        endDate: endDate,
      });

      if (!result.success) {
        throw new Error(result.error || "Error al cargar horarios disponibles");
      }

      const timeSlots = result.data;
      const calendarSlots = generateTimeSlotEvents(timeSlots);
      setAvailableSlots(calendarSlots);
    } catch (err) {
      console.error("Error fetching time slots:", err);
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (doctorId && clinicId) {
      fetchTimeSlots();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctorId, clinicId]);

  const handleTimeSlotSelect = (slot: AvailableTimeSlot) => {
    setSelectedSlot(slot);
  };

  const handleBookAppointment = async () => {
    if (!selectedSlot) return;

    try {
      setBookingLoading(true);

      // Create form data for the server action
      const formData = new FormData();
      formData.append("type", consultationType);
      if (notes) formData.append("notes", notes);

      // Use server action instead of API route
      const result = await createAppointmentAction(selectedSlot.id, formData);

      if (result.success) {
        // Clear selection and refresh data
        setSelectedSlot(null);
        setNotes("");
        setConsultationType("REGULAR");

        // Show success message
        alert("¡Cita confirmada exitosamente!");

        // Refetch time slots to update availability
        await fetchTimeSlots();
      } else {
        throw new Error(result.error || "Error al crear la cita");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Error al crear la cita. Por favor, intenta de nuevo.");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando horarios disponibles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="text-center py-12">
          <div className="text-red-400 text-5xl mb-4">⚠️</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Error al cargar horarios
          </h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar Booking Component */}
      <div className="lg:col-span-2">
        <CalendarBooking
          doctorName={doctorName}
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
                <p className="text-gray-900">Dr. {doctorName}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Especialidad:
                </label>
                <p className="text-gray-900">{specialty}</p>
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
                  Tipo de consulta:
                </label>
                <select
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  value={consultationType}
                  onChange={(e) => setConsultationType(e.target.value)}
                >
                  <option value="REGULAR">Consulta General</option>
                  <option value="REGULAR">Control de Rutina</option>
                  <option value="REGULAR">Primera Consulta</option>
                  <option value="URGENT">Urgencia</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Notas (opcional):
                </label>
                <textarea
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm h-20"
                  placeholder="Describe brevemente el motivo de tu consulta..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
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
                disabled={bookingLoading}
                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {bookingLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Procesando...
                  </>
                ) : (
                  "Confirmar Reserva"
                )}
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
  );
}
