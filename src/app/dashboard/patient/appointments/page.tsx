import { requirePatient } from "@/lib/auth-guards";

export default async function PatientAppointments() {
  await requirePatient();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h1 className="text-2xl font-bold text-gray-900">Mis Citas</h1>
            <p className="text-gray-600 mt-2">
              Ve y gestiona todas tus citas médicas.
            </p>
          </div>

          {/* Patient view content */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No tienes citas programadas
              </h3>
              <p className="text-gray-500 mb-6">
                Busca doctores y programa tu primera cita médica.
              </p>
              <a
                href="/search"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors inline-block"
              >
                Buscar Doctores
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
