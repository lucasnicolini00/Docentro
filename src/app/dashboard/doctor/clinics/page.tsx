import { requireDoctor } from "@/lib/auth-guards";
import { getDoctorClinics } from "@/lib/actions/clinics";
import ClinicsManagement from "./components/ClinicsManagement";

export default async function DoctorClinicsPage() {
  // Ensure user is authenticated as a doctor
  await requireDoctor();

  // Get doctor clinics data using Server Action
  const result = await getDoctorClinics();

  if (!result.success || !result.data) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Error al cargar las clínicas
          </h2>
          <p className="text-gray-600">{result.error}</p>
        </div>
      </div>
    );
  }

  const { clinics } = result.data;

  return (
    <div className="p-6">
      <ClinicsManagement initialClinics={clinics} />
    </div>
  );
}
