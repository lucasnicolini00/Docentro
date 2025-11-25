import { getUpcomingAppointments } from "@/lib/actions/analytics";
import UpcomingAppointments from "./components/UpcomingAppointments";
import { getT } from "@/lib/getT";

export default async function DashboardAppointments() {
  const t = await getT("dashboard_doctor");
  const result = await getUpcomingAppointments();

  if (!result.success) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="text-red-800 font-medium">{t("errorLoadingData")}</h3>
        <p className="text-red-600 text-sm mt-2">{t("appointments")}: {result.error}</p>
      </div>
    );
  }

  return <UpcomingAppointments appointments={result.data} loading={false} />;
}
