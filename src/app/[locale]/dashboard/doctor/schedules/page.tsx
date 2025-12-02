import { requireDoctor } from "@/lib/auth-guards";
import { getDoctorClinics, getDoctorSchedules } from "@/lib/actions";
import { EnhancedScheduleManagement } from "./components";
import { getT } from "@/lib/getT";

export const dynamic = "force-dynamic"; // Dashboard pages require auth & live data

export default async function SchedulesPage() {
  await requireDoctor();

  const [clinicsResult, schedulesResult] = await Promise.all([
    getDoctorClinics(),
    getDoctorSchedules(),
  ]);

  const clinics =
    clinicsResult.success && clinicsResult.data
      ? (clinicsResult.data.clinics || []).map((c: { id: string; name: string; address?: string | null }) => ({
          id: c.id,
          name: c.name,
          address: c.address ?? null,
        }))
      : [];

  const schedules =
    schedulesResult.success && schedulesResult.data ? schedulesResult.data : [];

  const t = await getT("dashboard_doctor");

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-900">
          {t("scheduleHeaderTitle")}
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          {t("scheduleHeaderSubtitle")}
        </p>
      </div>

      <EnhancedScheduleManagement
        initialSchedules={schedules}
        clinics={clinics}
      />
    </div>
  );
}
