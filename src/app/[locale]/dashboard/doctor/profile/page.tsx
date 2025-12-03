import { requireDoctor } from "@/lib/auth-guards";
import { getDoctorProfile, getAllSpecialities } from "@/lib/actions";
import { DoctorProfileForm } from "@/components";

export const dynamic = "force-dynamic"; // profile uses live data and auth

export default async function DoctorProfilePage() {
  await requireDoctor();

  const [profileResult, specialitiesResult] = await Promise.all([
    getDoctorProfile(),
    getAllSpecialities(),
  ]);

  if (!profileResult.success || !profileResult.data) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <p className="text-red-800">
          {profileResult.error || "Error loading profile"}
        </p>
      </div>
    );
  }

  const doctor = profileResult.data;
  const allSpecialities =
    specialitiesResult.success && specialitiesResult.data
      ? specialitiesResult.data
      : [];

  return (
    <DoctorProfileForm doctor={doctor} allSpecialities={allSpecialities} />
  );
}
