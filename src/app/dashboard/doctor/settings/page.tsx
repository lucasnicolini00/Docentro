import { requireDoctor } from "@/lib/auth-guards";

export default async function DoctorSettings() {
  await requireDoctor();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h1 className="text-2xl font-bold text-gray-900">Configuración</h1>
        <p className="text-gray-600 mt-2">
          Personaliza tu experiencia y preferencias en la plataforma.
        </p>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">
              Configuración de Cuenta
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-700">
                  Notificaciones por email
                </p>
                <p className="text-sm text-gray-500">
                  Recibir notificaciones de citas
                </p>
              </div>
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
                Activado
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-700">Notificaciones push</p>
                <p className="text-sm text-gray-500">Alertas en tiempo real</p>
              </div>
              <button className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm">
                Desactivado
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-700">
                  Disponibilidad pública
                </p>
                <p className="text-sm text-gray-500">Visible en búsquedas</p>
              </div>
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
                Activado
              </button>
            </div>
          </div>
        </div>

        {/* Consultation Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">
              Configuración de Consultas
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-700">Consultas online</p>
                <p className="text-sm text-gray-500">Permitir videollamadas</p>
              </div>
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
                Activado
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-700">Reserva automática</p>
                <p className="text-sm text-gray-500">
                  Confirmar citas automáticamente
                </p>
              </div>
              <button className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm">
                Desactivado
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-700">Recordatorios</p>
                <p className="text-sm text-gray-500">
                  Enviar recordatorios a pacientes
                </p>
              </div>
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
                Activado
              </button>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">
              Privacidad y Seguridad
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <p className="font-medium text-gray-700">Cambiar contraseña</p>
              <p className="text-sm text-gray-500">
                Actualizar credenciales de acceso
              </p>
            </button>
            <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <p className="font-medium text-gray-700">
                Autenticación de dos factores
              </p>
              <p className="text-sm text-gray-500">
                Activar seguridad adicional
              </p>
            </button>
            <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <p className="font-medium text-gray-700">Exportar datos</p>
              <p className="text-sm text-gray-500">
                Descargar información personal
              </p>
            </button>
          </div>
        </div>

        {/* Billing Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">
              Facturación y Pagos
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-700">Tarifa por consulta</p>
                <p className="text-sm text-gray-500">Precio estándar</p>
              </div>
              <span className="text-lg font-bold text-green-600">$50.000</span>
            </div>
            <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <p className="font-medium text-gray-700">Métodos de pago</p>
              <p className="text-sm text-gray-500">
                Configurar formas de cobro
              </p>
            </button>
            <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <p className="font-medium text-gray-700">Historial de pagos</p>
              <p className="text-sm text-gray-500">Ver transacciones pasadas</p>
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            Los cambios se guardan automáticamente
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}
