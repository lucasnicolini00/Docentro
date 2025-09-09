"use client";

import {
  StatisticsGrid,
  QuickActions,
  RecentActivity,
  UpcomingAppointments,
  useDashboardData,
} from "./components";

export default function DoctorDashboardOverview() {
  const {
    stats,
    activities,
    upcomingAppointments,
    loading,
    activitiesLoading,
    appointmentsLoading,
  } = useDashboardData();

  return (
    <div className="space-y-8">
      {/* Statistics Grid */}
      <StatisticsGrid stats={stats} loading={loading} />

      {/* Quick Actions */}
      <QuickActions />

      {/* Recent Activity */}
      <RecentActivity activities={activities} loading={activitiesLoading} />

      {/* Upcoming Appointments Preview */}
      <UpcomingAppointments
        appointments={upcomingAppointments}
        loading={appointmentsLoading}
      />
    </div>
  );
}
