import { Calendar, Clock, Users } from "lucide-react";
import StatCard from "./StatCard";
import { DashboardStats } from "./types";

interface StatisticsGridProps {
  stats: DashboardStats | null;
  loading: boolean;
}

export default function StatisticsGrid({
  stats,
  loading,
}: StatisticsGridProps) {
  // Provide default values when stats is null
  const defaultStats: DashboardStats = {
    todayAppointments: 0,
    weekAppointments: 0,
    monthlyRevenue: 0,
    utilizationRate: 0,
    pendingBookings: 0,
    totalPatients: 0,
    changes: {
      appointmentDay: { value: 0, text: "0%", type: "neutral" },
      appointmentWeek: { value: 0, text: "0%", type: "neutral" },
      revenue: { value: 0, text: "0%", type: "neutral" },
      utilization: { value: 0, text: "0%", type: "neutral" },
      patients: { value: 0, text: "0%", type: "neutral" },
    },
  };

  const currentStats = stats || defaultStats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCard
        title="Citas de Hoy"
        value={currentStats.todayAppointments}
        change={currentStats.changes?.appointmentDay.text}
        changeType={currentStats.changes?.appointmentDay.type}
        icon={Calendar}
        loading={loading}
      />
      <StatCard
        title="Esta Semana"
        value={currentStats.weekAppointments}
        change={currentStats.changes?.appointmentWeek.text}
        changeType={currentStats.changes?.appointmentWeek.type}
        icon={Clock}
        loading={loading}
      />
      <StatCard
        title="Citas Pendientes"
        value={currentStats.pendingBookings}
        icon={Clock}
        loading={loading}
      />
      <StatCard
        title="Total Pacientes"
        value={currentStats.totalPatients}
        change={currentStats.changes?.patients.text}
        changeType={currentStats.changes?.patients.type}
        icon={Users}
        loading={loading}
      />
    </div>
  );
}
