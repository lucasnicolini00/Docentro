import { Clock } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLocalePath } from "@/hooks";
import { Doctor, DayInfo } from "./types";

interface TimeSlotGridProps {
  availableSlots: Array<{ datetime: string; time: string; clinicId: string }>;
  isLoading: boolean;
  selectedDate: string;
  onSelectTime: (time: string) => void;
  doctor: Doctor;
  selectedClinicId: string;
  allDays: DayInfo[];
  onOpenModal: (mode: "quick-book") => void;
}

export function TimeSlotGrid({
  availableSlots,
  isLoading,
  selectedDate,
  onSelectTime,
  doctor,
  selectedClinicId,
  allDays,
  onOpenModal,
}: TimeSlotGridProps) {
  const t = useTranslations("search");
  const localePath = useLocalePath();

  return (
    <>
      {/* Time Slots - Flexible content area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1">
          {!selectedDate ? (
            <div className="text-center py-8">
              <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">{t("selectDatePrompt")}</p>
            </div>
          ) : isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mb-2"></div>
              <p className="text-sm text-gray-500">{t("loadingTimes")}</p>
            </div>
          ) : (
            (() => {
              // Filter slots by selected clinic
              const slotsForClinic = availableSlots.filter(
                (slot) => slot.clinicId === selectedClinicId
              );
              const slotsToShow =
                slotsForClinic.length > 0 ? slotsForClinic : availableSlots;
              return slotsToShow.length > 0 ? (
                <div>
                  <p className="text-sm text-gray-600 mb-3">
                    {t("availableTimesFor", {
                      day:
                        allDays.find((d) => d.date === selectedDate)?.dayName ??
                        "",
                      clinic:
                        doctor.clinics.find(
                          (c) => c.clinic.id === selectedClinicId
                        )?.clinic.name ?? "",
                    })}
                  </p>
                  <div className="grid grid-cols-2 gap-2 max-h-36 rounded-lg border border-gray-200 overflow-y-auto p-2">
                    {slotsToShow.map((slot, index) => (
                      <button
                        key={index}
                        onClick={() => onSelectTime(slot.time)}
                        className="bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-400 py-2 px-3 rounded-lg text-center text-sm font-medium transition-colors"
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 mb-2">
                    {t("noTimesFor", {
                      clinic:
                        doctor.clinics.find(
                          (c) => c.clinic.id === selectedClinicId
                        )?.clinic.name ?? "",
                    })}
                  </p>
                  <Link
                    href={localePath(`/doctor/${doctor.id}`)}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {t("viewOtherDates")}
                  </Link>
                </div>
              );
            })()
          )}
        </div>
      </div>

      {/* Quick Book Button - Fixed at bottom, aligned with Ver Perfil Completo */}
      <div className="mt-auto pt-4">
        {selectedDate && availableSlots.length > 0 ? (
          <button
            onClick={() => onOpenModal("quick-book")}
            className="block w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl transition-colors font-medium text-center"
          >
            {t("quickBookCta")}
          </button>
        ) : (
          <button
            disabled
            className="block w-full bg-gray-100 text-gray-400 py-3 px-4 rounded-xl font-medium text-center cursor-not-allowed"
          >
            {t("quickBookCta")}
          </button>
        )}
      </div>
    </>
  );
}
