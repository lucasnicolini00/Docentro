"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Users,
  BarChart3,
  Settings,
  Plus,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface DashboardStats {
  todayAppointments: number;
  weekAppointments: number;
  monthlyRevenue: number;
  utilizationRate: number;
  pendingBookings: number;
  totalPatients: number;
}

interface QuickAction {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<any>;
  color: string;
  description: string;
}

export default function DoctorDashboardOverview() {
  const [stats, setStats] = useState<DashboardStats>({
    todayAppointments: 0,
    weekAppointments: 0,
    monthlyRevenue: 0,
    utilizationRate: 0,
    pendingBookings: 0,
    totalPatients: 0,
  });

  const [loading, setLoading] = useState(true);

  // Load dashboard stats
  useEffect(() => {
    const loadStats = async () => {
      try {
        // Simulate loading stats (replace with actual API call)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setStats({
          todayAppointments: 8,
          weekAppointments: 42,
          monthlyRevenue: 125000,
          utilizationRate: 78,
          pendingBookings: 5,
          totalPatients: 234,
        });
      } catch (error) {
        console.error("Error loading stats:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const quickActions: QuickAction[] = [
    {
      id: "new-schedule",
      label: "Gestionar Horarios",
      href: "/dashboard/doctor/schedules",
      icon: Calendar,
      color: "bg-blue-500 hover:bg-blue-600",
      description: "Configurar disponibilidad y horarios",
    },
    {
      id: "view-appointments",
      label: "Ver Citas",
      href: "/dashboard/doctor/appointments",
      icon: Clock,
      color: "bg-green-500 hover:bg-green-600",
      description: "Revisar citas programadas",
    },
    {
      id: "manage-patients",
      label: "Pacientes",
      href: "/dashboard/doctor/patients",
      icon: Users,
      color: "bg-purple-500 hover:bg-purple-600",
      description: "Gestionar historial de pacientes",
    },
    {
      id: "view-analytics",
      label: "Analíticas",
      href: "/dashboard/doctor/analytics",
      icon: BarChart3,
      color: "bg-orange-500 hover:bg-orange-600",
      description: "Ver reportes y estadísticas",
    },
    {
      id: "settings",
      label: "Configuración",
      href: "/dashboard/doctor/profile",
      icon: Settings,
      color: "bg-gray-500 hover:bg-gray-600",
      description: "Ajustar preferencias del perfil",
    },
  ];

  const StatCard = ({
    title,
    value,
    change,
    changeType,
    icon: Icon,
    loading: cardLoading,
  }: {
    title: string;
    value: string | number;
    change?: string;
    changeType?: "increase" | "decrease";
    icon: React.ComponentType<any>;
    loading?: boolean;
  }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">
            {cardLoading ? (
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
            ) : (
              value
            )}
          </p>
          {change && (
            <div
              className={`flex items-center mt-2 text-sm ${
                changeType === "increase" ? "text-green-600" : "text-red-600"
              }`}
            >
              {changeType === "increase" ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              {change}
            </div>
          )}
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <Icon className="h-6 w-6 text-gray-600" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          ¡Bienvenido de vuelta, Dr. García!
        </h1>
        <p className="text-blue-100">
          Tienes {stats.todayAppointments} citas programadas para hoy y{" "}
          {stats.pendingBookings} solicitudes pendientes.
        </p>
        <div className="mt-4">
          <Link
            href="/dashboard/doctor/schedules"
            className="inline-flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Gestionar Horarios
          </Link>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Citas de Hoy"
          value={stats.todayAppointments}
          change="+2 más que ayer"
          changeType="increase"
          icon={Calendar}
          loading={loading}
        />
        <StatCard
          title="Esta Semana"
          value={stats.weekAppointments}
          change="+15% vs semana anterior"
          changeType="increase"
          icon={Clock}
          loading={loading}
        />
        <StatCard
          title="Ingresos del Mes"
          value={loading ? "" : `$${stats.monthlyRevenue.toLocaleString()}`}
          change="+8% vs mes anterior"
          changeType="increase"
          icon={BarChart3}
          loading={loading}
        />
        <StatCard
          title="Utilización"
          value={loading ? "" : `${stats.utilizationRate}%`}
          change="+5% vs mes anterior"
          changeType="increase"
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
          change="+12 este mes"
          changeType="increase"
          icon={Users}
          loading={loading}
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Acciones Rápidas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.id}
              href={action.href}
              className="group bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`p-3 rounded-lg ${action.color} transition-colors`}
                >
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {action.label}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {action.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Actividad Reciente
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Calendar className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Nueva cita agendada con Maria Rodriguez
                </p>
                <p className="text-xs text-gray-500">Hace 15 minutos</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Horario actualizado para el próximo viernes
                </p>
                <p className="text-xs text-gray-500">Hace 1 hora</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  3 nuevos pacientes registrados
                </p>
                <p className="text-xs text-gray-500">Hace 2 horas</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <Link
              href="/dashboard/doctor/activity"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Ver toda la actividad →
            </Link>
          </div>
        </div>
      </div>

      {/* Upcoming Appointments Preview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Próximas Citas
            </h3>
            <Link
              href="/dashboard/doctor/appointments"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Ver todas
            </Link>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Juan Pérez</p>
                <p className="text-sm text-gray-500">Consulta general</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">10:00 AM</p>
                <p className="text-xs text-gray-500">Hoy</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Ana García</p>
                <p className="text-sm text-gray-500">Control post-operatorio</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">11:30 AM</p>
                <p className="text-xs text-gray-500">Hoy</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Carlos López</p>
                <p className="text-sm text-gray-500">Primera consulta</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">2:00 PM</p>
                <p className="text-xs text-gray-500">Hoy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
