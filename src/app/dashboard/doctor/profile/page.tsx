import { requireDoctor } from "@/lib/auth-guards";
import { getDoctorProfile, getAllSpecialities } from "@/lib/actions/doctors";
import { DoctorProfileForm } from "@/components/ui/forms";
import DoctorSettingsPanel from "./components/DoctorSettingsPanel";
import { User, Settings, ArrowLeft, CheckCircle } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Enhanced Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                  Perfil Profesional
                </h1>
                <p className="mt-1 text-sm text-gray-600 flex items-center space-x-2">
                  <span>
                    Actualiza tu información profesional y configuraciones
                  </span>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </p>
              </div>
            </div>
            <a
              href="/dashboard/doctor"
              className="group flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-md"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Volver al Dashboard</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Profile Information Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Información del Perfil
                  </h2>
                  <p className="text-blue-100 mt-1">
                    Mantén actualizada tu información profesional y
                    especialidades
                  </p>
                </div>
              </div>
            </div>

            {/* Profile Stats Bar */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-4 border-b border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Perfil Completo
                    </p>
                    <p className="text-xs text-gray-500">
                      Información verificada
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Dr. {doctor.name} {doctor.surname}
                    </p>
                    <p className="text-xs text-gray-500">Nombre profesional</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Settings className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {doctor.specialities.length} Especialidad
                      {doctor.specialities.length !== 1 ? "es" : ""}
                    </p>
                    <p className="text-xs text-gray-500">Configuradas</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              <DoctorProfileForm
                doctor={doctor}
                allSpecialities={allSpecialities}
              />
            </div>
          </div>

          {/* Settings Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Settings className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Configuración de la Cuenta
                  </h2>
                  <p className="text-indigo-100 mt-1">
                    Personaliza tus preferencias y configuraciones del sistema
                  </p>
                </div>
              </div>
            </div>
            <div className="p-8">
              <DoctorSettingsPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
