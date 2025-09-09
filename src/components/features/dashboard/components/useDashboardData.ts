import { useState, useEffect } from "react";
import {
  getDashboardStats,
  getRecentActivities,
  getUpcomingAppointments,
} from "@/lib/actions/analytics";
import { DashboardStats, Activity, UpcomingAppointment } from "./types";

export function useDashboardData() {
  const [stats, setStats] = useState<DashboardStats>({
    todayAppointments: 0,
    weekAppointments: 0,
    monthlyRevenue: 0,
    utilizationRate: 0,
    pendingBookings: 0,
    totalPatients: 0,
  });

  const [activities, setActivities] = useState<Activity[]>([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState<
    UpcomingAppointment[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [activitiesLoading, setActivitiesLoading] = useState(true);
  const [appointmentsLoading, setAppointmentsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load stats, activities, and appointments in parallel
        const [statsResult, activitiesResult, appointmentsResult] =
          await Promise.all([
            getDashboardStats(),
            getRecentActivities(),
            getUpcomingAppointments(),
          ]);

        if (statsResult.success && statsResult.data) {
          setStats(statsResult.data);
        } else {
          console.error("Failed to load stats:", statsResult.error);
        }

        if (activitiesResult.success && activitiesResult.data) {
          setActivities(activitiesResult.data);
        } else {
          console.error("Failed to load activities:", activitiesResult.error);
        }

        if (appointmentsResult.success && appointmentsResult.data) {
          setUpcomingAppointments(appointmentsResult.data);
        } else {
          console.error(
            "Failed to load appointments:",
            appointmentsResult.error
          );
        }
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
        setActivitiesLoading(false);
        setAppointmentsLoading(false);
      }
    };

    loadData();
  }, []);

  return {
    stats,
    activities,
    upcomingAppointments,
    loading,
    activitiesLoading,
    appointmentsLoading,
  };
}
