import { requirePatient } from "@/lib/auth-guards";
import { getPatientProfile } from "@/lib/actions/patients";
import { PatientProfileForm } from "@/components/ui/forms";
import { User, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function PatientProfilePage() {
  // Ensure user is authenticated as a patient
  await requirePatient();

  // Get patient data using Server Action
  const result = await getPatientProfile();

  if (!result.success || !result.data) {
    return (
      <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <div className="text-center">
          <div className="bg-red-100 p-3 rounded-lg w-fit mx-auto mb-4">
            <User className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Perfil no encontrado
          </h2>
          <p className="text-gray-600 mb-4">
            No se pudo encontrar la información del paciente.
          </p>
          <Link
            href="/dashboard/patient"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const patient = result.data;

  return (
    <>
      {/* Header */}
      <div className="mb-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  Mi perfil
                </h1>
                <p className="text-gray-600 text-sm mt-1">
                  Gestiona tu información personal y médica
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6">
          <PatientProfileForm patient={patient} />
        </div>
      </div>
    </>
  );
}
