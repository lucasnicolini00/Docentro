"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getDashboardStats,
  getScheduleAnalytics,
  getPatientAnalytics,
  getRevenueAnalytics,
} from "@/lib/actions";
import {
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  Activity,
  Clock,
  Target,
  AlertCircle,
  ChevronDown,
} from "lucide-react";

interface DashboardStats {
  todayAppointments: number;
  weekAppointments: number;
  monthlyRevenue: number;
  utilizationRate: number;
  pendingBookings: number;
  totalPatients: number;
}

interface ScheduleAnalytics {
  totalSlots: number;
  bookedSlots: number;
  availableSlots: number;
  blockedSlots: number;
  utilizationRate: number;
  weeklyOverview: Array<{
    day: string;
    booked: number;
    available: number;
    blocked: number;
  }>;
  peakHours: Array<{ hour: number; count: number }>;
  insights: string[];
}

interface PatientAnalytics {
  totalPatients: number;
  newPatients: number;
  returningPatients: number;
  retentionRate: number;
  ageGroups: Record<string, number>;
  genderDistribution: Record<string, number>;
  monthlyTrends: Array<{
    month: string;
    patients: number;
    appointments: number;
    revenue: number;
  }>;
  insights: string[];
}

interface RevenueAnalytics {
  totalRevenue: number;
  averageValue: number;
  totalAppointments: number;
  growthRate: number;
  revenueByClinic: Record<string, number>;
  dailyRevenue: Array<{
    date: string;
    revenue: number;
    appointments: number;
  }>;
  insights: string[];
}

type TimeRange = "week" | "month" | "quarter" | "year";

export default function AnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "patients" | "revenue" | "schedule"
  >("overview");
  const [timeRange, setTimeRange] = useState<TimeRange>("month");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for analytics data
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(
    null
  );
  const [scheduleAnalytics, setScheduleAnalytics] =
    useState<ScheduleAnalytics | null>(null);
  const [patientAnalytics, setPatientAnalytics] =
    useState<PatientAnalytics | null>(null);
  const [revenueAnalytics, setRevenueAnalytics] =
    useState<RevenueAnalytics | null>(null);

  // Fetch analytics data
  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Adjust timeRange for different analytics functions
      const scheduleTimeRange = timeRange === "year" ? "quarter" : timeRange;
      const patientTimeRange = timeRange === "week" ? "month" : timeRange;
      const revenueTimeRange = timeRange === "week" ? "month" : timeRange;

      const [statsResult, scheduleResult, patientResult, revenueResult] =
        await Promise.all([
          getDashboardStats(),
          getScheduleAnalytics(scheduleTimeRange),
          getPatientAnalytics(undefined, patientTimeRange),
          getRevenueAnalytics(undefined, revenueTimeRange),
        ]);

      if (statsResult.success) {
        setDashboardStats(statsResult.data);
      }

      if (scheduleResult.success) {
        setScheduleAnalytics(scheduleResult.data);
      }

      if (patientResult.success) {
        setPatientAnalytics(patientResult.data);
      }

      if (revenueResult.success) {
        setRevenueAnalytics(revenueResult.data);
      }

      if (
        !statsResult.success &&
        !scheduleResult.success &&
        !patientResult.success &&
        !revenueResult.success
      ) {
        setError("Error al cargar los datos del dashboard");
      }
    } catch (err) {
      console.error("Error fetching analytics:", err);
      setError("Error al cargar los datos del dashboard");
    } finally {
      setLoading(false);
    }
  }, [timeRange]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border p-6">
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-red-900 mb-2">
            Error al cargar datos
          </h3>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={fetchAnalytics}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Insights y métricas de tu práctica médica
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="mt-4 lg:mt-0">
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as TimeRange)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="week">Esta semana</option>
              <option value="month">Este mes</option>
              <option value="quarter">Este trimestre</option>
              <option value="year">Este año</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      {dashboardStats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Citas Hoy</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardStats.todayAppointments}
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Pacientes Totales
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardStats.totalPatients}
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Ingresos del Mes
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ${dashboardStats.monthlyRevenue.toLocaleString()}
                </p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Utilización</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardStats.utilizationRate}%
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: "overview", label: "Resumen", icon: BarChart3 },
            { id: "schedule", label: "Horarios", icon: Clock },
            { id: "patients", label: "Pacientes", icon: Users },
            { id: "revenue", label: "Ingresos", icon: DollarSign },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === "overview" && scheduleAnalytics && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Overview Chart */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Resumen Semanal
              </h3>
              <div className="space-y-3">
                {scheduleAnalytics.weeklyOverview.map((day, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 text-sm font-medium text-gray-600">
                      {day.day}
                    </div>
                    <div className="flex-1 flex space-x-1">
                      <div
                        className="bg-green-500 h-4 rounded"
                        style={{
                          width: `${
                            (day.booked /
                              (day.booked + day.available + day.blocked)) *
                            100
                          }%`,
                        }}
                        title={`Ocupados: ${day.booked}`}
                      ></div>
                      <div
                        className="bg-blue-500 h-4 rounded"
                        style={{
                          width: `${
                            (day.available /
                              (day.booked + day.available + day.blocked)) *
                            100
                          }%`,
                        }}
                        title={`Disponibles: ${day.available}`}
                      ></div>
                      <div
                        className="bg-gray-400 h-4 rounded"
                        style={{
                          width: `${
                            (day.blocked /
                              (day.booked + day.available + day.blocked)) *
                            100
                          }%`,
                        }}
                        title={`Bloqueados: ${day.blocked}`}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-600 w-20 text-right">
                      {day.booked + day.available + day.blocked} slots
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center space-x-4 text-xs">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span>Ocupados</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span>Disponibles</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-gray-400 rounded"></div>
                  <span>Bloqueados</span>
                </div>
              </div>
            </div>

            {/* Peak Hours */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Horas Pico
              </h3>
              <div className="space-y-3">
                {scheduleAnalytics.peakHours.map((hour, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          #{index + 1}
                        </span>
                      </div>
                      <span className="font-medium">{hour.hour}:00</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {hour.count} citas
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "patients" && patientAnalytics && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Age Groups */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Distribución por Edad
              </h3>
              <div className="space-y-3">
                {Object.entries(patientAnalytics.ageGroups).map(
                  ([group, count]) => (
                    <div
                      key={group}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm font-medium">{group} años</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width: `${
                                (count /
                                  Math.max(
                                    ...Object.values(patientAnalytics.ageGroups)
                                  )) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-8 text-right">
                          {count}
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Patient Retention */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Retención de Pacientes
              </h3>
              <div className="text-center">
                <div className="relative inline-flex items-center justify-center w-32 h-32">
                  <svg
                    className="w-32 h-32 transform -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#3b82f6"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${
                        (patientAnalytics.retentionRate / 100) * 251.3
                      } 251.3`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">
                      {patientAnalytics.retentionRate}%
                    </span>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {patientAnalytics.returningPatients}
                    </div>
                    <div className="text-sm text-gray-600">Recurrentes</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {patientAnalytics.newPatients}
                    </div>
                    <div className="text-sm text-gray-600">Nuevos</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "revenue" && revenueAnalytics && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Overview */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Resumen de Ingresos
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Ingresos Totales:</span>
                  <span className="text-2xl font-bold text-green-600">
                    ${revenueAnalytics.totalRevenue.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Valor Promedio:</span>
                  <span className="text-lg font-semibold">
                    $
                    {Math.round(revenueAnalytics.averageValue).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Citas:</span>
                  <span className="text-lg font-semibold">
                    {revenueAnalytics.totalAppointments}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Crecimiento:</span>
                  <span
                    className={`text-lg font-semibold flex items-center ${
                      revenueAnalytics.growthRate >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    <TrendingUp className="h-4 w-4 mr-1" />
                    {revenueAnalytics.growthRate}%
                  </span>
                </div>
              </div>
            </div>

            {/* Revenue by Clinic */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Ingresos por Clínica
              </h3>
              <div className="space-y-3">
                {Object.entries(revenueAnalytics.revenueByClinic).map(
                  ([clinic, revenue]) => (
                    <div
                      key={clinic}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm font-medium truncate flex-1 mr-4">
                        {clinic}
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{
                              width: `${
                                (revenue /
                                  Math.max(
                                    ...Object.values(
                                      revenueAnalytics.revenueByClinic
                                    )
                                  )) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-20 text-right">
                          ${revenue.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "schedule" && scheduleAnalytics && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Schedule Utilization */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Utilización de Horarios
              </h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {scheduleAnalytics.utilizationRate}%
                  </div>
                  <div className="text-gray-600">Tasa de Utilización</div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-green-600">
                      {scheduleAnalytics.bookedSlots}
                    </div>
                    <div className="text-xs text-gray-600">Ocupados</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-blue-600">
                      {scheduleAnalytics.availableSlots}
                    </div>
                    <div className="text-xs text-gray-600">Disponibles</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-600">
                      {scheduleAnalytics.blockedSlots}
                    </div>
                    <div className="text-xs text-gray-600">Bloqueados</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Insights */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Insights y Recomendaciones
              </h3>
              <div className="space-y-3">
                {scheduleAnalytics.insights.map((insight, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Target className="h-3 w-3 text-blue-600" />
                    </div>
                    <p className="text-sm text-gray-700">{insight}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
