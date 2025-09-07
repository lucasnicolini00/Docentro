import { requireDoctor } from "@/lib/auth-guards";
import { SettingsManagement } from "@/components/features/settings";
import { getDoctorSettings } from "@/lib/actions/settings";

export default async function DoctorSettings() {
  await requireDoctor();

  // Get doctor settings
  const settingsResult = await getDoctorSettings();

  if (!settingsResult.success) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h1 className="text-2xl font-bold text-gray-900">Error</h1>
          <p className="text-red-600 mt-2">{settingsResult.error}</p>
        </div>
      </div>
    );
  }

  return <SettingsManagement initialSettings={settingsResult.data} />;
}
