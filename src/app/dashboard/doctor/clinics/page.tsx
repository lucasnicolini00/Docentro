import { requireDoctor } from "@/lib/auth-guards";
import { Suspense } from "react";
import ClinicsDataLoader from "./components/ClinicsDataLoader";
import ClinicsLoadingFallback from "./components/ClinicsLoadingFallback";

export default async function DoctorClinicsPage() {
  // Ensure user is authenticated as a doctor
  await requireDoctor();

  return (
    <div className="p-6">
      {/* Suspense with enhanced loading fallback */}
      <Suspense fallback={<ClinicsLoadingFallback />}>
        <ClinicsDataLoader />
      </Suspense>
    </div>
  );
}
