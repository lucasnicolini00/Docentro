"use client";

import { getAllDoctors, searchDoctors } from "@/lib/actions/search";
import DoctorCard from "./components/DoctorCard";
import { Map, MapModal } from "@/components/ui";
import { Navbar } from "@/components/ui/navigation";
import SearchFilters from "./components/SearchFilters";
import { useState, useEffect } from "react";
import type {
  Doctor,
  DoctorSpeciality,
  Speciality,
  Opinion,
  DoctorClinic,
  Clinic,
  Pricing,
  Experience,
} from "@prisma/client";

type DoctorWithRelations = Doctor & {
  specialities: (DoctorSpeciality & {
    speciality: Speciality;
  })[];
  opinions: (Opinion & {
    id: string;
    rating: number;
    title?: string | null;
    description?: string | null;
  })[];
  clinics: (DoctorClinic & {
    clinic: Clinic;
  })[];
  pricings: (Pricing & {
    clinic: {
      id: string;
      name: string;
    };
  })[];
  experiences: (Experience & {
    id: string;
    title: string;
    institution?: string | null;
    startDate?: Date | null;
    endDate?: Date | null;
  })[];
};

// Serialized version with Decimal converted to number
type SerializedDoctorWithRelations = Omit<DoctorWithRelations, "pricings"> & {
  pricings: (Omit<Pricing, "amount"> & {
    amount: number;
    clinic: {
      id: string;
      name: string;
    };
  })[];
};

interface SearchProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function Search({ searchParams }: SearchProps) {
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [doctors, setDoctors] = useState<SerializedDoctorWithRelations[]>([]);
  const [specialty, setSpecialty] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Parse search parameters
  useEffect(() => {
    async function parseParams() {
      const params = await searchParams;
      const specialtyParam = Array.isArray(params.specialty)
        ? params.specialty[0]
        : params.specialty || "";
      const locationParam = Array.isArray(params.location)
        ? params.location[0]
        : params.location || "";

      setSpecialty(specialtyParam);
      setLocation(locationParam);
    }
    parseParams();
  }, [searchParams]);

  // Fetch doctors based on search criteria
  useEffect(() => {
    async function fetchDoctors() {
      setLoading(true);
      setError(null);

      try {
        let result;
        if (specialty || location) {
          result = await searchDoctors(specialty, location);
        } else {
          result = await getAllDoctors();
        }

        if (result.success) {
          setDoctors(result.data);
        } else {
          setError(result.error || "Error al cargar los doctores");
        }
      } catch {
        setError("Error al cargar los doctores");
      } finally {
        setLoading(false);
      }
    }

    fetchDoctors();
  }, [specialty, location]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-900">
              Buscando profesionales...
            </h2>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Center Column - Doctors List */}
          <div className="lg:col-span-2">
            {/* Sort Options */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Profesionales Disponibles
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Ordenar por:</span>
                  <select className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Más relevantes</option>
                    <option>Mejor valorados</option>
                    <option>Menor precio</option>
                    <option>Más cercanos</option>
                  </select>
                </div>
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

          {/* Right Column - Map */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Ubicaciones
                  </h3>

                  {/* Map Component - Adjusted size for 3-column layout */}
                  <div className="h-[400px] lg:h-[500px]">
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
                    <div className="space-y-1 text-xs flex flex-row flex-wrap gap-2">
                      <div className="flex items-center ">
                        <div className="w-2 h-2 mr-1 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-600">Clínicas</span>
                      </div>
                      <div className="flex items-center ">
                        <div className="w-2 h-2 mr-1 bg-green-500 rounded-full"></div>
                        <span className="text-gray-600">Consultorios</span>
                      </div>
                      <div className="flex items-center ">
                        <div className="w-2 h-2 mr-1 bg-purple-500 rounded-full"></div>
                        <span className="text-gray-600">Online</span>
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
