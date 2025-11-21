import { requireDoctor } from "@/lib/auth-guards";
import {
  getDashboardStats,
  getRecentActivities,
  getUpcomingAppointments,
} from "@/lib/actions/analytics";
import { getDoctorClinics } from "@/lib/actions/clinics";
import { getDoctorSchedules } from "@/lib/actions/schedules";
import DoctorDashboardOverview from "./components/DoctorDashboardOverview";
import { getT } from "@/lib/getT";

export const dynamic = "force-dynamic"; // Dashboard requires auth & live data; skip prerender

export default async function DoctorDashboardLocale({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params; // locale inferred by next-intl
  await requireDoctor();

  const [
    statsResult,
    activitiesResult,
    appointmentsResult,
    clinicsResult,
    schedulesResult,
  ] = await Promise.all([
    getDashboardStats(),
    getRecentActivities(),
    getUpcomingAppointments(),
    getDoctorClinics(),
    getDoctorSchedules(),
  ]);

  const dashboardData = {
    stats: statsResult.success ? statsResult.data : null,
    activities: activitiesResult.success ? activitiesResult.data : [],
    upcomingAppointments: appointmentsResult.success
      ? appointmentsResult.data
      : [],
    clinics:
      clinicsResult.success && clinicsResult.data
        ? clinicsResult.data.clinics
        : [],
    schedules: schedulesResult.success ? schedulesResult.data : [],
    errors: {
      stats: !statsResult.success ? statsResult.error || null : null,
      activities: !activitiesResult.success
        ? activitiesResult.error || null
        : null,
      appointments: !appointmentsResult.success
        ? appointmentsResult.error || null
        : null,
      clinics: !clinicsResult.success ? clinicsResult.error || null : null,
      schedules: !schedulesResult.success
        ? schedulesResult.error || null
        : null,
    },
  };

  // Only need title server-side; use locale-specific messages
  const t = await getT("dashboard_doctor");

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-900">{t("title")}</h1>
        </div>
      </div>
      <DoctorDashboardOverview dashboardData={dashboardData} />
    </div>
  );
}
