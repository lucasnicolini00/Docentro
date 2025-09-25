import { requireDoctor } from "@/lib/auth-guards";
import { getDoctorAppointments } from "@/lib/actions/appointments";
import { validateDoctor } from "@/lib/actions/utils";
import DoctorAppointmentList from "./components/DoctorAppointmentList";
import CollapsibleHistorySection from "./components/CollapsibleHistorySection";

export default async function DoctorAppointments() {
  await requireDoctor();

  // Get doctor from session
  const validation = await validateDoctor();
  if ("error" in validation) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Error al cargar las citas
            </h1>
            <p className="text-gray-600">{validation.error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Fetch real appointments using server action
  const appointments = await getDoctorAppointments(validation.doctor.id);

  // Organize appointments by status
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Start of today

  const now = new Date();
  now.setSeconds(0, 0); // Ignore seconds/milliseconds for comparison

  // Appointments whose time has passed (today or before) are considered historical

  const organizedAppointments = {
    pending: appointments.filter((apt) => {
      const aptDate = new Date(apt.datetime);
      return apt.status === "PENDING" && aptDate >= today && aptDate >= now;
    }),
    today: appointments.filter((apt) => {
      const aptDate = new Date(apt.datetime);
      return (
        aptDate.toDateString() === today.toDateString() &&
        apt.status !== "CANCELED" &&
        aptDate >= now
      );
    }),
    upcoming: appointments.filter((apt) => {
      const aptDate = new Date(apt.datetime);
      return aptDate > today && apt.status === "CONFIRMED";
    }),
    completed: appointments.filter((apt) => {
      const aptDate = new Date(apt.datetime);
      return apt.status === "COMPLETED" || aptDate < today;
    }),
    past: appointments.filter((apt) => {
      const aptDate = new Date(apt.datetime);
      return (
        aptDate < today &&
        apt.status !== "COMPLETED" &&
        apt.status !== "CANCELED"
      );
    }),
    // All historical appointments: any appointment in the past (including today if hour passed)
    historical: appointments.filter((apt) => {
      const aptDate = new Date(apt.datetime);
      return aptDate < now || apt.status === "CANCELED";
    }),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Mis Citas</h1>
            <p className="text-gray-600 mt-2">
              Gestiona todas tus citas médicas en un solo lugar.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">📅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Hoy</p>
              <p className="text-2xl font-bold text-gray-900">
                {organizedAppointments.today.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-yellow-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">⏳</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pendientes</p>
              <p className="text-2xl font-bold text-gray-900">
                {organizedAppointments.pending.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-indigo-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">📋</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Próximas</p>
              <p className="text-2xl font-bold text-gray-900">
                {organizedAppointments.upcoming.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Historial</p>
              <p className="text-2xl font-bold text-gray-900">
                {organizedAppointments.historical.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Lists */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <DoctorAppointmentList
              appointments={organizedAppointments.today}
              title="Citas de Hoy"
            />
            <DoctorAppointmentList
              appointments={organizedAppointments.pending}
              title="Citas Pendientes de Confirmación"
            />
          </div>

          <div className="space-y-6">
            {organizedAppointments.upcoming.length > 0 ? (
              <DoctorAppointmentList
                appointments={organizedAppointments.upcoming}
                title="Próximas Citas Confirmadas"
              />
            ) : (
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Próximas Citas Confirmadas
                  </h3>
                  <p className="text-sm text-gray-600">0 citas</p>
                </div>
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">📅</div>
                  <p className="text-gray-500">
                    No hay próximas citas confirmadas
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <CollapsibleHistorySection
          historicalAppointments={organizedAppointments.historical}
        />
      </div>
    </div>
  );
}
