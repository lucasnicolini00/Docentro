import { requireDoctor } from "@/lib/auth-guards";

export default async function DoctorSchedules() {
  await requireDoctor();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Gestión de Horarios
        </h1>
        <p className="text-gray-600 mt-2">
          Configura tus horarios de disponibilidad para las citas médicas.
        </p>
      </div>

      {/* Schedule Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Schedule */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">
              Horario Actual
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                "Lunes",
                "Martes",
                "Miércoles",
                "Jueves",
                "Viernes",
                "Sábado",
                "Domingo",
              ].map((day) => (
                <div
                  key={day}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                >
                  <span className="font-medium text-gray-700">{day}</span>
                  <span className="text-sm text-gray-500">
                    9:00 AM - 5:00 PM
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Availability Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">
              Configuración de Disponibilidad
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Duración de cita
                </span>
                <span className="text-sm text-gray-500">30 minutos</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Tiempo de descanso
                </span>
                <span className="text-sm text-gray-500">15 minutos</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Citas máximas por día
                </span>
                <span className="text-sm text-gray-500">12</span>
              </div>
            </div>
            <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
              Modificar Horarios
            </button>
          </div>
        </div>
      </div>

      {/* Coming Soon Message */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <div className="flex items-center space-x-3">
          <div className="text-yellow-600">⚠️</div>
          <div>
            <h3 className="text-sm font-medium text-yellow-800">
              Funcionalidad en desarrollo
            </h3>
            <p className="text-sm text-yellow-700 mt-1">
              La gestión completa de horarios estará disponible en una próxima
              actualización.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
