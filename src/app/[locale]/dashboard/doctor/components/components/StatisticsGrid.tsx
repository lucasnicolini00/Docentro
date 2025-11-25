"use client";
import { Calendar, Clock, Users } from "lucide-react";
import StatCard from "./StatCard";
import { DashboardStats } from "./types";
import { useTranslations } from "next-intl";

interface StatisticsGridProps {
  stats: DashboardStats | null;
  loading: boolean;
}

export default function StatisticsGrid({
  stats,
  loading,
}: StatisticsGridProps) {
  const t = useTranslations("dashboard_doctor");

  // Provide default values when stats is null
  const defaultStats: DashboardStats = {
    todayAppointments: 0,
    weekAppointments: 0,
    monthlyRevenue: 0,
    utilizationRate: 0,
    pendingBookings: 0,
    totalPatients: 0,
    changes: {
      appointmentDay: { value: 0, type: "neutral" },
      appointmentWeek: { value: 0, type: "neutral" },
      revenue: { value: 0, type: "neutral" },
      utilization: { value: 0, type: "neutral" },
      patients: { value: 0, type: "neutral" },
    },
  };

  const currentStats = stats || defaultStats;

  const getChangeText = (
    value: number,
    unit: string,
    comparisonKey: string
  ) => {
    if (value === 0) {
      return t("noChangeVs", { period: t(comparisonKey) });
    }
    const direction = value >= 0 ? t("more") : t("less");
    return `${Math.abs(value)}${unit} ${direction} vs ${t(comparisonKey)}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCard
        title={t("todayAppointmentsLabel")}
        value={currentStats.todayAppointments}
        change={getChangeText(
          currentStats.changes?.appointmentDay.value || 0,
          "%",
          "yesterday"
        )}
        changeType={currentStats.changes?.appointmentDay.type}
        icon={Calendar}
        loading={loading}
      />
      <StatCard
        title={t("thisWeekLabel")}
        value={currentStats.weekAppointments}
        change={getChangeText(
          currentStats.changes?.appointmentWeek.value || 0,
          "%",
          "lastWeek"
        )}
        changeType={currentStats.changes?.appointmentWeek.type}
        icon={Clock}
        loading={loading}
      />
      <StatCard
        title={t("pendingAppointmentsLabel")}
        value={currentStats.pendingBookings}
        icon={Clock}
        loading={loading}
      />
      <StatCard
        title={t("totalPatientsLabel")}
        value={currentStats.totalPatients}
        change={getChangeText(
          currentStats.changes?.patients.value || 0,
          "",
          "lastMonth"
        )}
        changeType={currentStats.changes?.patients.type}
        icon={Users}
        loading={loading}
      />
    </div>
  );
}
