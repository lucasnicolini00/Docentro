import { requireDoctor } from "@/lib/auth-guards";
import {
  getDashboardStats,
  getRecentActivities,
  getUpcomingAppointments,
} from "@/lib/actions/analytics";
import { DoctorDashboardOverview } from "@/components/features";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function DoctorDashboard() {
  // Ensure user is authenticated as a doctor
  await requireDoctor();

  // Fetch all dashboard data server-side in parallel for better performance
  const [statsResult, activitiesResult, appointmentsResult] = await Promise.all(
    [getDashboardStats(), getRecentActivities(), getUpcomingAppointments()]
  );

  // Handle errors gracefully
  const dashboardData = {
    stats: statsResult.success ? statsResult.data : null,
    activities: activitiesResult.success ? activitiesResult.data : [],
    upcomingAppointments: appointmentsResult.success
      ? appointmentsResult.data
      : [],
    errors: {
      stats: !statsResult.success ? statsResult.error || null : null,
      activities: !activitiesResult.success
        ? activitiesResult.error || null
        : null,
      appointments: !appointmentsResult.success
        ? appointmentsResult.error || null
        : null,
    },
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Gestiona tu práctica médica desde un solo lugar
            </p>
          </div>
          <Link
            href="/dashboard/doctor/schedules"
            className="inline-flex items-center text-md px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Gestionar Horarios
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <DoctorDashboardOverview dashboardData={dashboardData} />
    </div>
  );
}
