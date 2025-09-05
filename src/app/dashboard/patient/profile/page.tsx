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
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold">
                {patient.user.firstName[0]}
                {patient.user.lastName[0]}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">Editar Perfil</h1>
              <p className="text-green-100">
                {patient.user.firstName} {patient.user.lastName}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PatientProfileForm patient={patient} />
      </div>
    </div>
  );
}
