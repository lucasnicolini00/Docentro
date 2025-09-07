"use client";

import { useState, useEffect } from "react";

interface ScheduleAnalytics {
  totalSlots: number;
  availableSlots: number;
  bookedSlots: number;
  blockedSlots: number;
  utilizationRate: number;
  schedulesByDay: Record<string, number>;
  upcomingWeekSlots: Array<{
    date: string;
    availableSlots: number;
    bookedSlots: number;
  }>;
}

interface ScheduleAnalyticsProps {
  doctorId: string;
}

export default function ScheduleAnalytics({
  doctorId,
}: ScheduleAnalyticsProps) {
  const [analytics, setAnalytics] = useState<ScheduleAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<"week" | "month" | "quarter">(
    "week"
  );

  useEffect(() => {
    fetchAnalytics();
  }, [doctorId, timeRange]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data - replace with real API response
      const mockAnalytics: ScheduleAnalytics = {
        totalSlots: 280,
        availableSlots: 145,
        bookedSlots: 98,
        blockedSlots: 37,
        utilizationRate: 35,
        schedulesByDay: {
          Lunes: 42,
          Martes: 39,
          Miércoles: 44,
          Jueves: 41,
          Viernes: 38,
          Sábado: 28,
          Domingo: 0,
        },
        upcomingWeekSlots: [
          { date: "2025-09-08", availableSlots: 8, bookedSlots: 4 },
          { date: "2025-09-09", availableSlots: 6, bookedSlots: 6 },
          { date: "2025-09-10", availableSlots: 7, bookedSlots: 5 },
          { date: "2025-09-11", availableSlots: 8, bookedSlots: 4 },
          { date: "2025-09-12", availableSlots: 9, bookedSlots: 3 },
          { date: "2025-09-13", availableSlots: 5, bookedSlots: 2 },
          { date: "2025-09-14", availableSlots: 0, bookedSlots: 0 },
        ],
      };

      setAnalytics(mockAnalytics);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4 w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <p className="text-gray-500">No se pudieron cargar las estadísticas.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Análisis de Horarios
          </h2>
          <select
            value={timeRange}
            onChange={(e) =>
              setTimeRange(e.target.value as "week" | "month" | "quarter")
            }
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">Esta semana</option>
            <option value="month">Este mes</option>
            <option value="quarter">Este trimestre</option>
          </select>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600 font-medium">
              Total de Horarios
            </p>
            <p className="text-2xl font-bold text-blue-900">
              {analytics.totalSlots}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600 font-medium">Disponibles</p>
            <p className="text-2xl font-bold text-green-900">
              {analytics.availableSlots}
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-purple-600 font-medium">Reservados</p>
            <p className="text-2xl font-bold text-purple-900">
              {analytics.bookedSlots}
            </p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm text-orange-600 font-medium">
              Tasa de Ocupación
            </p>
            <p className="text-2xl font-bold text-orange-900">
              {analytics.utilizationRate}%
            </p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Schedule Distribution by Day */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Distribución por Día de la Semana
          </h3>
          <div className="space-y-3">
            {Object.entries(analytics.schedulesByDay).map(([day, slots]) => (
              <div key={day} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 w-20">
                  {day}
                </span>
                <div className="flex-1 mx-4">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${
                          (slots /
                            Math.max(
                              ...Object.values(analytics.schedulesByDay)
                            )) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm font-semibold text-gray-900 w-8">
                  {slots}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Week Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Próxima Semana
          </h3>
          <div className="space-y-3">
            {analytics.upcomingWeekSlots.map((day) => (
              <div
                key={day.date}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {new Date(day.date).toLocaleDateString("es-ES", {
                      weekday: "long",
                      day: "numeric",
                      month: "short",
                    })}
                  </p>
                  <p className="text-sm text-gray-600">
                    {day.availableSlots + day.bookedSlots} horarios total
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">
                    {day.availableSlots} disponibles
                  </p>
                  <p className="text-sm font-medium text-purple-600">
                    {day.bookedSlots} reservados
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Utilization Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Distribución de Horarios
        </h3>
        <div className="flex items-center space-x-8">
          {/* Pie Chart Representation */}
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
              {/* Background circle */}
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#f3f4f6"
                strokeWidth="2"
              />
              {/* Available slots */}
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
                strokeDasharray={`${
                  (analytics.availableSlots / analytics.totalSlots) * 100
                }, 100`}
              />
              {/* Booked slots */}
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="2"
                strokeDasharray={`${
                  (analytics.bookedSlots / analytics.totalSlots) * 100
                }, 100`}
                strokeDashoffset={`-${
                  (analytics.availableSlots / analytics.totalSlots) * 100
                }`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-gray-900">
                {analytics.utilizationRate}%
              </span>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">
                Disponibles ({analytics.availableSlots})
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-700">
                Reservados ({analytics.bookedSlots})
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-700">
                Bloqueados ({analytics.blockedSlots})
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Acciones Recomendadas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
            <h4 className="font-medium text-blue-900 mb-2">
              📈 Optimizar Horarios
            </h4>
            <p className="text-sm text-blue-700 mb-3">
              Tu tasa de ocupación es del {analytics.utilizationRate}%.
              Considera ajustar horarios en días menos concurridos.
            </p>
            <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
              Ver Sugerencias
            </button>
          </div>

          <div className="p-4 border border-green-200 rounded-lg bg-green-50">
            <h4 className="font-medium text-green-900 mb-2">
              ⏰ Horarios Populares
            </h4>
            <p className="text-sm text-green-700 mb-3">
              Los{" "}
              {Object.entries(analytics.schedulesByDay)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 2)
                .map(([day]) => day)
                .join(" y ")}{" "}
              son tus días más solicitados.
            </p>
            <button className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
              Aumentar Capacidad
            </button>
          </div>

          <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
            <h4 className="font-medium text-purple-900 mb-2">
              📊 Exportar Datos
            </h4>
            <p className="text-sm text-purple-700 mb-3">
              Descarga un reporte completo de tus estadísticas de horarios y
              citas.
            </p>
            <button className="text-sm bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700">
              Descargar Reporte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
