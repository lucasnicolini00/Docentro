import { requireDoctor } from "@/lib/auth-guards";
import { getDoctorDashboard } from "@/lib/actions/doctors";
import { DoctorAppointmentList } from "@/components/features";

export default async function DoctorDashboard() {
  // Ensure user is authenticated as a doctor
  await requireDoctor();

  // Get doctor dashboard data using Server Action
  const result = await getDoctorDashboard();

  if (!result.success || !result.data) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Error al cargar el dashboard
        </h1>
        <p className="text-gray-600">{result.error}</p>
      </div>
    );
  }

  const { doctor, session, stats, appointments } = result.data;

  return (
    <div className="space-y-6">
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
              <p className="text-2xl font-bold text-gray-900">{stats.today}</p>
            </div>
          </div>
        </div>

        {/* Pending Appointments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">⏳</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pendientes</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.pending}
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
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
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
                {stats.specialties}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Appointments */}
        <div className="space-y-6">
          {/* Pending Appointments that need attention */}
          <DoctorAppointmentList
            appointments={appointments.pending}
            title="Citas Pendientes"
          />

          {/* Today's Appointments */}
          {appointments.today.length > 0 && (
            <DoctorAppointmentList
              appointments={appointments.today}
              title="Citas de Hoy"
            />
          )}
        </div>

        {/* Right Column - Profile & Upcoming */}
        <div className="space-y-6">
          {/* Profile Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Mi Perfil</h2>
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
                  <span className="text-sm text-gray-600">Especialidades</span>
                  <span className="text-sm font-medium text-gray-900">
                    {stats.specialties}
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

          {/* Upcoming Appointments */}
          {appointments.upcoming.length > 0 && (
            <DoctorAppointmentList
              appointments={appointments.upcoming}
              title="Próximas Citas"
            />
          )}

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
  );
}
