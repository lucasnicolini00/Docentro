import { requireDoctor } from "@/lib/auth-guards";
import { DoctorAppointmentList } from "@/components/features";

export default async function DoctorAppointments() {
  await requireDoctor();

  // This would typically fetch all appointments
  const mockAppointments = {
    pending: [],
    today: [],
    upcoming: [],
    completed: [],
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
              <p className="text-2xl font-bold text-gray-900">5</p>
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
              <p className="text-2xl font-bold text-gray-900">8</p>
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
              <p className="text-2xl font-bold text-gray-900">142</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">❌</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Canceladas</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <DoctorAppointmentList
            appointments={mockAppointments.pending}
            title="Citas Pendientes de Confirmación"
          />

          <DoctorAppointmentList
            appointments={mockAppointments.today}
            title="Citas de Hoy"
          />
        </div>

        <div className="space-y-6">
          <DoctorAppointmentList
            appointments={mockAppointments.upcoming}
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
