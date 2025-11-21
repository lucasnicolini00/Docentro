import { requirePatient } from "@/lib/auth-guards";
import { getPatientProfile } from "@/lib/actions";
import { getT } from "@/lib/getT";
import { PatientProfileForm } from "@/components";

export const dynamic = "force-dynamic";

export default async function PatientProfilePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  await requirePatient();

  const profile = await getPatientProfile();
  const patient = profile.success ? profile.data : null;

  const t = await getT("dashboard_patient");

  if (!patient) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <p className="text-red-800">{t("patientInfoNotFound")}</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          {t("myProfile")}
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          {t("managePersonalMedicalInfo")}
        </p>
      </div>

      <PatientProfileForm patient={patient} />
    </>
  );
}
