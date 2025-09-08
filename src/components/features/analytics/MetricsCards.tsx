import { Calendar, Users, DollarSign, Activity } from "lucide-react";

interface DashboardStats {
  todayAppointments: number;
  weekAppointments: number;
  monthlyRevenue: number;
  utilizationRate: number;
  pendingBookings: number;
  totalPatients: number;
}

interface MetricsCardsProps {
  stats: DashboardStats;
}

export default function MetricsCards({ stats }: MetricsCardsProps) {
  const metrics = [
    {
      label: "Citas Hoy",
      value: stats.todayAppointments,
      icon: Calendar,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      label: "Pacientes Totales",
      value: stats.totalPatients,
      icon: Users,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      label: "Ingresos del Mes",
      value: `$${stats.monthlyRevenue.toLocaleString()}`,
      icon: DollarSign,
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      label: "Utilización",
      value: `${stats.utilizationRate}%`,
      icon: Activity,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="bg-white rounded-xl border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">
                {metric.label}
              </p>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
            </div>
            <div
              className={`h-12 w-12 ${metric.bgColor} rounded-lg flex items-center justify-center`}
            >
              <metric.icon className={`h-6 w-6 ${metric.iconColor}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
