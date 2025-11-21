"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { getScheduleAnalytics } from "@/lib/actions/analytics";

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
  doctorId?: string;
}

// Helper function to debounce API calls
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function ScheduleAnalytics({
  doctorId,
}: ScheduleAnalyticsProps) {
  const [analytics, setAnalytics] = useState<ScheduleAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<"week" | "month" | "quarter">(
    "week"
  );

  const t = useTranslations("dashboard_doctor");
  const locale = useLocale();

  // Debounce time range changes to avoid excessive API calls
  const debouncedTimeRange = useDebounce(timeRange, 300);

  // Memoized calculations to avoid re-computing on every render
  const analyticsInsights = useMemo(() => {
    if (!analytics?.schedulesByDay) {
      return { mostActiveDay: "N/A", leastActiveDay: "N/A" };
    }

    const entries = Object.entries(analytics.schedulesByDay);
    const activeEntries = entries.filter(([, slots]) => slots > 0);

    const mostActiveDay =
      entries.reduce(
        (max, [day, slots]) => (slots > max[1] ? [day, slots] : max),
        ["", 0]
      )[0] || "N/A";

    const leastActiveDay =
      activeEntries.length > 0
        ? activeEntries.reduce(
            (min, [day, slots]) => (slots < min[1] ? [day, slots] : min),
            ["", Infinity]
          )[0] || "N/A"
        : "N/A";

    return { mostActiveDay, leastActiveDay };
  }, [analytics?.schedulesByDay]);

  // Memoized max value for progress bars
  const maxSchedulesPerDay = useMemo(() => {
    if (!analytics?.schedulesByDay) return 1;
    return Math.max(...Object.values(analytics.schedulesByDay));
  }, [analytics?.schedulesByDay]);

  // Optimized fetch function with error handling and cleanup
  const fetchAnalytics = useCallback(
    async (
      range: "week" | "month" | "quarter",
      doctorId?: string,
      signal?: AbortSignal
    ) => {
      try {
        setLoading(true);
        setError(null);

        const result = await getScheduleAnalytics(range, doctorId);

        // Check if request was aborted
        if (signal?.aborted) return;

        if (result.success && result.data) {
          setAnalytics(result.data);
        } else {
          setError(result.error || t("scheduleStatsLoadError"));
          setAnalytics(null);
        }
      } catch (err) {
        // Check if request was aborted
        if (signal?.aborted) return;

        console.error("🔍 CLIENT: Error loading analytics:", err);
        setError(t("errorLoadingDataGeneric"));
        setAnalytics(null);
      } finally {
        if (!signal?.aborted) {
          setLoading(false);
        }
      }
    },
    [t]
  );

  // Effect with cleanup and abort controller
  useEffect(() => {
    const abortController = new AbortController();

    fetchAnalytics(debouncedTimeRange, doctorId, abortController.signal);

    // Cleanup function to abort pending requests
    return () => {
      abortController.abort();
    };
  }, [fetchAnalytics, doctorId, debouncedTimeRange]);

  // Optimized time range change handler
  const handleTimeRangeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setTimeRange(e.target.value as "week" | "month" | "quarter");
    },
    []
  );

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

  // Show error state
  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="text-center py-8">
          <p className="text-red-600 mb-2">{error}</p>
          <button
            onClick={() => fetchAnalytics(timeRange, doctorId)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t("retryAction")}
          </button>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <p className="text-gray-500">{t("scheduleStatsLoadError")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {t("scheduleAnalyticsTitle")}
          </h2>
          <select
            value={timeRange}
            onChange={handleTimeRangeChange}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">{t("thisWeek")}</option>
            <option value="month">{t("thisMonth")}</option>
            <option value="quarter">{t("thisQuarter")}</option>
          </select>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600 font-medium">
              {t("totalSchedulesLabel")}
            </p>
            <p className="text-2xl font-bold text-blue-900">
              {analytics.totalSlots}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600 font-medium">
              {t("availableSchedulesLabel")}
            </p>
            <p className="text-2xl font-bold text-green-900">
              {analytics.availableSlots}
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-purple-600 font-medium">
              {t("bookedSchedulesLabel")}
            </p>
            <p className="text-2xl font-bold text-purple-900">
              {analytics.bookedSlots}
            </p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm text-orange-600 font-medium">
              {t("scheduleUtilizationRateLabel")}
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
            {t("distributionByWeekdayTitle")}
          </h3>
          <div className="space-y-3">
            {Object.entries(analytics.schedulesByDay || {}).map(
              ([day, slots]) => (
                <div key={day} className="flex items-center gap-4">
                  <span className="text-sm text-gray-600 capitalize w-20 flex-shrink-0">
                    {day}
                  </span>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min(
                            100,
                            (slots / maxSchedulesPerDay) * 100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-8 text-right flex-shrink-0">
                    {slots}
                  </span>
                </div>
              )
            )}
          </div>

          {/* Optimized Insights Section */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-700">
                {t("summaryLabel")}
              </h4>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-xs text-gray-500">
                  {t("schedulesPerDayLabel")}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-blue-50 p-2 rounded">
                <p className="text-blue-700 font-medium">
                  {t("mostActiveDayLabel")}
                </p>
                <p className="text-blue-900 font-semibold">
                  {analyticsInsights.mostActiveDay}
                </p>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <p className="text-gray-700 font-medium">
                  {t("leastActiveDayLabel")}
                </p>
                <p className="text-gray-900 font-semibold">
                  {analyticsInsights.leastActiveDay}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Week Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t("next7DaysTitle")}
          </h3>
          <div className="space-y-3">
            {(analytics.upcomingWeekSlots || []).map((day) => (
              <div
                key={day.date}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {new Date(day.date).toLocaleDateString(
                      locale === "es" ? "es-ES" : "en-US",
                      {
                        weekday: "long",
                        day: "numeric",
                        month: "short",
                      }
                    )}
                  </p>
                  <p className="text-sm text-gray-600">
                    {day.availableSlots + day.bookedSlots}{" "}
                    {t("totalSchedulesSuffix")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">
                    {day.availableSlots} {t("availableSuffix")}
                  </p>
                  <p className="text-sm font-medium text-purple-600">
                    {day.bookedSlots} {t("bookedSuffix")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
