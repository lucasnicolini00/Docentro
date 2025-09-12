import { requirePatient } from "@/lib/auth-guards";
import { getPatientProfile } from "@/lib/actions/patients";
import { PatientProfileForm } from "@/components/ui/forms";

export default async function PatientProfilePage() {
  // Ensure user is authenticated as a patient
  await requirePatient();

  // Get patient data using Server Action
  const result = await getPatientProfile();

  if (!result.success || !result.data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Perfil no encontrado
          </h1>
          <p className="text-gray-600">
            No se pudo encontrar la información del paciente.
          </p>
        </div>
      </div>
    );
  }

  const patient = result.data;

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
                Actualiza tu información personal y de contacto
              </p>
            </div>
            <a
              href="/dashboard/patient"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
            >
              ← Volver al Dashboard
            </a>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Información Personal
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Mantén actualizada tu información para una mejor experiencia
            </p>
          </div>
          <div className="p-6">
            <PatientProfileForm patient={patient} />
          </div>
        </div>
      </div>
    </div>
  );
}
