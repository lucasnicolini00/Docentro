import { getAllDoctors, searchDoctors } from "@/lib/data";
import { DoctorCard } from "@/components/features/doctor";
import { Navbar } from "@/components/ui/navigation";
import { SearchFilters } from "@/components/features/search";
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

interface SearchProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function Search({ searchParams }: SearchProps) {
  // Await search parameters
  const params = (await searchParams) || {};

  // Get search parameters
  const specialty =
    typeof params.specialty === "string" ? params.specialty : undefined;
  const location =
    typeof params.location === "string" ? params.location : undefined;

  // Fetch doctors based on search parameters
  const doctors: DoctorWithRelations[] =
    specialty || location
      ? await searchDoctors(specialty, location)
      : await getAllDoctors();

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
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
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Ubicaciones en el Mapa
                  </h3>

                  {/* Map Placeholder */}
                  <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <div className="text-4xl mb-3">🗺️</div>
                      <h4 className="font-semibold text-gray-700 mb-2">
                        Mapa Interactivo
                      </h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Aquí se mostrará la ubicación de las clínicas y
                        consultorios
                      </p>
                      <div className="text-xs text-gray-500">
                        Próximamente con Google Maps
                      </div>
                    </div>
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

              {/* Quick Filters */}
              <div className="mt-6 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Filtros Rápidos
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Especialidades
                    </label>
                    <div className="space-y-2">
                      {[
                        "Cardiología",
                        "Dermatología",
                        "Pediatría",
                        "Neurología",
                      ].map((specialty) => (
                        <label key={specialty} className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 mr-2"
                          />
                          <span className="text-sm text-gray-700">
                            {specialty}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
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
                          <span className="text-sm text-gray-700">{range}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Disponibilidad
                    </label>
                    <div className="space-y-2">
                      {[
                        "Hoy",
                        "Esta semana",
                        "Este mes",
                        "Consulta online",
                      ].map((availability) => (
                        <label key={availability} className="flex items-center">
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

                <button className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors text-sm font-medium cursor-pointer">
                  Limpiar Filtros
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
