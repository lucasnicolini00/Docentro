"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@/components/ui/buttons";
import {
  createAppointment,
  getDoctorAvailability,
} from "@/lib/actions/appointments";
import { AppointmentType } from "@prisma/client";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

interface Doctor {
  id: string;
  name: string;
  surname: string;
  user: {
    firstName: string;
    lastName: string;
  };
  specialities: Array<{
    speciality: {
      id: string;
      name: string;
    };
  }>;
  clinics: Array<{
    clinic: {
      id: string;
      name: string;
      address: string;
    };
  }>;
  pricings: Array<{
    id: string;
    consultationFee: number;
    clinic: {
      id: string;
      name: string;
    };
  }>;
}

interface AppointmentBookingFormProps {
  doctor: Doctor;
}

interface TimeSlot {
  datetime: string;
  time: string;
}

export default function AppointmentBookingForm({
  doctor,
}: AppointmentBookingFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("forms");

  // Form state
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedClinic, setSelectedClinic] = useState("");
  const [selectedPricing, setSelectedPricing] = useState("");
  const [appointmentType, setAppointmentType] = useState<AppointmentType>(
    AppointmentType.IN_PERSON
  );
  const [notes, setNotes] = useState("");
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Get minimum date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  // Get maximum date (3 months from now)
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    return maxDate.toISOString().split("T")[0];
  };

  // Handle date change and fetch available slots
  const handleDateChange = async (date: string) => {
    setSelectedDate(date);
    setSelectedTime("");
    setAvailableSlots([]);

    if (!date) return;

    setLoadingSlots(true);
    try {
      const result = await getDoctorAvailability(doctor.id, date);
      if (result.success) {
        setAvailableSlots(result.data || []);
      } else {
        toast.error(result.error || t("appointmentErrorFetchSlots"));
      }
    } catch {
      toast.error(t("appointmentErrorFetchSlots"));
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    // Add selected values to form data
    formData.append("doctorId", doctor.id);
    formData.append("datetime", selectedTime);
    formData.append("clinicId", selectedClinic);
    formData.append("pricingId", selectedPricing);
    formData.append("type", appointmentType);

    startTransition(async () => {
      try {
        const result = await createAppointment(formData);

        if (!result.success) {
          toast.error(result.error || t("appointmentErrorCreate"));
          return;
        }

        toast.success(t("appointmentSuccessCreate"));
      } catch {
        toast.error(t("appointmentErrorCreate"));
      }
    });
  };

  // Get pricing for selected clinic
  const selectedClinicPricing = doctor.pricings.filter(
    (pricing) => pricing.clinic.id === selectedClinic
  );

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t("appointmentTitle")}
        </h2>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-lg font-semibold text-blue-600">
              {doctor.user.firstName[0]}
              {doctor.user.lastName[0]}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {doctor.user.firstName} {doctor.user.lastName}
            </h3>
            <p className="text-sm text-gray-600">
              {doctor.specialities.map((s) => s.speciality.name).join(", ")}
            </p>
          </div>
        </div>
      </div>

      <form action={handleSubmit} className="space-y-6">
        {/* Date Selection */}
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {t("appointmentDateLabel")}
          </label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={(e) => handleDateChange(e.target.value)}
            min={getMinDate()}
            max={getMaxDate()}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Time Selection */}
        {selectedDate && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("appointmentTimeLabel")}
            </label>
            {loadingSlots ? (
              <div className="text-center py-4">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <p className="text-sm text-gray-600 mt-2">
                  {t("appointmentTimeLoading")}
                </p>
              </div>
            ) : availableSlots.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {availableSlots.map((slot) => (
                  <button
                    key={slot.datetime}
                    type="button"
                    onClick={() => setSelectedTime(slot.datetime)}
                    className={`p-2 text-sm rounded-md border transition-colors ${
                      selectedTime === slot.datetime
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                    }`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-600 py-4">
                {t("appointmentTimeNone")}
              </p>
            )}
          </div>
        )}

        {/* Clinic Selection */}
        <div>
          <label
            htmlFor="clinic"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {t("appointmentClinicLabel")}
          </label>
          <select
            id="clinic"
            value={selectedClinic}
            onChange={(e) => {
              setSelectedClinic(e.target.value);
              setSelectedPricing("");
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">{t("appointmentClinicSelect")}</option>
            {doctor.clinics.map((clinic) => (
              <option key={clinic.clinic.id} value={clinic.clinic.id}>
                {clinic.clinic.name} - {clinic.clinic.address}
              </option>
            ))}
          </select>
        </div>

        {/* Pricing Selection */}
        {selectedClinic && selectedClinicPricing.length > 0 && (
          <div>
            <label
              htmlFor="pricing"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t("appointmentPricingLabel")}
            </label>
            <select
              id="pricing"
              value={selectedPricing}
              onChange={(e) => setSelectedPricing(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">{t("appointmentPricingSelect")}</option>
              {selectedClinicPricing.map((pricing) => (
                <option key={pricing.id} value={pricing.id}>
                  {t("appointmentPricingOptionPrefix")} - $
                  {pricing.consultationFee.toLocaleString()}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Appointment Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("appointmentTypeLabel")}
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value={AppointmentType.IN_PERSON}
                checked={appointmentType === AppointmentType.IN_PERSON}
                onChange={(e) =>
                  setAppointmentType(e.target.value as AppointmentType)
                }
                className="mr-3"
              />
              {t("appointmentTypeInPerson")}
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value={AppointmentType.ONLINE}
                checked={appointmentType === AppointmentType.ONLINE}
                onChange={(e) =>
                  setAppointmentType(e.target.value as AppointmentType)
                }
                className="mr-3"
              />
              {t("appointmentTypeOnline")}
            </label>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {t("appointmentNotesLabel")}
          </label>
          <textarea
            id="notes"
            name="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={t("appointmentNotesPlaceholder")}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {t("patientProfileCancel")}
          </button>
          <LoadingButton
            type="submit"
            isLoading={isPending}
            loadingText={t("appointmentSubmitting")}
            variant="primary"
            size="lg"
            disabled={
              !selectedDate ||
              !selectedTime ||
              !selectedClinic ||
              !selectedPricing
            }
          >
            {t("appointmentSubmit")}
          </LoadingButton>
        </div>
      </form>
    </div>
  );
}
