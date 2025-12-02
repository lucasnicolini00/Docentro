"use client";

import { useState, useEffect, useTransition } from "react";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import {
  getDoctorSettings,
  updateDoctorSettings,
} from "@/lib/actions/settings";
import { LoadingSpinner } from "@/components/ui/feedback";
import { Mail, Bell, Settings, Info } from "lucide-react";

interface DoctorSettings {
  emailNotifications: boolean;
  isPublic: boolean;
  allowOnlineConsultations: boolean;
  autoBookingEnabled: boolean;
  remindersEnabled: boolean;
  consultationPrice: number;
}

export default function DoctorSettingsPanel() {
  const [settings, setSettings] = useState<DoctorSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  const t = useTranslations("dashboard_doctor");
  // Load settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const result = await getDoctorSettings();
        if (result.success && result.data) {
          setSettings({
            emailNotifications: result.data.emailNotifications,
            isPublic: result.data.publicAvailability,
            allowOnlineConsultations: result.data.onlineConsultations,
            autoBookingEnabled: result.data.autoBooking,
            remindersEnabled: result.data.reminders,
            consultationPrice: result.data.consultationPrice,
          });
        } else {
          // Initialize with default settings if none exist
          const defaultSettings: DoctorSettings = {
            emailNotifications: true,
            isPublic: true,
            allowOnlineConsultations: false,
            autoBookingEnabled: false,
            remindersEnabled: true,
            consultationPrice: 50000,
          };
          setSettings(defaultSettings);
        }
      } catch (error) {
        console.error("Error loading settings:", error);
        toast.error(t("errorLoadingSettings"));
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
    // 't' is stable from next-intl; intentional omission from deps to avoid unnecessary reloads.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggleSetting = (key: keyof DoctorSettings) => {
    if (!settings) return;

    const newValue = !settings[key];
    const newSettings = { ...settings, [key]: newValue };

    // Optimistic update
    setSettings(newSettings);

    startTransition(async () => {
      try {
        // Map to the expected server action format
        const updateData: Partial<{
          publicAvailability: boolean;
          onlineConsultations: boolean;
          autoBooking: boolean;
          reminders: boolean;
          [key: string]: boolean | undefined;
        }> = {};
        switch (key) {
          case "isPublic":
            updateData.publicAvailability = newValue;
            break;
          case "allowOnlineConsultations":
            updateData.onlineConsultations = newValue;
            break;
          case "autoBookingEnabled":
            updateData.autoBooking = newValue;
            break;
          case "remindersEnabled":
            updateData.reminders = newValue;
            break;
          default:
            updateData[key] = newValue;
        }

        const result = await updateDoctorSettings(updateData);
        if (result.success) {
          toast.success(t("settingsUpdated"));
        } else {
          // Revert on error
          setSettings(settings);
          toast.error(result.error || t("updateErrorGeneric"));
        }
      } catch {
        // Revert on error
        setSettings(settings);
        toast.error(t("updateConfigurationError"));
      }
    });
  };

  // const handlePriceChange = (price: number) => {
  //   if (!settings) return;

  //   const newSettings = { ...settings, consultationPrice: price };
  //   setSettings(newSettings);

  //   startTransition(async () => {
  //     try {
  //       const result = await updateDoctorSettings({ consultationPrice: price });
  //       if (result.success) {
  //         toast.success("Precio actualizado");
  //       } else {
  //         toast.error(result.error || "Error al actualizar precio");
  //       }
  //     } catch {
  //       toast.error("Error al actualizar precio");
  //     }
  //   });
  // };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner size="md" />
        <span className="ml-2 text-gray-600">{t("loadingSettings")}</span>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">{t("errorLoadingSettings")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with improved styling */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Settings className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {t("accountSettingsHeading")}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {t("accountSettingsSubtitle")}
            </p>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              {t("notificationsHeading")}
            </h3>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {t("notificationsSubtitle")}
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-900">
                  {t("emailNotificationsLabel")}
                </label>
                <p className="text-xs text-gray-600 mt-1">
                  {t("emailNotificationsDescription")}
                </p>
                <div className="flex items-center space-x-1 mt-2">
                  <Info className="w-4 h-4 text-amber-500" />
                  <span className="text-xs text-amber-600">
                    {t("settingsInDevelopmentNote")}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleToggleSetting("emailNotifications")}
              disabled={isPending}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isPending ? "opacity-50 cursor-not-allowed" : ""
              } ${settings.emailNotifications ? "bg-blue-600" : "bg-gray-200"}`}
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

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Bell className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-900">
                  {t("automaticRemindersLabel")}
                </label>
                <p className="text-xs text-gray-600 mt-1">
                  {t("automaticRemindersDescription")}
                </p>
                <div className="flex items-center space-x-1 mt-2">
                  <Info className="w-4 h-4 text-amber-500" />
                  <span className="text-xs text-amber-600">
                    {t("featurePendingNote")}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleToggleSetting("remindersEnabled")}
              disabled={isPending}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                isPending ? "opacity-50 cursor-not-allowed" : ""
              } ${settings.remindersEnabled ? "bg-purple-600" : "bg-gray-200"}`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  settings.remindersEnabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Availability Section */}
      {/* <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Eye className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Disponibilidad y Servicios
            </h3>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Controla tu visibilidad y tipos de consulta
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-100">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                {settings.isPublic ? (
                  <Eye className="w-5 h-5 text-green-600" />
                ) : (
                  <EyeOff className="w-5 h-5 text-green-600" />
                )}
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-900">
                  Perfil público
                </label>
                <p className="text-xs text-gray-600 mt-1">
                  Permite que los pacientes encuentren tu perfil en las
                  búsquedas
                </p>
                {settings.isPublic && (
                  <div className="flex items-center space-x-1 mt-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-green-600">
                      Tu perfil es visible públicamente
                    </span>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => handleToggleSetting("isPublic")}
              disabled={isPending}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                isPending ? "opacity-50 cursor-not-allowed" : ""
              } ${settings.isPublic ? "bg-green-600" : "bg-gray-200"}`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  settings.isPublic ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg border border-indigo-100">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Video className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-900">
                  Consultas online
                </label>
                <p className="text-xs text-gray-600 mt-1">
                  Habilita consultas virtuales a través de videollamada
                </p>
                <div className="flex items-center space-x-1 mt-2">
                  <Info className="w-4 h-4 text-amber-500" />
                  <span className="text-xs text-amber-600">
                    Funcionalidad en desarrollo - próximamente
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleToggleSetting("allowOnlineConsultations")}
              disabled={true}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                isPending ? "opacity-50 cursor-not-allowed" : ""
              } ${
                settings.allowOnlineConsultations
                  ? "bg-indigo-600"
                  : "bg-gray-200"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  settings.allowOnlineConsultations
                    ? "translate-x-5"
                    : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg border border-emerald-100">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Zap className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-900">
                  Reserva automática
                </label>
                <p className="text-xs text-gray-600 mt-1">
                  Permite que los pacientes reserven citas sin confirmación
                  manual
                </p>
                {settings.autoBookingEnabled && (
                  <div className="flex items-center space-x-1 mt-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs text-emerald-600">
                      Reservas automáticas habilitadas
                    </span>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => handleToggleSetting("autoBookingEnabled")}
              disabled={isPending}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                isPending ? "opacity-50 cursor-not-allowed" : ""
              } ${
                settings.autoBookingEnabled ? "bg-emerald-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  settings.autoBookingEnabled
                    ? "translate-x-5"
                    : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </div> */}

      {/* Pricing Section */}
      {/* <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Precio de Consulta
            </h3>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Configura tu tarifa base para consultas
          </p>
        </div>

        <div className="p-6">
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Precio por consulta
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                $
              </span>
              <input
                type="number"
                value={settings.consultationPrice}
                onChange={(e) => handlePriceChange(Number(e.target.value))}
                disabled={isPending}
                className="block w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="50000"
                min="0"
                step="1000"
              />
            </div>
            <div className="mt-3 p-3 bg-white rounded-md border border-yellow-200">
              <div className="flex items-center space-x-2">
                <Info className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <p className="text-xs text-gray-600">
                  Precio sugerido para consultas presenciales. Puedes configurar
                  precios específicos por clínica en la sección de{" "}
                  <strong>Clínicas</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Quick Actions with improved design */}
      {/* <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Configuración Rápida
            </h3>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Aplica configuraciones predefinidas con un clic
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => {
                const newSettings = {
                  ...settings,
                  emailNotifications: true,
                  remindersEnabled: true,
                  autoBookingEnabled: true,
                  isPublic: true,
                };
                setSettings(newSettings);
                startTransition(async () => {
                  await updateDoctorSettings({
                    emailNotifications: true,
                    reminders: true,
                    autoBooking: true,
                    publicAvailability: true,
                  });
                  toast.success("✅ Configuración recomendada aplicada");
                });
              }}
              disabled={isPending}
              className="group relative p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl hover:from-green-100 hover:to-emerald-100 hover:border-green-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900">
                    Configuración Recomendada
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Habilita las funciones más importantes para una mejor
                    experiencia
                  </p>
                </div>
              </div>
              <div className="mt-3 text-xs text-green-700 bg-green-100 rounded-md px-3 py-1 inline-block">
                Email + Recordatorios + Reserva Auto + Perfil Público
              </div>
            </button>

            <button
              onClick={() => {
                const newSettings = {
                  ...settings,
                  emailNotifications: false,
                  remindersEnabled: false,
                  autoBookingEnabled: false,
                  isPublic: false,
                };
                setSettings(newSettings);
                startTransition(async () => {
                  await updateDoctorSettings({
                    emailNotifications: false,
                    reminders: false,
                    autoBooking: false,
                    publicAvailability: false,
                  });
                  toast.success("🔒 Configuraciones de privacidad aplicadas");
                });
              }}
              disabled={isPending}
              className="group relative p-6 bg-gradient-to-br from-gray-50 to-slate-50 border-2 border-gray-200 rounded-xl hover:from-gray-100 hover:to-slate-100 hover:border-gray-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors">
                  <Shield className="w-6 h-6 text-gray-600" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900">Modo Privado</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Deshabilita la automatización para mayor control manual
                  </p>
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-700 bg-gray-100 rounded-md px-3 py-1 inline-block">
                Control manual de todas las funciones
              </div>
            </button>
          </div>
        </div>
      </div> */}

      {/* Enhanced loading overlay */}
      {isPending && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 shadow-2xl border border-gray-200 max-w-sm mx-4">
            <div className="flex flex-col items-center space-y-4">
              <LoadingSpinner size="lg" />
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t("savingChangesHeading")}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {t("savingChangesSubtitle")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
