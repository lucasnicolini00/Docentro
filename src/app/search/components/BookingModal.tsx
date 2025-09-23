"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Calendar, Clock, User, MapPin, CreditCard } from "lucide-react";
import { getDoctorAvailability } from "@/lib/actions/appointments";

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

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor;
  selectedDate?: string;
  selectedTime?: string;
  mode: "time-selection" | "all-times" | "quick-book";
}

export default function BookingModal({
  isOpen,
  onClose,
  doctor,
  selectedDate,
  selectedTime,
  mode,
}: BookingModalProps) {
  const [allSlots, setAllSlots] = useState<
    Array<{ datetime: string; time: string }>
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<
    "select-time" | "confirm-booking" | "contact-info"
  >("select-time");
  const [bookingData, setBookingData] = useState({
    selectedTime: selectedTime || "",
    selectedClinicId: doctor.clinics[0]?.clinic?.name || "",
    patientName: "",
    patientPhone: "",
    patientEmail: "",
    notes: "",
  });

  const primarySpeciality =
    doctor.specialities[0]?.speciality?.name || "Especialista";
  const primaryClinic = doctor.clinics[0]?.clinic;
  const lowestPrice =
    doctor.pricings.length > 0
      ? (() => {
          const validPrices = doctor.pricings
            .map((p) => Number(p.price))
            .filter((price) => !isNaN(price) && price > 0);
          return validPrices.length > 0 ? Math.min(...validPrices) : null;
        })()
      : null;

  // Load all available slots for the selected date
  const loadAllSlots = useCallback(async () => {
    if (!selectedDate) return;

    setIsLoading(true);
    try {
      const result = await getDoctorAvailability(doctor.id, selectedDate);
      if (result.success) {
        setAllSlots(result.data || []);
      }
    } catch (error) {
      console.error("Error loading slots:", error);
    } finally {
      setIsLoading(false);
    }
  }, [doctor.id, selectedDate]);

  useEffect(() => {
    if (
      isOpen &&
      selectedDate &&
      (mode === "all-times" || mode === "time-selection")
    ) {
      loadAllSlots();
    }
  }, [isOpen, selectedDate, mode, loadAllSlots]);

  const handleTimeSelect = (time: string) => {
    setBookingData((prev) => ({ ...prev, selectedTime: time }));
    if (mode === "quick-book") {
      setCurrentStep("contact-info");
    } else {
      setCurrentStep("confirm-booking");
    }
  };

  const handleBookingConfirm = () => {
    const selectedClinic = doctor.clinics.find(
      (dc) => dc.clinic.name === bookingData.selectedClinicId
    );

    // Here you would typically make an API call to create the appointment
    console.log("Booking confirmed:", {
      doctorId: doctor.id,
      date: selectedDate,
      time: bookingData.selectedTime,
      clinic: {
        name: selectedClinic?.clinic.name || primaryClinic?.name,
        address: selectedClinic?.clinic.address,
        city: selectedClinic?.clinic.city,
      },
      patient: {
        name: bookingData.patientName,
        phone: bookingData.patientPhone,
        email: bookingData.patientEmail,
        notes: bookingData.notes,
      },
    });

    // Show success message and close modal
    alert(
      `¡Cita agendada exitosamente en ${
        selectedClinic?.clinic.name || primaryClinic?.name
      }! Te contactaremos pronto para confirmar los detalles.`
    );
    onClose();
    setCurrentStep("select-time");
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
              {mode === "quick-book"
                ? "Agendar Cita Rápida"
                : mode === "all-times"
                ? "Todos los Horarios"
                : "Seleccionar Horario"}
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
          {/* Doctor Summary */}
          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  {primarySpeciality}
                </h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{primaryClinic?.city}</span>
                  </div>
                  {lowestPrice && (
                    <div className="flex items-center gap-1">
                      <CreditCard className="w-4 h-4" />
                      <span>Desde ${lowestPrice.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Current Step Content */}
          {currentStep === "select-time" && (
            <div>
              {selectedDate && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold text-gray-900">
                      {formatDate(selectedDate)}
                    </h4>
                  </div>
                </div>
              )}

              {isLoading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                  <p className="text-gray-600">
                    Cargando horarios disponibles...
                  </p>
                </div>
              ) : allSlots.length > 0 ? (
                <div>
                  <h5 className="font-medium text-gray-900 mb-3">
                    Horarios disponibles ({allSlots.length})
                  </h5>
                  <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto">
                    {allSlots.map((slot, index) => (
                      <button
                        key={index}
                        onClick={() => handleTimeSelect(slot.time)}
                        className="bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-400 py-3 px-4 rounded-lg text-center font-medium transition-colors"
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    No hay horarios disponibles para esta fecha
                  </p>
                </div>
              )}
            </div>
          )}

          {currentStep === "confirm-booking" && (
            <div>
              <div className="bg-green-50 rounded-xl p-4 mb-6">
                <h4 className="font-semibold text-green-900 mb-2">
                  Resumen de la Cita
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-green-600" />
                    <span>{formatDate(selectedDate!)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span>{bookingData.selectedTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-green-600" />
                    <span>
                      {doctor.clinics.find(
                        (dc) => dc.clinic.name === bookingData.selectedClinicId
                      )?.clinic.name || primaryClinic?.name}
                    </span>
                  </div>
                </div>
              </div>

              {/* Clinic Selection */}
              {doctor.clinics.length > 1 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Selecciona la ubicación para tu cita:
                  </label>
                  <div className="space-y-3">
                    {doctor.clinics.map((doctorClinic, index) => {
                      const clinicPricing = doctor.pricings.find(
                        (p) => p.clinic.name === doctorClinic.clinic.name
                      );
                      return (
                        <label
                          key={index}
                          className={`block p-4 border rounded-lg cursor-pointer transition-all ${
                            bookingData.selectedClinicId ===
                            doctorClinic.clinic.name
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="clinic"
                            value={doctorClinic.clinic.name}
                            checked={
                              bookingData.selectedClinicId ===
                              doctorClinic.clinic.name
                            }
                            onChange={(e) =>
                              setBookingData((prev) => ({
                                ...prev,
                                selectedClinicId: e.target.value,
                              }))
                            }
                            className="sr-only"
                          />
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h5 className="font-medium text-gray-900">
                                {doctorClinic.clinic.name}
                              </h5>
                              <p className="text-sm text-gray-600 mt-1">
                                <MapPin className="w-3 h-3 inline mr-1" />
                                {doctorClinic.clinic.city}
                                {doctorClinic.clinic.address &&
                                  ` • ${doctorClinic.clinic.address}`}
                              </p>
                            </div>
                            {clinicPricing && (
                              <div className="ml-4 text-right">
                                <p className="text-sm font-medium text-gray-900">
                                  $
                                  {Number(clinicPricing.price).toLocaleString()}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {clinicPricing.currency}
                                </p>
                              </div>
                            )}
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setCurrentStep("contact-info")}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-medium transition-colors"
                >
                  Confirmar Cita
                </button>
                <button
                  onClick={() => setCurrentStep("select-time")}
                  className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors"
                >
                  Cambiar Hora
                </button>
              </div>
            </div>
          )}

          {currentStep === "contact-info" && (
            <div>
              {/* Appointment Summary */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h5 className="font-medium text-gray-900 mb-2">Tu cita:</h5>
                <div className="text-sm text-gray-700 space-y-1">
                  <p>
                    <strong>Fecha:</strong> {formatDate(selectedDate!)}
                  </p>
                  <p>
                    <strong>Hora:</strong> {bookingData.selectedTime}
                  </p>
                  <p>
                    <strong>Ubicación:</strong>{" "}
                    {doctor.clinics.find(
                      (dc) => dc.clinic.name === bookingData.selectedClinicId
                    )?.clinic.name || primaryClinic?.name}
                  </p>
                </div>
              </div>

              <h4 className="font-semibold text-gray-900 mb-4">
                Información de Contacto
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    value={bookingData.patientName}
                    onChange={(e) =>
                      setBookingData((prev) => ({
                        ...prev,
                        patientName: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    value={bookingData.patientPhone}
                    onChange={(e) =>
                      setBookingData((prev) => ({
                        ...prev,
                        patientPhone: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+591 70123456"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={bookingData.patientEmail}
                    onChange={(e) =>
                      setBookingData((prev) => ({
                        ...prev,
                        patientEmail: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notas adicionales
                  </label>
                  <textarea
                    value={bookingData.notes}
                    onChange={(e) =>
                      setBookingData((prev) => ({
                        ...prev,
                        notes: e.target.value,
                      }))
                    }
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Motivo de la consulta, síntomas, etc. (opcional)"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleBookingConfirm}
                    disabled={
                      !bookingData.patientName || !bookingData.patientPhone
                    }
                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-6 rounded-xl font-medium transition-colors"
                  >
                    Confirmar Reserva
                  </button>
                  <button
                    onClick={() => setCurrentStep("confirm-booking")}
                    className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors"
                  >
                    Volver
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
