import { getRecentActivities } from "@/lib/actions/analytics";
import RecentActivity from "./components/RecentActivity";
import { getT } from "@/lib/getT";

export default async function DashboardActivities() {
  const t = await getT("dashboard_doctor");
  const result = await getRecentActivities();

  if (!result.success) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="text-red-800 font-medium">{t("errorLoadingData")}</h3>
        <p className="text-red-600 text-sm mt-2">{t("activities")}: {result.error}</p>
      </div>
    );
  }

  return <RecentActivity activities={result.data} loading={false} />;
}
