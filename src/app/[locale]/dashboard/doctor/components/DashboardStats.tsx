import { getDashboardStats } from "@/lib/actions/analytics";
import StatisticsGrid from "./components/StatisticsGrid";
import { getT } from "@/lib/getT";

export default async function DashboardStats() {
  const t = await getT("dashboard_doctor");
  const result = await getDashboardStats();
  
  // Handle error state or empty state if needed
  if (!result.success) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="text-red-800 font-medium">{t("errorLoadingData")}</h3>
        <p className="text-red-600 text-sm mt-2">{t("stats")}: {result.error}</p>
      </div>
    );
  }

  return <StatisticsGrid stats={result.data} loading={false} />;
}
