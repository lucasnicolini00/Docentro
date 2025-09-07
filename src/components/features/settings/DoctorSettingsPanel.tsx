"use client";

import { useState, useEffect, useTransition } from "react";
import {
  getDoctorSettings,
  updateDoctorSettings,
} from "@/lib/actions/settings";
import { LoadingSpinner } from "@/components/ui/feedback";
import { Toast } from "@/components/ui/feedback";

interface DoctorSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  publicAvailability: boolean;
  onlineConsultations: boolean;
  autoBooking: boolean;
  reminders: boolean;
  consultationPrice: number;
  isPublic: boolean;
  maxAdvanceBookingDays: number;
  minAdvanceBookingHours: number;
}

export default function DoctorSettingsPanel() {
  const [settings, setSettings] = useState<DoctorSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Load settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const result = await getDoctorSettings();
        if (result.success && result.data) {
          setSettings(result.data);
        } else {
          // Initialize with default settings if none exist
          const defaultSettings: DoctorSettings = {
            emailNotifications: true,
            pushNotifications: false,
            publicAvailability: true,
            onlineConsultations: false,
            autoBooking: false,
            reminders: true,
            consultationPrice: 0,
            isPublic: true,
            maxAdvanceBookingDays: 30,
            minAdvanceBookingHours: 2,
          };
          setSettings(defaultSettings);
        }
      } catch (error) {
        console.error("Error loading settings:", error);
        setToast({ message: "Error al cargar configuraciones", type: "error" });
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleToggleSetting = (key: keyof DoctorSettings) => {
    if (!settings) return;

    const newValue = !settings[key];
    const newSettings = { ...settings, [key]: newValue };

    // Optimistic update
    setSettings(newSettings);

    startTransition(async () => {
      try {
        const result = await updateDoctorSettings({ [key]: newValue });
        if (result.success) {
          setToast({ message: "Configuración actualizada", type: "success" });
        } else {
          // Revert on error
          setSettings(settings);
          setToast({
            message: result.error || "Error al actualizar",
            type: "error",
          });
        }
      } catch {
        // Revert on error
        setSettings(settings);
        setToast({
          message: "Error al actualizar configuración",
          type: "error",
        });
      }
    });
  };

  const handlePriceChange = (price: number) => {
    if (!settings) return;

    const newSettings = { ...settings, consultationPrice: price };
    setSettings(newSettings);

    startTransition(async () => {
      try {
        const result = await updateDoctorSettings({ consultationPrice: price });
        if (result.success) {
          setToast({ message: "Precio actualizado", type: "success" });
        } else {
          setToast({
            message: result.error || "Error al actualizar precio",
            type: "error",
          });
        }
      } catch {
        setToast({ message: "Error al actualizar precio", type: "error" });
      }
    });
  };

  const handleNumberChange = (
    key: "maxAdvanceBookingDays" | "minAdvanceBookingHours",
    value: number
  ) => {
    if (!settings) return;

    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);

    startTransition(async () => {
      try {
        const result = await updateDoctorSettings({ [key]: value });
        if (result.success) {
          setToast({ message: "Configuración actualizada", type: "success" });
        } else {
          setToast({
            message: result.error || "Error al actualizar",
            type: "error",
          });
        }
      } catch {
        setToast({
          message: "Error al actualizar configuración",
          type: "error",
        });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner size="md" />
        <span className="ml-2 text-gray-600">Cargando configuraciones...</span>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Error al cargar las configuraciones</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={true}
          onClose={() => setToast(null)}
        />
      )}

      {/* Notifications Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Notificaciones</h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Notificaciones por email
              </label>
              <p className="text-xs text-gray-500">
                Recibe notificaciones de citas por correo electrónico
              </p>
            </div>
            <button
              onClick={() => handleToggleSetting("emailNotifications")}
              disabled={isPending}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                settings.emailNotifications ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  settings.emailNotifications
                    ? "translate-x-5"
                    : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Notificaciones push
              </label>
              <p className="text-xs text-gray-500">
                Recibe notificaciones push en el navegador
              </p>
            </div>
            <button
              onClick={() => handleToggleSetting("pushNotifications")}
              disabled={isPending}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                settings.pushNotifications ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  settings.pushNotifications ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Recordatorios automáticos
              </label>
              <p className="text-xs text-gray-500">
                Envía recordatorios automáticos a los pacientes
              </p>
            </div>
            <button
              onClick={() => handleToggleSetting("reminders")}
              disabled={isPending}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                settings.reminders ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  settings.reminders ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Availability Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Disponibilidad</h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Perfil público
              </label>
              <p className="text-xs text-gray-500">
                Permite que los pacientes encuentren tu perfil en búsquedas
              </p>
            </div>
            <button
              onClick={() => handleToggleSetting("isPublic")}
              disabled={isPending}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                settings.isPublic ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  settings.isPublic ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Consultas online
              </label>
              <p className="text-xs text-gray-500">
                Ofrece consultas virtuales a través de la plataforma
              </p>
            </div>
            <button
              onClick={() => handleToggleSetting("onlineConsultations")}
              disabled={isPending}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                settings.onlineConsultations ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  settings.onlineConsultations
                    ? "translate-x-5"
                    : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Reserva automática
              </label>
              <p className="text-xs text-gray-500">
                Permite que los pacientes reserven citas sin confirmación previa
              </p>
            </div>
            <button
              onClick={() => handleToggleSetting("autoBooking")}
              disabled={isPending}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                settings.autoBooking ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  settings.autoBooking ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">
          Precio de Consulta
        </h3>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Precio por consulta (ARS)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                type="number"
                value={settings.consultationPrice}
                onChange={(e) => handlePriceChange(Number(e.target.value))}
                disabled={isPending}
                className="block w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="0"
                min="0"
                step="100"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Precio sugerido para consultas presenciales
            </p>
          </div>
        </div>
      </div>

      {/* Booking Restrictions */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">
          Restricciones de Reserva
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Máximo días de anticipación
            </label>
            <input
              type="number"
              value={settings.maxAdvanceBookingDays}
              onChange={(e) =>
                handleNumberChange(
                  "maxAdvanceBookingDays",
                  Number(e.target.value)
                )
              }
              disabled={isPending}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              min="1"
              max="365"
            />
            <p className="text-xs text-gray-500 mt-1">
              Cuántos días de anticipación pueden reservar
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mínimo horas de anticipación
            </label>
            <input
              type="number"
              value={settings.minAdvanceBookingHours}
              onChange={(e) =>
                handleNumberChange(
                  "minAdvanceBookingHours",
                  Number(e.target.value)
                )
              }
              disabled={isPending}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              min="1"
              max="168"
            />
            <p className="text-xs text-gray-500 mt-1">
              Mínimo de horas antes de la cita
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Acciones Rápidas
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => {
              setSettings({
                ...settings,
                emailNotifications: true,
                pushNotifications: true,
                reminders: true,
                autoBooking: true,
                isPublic: true,
              });
            }}
            disabled={isPending}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            Habilitar Todo
          </button>

          <button
            onClick={() => {
              setSettings({
                ...settings,
                emailNotifications: false,
                pushNotifications: false,
                reminders: false,
                autoBooking: false,
                isPublic: false,
              });
            }}
            disabled={isPending}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            Deshabilitar Todo
          </button>

          <button
            onClick={() => {
              setSettings({
                emailNotifications: true,
                pushNotifications: false,
                publicAvailability: true,
                onlineConsultations: false,
                autoBooking: false,
                reminders: true,
                consultationPrice: 5000,
                isPublic: true,
                maxAdvanceBookingDays: 30,
                minAdvanceBookingHours: 2,
              });
            }}
            disabled={isPending}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            Configuración Recomendada
          </button>
        </div>
      </div>

      {isPending && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex items-center space-x-3">
            <LoadingSpinner size="sm" />
            <span className="text-gray-700">Guardando cambios...</span>
          </div>
        </div>
      )}
    </div>
  );
}
