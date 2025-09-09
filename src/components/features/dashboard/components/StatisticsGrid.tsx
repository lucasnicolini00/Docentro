import { Calendar, Clock, Users, BarChart3 } from "lucide-react";
import StatCard from "./StatCard";
import { DashboardStats } from "./types";

interface StatisticsGridProps {
  stats: DashboardStats;
  loading: boolean;
}

export default function StatisticsGrid({
  stats,
  loading,
}: StatisticsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCard
        title="Citas de Hoy"
        value={stats.todayAppointments}
        change={stats.changes?.appointmentDay.text}
        changeType={stats.changes?.appointmentDay.type}
        icon={Calendar}
        loading={loading}
      />
      <StatCard
        title="Esta Semana"
        value={stats.weekAppointments}
        change={stats.changes?.appointmentWeek.text}
        changeType={stats.changes?.appointmentWeek.type}
        icon={Clock}
        loading={loading}
      />
      <StatCard
        title="Ingresos del Mes"
        value={loading ? "" : `$${stats.monthlyRevenue.toLocaleString()}`}
        change={stats.changes?.revenue.text}
        changeType={stats.changes?.revenue.type}
        icon={BarChart3}
        loading={loading}
      />
      <StatCard
        title="Utilización"
        value={loading ? "" : `${stats.utilizationRate}%`}
        change={stats.changes?.utilization.text}
        changeType={stats.changes?.utilization.type}
        icon={BarChart3}
        loading={loading}
      />
      <StatCard
        title="Solicitudes Pendientes"
        value={stats.pendingBookings}
        icon={Clock}
        loading={loading}
      />
      <StatCard
        title="Total Pacientes"
        value={stats.totalPatients}
        change={stats.changes?.patients.text}
        changeType={stats.changes?.patients.type}
        icon={Users}
        loading={loading}
      />
    </div>
  );
}
