import { requireDoctor } from "@/lib/auth-guards";
import prisma from "@/lib/prisma";
import { Navbar } from "@/components/ui/navigation";
import { DoctorProfileForm } from "@/components/ui/forms";

export default async function DoctorProfilePage() {
  const session = await requireDoctor();

  // Get doctor data with all related information
  const doctor = await prisma.doctor.findUnique({
    where: { id: session.user.doctorId! },
    include: {
      user: true,
      specialities: {
        include: {
          speciality: true,
        },
      },
      experiences: true,
      clinics: {
        include: {
          clinic: true,
        },
      },
    },
  });

  // Get all available specialties for the select dropdown
  const allSpecialities = await prisma.speciality.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Doctor no encontrado
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Editar Perfil
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Actualiza tu información profesional y personal
              </p>
            </div>
            <a
              href="/dashboard/doctor"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
            >
              ← Volver al Dashboard
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <DoctorProfileForm doctor={doctor} allSpecialities={allSpecialities} />
      </div>
    </div>
  );
}
