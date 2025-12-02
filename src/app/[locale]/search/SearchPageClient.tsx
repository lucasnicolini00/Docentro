"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/ui/navigation";
// Dynamically import heavy map components to keep initial bundle small
const Map = dynamic(() => import("@/components/ui/Map"), { ssr: false });
const MapModal = dynamic(() => import("@/components/ui/MapModal"), {
  ssr: false,
});
import DoctorCard from "./components/DoctorCard";
import SearchFilters from "./components/SearchFilters";
import { useTranslations } from "next-intl";
import type { TransformedDoctorData } from "@/lib/types";

interface SearchPageClientProps {
  doctors: TransformedDoctorData[];
  initialSpecialty: string;
  initialLocation: string;
  specialties: string[];
  cities: string[];
}

export default function SearchPageClient({
  doctors,
  initialSpecialty,
  initialLocation,
  specialties,
  cities,
}: SearchPageClientProps) {
  const t = useTranslations("search");
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-gray-600">
                  {Array.isArray(doctors) ? doctors.length : 0} {t("results")}
                </p>
                {(initialSpecialty || initialLocation) && (
                  <div className="flex items-center gap-2 ml-4">
                    {initialSpecialty && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {t("specialtyLabel")}: {initialSpecialty}
                      </span>
                    )}
                    {initialLocation && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {t("locationLabel")}: {initialLocation}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
            <SearchFilters
              initialSpecialty={initialSpecialty}
              initialLocation={initialLocation}
              specialties={specialties}
              cities={cities}
            />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  {t("availableProfessionals")}
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{t("sortBy")}</span>
                  <select className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>{t("mostRelevant")}</option>
                    <option>{t("bestRated")}</option>
                    <option>{t("lowestPrice")}</option>
                    <option>{t("closest")}</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              {Array.isArray(doctors) &&
                doctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              {(!Array.isArray(doctors) || doctors.length === 0) && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">👨‍⚕️</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {t("noResults")}
                  </h3>
                  <p className="text-gray-600">{t("adjustFilters")}</p>
                </div>
              )}
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="p-3">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t("locations")}
                  </h3>
                  <div className="h-[400px] lg:h-[500px]">
                    <Map
                      doctors={Array.isArray(doctors) ? doctors : []}
                      onOpenModal={() => setIsMapModalOpen(true)}
                    />
                  </div>
                  <div className="mt-2 space-y-2">
                    <h4 className="font-medium text-gray-900 text-sm">
                      {t("legend")}
                    </h4>
                    <div className="space-y-1 text-xs flex flex-row flex-wrap gap-2">
                      <div className="flex items-center ">
                        <div className="w-2 h-2 mr-1 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-600">{t("clinics")}</span>
                      </div>
                      <div className="flex items-center ">
                        <div className="w-2 h-2 mr-1 bg-green-500 rounded-full"></div>
                        <span className="text-gray-600">
                          {t("consultingRooms")}
                        </span>
                      </div>
                      <div className="flex items-center ">
                        <div className="w-2 h-2 mr-1 bg-purple-500 rounded-full"></div>
                        <span className="text-gray-600">{t("online")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MapModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        doctors={Array.isArray(doctors) ? doctors : []}
        initialCenter={{ lat: -17.8146, lng: -63.1561 }}
      />
    </div>
  );
}
