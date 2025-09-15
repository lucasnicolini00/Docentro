import { requireDoctor } from "@/lib/auth-guards";
import { getDoctorSchedules, getDoctorClinics } from "@/lib/actions";
import EnhancedScheduleManagement from "./components/EnhancedScheduleManagement";

export default async function DoctorSchedules() {
  await requireDoctor();

  // Get doctor's schedules and clinics
  const [schedulesResult, clinicsResult] = await Promise.all([
    getDoctorSchedules(),
    getDoctorClinics(),
  ]);

  if (!schedulesResult.success || !clinicsResult.success) {
    return (
      <div className="p-6">
        <div className="text-center py-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Error al cargar los datos
          </h2>
          <p className="text-gray-600">
            {schedulesResult.error || clinicsResult.error}
          </p>
        </div>
      </div>
    );
  }

  const schedules = schedulesResult.data || [];
  const clinics = clinicsResult.data?.clinics || [];

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Horarios de Atención
        </h1>
        <p className="text-gray-600 mt-1">
          Configura tu disponibilidad semanal
        </p>
      </div>

      <div className="space-y-8">
        {/* Analytics Section */}
        {/* <ScheduleAnalytics /> */}

        {/* Schedule Management Section */}
        <EnhancedScheduleManagement
          initialSchedules={schedules}
          clinics={clinics}
        />
      </div>
    </div>
  );
}
