import { getDoctorClinics } from "@/lib/actions/clinics";
import ClinicsManagement from "./ClinicsManagement";

export default async function ClinicsDataLoader() {
  // This server component handles the async data fetching
  const result = await getDoctorClinics();

  if (!result.success || !result.data) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Error al cargar las clínicas
        </h2>
        <p className="text-gray-600">{result.error}</p>
      </div>
    );
  }

  const { clinics } = result.data;

  return <ClinicsManagement initialClinics={clinics} />;
}
