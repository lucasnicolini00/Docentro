import { requirePatient } from "@/lib/auth-guards";
import prisma from "@/lib/prisma";
import { Navbar } from "@/components/ui/navigation";

export default async function PatientDashboard() {
  const session = await requirePatient();

  // Get patient data using the patientId from session
  const patient = await prisma.patient.findUnique({
    where: { id: session.user.patientId! },
    include: {
      appointments: {
        include: {
          doctor: true,
          clinic: true,
        },
        orderBy: {
          datetime: "desc",
        },
      },
    },
  });

  const upcomingAppointments =
    patient?.appointments.filter(
      (appointment) => appointment.datetime > new Date()
    ) || [];

  const pastAppointments =
    patient?.appointments.filter(
      (appointment) => appointment.datetime <= new Date()
    ) || [];

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
            {upcomingAppointments.length > 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Próximas Citas
                  </h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {upcomingAppointments.slice(0, 3).map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-medium">
                              👨‍⚕️
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              Dr. {appointment.doctor.name}{" "}
                              {appointment.doctor.surname}
                            </p>
                            <p className="text-sm text-gray-500">
                              {appointment.datetime.toLocaleDateString()} -{" "}
                              {appointment.datetime.toLocaleTimeString()}
                            </p>
                            <p className="text-xs text-gray-400">
                              {appointment.clinic.name}
                            </p>
                          </div>
                        </div>
                        <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          Próxima
                        </span>
                      </div>
                    ))}
                  </div>
                  {upcomingAppointments.length > 3 && (
                    <div className="mt-4 text-center">
                      <a
                        href="#"
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Ver todas las citas →
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📅</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No hay citas programadas
                </h3>
                <p className="text-gray-500 mb-4">
                  ¿Necesitas agendar una consulta?
                </p>
                <a
                  href="/search"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Buscar Doctores
                </a>
              </div>
            )}

            {/* Recent Medical History */}
            {pastAppointments.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Historial Reciente
                  </h2>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {pastAppointments.slice(0, 3).map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-gray-600 text-sm">✓</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Dr. {appointment.doctor.name}{" "}
                              {appointment.doctor.surname}
                            </p>
                            <p className="text-xs text-gray-500">
                              {appointment.datetime.toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400">
                          Completada
                        </span>
                      </div>
                    ))}
                  </div>
                  {pastAppointments.length > 3 && (
                    <div className="mt-4 text-center">
                      <a
                        href="#"
                        className="text-gray-600 hover:text-gray-700 text-sm font-medium"
                      >
                        Ver historial completo →
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
