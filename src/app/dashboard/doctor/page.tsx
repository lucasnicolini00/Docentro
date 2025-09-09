import { requireDoctor } from "@/lib/auth-guards";
import { DoctorDashboardOverview } from "@/components/features";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function DoctorDashboard() {
  // Ensure user is authenticated as a doctor
  await requireDoctor();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="rounded-md bg-white shadow-sm border-b border-gray-200 flex items-center mx-auto px-4 py-6 sm:px-6 lg:px-8 justify-between">
        <div className="max-w-7xl ">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gestiona tu práctica médica desde un solo lugar
          </p>
        </div>
        <div className="mt-4">
          <Link
            href="/dashboard/doctor/schedules"
            className="inline-flex items-center text-md px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Gestionar Horarios
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <DoctorDashboardOverview />
      </div>
    </div>
  );
}
