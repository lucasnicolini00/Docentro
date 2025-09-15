import { requireDoctor } from "@/lib/auth-guards";
import { getDoctorSchedules, getDoctorClinics } from "@/lib/actions";
import { Calendar } from "lucide-react";
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
        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
          <div className="text-center">
            <div className="bg-red-100 p-3 rounded-lg w-fit mx-auto mb-4">
              <Calendar className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Error al cargar los datos
            </h2>
            <p className="text-gray-600">
              {schedulesResult.error || clinicsResult.error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const schedules = schedulesResult.data || [];
  const clinics = clinicsResult.data?.clinics || [];

  return (
    <div className="p-6">
      {/* Simple Page Header */}
      <div className="mb-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Horarios de Atención
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                Gestiona tus horarios de atención en las diferentes clínicas
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Schedule Management Section */}
        <EnhancedScheduleManagement
          initialSchedules={schedules}
          clinics={clinics}
        />
      </div>
    </div>
  );
}
