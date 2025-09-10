import { requirePatient } from "@/lib/auth-guards";
import { getPatientDashboard } from "@/lib/actions/patients";
import { Navbar } from "@/components/ui/navigation";
import AppointmentList from "./components/AppointmentList";

export default async function PatientDashboard() {
  // Ensure user is authenticated as a patient
  await requirePatient();

  // Get patient dashboard data using Server Action
  const result = await getPatientDashboard();

  if (!result.success || !result.data) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Error al cargar el dashboard
            </h1>
            <p className="text-gray-600">{result.error}</p>
          </div>
        </div>
      </div>
    );
  }

  const { patient, upcomingAppointments, pastAppointments, session } =
    result.data;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                Bienvenido/a {session.user.name}
              </h1>
              <p className="mt-2 text-green-100">
                Tu portal de salud personal -{" "}
                {new Date().toLocaleDateString("es-ES", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold">
                      {session.user.name?.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{session.user.name}</p>
                    <p className="text-sm text-green-100">Paciente</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Upcoming Appointments */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">📅</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Próximas Citas
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {upcomingAppointments.length}
                </p>
              </div>
            </div>
          </div>

          {/* Medical History */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">📋</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Historial</p>
                <p className="text-2xl font-bold text-gray-900">
                  {pastAppointments.length}
                </p>
              </div>
            </div>
          </div>

          {/* Profile Status */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">👤</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Perfil</p>
                <a
                  href="/dashboard/patient/profile"
                  className="text-sm font-medium text-green-600 hover:text-green-700"
                >
                  Editar →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Profile Information */}
          <div className="space-y-6">
            {/* Patient Profile Card */}
            {patient && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Mi Información Personal
                  </h2>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="h-16 w-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">
                        {session.user.name?.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {patient.name} {patient.surname}
                      </h3>
                      <p className="text-gray-500">{patient.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Teléfono
                        </label>
                        <p className="mt-1 text-sm text-gray-900">
                          {patient.phone || "No especificado"}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Género
                        </label>
                        <p className="mt-1 text-sm text-gray-900">
                          {patient.gender || "No especificado"}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Fecha de Nacimiento
                        </label>
                        <p className="mt-1 text-sm text-gray-900">
                          {patient.birthdate
                            ? patient.birthdate.toLocaleDateString()
                            : "No especificada"}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Estado
                        </label>
                        <span className="mt-1 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          Activo
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <a
                      href="/dashboard/patient/profile"
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors text-center block"
                    >
                      Editar Perfil
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">
                  Acciones Rápidas
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 gap-4">
                  <a
                    href="/search"
                    className="flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-white">🔍</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Buscar Doctores
                        </p>
                        <p className="text-sm text-gray-500">
                          Encuentra especialistas
                        </p>
                      </div>
                    </div>
                    <span className="text-blue-600 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </a>

                  <button className="flex items-center justify-between p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-green-500 rounded-lg flex items-center justify-center">
                        <span className="text-white">📅</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Agendar Cita
                        </p>
                        <p className="text-sm text-gray-500">
                          Nueva consulta médica
                        </p>
                      </div>
                    </div>
                    <span className="text-green-600 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Appointments */}
          <div className="space-y-6">
            {/* Upcoming Appointments */}
            <AppointmentList
              appointments={upcomingAppointments}
              title="Próximas Citas"
              showActions={true}
            />

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
    </div>
  );
}
