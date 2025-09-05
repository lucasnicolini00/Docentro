import { requireDoctor } from "@/lib/auth-guards";
import { getDoctorDashboard } from "@/lib/actions/doctors";
import { Navbar } from "@/components/ui/navigation";

export default async function DoctorDashboard() {
  // Ensure user is authenticated as a doctor
  await requireDoctor();

  // Get doctor dashboard data using Server Action
  const result = await getDoctorDashboard();

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

  const { doctor, session } = result.data;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                Bienvenido Dr. {session.user.name}
              </h1>
              <p className="mt-2 text-blue-100">
                Panel de control médico -{" "}
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
                    <p className="text-sm text-blue-100">Especialista Médico</p>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Today's Appointments */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">📅</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Citas Hoy</p>
                <p className="text-2xl font-bold text-gray-900">
                  {doctor?.appointments.filter(
                    (apt) =>
                      new Date(apt.datetime).toDateString() ===
                      new Date().toDateString()
                  ).length || 0}
                </p>
              </div>
            </div>
          </div>

          {/* Total Appointments */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">🗓️</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Citas</p>
                <p className="text-2xl font-bold text-gray-900">
                  {doctor?.appointments.length || 0}
                </p>
              </div>
            </div>
          </div>

          {/* Specialties */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">🩺</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Especialidades
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {doctor?.specialities.length || 0}
                </p>
              </div>
            </div>
          </div>

          {/* Profile Completion */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 bg-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">👤</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Perfil</p>
                <a
                  href="/dashboard/doctor/profile"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Editar →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Upcoming Appointments */}
          <div className="space-y-6">
            {doctor?.appointments && doctor.appointments.length > 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Próximas Citas
                  </h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {doctor.appointments.slice(0, 5).map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-medium">
                              {appointment.patient.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {appointment.patient.name}{" "}
                              {appointment.patient.surname}
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
                        <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          Confirmada
                        </span>
                      </div>
                    ))}
                  </div>
                  {doctor.appointments.length > 5 && (
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
                <p className="text-gray-500">
                  Las nuevas citas aparecerán aquí
                </p>
              </div>
            )}
          </div>

          {/* Right Column - Profile & Specialties */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">
                  Mi Perfil
                </h2>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="h-16 w-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {session.user.name?.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Dr. {session.user.name}
                    </h3>
                    <p className="text-gray-500">{session.user.email}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Estado</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      Activo
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Especialidades
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {doctor?.specialities.length || 0}
                    </span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <a
                    href="/dashboard/doctor/profile"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors text-center block"
                  >
                    Editar Perfil
                  </a>
                </div>
              </div>
            </div>

            {/* Specialties */}
            {doctor?.specialities && doctor.specialities.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Mis Especialidades
                  </h2>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {doctor.specialities.map((ds) => (
                      <div
                        key={ds.specialityId}
                        className="flex items-center justify-between p-3 bg-purple-50 rounded-lg"
                      >
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {ds.speciality.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {ds.speciality.description}
                          </p>
                        </div>
                        <span className="text-purple-600">🩺</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
