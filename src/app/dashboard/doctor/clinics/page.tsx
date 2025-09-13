import { requireDoctor } from "@/lib/auth-guards";
import ClinicsDataLoader from "./components/ClinicsDataLoader";

export default async function DoctorClinicsPage() {
  // Ensure user is authenticated as a doctor
  await requireDoctor();

  return (
    <div className="p-6">
      {/* Suspense with enhanced loading fallback */}
      <ClinicsDataLoader />
    </div>
  );
}
