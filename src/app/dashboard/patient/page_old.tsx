import { requirePatient } from "@/lib/auth-guards";
import prisma from "@/lib/prisma";
import Navbar from "@/components/navbar";

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
                Tu portal de salud personal - {new Date().toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
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
                <p className="text-sm font-medium text-gray-600">Próximas Citas</p>
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
              {/* User Info Card */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {session.user.name?.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Información Personal
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {session.user.email}
                        </dd>
                        <dd className="text-sm text-gray-500">
                          Role: {session.user.role}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upcoming Appointments Card */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">📅</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Próximas Citas
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {upcomingAppointments.length}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              {/* Past Appointments Card */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 bg-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">📋</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Historial
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {pastAppointments.length}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Patient Profile */}
            {patient && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Mi Perfil
                </h2>
                <div className="bg-white shadow rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Nombre
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {patient.name} {patient.surname}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {patient.email}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Teléfono
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {patient.phone}
                      </p>
                    </div>
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
                        Género
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {patient.gender}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Upcoming Appointments */}
            {upcomingAppointments.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Próximas Citas
                </h2>
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="px-6 py-4">
                    {upcomingAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="border-b border-gray-200 py-4 last:border-b-0"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">
                              Dr. {appointment.doctor.name}{" "}
                              {appointment.doctor.surname}
                            </p>
                            <p className="text-sm text-gray-500">
                              {appointment.datetime.toLocaleDateString()} -{" "}
                              {appointment.datetime.toLocaleTimeString()}
                            </p>
                            <p className="text-sm text-gray-500">
                              {appointment.clinic.name}
                            </p>
                          </div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Próxima
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Acciones Rápidas
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href="/search"
                  className="block bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-4 text-center transition-colors"
                >
                  🔍 Buscar Doctores
                </a>
                <button className="bg-green-600 hover:bg-green-700 text-white rounded-lg p-4 transition-colors">
                  📅 Agendar Cita
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
