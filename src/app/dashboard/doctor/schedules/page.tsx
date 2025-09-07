import { requireDoctor } from "@/lib/auth-guards";
import { getDoctorSchedules, getDoctorClinics } from "@/lib/actions";
import {
  EnhancedScheduleManagement,
  ScheduleAnalytics,
} from "@/components/features";
import { SchedulesPageWrapper } from "@/components/ui/navigation";

export default async function DoctorSchedules() {
  await requireDoctor();

  // Get doctor's schedules and clinics
  const [schedulesResult, clinicsResult] = await Promise.all([
    getDoctorSchedules(),
    getDoctorClinics(),
  ]);

  if (!schedulesResult.success || !clinicsResult.success) {
    return (
      <SchedulesPageWrapper>
        <div className="text-center py-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Error al cargar los datos
          </h2>
          <p className="text-gray-600">
            {schedulesResult.error || clinicsResult.error}
          </p>
        </div>
      </SchedulesPageWrapper>
    );
  }

  const schedules = schedulesResult.data || [];
  const clinics = clinicsResult.data?.clinics || [];

  return (
    <SchedulesPageWrapper>
      <div className="space-y-8">
        {/* Analytics Section */}
        <ScheduleAnalytics doctorId="current-doctor-id" />

        {/* Schedule Management Section */}
        <EnhancedScheduleManagement
          initialSchedules={schedules}
          clinics={clinics}
        />
      </div>
    </SchedulesPageWrapper>
  );
}
