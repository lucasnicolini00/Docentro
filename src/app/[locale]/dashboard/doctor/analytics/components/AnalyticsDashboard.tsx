"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import {
  getDashboardStats,
  getScheduleAnalytics,
  getPatientAnalytics,
  getRevenueAnalytics,
} from "@/lib/actions";
import { AlertCircle, ChevronDown } from "lucide-react";

// Import smaller components - now local
import MetricsCards from "./MetricsCards";
import WeeklyOverviewChart from "./WeeklyOverviewChart";
import PeakHoursChart from "./PeakHoursChart";
import AgeGroupsChart from "./AgeGroupsChart";
import PatientRetentionChart from "./PatientRetentionChart";
import RevenueOverview from "./RevenueOverview";
import RevenueByClinicChart from "./RevenueByClinicChart";
import ScheduleUtilization from "./ScheduleUtilization";
import InsightsPanel from "./InsightsPanel";
import TabNavigation from "./TabNavigation";

// Type definitions
export interface DashboardStats {
  todayAppointments: number;
  weekAppointments: number;
  monthlyRevenue: number;
  utilizationRate: number;
  pendingBookings: number;
  totalPatients: number;
}

export interface ScheduleAnalytics {
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

export interface PatientAnalytics {
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

export interface RevenueAnalytics {
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
type TabType = "overview" | "patients" | "revenue" | "schedule";

interface AnalyticsDashboardProps {
  initialData?: {
    stats: DashboardStats | null;
    schedule: ScheduleAnalytics | null;
    patient: PatientAnalytics | null;
    revenue: RevenueAnalytics | null;
  };
}

export default function AnalyticsDashboard({
  initialData,
}: AnalyticsDashboardProps) {
  const t = useTranslations("dashboard_doctor");
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [timeRange, setTimeRange] = useState<TimeRange>("month");
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);

  // State for analytics data
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(
    initialData?.stats || null
  );
  const [scheduleAnalytics, setScheduleAnalytics] =
    useState<ScheduleAnalytics | null>(initialData?.schedule || null);
  const [patientAnalytics, setPatientAnalytics] =
    useState<PatientAnalytics | null>(initialData?.patient || null);
  const [revenueAnalytics, setRevenueAnalytics] =
    useState<RevenueAnalytics | null>(initialData?.revenue || null);

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
        setError(t("errorLoadingDataGeneric"));
      }
    } catch (err) {
      console.error("Error fetching analytics:", err);
      setError(t("errorLoadingDataGeneric"));
    } finally {
      setLoading(false);
    }
  }, [timeRange, t]);

  useEffect(() => {
    // Skip initial fetch if we have data and timeRange is default
    if (initialData && timeRange === "month") {
      return;
    }
    fetchAnalytics();
  }, [fetchAnalytics, initialData, timeRange]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        {/* Metrics Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-3 w-full">
                  <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                  <div className="h-8 bg-gray-100 rounded w-3/4"></div>
                </div>
                <div className="h-12 w-12 bg-gray-100 rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
            >
              <div className="h-6 bg-gray-100 rounded w-1/3 mb-6"></div>
              <div className="space-y-4">
                {[...Array(5)].map((_, j) => (
                  <div key={j} className="flex items-center space-x-4">
                    <div className="h-4 bg-gray-100 rounded w-full"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <AlertCircle className="h-8 w-8 text-red-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-red-900 mb-2">
          {t("errorLoadingDataGeneric")}
        </h3>
        <p className="text-red-700 mb-4">{error}</p>
        <button
          onClick={fetchAnalytics}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          {t("retryAction")}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            {t("timeRangeLabel") || "Período"}
          </span>
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as TimeRange)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="week">{t("thisWeek")}</option>
              <option value="month">{t("thisMonth")}</option>
              <option value="quarter">{t("thisQuarter")}</option>
              <option value="year">{t("thisYear")}</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      {dashboardStats && <MetricsCards stats={dashboardStats} />}

      {/* Tab Navigation */}
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === "overview" && scheduleAnalytics && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WeeklyOverviewChart data={scheduleAnalytics.weeklyOverview} />
            <PeakHoursChart data={scheduleAnalytics.peakHours} />
          </div>
        )}

        {activeTab === "patients" && patientAnalytics && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AgeGroupsChart data={patientAnalytics.ageGroups} />
            <PatientRetentionChart
              retentionRate={patientAnalytics.retentionRate}
              returningPatients={patientAnalytics.returningPatients}
              newPatients={patientAnalytics.newPatients}
            />
          </div>
        )}

        {activeTab === "revenue" && revenueAnalytics && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RevenueOverview
              totalRevenue={revenueAnalytics.totalRevenue}
              averageValue={revenueAnalytics.averageValue}
              totalAppointments={revenueAnalytics.totalAppointments}
              growthRate={revenueAnalytics.growthRate}
            />
            <RevenueByClinicChart data={revenueAnalytics.revenueByClinic} />
          </div>
        )}

        {activeTab === "schedule" && scheduleAnalytics && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ScheduleUtilization
              utilizationRate={scheduleAnalytics.utilizationRate}
              bookedSlots={scheduleAnalytics.bookedSlots}
              availableSlots={scheduleAnalytics.availableSlots}
              blockedSlots={scheduleAnalytics.blockedSlots}
            />
            <InsightsPanel insights={scheduleAnalytics.insights} />
          </div>
        )}
      </div>
    </div>
  );
}
