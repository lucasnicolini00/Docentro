import { requireDoctor } from "@/lib/auth-guards";
import { getDoctorDashboard } from "@/lib/actions";
import DoctorAppointmentList from "./components/DoctorAppointmentList";
import CollapsibleHistorySection from "./components/CollapsibleHistorySection";
import { getT } from "@/lib/getT";

export const dynamic = "force-dynamic"; // appointments are live and auth-protected

export default async function DoctorAppointmentsPage() {
  await requireDoctor();

  const dashboard = await getDoctorDashboard();
  const data = dashboard.success && dashboard.data ? dashboard.data : null;

  const t = await getT("dashboard_doctor");

  const today = data?.appointments?.today ?? [];
  const pending = data?.appointments?.pending ?? [];
  const upcoming = data?.appointments?.upcoming ?? [];
  const past = data?.appointments?.past ?? [];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-900">
          {t("appointmentsPageHeader")}
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          {t("appointmentsPageDescription")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <DoctorAppointmentList
          appointments={today}
          title={t("appointmentsListTodayTitle")}
        />
        <DoctorAppointmentList
          appointments={pending}
          title={t("appointmentsListPendingTitle")}
        />
        <DoctorAppointmentList
          appointments={upcoming}
          title={t("appointmentsListUpcomingTitle")}
        />
        <CollapsibleHistorySection historicalAppointments={past} />
      </div>
    </div>
  );
}
