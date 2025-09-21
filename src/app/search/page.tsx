"use client";

import { getAllDoctors, searchDoctors } from "@/lib/actions/search";
import DoctorCard from "./components/DoctorCard";
import { Map, MapModal } from "@/components/ui";
import { Navbar } from "@/components/ui/navigation";
import SearchFilters from "./components/SearchFilters";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import type {
  Doctor,
  DoctorSpeciality,
  Speciality,
  Opinion,
  DoctorClinic,
  Clinic,
  Pricing,
} from "@prisma/client";

type DoctorWithRelations = Doctor & {
  specialities: (DoctorSpeciality & {
    speciality: Speciality;
  })[];
  opinions: Opinion[];
  clinics: (DoctorClinic & {
    clinic: Clinic;
  })[];
  pricings: (Pricing & {
    clinic: Clinic;
  })[];
};

// Serialized version with Decimal converted to number
type SerializedDoctorWithRelations = Omit<DoctorWithRelations, "pricings"> & {
  pricings: (Omit<Pricing, "price"> & {
    price: number;
    clinic: Clinic;
  })[];
};

interface SearchProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function Search({ searchParams }: SearchProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [doctors, setDoctors] = useState<SerializedDoctorWithRelations[]>([]);
  const [specialty, setSpecialty] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Load search parameters and doctors on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setError(null);

        // Await search parameters
        const params = (await searchParams) || {};

        // Get search parameters
        const specialtyParam =
          typeof params.specialty === "string" ? params.specialty : "";
        const locationParam =
          typeof params.location === "string" ? params.location : "";

        setSpecialty(specialtyParam);
        setLocation(locationParam);

        // Fetch doctors based on search parameters
        let result;
        if (specialtyParam || locationParam) {
          result = await searchDoctors(specialtyParam, locationParam);
        } else {
          result = await getAllDoctors();
        }

        if (result.success && result.data) {
          setDoctors(result.data as SerializedDoctorWithRelations[]);
        } else {
          setError(result.error || "Error al cargar los doctores");
        }
      } catch (error) {
        console.error("Error loading search data:", error);
        setError("Error al cargar los datos");
      }
    };

    loadData();
  }, [searchParams]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Error al buscar doctores
            </h1>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Search Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Encuentra tu Profesional Ideal
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-gray-600">
                  {doctors.length} profesionales encontrados
                </p>
                {(specialty || location) && (
                  <div className="flex items-center gap-2 ml-4">
                    {specialty && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Especialidad: {specialty}
                      </span>
                    )}
                    {location && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Ubicación: {location}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Search Filters */}
            <SearchFilters
              initialSpecialty={specialty}
              initialLocation={location}
            />
          </div>
        </div>
      </div>

      {/* Quick Filters Section - Floating */}
      <div className="relative">
        {/* Backdrop when filters are open */}
        {isFiltersOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-25 z-10 transition-opacity"
            onClick={() => setIsFiltersOpen(false)}
          />
        )}

        <div className="absolute top-0 left-0 right-0 z-20 bg-gray-50 border-b border-gray-200 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              {/* Filter Header - Always Visible */}
              <div
                className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Filter className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Filtros Rápidos
                    </h3>
                    <span className="text-sm text-gray-500">
                      (Click para {isFiltersOpen ? "ocultar" : "mostrar"})
                    </span>
                  </div>
                  {isFiltersOpen ? (
                    <ChevronUp className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  )}
                </div>
              </div>

              {/* Filter Content - Collapsible */}
              {isFiltersOpen && (
                <div className="px-6 pb-6 border-t border-gray-100 animate-in slide-in-from-top duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Especialidades
                      </label>
                      <div className="space-y-2">
                        {[
                          "Cardiología",
                          "Dermatología",
                          "Pediatría",
                          "Neurología",
                        ].map((specialtyOption) => (
                          <label
                            key={specialtyOption}
                            className="flex items-center"
                          >
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 text-blue-600 mr-2"
                            />
                            <span className="text-sm text-gray-700">
                              {specialtyOption}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Rango de Precio
                      </label>
                      <div className="space-y-2">
                        {[
                          "Hasta $10,000",
                          "$10,000 - $20,000",
                          "$20,000 - $50,000",
                          "Más de $50,000",
                        ].map((range) => (
                          <label key={range} className="flex items-center">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 text-blue-600 mr-2"
                            />
                            <span className="text-sm text-gray-700">
                              {range}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Disponibilidad
                      </label>
                      <div className="space-y-2">
                        {[
                          "Hoy",
                          "Esta semana",
                          "Este mes",
                          "Consulta online",
                        ].map((availability) => (
                          <label
                            key={availability}
                            className="flex items-center"
                          >
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 text-blue-600 mr-2"
                            />
                            <span className="text-sm text-gray-700">
                              {availability}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-6 rounded-lg transition-colors text-sm font-medium cursor-pointer">
                      Limpiar Filtros
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-300 ${
          isFiltersOpen ? "pt-80" : "pt-24"
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Doctors List Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Profesionales Disponibles
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Ordenar por:</span>
                <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Más relevantes</option>
                  <option>Mejor calificados</option>
                  <option>Menor precio</option>
                  <option>Más cercanos</option>
                </select>
              </div>
            </div>

            {/* Doctors Grid */}
            <div className="space-y-6">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor as any} />
              ))}
            </div>

            {doctors.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">👨‍⚕️</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No se encontraron profesionales
                </h3>
                <p className="text-gray-600">
                  Intenta ajustar tus filtros de búsqueda
                </p>
              </div>
            )}
          </div>

          {/* Map Section */}
          {/* Map Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Ubicaciones en el Mapa
                  </h3>

                  {/* Map Component - Made even taller */}
                  <div className="h-[500px] lg:h-[600px] xl:h-[700px]">
                    <Map
                      doctors={doctors}
                      onOpenModal={() => setIsMapModalOpen(true)}
                    />
                  </div>

                  {/* Map Legend */}
                  <div className="mt-4 space-y-2">
                    <h4 className="font-medium text-gray-900 text-sm">
                      Leyenda:
                    </h4>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-600">Clínicas</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-gray-600">Consultorios</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-gray-600">Atención Online</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Modal */}
      <MapModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        doctors={doctors}
        initialCenter={{ lat: -17.8146, lng: -63.1561 }}
      />
    </div>
  );
}
