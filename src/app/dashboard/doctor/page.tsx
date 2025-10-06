import { requireDoctor } from "@/lib/auth-guards";
import {
  getDashboardStats,
  getRecentActivities,
  getUpcomingAppointments,
} from "@/lib/actions/analytics";
import { getDoctorClinics } from "@/lib/actions/clinics";
import { getDoctorSchedules } from "@/lib/actions/schedules";
import DoctorDashboardOverview from "./components/DoctorDashboardOverview";

export default async function DoctorDashboard() {
  // Ensure user is authenticated as a doctor
  await requireDoctor();

  // Fetch all dashboard data server-side in parallel for better performance
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

  // Handle errors gracefully
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

  return (
    <div className="p-6">
      {/* Simple Page Header */}
      <div className="mb-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  Dashboard
                </h1>
                <p className="text-gray-600 text-sm mt-1">
                  Gestiona tu práctica médica desde un solo lugar
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <DoctorDashboardOverview dashboardData={dashboardData} />
    </div>
  );
}
