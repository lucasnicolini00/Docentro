import { requireDoctor } from "@/lib/auth-guards";
import { getDoctorClinics } from "@/lib/actions";
import ClinicsManagement from "./components/ClinicsManagement";

export const dynamic = "force-dynamic"; // requires live data & auth

export default async function DoctorClinicsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params; // locale inferred
  await requireDoctor();

  const clinicsResult = await getDoctorClinics();
  const initialClinics =
    clinicsResult.success && clinicsResult.data
      ? clinicsResult.data.clinics
      : [];

  return (
    <div className="p-6 space-y-6">
      <ClinicsManagement initialClinics={initialClinics} />
    </div>
  );
}
