import { requireDoctor } from "@/lib/auth-guards";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import { getT } from "@/lib/getT";
import { BarChart3 } from "lucide-react";

export const dynamic = "force-dynamic"; // analytics depend on live data

export default async function DoctorAnalyticsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params; // locale inferred by next-intl; no direct usage needed
  await requireDoctor();

  const t = await getT("dashboard_doctor");

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

      <AnalyticsDashboard />
    </>
  );
}
