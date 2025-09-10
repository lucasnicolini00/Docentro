import { requireDoctor } from "@/lib/auth-guards";
import { getDoctorAppointments } from "@/lib/actions/appointments";
import DoctorAppointmentList from "./components/DoctorAppointmentList";
import { validateDoctor } from "@/lib/actions/utils";

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
  const organizedAppointments = {
    pending: appointments.filter((apt) => apt.status === "PENDING"),
    today: appointments.filter((apt) => {
      const today = new Date();
      const aptDate = new Date(apt.datetime);
      return aptDate.toDateString() === today.toDateString();
    }),
    upcoming: appointments.filter((apt) => {
      const today = new Date();
      const aptDate = new Date(apt.datetime);
      return aptDate > today && apt.status === "CONFIRMED";
    }),
    completed: appointments.filter((apt) => apt.status === "COMPLETED"),
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
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            Nueva Cita
          </button>
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
            <div className="h-12 w-12 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completadas</p>
              <p className="text-2xl font-bold text-gray-900">
                {organizedAppointments.completed.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-red-500 rounded-lg flex items-center justify-center">
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
      </div>

      {/* Appointment Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <DoctorAppointmentList
            appointments={organizedAppointments.pending}
            title="Citas Pendientes de Confirmación"
          />

          <DoctorAppointmentList
            appointments={organizedAppointments.today}
            title="Citas de Hoy"
          />
        </div>

        <div className="space-y-6">
          <DoctorAppointmentList
            appointments={organizedAppointments.upcoming}
            title="Próximas Citas"
          />
        </div>
      </div>

      {/* Coming Soon Message */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-center space-x-3">
          <div className="text-blue-600">ℹ️</div>
          <div>
            <h3 className="text-sm font-medium text-blue-800">
              Vista completa de citas
            </h3>
            <p className="text-sm text-blue-700 mt-1">
              La vista completa con filtros y gestión avanzada estará disponible
              próximamente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
