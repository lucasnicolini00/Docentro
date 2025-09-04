import { requireDoctor } from "@/lib/auth-guards";
import prisma from "@/lib/prisma";

export default async function DoctorDashboard() {
  const session = await requireDoctor();

  // Get doctor data using the doctorId from session
  const doctor = await prisma.doctor.findUnique({
    where: { id: session.user.doctorId! },
    include: {
      appointments: {
        where: {
          datetime: {
            gte: new Date(), // Future appointments
          },
        },
        include: {
          patient: true,
          clinic: true,
        },
        orderBy: {
          datetime: "asc",
        },
      },
      specialities: {
        include: {
          speciality: true,
        },
      },
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              Bienvenido Dr. {session.user.name}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* User Info Card */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center">
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

              {/* Appointments Card */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">📅</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Próximas Citas
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {doctor?.appointments.length || 0}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              {/* Specialties Card */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 bg-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">🩺</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Especialidades
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {doctor?.specialities.length || 0}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Appointments */}
            {doctor?.appointments && doctor.appointments.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Próximas Citas
                </h2>
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="px-6 py-4">
                    {doctor.appointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="border-b border-gray-200 py-4 last:border-b-0"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">
                              {appointment.patient.name}{" "}
                              {appointment.patient.surname}
                            </p>
                            <p className="text-sm text-gray-500">
                              {appointment.datetime.toLocaleDateString()} -{" "}
                              {appointment.datetime.toLocaleTimeString()}
                            </p>
                            <p className="text-sm text-gray-500">
                              {appointment.clinic.name}
                            </p>
                          </div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Confirmada
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Specialties */}
            {doctor?.specialities && doctor.specialities.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Mis Especialidades
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {doctor.specialities.map((ds) => (
                    <div
                      key={ds.specialityId}
                      className="bg-white shadow rounded-lg p-4"
                    >
                      <h3 className="font-medium text-gray-900">
                        {ds.speciality.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {ds.speciality.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
