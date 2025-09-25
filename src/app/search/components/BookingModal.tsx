"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { X, Calendar, Clock, User, MapPin, Loader2 } from "lucide-react";
import { ConfirmationModal } from "@/components/ui";
import { getPatientProfile } from "@/lib/actions/patients";
import { createAppointment } from "@/lib/actions/appointments";

interface Doctor {
  id: string;
  name: string;
  surname: string;
  email: string | null;
  phone: string | null;
  specialities: {
    speciality: {
      name: string;
    };
  }[];
  clinics: {
    clinic: {
      id: string;
      name: string;
      city: string | null;
      address: string | null;
    };
  }[];
  pricings: {
    price: number;
    currency: string;
    title: string;
    clinic: {
      name: string;
    };
  }[];
}

interface PatientData {
  name: string;
  surname: string;
  email: string;
  phone: string | null;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor;
  selectedDate?: string;
  selectedTime?: string;
  selectedClinic?: {
    id: string;
    name: string;
    city: string | null;
    address: string | null;
  } | null;
  mode: "time-selection" | "all-times" | "quick-book";
  onBookingConfirmed?: () => void;
}

export default function BookingModal({
  isOpen,
  onClose,
  doctor,
  selectedDate,
  selectedTime,
  onBookingConfirmed,
}: BookingModalProps) {
  const [errorModal, setErrorModal] = useState<{
    open: boolean;
    message: string;
  }>({ open: false, message: "" });
  const { data: session } = useSession();
  const [isBooking, setIsBooking] = useState(false);
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [currentStep, setCurrentStep] = useState<
    "confirm-booking" | "booking-confirmed"
  >("confirm-booking");
  const [notes, setNotes] = useState("");

  // Reset modal state when opened
  useEffect(() => {
    if (isOpen) {
      setCurrentStep("confirm-booking");
      setNotes("");
    }
  }, [isOpen]);
  const bookingData = {
    selectedTime: selectedTime || "",
    selectedClinicId: doctor.clinics[0]?.clinic?.id || "",
    notes,
  };

  const primarySpeciality =
    doctor.specialities[0]?.speciality?.name || "Especialista";
  const primaryClinic = doctor.clinics[0]?.clinic;
  // const lowestPrice =
  //   doctor.pricings.length > 0
  //     ? (() => {
  //         const validPrices = doctor.pricings
  //           .map((p) => Number(p.price))
  //           .filter((price) => !isNaN(price) && price > 0);
  //         return validPrices.length > 0 ? Math.min(...validPrices) : null;
  //       })()
  //     : null;

  // Load patient data when modal opens
  useEffect(() => {
    async function loadPatientData() {
      if (isOpen && session?.user?.patientId) {
        try {
          const result = await getPatientProfile();
          if (result.success && result.data) {
            setPatientData(result.data);
          }
        } catch (error) {
          console.error("Error loading patient data:", error);
        }
      }
    }
    loadPatientData();
  }, [isOpen, session]);

  // Load all available slots for the selected date

  // Remove handleTimeSelect, not needed

  const handleBookingConfirm = async () => {
    if (!patientData) {
      alert("Error: No se pudo cargar la información del paciente");
      return;
    }

    if (
      !selectedDate ||
      !bookingData.selectedTime ||
      !bookingData.selectedClinicId
    ) {
      alert("Error: Faltan datos requeridos para crear la cita");
      return;
    }

    setIsBooking(true);

    try {
      const selectedClinic = doctor.clinics.find(
        (dc) => dc.clinic.id === bookingData.selectedClinicId
      );

      // Create datetime from selected date and time
      const [hours, minutes] = bookingData.selectedTime.split(":");
      const appointmentDate = new Date(selectedDate);
      appointmentDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

      // Find pricing for the selected clinic
      const clinicPricing = doctor.pricings.find(
        (p) => p.clinic.name === selectedClinic?.clinic.name
      );

      // Create FormData for the appointment
      const formData = new FormData();
      formData.append("doctorId", doctor.id);
      formData.append("clinicId", bookingData.selectedClinicId);
      formData.append("datetime", appointmentDate.toISOString());
      formData.append("notes", bookingData.notes);
      formData.append("type", "IN_PERSON");

      if (clinicPricing) {
        // We'd need pricing ID, but the interface only has price/currency
        // For now, we'll create without pricing
      }

      const result = await createAppointment(formData);

      if (result.success) {
        // Show confirmation step
        setCurrentStep("booking-confirmed");
        if (onBookingConfirmed) {
          onBookingConfirmed();
        }
      } else {
        setErrorModal({
          open: true,
          message: `Error al crear la cita: ${result.error}`,
        });
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      setErrorModal({
        open: true,
        message:
          "Error inesperado al crear la cita. Por favor intenta nuevamente.",
      });
    } finally {
      setIsBooking(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("es-ES", options);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Error Modal */}
      <ConfirmationModal
        isOpen={errorModal.open}
        onClose={() => setErrorModal({ open: false, message: "" })}
        onConfirm={() => setErrorModal({ open: false, message: "" })}
        title="Error al crear la cita"
        message={errorModal.message}
        confirmText="Cerrar"
        cancelText=""
        type="danger"
      />
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Confirmar Reserva
              </h2>
              <p className="text-gray-600">
                Dr. {doctor.name} {doctor.surname}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="p-6">
            {/* Appointment Summary and Confirm Button */}
            {currentStep === "confirm-booking" && (
              <div>
                <div className="relative bg-green-50 rounded-xl p-0 mb-6 flex overflow-hidden shadow-sm">
                  <div className="w-2 bg-green-600 rounded-l-xl" />
                  <div className="flex-1 p-5">
                    <h4 className="font-bold text-green-900 text-lg flex items-center gap-2 mb-4">
                      <Calendar className="w-5 h-5 text-green-700" /> Resumen de
                      la Cita
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 bg-white/80 rounded-lg px-3 py-2">
                        <User className="w-5 h-5 text-blue-600" />
                        <div>
                          <div className="text-xs text-gray-500 font-semibold uppercase">
                            Doctor
                          </div>
                          <div className="font-semibold text-gray-900 text-base">
                            Dr. {doctor.name} {doctor.surname}
                          </div>
                          <div className="text-xs text-gray-600">
                            {primarySpeciality}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-white/80 rounded-lg px-3 py-2">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <div>
                          <div className="text-xs text-gray-500 font-semibold uppercase">
                            Fecha
                          </div>
                          <div className="font-semibold text-gray-900 text-base">
                            {formatDate(selectedDate!)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-white/80 rounded-lg px-3 py-2">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <div>
                          <div className="text-xs text-gray-500 font-semibold uppercase">
                            Hora
                          </div>
                          <div className="font-semibold text-gray-900 text-base">
                            {bookingData.selectedTime}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-white/80 rounded-lg px-3 py-2">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        <div>
                          <div className="text-xs text-gray-500 font-semibold uppercase">
                            Clínica
                          </div>
                          <div className="font-semibold text-gray-900 text-base">
                            {doctor.clinics.find(
                              (dc) =>
                                dc.clinic.id === bookingData.selectedClinicId
                            )?.clinic.name || primaryClinic?.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notas adicionales (opcional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Motivo de la consulta, síntomas, etc."
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleBookingConfirm}
                    disabled={!patientData || isBooking}
                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-6 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    {isBooking && <Loader2 className="w-4 h-4 animate-spin" />}
                    {isBooking ? "Creando Cita..." : "Confirmar Reserva"}
                  </button>
                </div>
              </div>
            )}

            {currentStep === "booking-confirmed" && (
              <div className="text-center">
                {/* Success Icon */}
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                {/* Success Message */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  ¡Cita Agendada Exitosamente!
                </h3>
                <p className="text-gray-600 mb-6">
                  Te contactaremos pronto para confirmar los detalles de tu
                  cita.
                </p>

                {/* Appointment Details */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6 text-left">
                  <h4 className="font-semibold text-green-900 mb-4">
                    Detalles de tu Cita
                  </h4>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">
                          Dr. {doctor.name} {doctor.surname}
                        </p>
                        <p className="text-gray-600">{primarySpeciality}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {formatDate(selectedDate!)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {bookingData.selectedTime}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {doctor.clinics.find(
                            (dc) =>
                              dc.clinic.id === bookingData.selectedClinicId
                          )?.clinic.name || primaryClinic?.name}
                        </p>
                        {doctor.clinics.find(
                          (dc) => dc.clinic.id === bookingData.selectedClinicId
                        )?.clinic.address && (
                          <p className="text-gray-600">
                            {
                              doctor.clinics.find(
                                (dc) =>
                                  dc.clinic.id === bookingData.selectedClinicId
                              )?.clinic.address
                            }
                            ,{" "}
                            {
                              doctor.clinics.find(
                                (dc) =>
                                  dc.clinic.id === bookingData.selectedClinicId
                              )?.clinic.city
                            }
                          </p>
                        )}
                      </div>
                    </div>

                    {patientData && (
                      <div className="flex items-start gap-3">
                        <User className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900">
                            {patientData.name} {patientData.surname}
                          </p>
                          <p className="text-gray-600">{patientData.phone}</p>
                          <p className="text-gray-600">{patientData.email}</p>
                        </div>
                      </div>
                    )}

                    {bookingData.notes && (
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 mb-1">
                            Notas:
                          </p>
                          <p className="text-gray-600">{bookingData.notes}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-medium transition-colors"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
