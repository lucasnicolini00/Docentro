import { requirePatient } from "@/lib/auth-guards";
import { getPatientDashboard } from "@/lib/actions/patients";
import { AppointmentList } from "@/components/features";
import { Navbar } from "@/components/ui/navigation";

export default async function PatientAppointments() {
  await requirePatient();

  // Get patient data with appointments
  const result = await getPatientDashboard();

  if (!result.success || !result.data) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Error al cargar las citas
            </h1>
            <p className="text-gray-600">{result.error}</p>
          </div>
        </div>
      </div>
    );
  }

  const { upcomingAppointments, pastAppointments } = result.data;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mis Citas</h1>
                <p className="text-gray-600 mt-2">
                  Ve y gestiona todas tus citas médicas.
                </p>
              </div>
              <a
                href="/search"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Buscar Doctores
              </a>
            </div>
          </div>

          {/* Upcoming Appointments */}
          {upcomingAppointments.length > 0 ? (
            <AppointmentList
              appointments={upcomingAppointments}
              title="Próximas Citas"
              showActions={true}
            />
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <div className="text-center">
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
          )}

          {/* Past Appointments */}
          {pastAppointments.length > 0 && (
            <AppointmentList
              appointments={pastAppointments}
              title="Historial de Citas"
              showActions={false}
            />
          )}
        </div>
      </div>
    </div>
  );
}
