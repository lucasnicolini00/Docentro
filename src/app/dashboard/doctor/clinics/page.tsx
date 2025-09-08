import { requireDoctor } from "@/lib/auth-guards";
import { getDoctorClinics } from "@/lib/actions/clinics";
import { ClinicsPageWrapper } from "@/components/ui/navigation";
import ClinicsManagement from "./components/ClinicsManagementRefactored";

export default async function DoctorClinicsPage() {
  // Ensure user is authenticated as a doctor
  await requireDoctor();

  // Get doctor clinics data using Server Action
  const result = await getDoctorClinics();

  if (!result.success || !result.data) {
    return (
      <ClinicsPageWrapper>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Error al cargar las clínicas
          </h2>
          <p className="text-gray-600">{result.error}</p>
        </div>
      </ClinicsPageWrapper>
    );
  }

  const { clinics } = result.data;

  // Transform clinics data to handle Decimal price conversion
  const transformedClinics = clinics.map((clinic: any) => ({
    ...clinic,
    pricings: clinic.pricings.map((pricing: any) => ({
      ...pricing,
      price:
        typeof pricing.price === "number"
          ? pricing.price
          : Number(pricing.price),
    })),
  }));

  return (
    <ClinicsPageWrapper>
      <ClinicsManagement initialClinics={transformedClinics} />
    </ClinicsPageWrapper>
  );
}
