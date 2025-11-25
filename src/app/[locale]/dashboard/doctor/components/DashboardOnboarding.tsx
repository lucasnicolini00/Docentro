import { getDoctorClinics } from "@/lib/actions/clinics";
import { getDoctorSchedules } from "@/lib/actions/schedules";
import Link from "next/link";
import { getT } from "@/lib/getT";
// We need to import the client hook wrapper or use a server-compatible way for locale path
// Since useLocalePath is a hook, we can't use it in a server component directly if it uses context.
// However, we can construct the path manually or pass the locale.
// Let's check how we can get the locale. It's usually in params.
// But this component is nested. We can use `getLocale` from next-intl/server.
import { getLocale } from "next-intl/server";

export default async function DashboardOnboarding() {
  const [clinicsResult, schedulesResult] = await Promise.all([
    getDoctorClinics(),
    getDoctorSchedules(),
  ]);

  const clinics = clinicsResult.success && clinicsResult.data ? clinicsResult.data.clinics : [];
  const schedules = schedulesResult.success ? schedulesResult.data : [];
  const isNewDoctor = clinics.length === 0 && schedules.length === 0;

  if (!isNewDoctor) {
    return null;
  }

  const t = await getT("dashboard_doctor");
  const locale = await getLocale();

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            {t("welcomeHeading")}
          </h3>
          <p className="text-blue-700 mb-4">{t("welcomeIntro")}</p>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-sm font-medium text-blue-800">
                1
              </div>
              <div>
                <p className="text-blue-800 font-medium">
                  {t("onboardingStep1Title")}
                </p>
                <p className="text-blue-600 text-sm">
                  {t("onboardingStep1Desc")}
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-sm font-medium text-blue-800">
                2
              </div>
              <div>
                <p className="text-blue-800 font-medium">
                  {t("onboardingStep2Title")}
                </p>
                <p className="text-blue-600 text-sm">
                  {t("onboardingStep2Desc")}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex space-x-3">
            <Link
              href={`/${locale}/dashboard/doctor/clinics`}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              {t("addClinic")}
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
            <Link
              href={`/${locale}/dashboard/doctor/schedules`}
              className="inline-flex items-center px-4 py-2 bg-white text-blue-600 text-sm font-medium rounded-md border border-blue-300 hover:bg-blue-50 transition-colors"
            >
              {t("configureSchedules")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
