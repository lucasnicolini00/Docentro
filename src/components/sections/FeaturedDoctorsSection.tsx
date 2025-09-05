import { getFeaturedDoctors } from "@/lib/actions/search";
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

export default async function FeaturedDoctorsSection() {
  // Fetch real data from database using Server Action
  const result = await getFeaturedDoctors();
  const doctors: DoctorWithRelations[] = result.success
    ? result.data || []
    : [];

  return (
    <section
      id="profesionales"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Profesionales Destacados
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Conoce a algunos de nuestros mejores especialistas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor) => {
            const avgRating =
              doctor.opinions.length > 0
                ? doctor.opinions.reduce(
                    (sum, opinion) => sum + opinion.rating,
                    0
                  ) / doctor.opinions.length
                : 0;

            const primarySpeciality =
              doctor.specialities[0]?.speciality?.name || "Especialista";
            const location =
              doctor.clinics[0]?.clinic?.city || "Ubicación no especificada";

            return (
              <div
                key={doctor.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Doctor Image Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500">
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-16 h-16 rounded-full bg-white bg-opacity-90 flex items-center justify-center text-2xl">
                        👨‍⚕️
                      </div>
                      <div className="text-white">
                        <h3 className="text-xl font-bold">
                          {doctor.name} {doctor.surname}
                        </h3>
                        <p className="text-blue-100">{primarySpeciality}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Doctor Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex text-yellow-400">
                        {"★".repeat(Math.round(avgRating))}
                        {"☆".repeat(5 - Math.round(avgRating))}
                      </div>
                      <span className="text-gray-600 text-sm">
                        {avgRating > 0 ? avgRating.toFixed(1) : "N/A"}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {doctor.opinions.length} opiniones
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center text-gray-600 mb-2">
                      <span className="mr-2">📍</span>
                      <span className="text-sm">{location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="mr-2">💰</span>
                      <span className="text-sm">Desde $150 consulta</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl transition-colors font-medium cursor-pointer">
                      Ver Perfil
                    </button>
                    <button className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 px-4 rounded-xl transition-colors font-medium cursor-pointer">
                      Agendar Cita
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 cursor-pointer">
            Ver Todos los Profesionales
          </button>
        </div>
      </div>
    </section>
  );
}
