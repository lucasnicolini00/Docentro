import { requirePatient } from "@/lib/auth-guards";
export const dynamic = "force-dynamic";
import { getPatientDashboard } from "@/lib/actions/patients";
import AppointmentList from "./components/AppointmentList";
import { getT } from "@/lib/getT";
import { getLocale } from "next-intl/server";

export default async function PatientDashboardLocale() {
  await requirePatient();

  const result = await getPatientDashboard();
  const locale = await getLocale();
  const t = await getT("dashboard_patient");

  if (!result.success || !result.data) {
    return (
      <div className="text-center p-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {t("errorLoading")}
        </h1>
        <p className="text-gray-600">{result.error}</p>
      </div>
    );
  }

  const { patient, upcomingAppointments, pastAppointments, session } =
    result.data;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">📅</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                {t("upcomingAppointments")}
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {upcomingAppointments.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">📋</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                {t("historyLabel")}
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {pastAppointments.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">👤</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                {t("profileLabel")}
              </p>
              <a
                href={`/${locale}/dashboard/patient/profile`}
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                {t("editProfileLink")}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {patient && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">
                  {t("myPersonalInfo")}
                </h2>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="h-16 w-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {session.user.name?.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {patient.name} {patient.surname}
                    </h3>
                    <p className="text-gray-500">{patient.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        {t("phoneLabel")}
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {patient.phone || t("unspecifiedValue")}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        {t("genderLabel")}
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {patient.gender || t("unspecifiedValue")}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        {t("birthdateLabel")}
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {patient.birthdate
                          ? patient.birthdate.toLocaleDateString(
                              locale === "es" ? "es-ES" : "en-US"
                            )
                          : t("birthdateUnspecified")}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        {t("statusLabel")}
                      </label>
                      <span className="mt-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {t("activeStatus")}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <a
                    href={`/${locale}/dashboard/patient/profile`}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors text-center block"
                  >
                    {t("editProfileAction")}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="space-y-6">
          <AppointmentList
            appointments={upcomingAppointments}
            title={t("upcomingAppointments")}
            showActions={true}
          />
          {pastAppointments.length > 0 && (
            <AppointmentList
              appointments={pastAppointments}
              title={t("pastAppointments")}
              showActions={false}
            />
          )}
        </div>
      </div>
    </div>
  );
}
