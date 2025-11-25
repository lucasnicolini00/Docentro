import { MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLocalePath } from "@/hooks";
import { Doctor } from "./types";

interface ClinicInfoProps {
  doctor: Doctor;
  onOpenModal: (mode: "clinics-list") => void;
}

export function ClinicInfo({ doctor, onOpenModal }: ClinicInfoProps) {
  const t = useTranslations("search");
  const localePath = useLocalePath();

  const primaryClinic = doctor.clinics[0]?.clinic;
  const location = primaryClinic?.city || t("locationNotSpecified");
  const clinicName = primaryClinic?.name || t("clinicNotSpecified");
  const address = primaryClinic?.address || "";

  const lowestPrice =
    doctor.pricings.length > 0
      ? (() => {
          const validPrices = doctor.pricings
            .map((p) => Number(p.price))
            .filter((price) => !isNaN(price) && price > 0);
          return validPrices.length > 0 ? Math.min(...validPrices) : null;
        })()
      : null;

  return (
    <>
      {/* Location Info */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
        <div className="flex items-center gap-2 mb-3">
          <div
            className="p-1.5 bg-blue-100 rounded-full hover:bg-blue-200 cursor-pointer transition-colors"
            onClick={() => onOpenModal("clinics-list")}
          >
            <MapPin className="w-4 h-4 text-blue-600" />
          </div>
          <span
            className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors"
            onClick={() => onOpenModal("clinics-list")}
          >
            {doctor.clinics.length > 1
              ? t("locationsLabelPlural")
              : t("locationsLabelSingular")}
          </span>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
            {doctor.clinics.length}{" "}
            {doctor.clinics.length === 1
              ? t("clinicsCountSingular")
              : t("clinicsCountPlural")}
          </span>
        </div>
        {doctor.clinics.length > 1 ? (
          <div className="space-y-3">
            {doctor.clinics.slice(0, 2).map((doctorClinic, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100"
              >
                <div className="p-1.5 bg-green-100 rounded-full mt-0.5">
                  <MapPin className="w-3 h-3 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {doctorClinic.clinic.name}
                  </p>
                  <p className="text-xs text-gray-600 mt-0.5">
                    {doctorClinic.clinic.city}
                    {doctorClinic.clinic.address && (
                      <>
                        <span className="mx-1">•</span>
                        <span className="truncate block">
                          {doctorClinic.clinic.address}
                        </span>
                      </>
                    )}
                  </p>
                </div>
              </div>
            ))}
            {doctor.clinics.length > 2 && (
              <div className="text-center">
                <span
                  className="inline-flex items-center gap-1 text-xs text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 cursor-pointer transition-colors"
                  onClick={() => onOpenModal("clinics-list")}
                >
                  <MapPin className="w-3 h-3" />
                  {t("moreLocations", { count: doctor.clinics.length - 2 })}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100">
            <div className="p-1.5 bg-green-100 rounded-full mt-0.5">
              <MapPin className="w-3 h-3 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900">
                {clinicName}
              </p>
              <p className="text-xs text-gray-600 mt-0.5">
                {location}
                {address && (
                  <>
                    <span className="mx-1">•</span>
                    <span>{address}</span>
                  </>
                )}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Pricing */}
      {lowestPrice && (
        <div className="mb-6">
          <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
            <span className="text-gray-700 font-medium">
              {t("consultationFromLabel")}
            </span>
            <span className="font-bold text-xl text-green-600">
              ${lowestPrice.toLocaleString()}{" "}
              {doctor.pricings[0]?.currency || "ARS"}
            </span>
          </div>
        </div>
      )}

      {/* Spacer to push buttons to bottom */}
      <div className="flex-1"></div>

      {/* Action Buttons - Fixed at bottom */}
      <div className="space-y-3 mt-auto">
        <Link
          href={localePath(`/doctor/${doctor.id}`)}
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl transition-colors font-medium text-center"
        >
          {t("viewFullProfile")}
        </Link>

        {doctor.phone && (
          <button className="flex items-center justify-center gap-2 w-full text-gray-600 hover:text-gray-800 py-2 px-3 border border-gray-300 rounded-lg transition-colors">
            <Phone className="w-4 h-4" />
            <span className="text-sm font-medium">{t("callAction")}</span>
          </button>
        )}
      </div>
    </>
  );
}
