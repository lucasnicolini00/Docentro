"use client";

import StatisticsGrid from "./components/StatisticsGrid";
import QuickActions from "./components/QuickActions";
import RecentActivity from "./components/RecentActivity";
import UpcomingAppointments from "./components/UpcomingAppointments";

interface DashboardData {
  stats: any;
  activities: any[];
  upcomingAppointments: any[];
  errors: {
    stats: string | null;
    activities: string | null;
    appointments: string | null;
  };
}

interface DoctorDashboardOverviewProps {
  dashboardData: DashboardData;
}

export default function DoctorDashboardOverview({
  dashboardData,
}: DoctorDashboardOverviewProps) {
  const { stats, activities, upcomingAppointments, errors } = dashboardData;

  return (
    <div className="space-y-8">
      {/* Error Display */}
      {(errors.stats || errors.activities || errors.appointments) && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-medium">Error al cargar datos</h3>
          <ul className="text-red-600 text-sm mt-2 space-y-1">
            {errors.stats && <li>Estadísticas: {errors.stats}</li>}
            {errors.activities && <li>Actividades: {errors.activities}</li>}
            {errors.appointments && <li>Citas: {errors.appointments}</li>}
          </ul>
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
