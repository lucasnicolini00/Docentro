import { requireDoctor } from "@/lib/auth-guards";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import { getT } from "@/lib/getT";
import { BarChart3 } from "lucide-react";
import {
  getDashboardStats,
  getScheduleAnalytics,
  getPatientAnalytics,
  getRevenueAnalytics,
} from "@/lib/actions";

export const dynamic = "force-dynamic"; // analytics depend on live data

export default async function DoctorAnalyticsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  await requireDoctor();

  const t = await getT("dashboard_doctor", locale);

  // Pre-fetch data for the default view (month)
  const [statsResult, scheduleResult, patientResult, revenueResult] =
    await Promise.all([
      getDashboardStats(),
      getScheduleAnalytics("month"),
      getPatientAnalytics(undefined, "month"),
      getRevenueAnalytics(undefined, "month"),
    ]);

  const initialData = {
    stats: statsResult.success ? statsResult.data : null,
    schedule: scheduleResult.success ? scheduleResult.data : null,
    patient: patientResult.success ? patientResult.data : null,
    revenue: revenueResult.success ? revenueResult.data : null,
  };

  return (
    <>
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <BarChart3 className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {t("analyticsTitle")}
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              {t("analyticsHeaderSubtitle")}
            </p>
          </div>
        </div>
      </div>

      <AnalyticsDashboard initialData={initialData} />
    </>
  );
}
