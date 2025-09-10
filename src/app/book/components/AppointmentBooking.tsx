"use client";

import { useState } from "react";
import { AppointmentType } from "@prisma/client";

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  isBlocked: boolean;
}

interface DoctorInfo {
  id: string;
  name: string;
  surname: string;
  specialities: Array<{
    speciality: {
      name: string;
    };
  }>;
}

interface Clinic {
  id: string;
  name: string;
  address: string | null;
}

interface Pricing {
  id: string;
  title: string;
  price: number;
  currency: string;
  durationMinutes: number;
  description: string | null;
  clinicId?: string;
}

interface AppointmentBookingProps {
  doctor: DoctorInfo;
  clinics: Clinic[];
  pricings?: Pricing[];
  onClose?: () => void;
}

// Server action wrapper
async function createAppointmentWrapper(
  timeSlotId: string,
  formData: FormData
) {
  const { createAppointmentWithTimeSlot } = await import(
    "@/lib/actions/appointments"
  );
  return createAppointmentWithTimeSlot(timeSlotId, formData);
}

async function getAvailableTimeSlotsWrapper(
  doctorId: string,
  clinicId: string,
  date: string
) {
  const { getAvailableTimeSlots } = await import("@/lib/actions/schedules");
  return getAvailableTimeSlots(doctorId, clinicId, date);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getClinicPricingWrapper(_clinicId: string) {
  // This would need to be implemented in clinics actions
  return { success: true, data: [] };
}

export default function AppointmentBooking({
  doctor,
  clinics,
  onClose,
}: AppointmentBookingProps) {
  const [step, setStep] = useState(1);
  const [selectedClinic, setSelectedClinic] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [selectedPricing, setSelectedPricing] = useState<string>("");
  const [appointmentType, setAppointmentType] = useState<AppointmentType>(
    AppointmentType.IN_PERSON
  );
  const [notes, setNotes] = useState("");
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
  const [pricing, setPricing] = useState<Pricing[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  // Get minimum date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  // Get maximum date (3 months from now)
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateStr = maxDate.toISOString().split("T")[0];

  const handleClinicChange = async (clinicId: string) => {
    setSelectedClinic(clinicId);
    setSelectedDate("");
    setSelectedTimeSlot("");
    setAvailableTimeSlots([]);

    // Load pricing for this clinic
    try {
      setIsLoading(true);
      const pricingResult = await getClinicPricingWrapper(clinicId);
      if (pricingResult.success) {
        setPricing(pricingResult.data);
      }
    } catch (error) {
      console.error("Error loading pricing:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateChange = async (date: string) => {
    setSelectedDate(date);
    setSelectedTimeSlot("");

    if (!selectedClinic || !date) return;

    try {
      setIsLoading(true);
      const timeSlotsResult = await getAvailableTimeSlotsWrapper(
        doctor.id,
        selectedClinic,
        date
      );

      if (timeSlotsResult.success) {
        setAvailableTimeSlots(timeSlotsResult.data || []);
      } else {
        setAvailableTimeSlots([]);
      }
    } catch (error) {
      console.error("Error loading time slots:", error);
      setAvailableTimeSlots([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookAppointment = async () => {
    if (!selectedTimeSlot) return;

    setIsBooking(true);
    try {
      const formData = new FormData();
      if (selectedPricing) formData.append("pricingId", selectedPricing);
      formData.append("type", appointmentType);
      if (notes) formData.append("notes", notes);

      const result = await createAppointmentWrapper(selectedTimeSlot, formData);

      if (result.success) {
        // Show success message and close modal
        alert("¡Cita agendada exitosamente!");
        onClose?.();
      } else {
        alert(result.error || "Error al agendar la cita");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Error al agendar la cita");
    } finally {
      setIsBooking(false);
    }
  };

  const canProceedToStep2 = selectedClinic && selectedDate && selectedTimeSlot;
  const canBookAppointment = canProceedToStep2 && appointmentType;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Agendar Cita
            </h2>
            <p className="text-sm text-gray-500">
              Dr. {doctor.name} {doctor.surname}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 bg-gray-50">
          <div className="flex items-center space-x-4">
            <div
              className={`flex items-center ${
                step >= 1 ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                1
              </div>
              <span className="ml-2 text-sm font-medium">Horario</span>
            </div>
            <div className="flex-1 h-px bg-gray-300"></div>
            <div
              className={`flex items-center ${
                step >= 2 ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                2
              </div>
              <span className="ml-2 text-sm font-medium">Detalles</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {step === 1 && (
            <div className="space-y-6">
              {/* Clinic Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seleccionar Clínica
                </label>
                <select
                  value={selectedClinic}
                  onChange={(e) => handleClinicChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar clínica...</option>
                  {clinics.map((clinic) => (
                    <option key={clinic.id} value={clinic.id}>
                      {clinic.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Selection */}
              {selectedClinic && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seleccionar Fecha
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => handleDateChange(e.target.value)}
                    min={minDate}
                    max={maxDateStr}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              {/* Time Slots */}
              {selectedDate && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Horarios Disponibles
                  </label>
                  {isLoading ? (
                    <div className="text-center py-4">
                      <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      <p className="text-sm text-gray-500 mt-2">
                        Cargando horarios...
                      </p>
                    </div>
                  ) : availableTimeSlots.length > 0 ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {availableTimeSlots.map((slot) => (
                        <button
                          key={slot.id}
                          onClick={() => setSelectedTimeSlot(slot.id)}
                          className={`p-2 text-sm rounded-lg border transition-colors ${
                            selectedTimeSlot === slot.id
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"
                          }`}
                        >
                          {slot.startTime}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 py-4">
                      No hay horarios disponibles para esta fecha.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              {/* Selected Appointment Summary */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">
                  Resumen de la Cita
                </h3>
                <div className="text-sm text-blue-800 space-y-1">
                  <p>
                    <span className="font-medium">Doctor:</span> Dr.{" "}
                    {doctor.name} {doctor.surname}
                  </p>
                  <p>
                    <span className="font-medium">Fecha:</span> {selectedDate}
                  </p>
                  <p>
                    <span className="font-medium">Hora:</span>{" "}
                    {
                      availableTimeSlots.find(
                        (slot) => slot.id === selectedTimeSlot
                      )?.startTime
                    }
                  </p>
                  <p>
                    <span className="font-medium">Clínica:</span>{" "}
                    {
                      clinics.find((clinic) => clinic.id === selectedClinic)
                        ?.name
                    }
                  </p>
                </div>
              </div>

              {/* Service/Pricing Selection */}
              {pricing.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Consulta (Opcional)
                  </label>
                  <select
                    value={selectedPricing}
                    onChange={(e) => setSelectedPricing(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Consulta general</option>
                    {pricing.map((price) => (
                      <option key={price.id} value={price.id}>
                        {price.title} - {price.price} {price.currency}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Appointment Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Cita
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value={AppointmentType.IN_PERSON}
                      checked={appointmentType === AppointmentType.IN_PERSON}
                      onChange={(e) =>
                        setAppointmentType(e.target.value as AppointmentType)
                      }
                      className="mr-2"
                    />
                    <span className="text-sm">Presencial</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value={AppointmentType.ONLINE}
                      checked={appointmentType === AppointmentType.ONLINE}
                      onChange={(e) =>
                        setAppointmentType(e.target.value as AppointmentType)
                      }
                      className="mr-2"
                    />
                    <span className="text-sm">Virtual</span>
                  </label>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notas Adicionales (Opcional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Describe brevemente el motivo de la consulta..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
          <div>
            {step === 2 && (
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Volver
              </button>
            )}
          </div>
          <div className="space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            {step === 1 ? (
              <button
                onClick={() => setStep(2)}
                disabled={!canProceedToStep2}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continuar
              </button>
            ) : (
              <button
                onClick={handleBookAppointment}
                disabled={!canBookAppointment || isBooking}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isBooking ? "Agendando..." : "Agendar Cita"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
