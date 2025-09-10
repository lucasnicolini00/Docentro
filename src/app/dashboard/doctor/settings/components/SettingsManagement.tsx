"use client";

import { useState, useTransition } from "react";
import { updateDoctorSettings } from "@/lib/actions/settings";

interface DoctorSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  publicAvailability: boolean;
  onlineConsultations: boolean;
  autoBooking: boolean;
  reminders: boolean;
  consultationPrice: number;
}

interface SettingsManagementProps {
  initialSettings: DoctorSettings;
}

export default function SettingsManagement({
  initialSettings,
}: SettingsManagementProps) {
  const [settings, setSettings] = useState<DoctorSettings>(initialSettings);
  const [isPending, startTransition] = useTransition();
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  const handleToggle = (key: keyof DoctorSettings) => {
    const newSettings = {
      ...settings,
      [key]: !settings[key],
    };
    setSettings(newSettings);

    // Auto-save the setting
    startTransition(async () => {
      try {
        const result = await updateDoctorSettings({ [key]: newSettings[key] });
        if (result.success) {
          setSavedMessage("Configuración guardada");
          setTimeout(() => setSavedMessage(null), 3000);
        }
      } catch (error) {
        console.error("Error saving setting:", error);
      }
    });
  };

  const handlePriceChange = (price: number) => {
    const newSettings = { ...settings, consultationPrice: price };
    setSettings(newSettings);

    startTransition(async () => {
      try {
        const result = await updateDoctorSettings({ consultationPrice: price });
        if (result.success) {
          setSavedMessage("Precio actualizado");
          setTimeout(() => setSavedMessage(null), 3000);
        }
      } catch (error) {
        console.error("Error saving price:", error);
      }
    });
  };

  const ToggleButton = ({
    isEnabled,
    onClick,
    disabled = false,
  }: {
    isEnabled: boolean;
    onClick: () => void;
    disabled?: boolean;
  }) => (
    <button
      onClick={onClick}
      disabled={disabled || isPending}
      className={`px-3 py-1 rounded text-sm transition-colors ${
        isEnabled
          ? "bg-blue-600 text-white hover:bg-blue-700"
          : "bg-gray-300 text-gray-700 hover:bg-gray-400"
      } ${disabled || isPending ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {isEnabled ? "Activado" : "Desactivado"}
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Configuración</h1>
            <p className="text-gray-600 mt-2">
              Personaliza tu experiencia y preferencias en la plataforma.
            </p>
          </div>
          {savedMessage && (
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm">
              ✓ {savedMessage}
            </div>
          )}
        </div>
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
              <ToggleButton
                isEnabled={settings.emailNotifications}
                onClick={() => handleToggle("emailNotifications")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-700">Notificaciones push</p>
                <p className="text-sm text-gray-500">Alertas en tiempo real</p>
              </div>
              <ToggleButton
                isEnabled={settings.pushNotifications}
                onClick={() => handleToggle("pushNotifications")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-700">
                  Disponibilidad pública
                </p>
                <p className="text-sm text-gray-500">Visible en búsquedas</p>
              </div>
              <ToggleButton
                isEnabled={settings.publicAvailability}
                onClick={() => handleToggle("publicAvailability")}
              />
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
              <ToggleButton
                isEnabled={settings.onlineConsultations}
                onClick={() => handleToggle("onlineConsultations")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-700">Reserva automática</p>
                <p className="text-sm text-gray-500">
                  Confirmar citas automáticamente
                </p>
              </div>
              <ToggleButton
                isEnabled={settings.autoBooking}
                onClick={() => handleToggle("autoBooking")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-700">Recordatorios</p>
                <p className="text-sm text-gray-500">
                  Enviar recordatorios a pacientes
                </p>
              </div>
              <ToggleButton
                isEnabled={settings.reminders}
                onClick={() => handleToggle("reminders")}
              />
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
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">$</span>
                <input
                  type="number"
                  value={settings.consultationPrice}
                  onChange={(e) => handlePriceChange(Number(e.target.value))}
                  className="w-24 px-2 py-1 border border-gray-300 rounded text-right"
                  min="0"
                  step="1000"
                />
              </div>
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

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            Acciones Rápidas
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() =>
                (window.location.href = "/dashboard/doctor/schedules")
              }
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <div className="text-blue-600 text-2xl mb-2">📅</div>
              <p className="font-medium text-gray-900">Gestionar Horarios</p>
              <p className="text-sm text-gray-500">
                Configurar horarios de atención
              </p>
            </button>
            <button
              onClick={() =>
                (window.location.href = "/dashboard/doctor/profile")
              }
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <div className="text-blue-600 text-2xl mb-2">👤</div>
              <p className="font-medium text-gray-900">Editar Perfil</p>
              <p className="text-sm text-gray-500">
                Actualizar información profesional
              </p>
            </button>
            <button
              onClick={() =>
                (window.location.href = "/dashboard/doctor/clinics")
              }
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <div className="text-blue-600 text-2xl mb-2">🏥</div>
              <p className="font-medium text-gray-900">Gestionar Clínicas</p>
              <p className="text-sm text-gray-500">
                Administrar ubicaciones de trabajo
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
