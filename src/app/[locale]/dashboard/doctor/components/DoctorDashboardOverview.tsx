"use client";

import StatisticsGrid from "./components/StatisticsGrid";
import QuickActions from "./components/QuickActions";
import RecentActivity from "./components/RecentActivity";
import UpcomingAppointments from "./components/UpcomingAppointments";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocalePath } from "@/hooks/useLocalePath";

interface DashboardData {
  stats: any;
  activities: any[];
  upcomingAppointments: any[];
  clinics: any[];
  schedules: any[];
  errors: {
    stats: string | null;
    activities: string | null;
    appointments: string | null;
    clinics: string | null;
    schedules: string | null;
  };
}

interface DoctorDashboardOverviewProps {
  dashboardData: DashboardData;
}

export default function DoctorDashboardOverview({
  dashboardData,
}: DoctorDashboardOverviewProps) {
  const {
    stats,
    activities,
    upcomingAppointments,
    clinics,
    schedules,
    errors,
  } = dashboardData;

  // Check if doctor is new (no clinics and no schedules)
  const isNewDoctor = clinics.length === 0 && schedules.length === 0;

  const t = useTranslations("dashboard_doctor");
  const localePath = useLocalePath();
  return (
    <div className="space-y-8">
      {/* Error Display */}
      {(errors.stats ||
        errors.activities ||
        errors.appointments ||
        errors.clinics ||
        errors.schedules) && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-medium">{t("errorLoadingData")}</h3>
          <ul className="text-red-600 text-sm mt-2 space-y-1">
            {errors.stats && (
              <li>
                {t("stats")}: {errors.stats}
              </li>
            )}
            {errors.activities && (
              <li>
                {t("activities")}: {errors.activities}
              </li>
            )}
            {errors.appointments && (
              <li>
                {t("appointments")}: {errors.appointments}
              </li>
            )}
            {errors.clinics && (
              <li>
                {t("clinics")}: {errors.clinics}
              </li>
            )}
            {errors.schedules && (
              <li>
                {t("schedules")}: {errors.schedules}
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Informative Div for New Doctors */}
      {isNewDoctor && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
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
                  href={localePath("/dashboard/doctor/clinics")}
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
                  href={localePath("/dashboard/doctor/schedules")}
                  className="inline-flex items-center px-4 py-2 bg-white text-blue-600 text-sm font-medium rounded-md border border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  {t("configureSchedules")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Statistics Grid */}
      <StatisticsGrid stats={stats} loading={false} />

      {/* Quick Actions */}
      <QuickActions />

      {/* Recent Activity */}
      <RecentActivity activities={activities} loading={false} />

      {/* Upcoming Appointments Preview */}
      <UpcomingAppointments
        appointments={upcomingAppointments}
        loading={false}
      />
    </div>
  );
}
