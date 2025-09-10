import { requireDoctor } from "@/lib/auth-guards";
import { getDoctorProfile, getAllSpecialities } from "@/lib/actions/doctors";
import { DoctorProfileForm } from "@/components/ui/forms";
import DoctorSettingsPanel from "./components/DoctorSettingsPanel";

export default async function DoctorProfilePage() {
  // Ensure user is authenticated as a doctor
  await requireDoctor();

  // Get doctor data and specialities using Server Actions
  const [doctorResult, specialitiesResult] = await Promise.all([
    getDoctorProfile(),
    getAllSpecialities(),
  ]);

  if (!doctorResult.success || !doctorResult.data) {
    return (
      <div className="min-h-screen bg-gray-50">
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

  if (!specialitiesResult.success || !specialitiesResult.data) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Error al cargar especialidades
            </h1>
          </div>
        </div>
      </div>
    );
  }

  const doctor = doctorResult.data;
  const allSpecialities = specialitiesResult.data;

  return (
    <div className="min-h-screen bg-gray-50">
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
        <div className="space-y-8">
          {/* Profile Form */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Información del Perfil
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Actualiza tu información profesional y personal
              </p>
            </div>
            <div className="p-6">
              <DoctorProfileForm
                doctor={doctor}
                allSpecialities={allSpecialities}
              />
            </div>
          </div>

          {/* Settings Management */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Configuración de la Cuenta
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Gestiona tus preferencias y configuraciones del sistema
              </p>
            </div>
            <div className="p-6">
              <DoctorSettingsPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
