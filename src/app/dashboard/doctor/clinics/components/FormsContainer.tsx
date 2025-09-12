import ClinicForm from "./ClinicForm";
import PricingForm from "./PricingForm";
import { Clinic, Pricing } from "./types";

interface FormsContainerProps {
  // Clinic Form Props
  showClinicForm: boolean;
  editingClinic: Clinic | null;
  onCloseClinicForm: () => void;
  onSubmitClinic: (formData: FormData) => void;

  // Pricing Form Props
  showPricingForm: boolean;
  editingPricing: Pricing | null;
  clinics: Clinic[];
  selectedClinicId?: string;
  onClosePricingForm: () => void;
  onSubmitPricing: (formData: FormData) => void;
}

export default function FormsContainer({
  showClinicForm,
  editingClinic,
  onCloseClinicForm,
  onSubmitClinic,
  showPricingForm,
  editingPricing,
  clinics,
  selectedClinicId,
  onClosePricingForm,
  onSubmitPricing,
}: FormsContainerProps) {
  return (
    <>
      {/* Clinic Form */}
      {showClinicForm && (
        <ClinicForm
          isOpen={showClinicForm}
          onClose={onCloseClinicForm}
          onSubmit={onSubmitClinic}
          clinic={
            editingClinic
              ? {
                  id: editingClinic.id,
                  name: editingClinic.name,
                  address: editingClinic.address || "",
                  isVirtual: editingClinic.isVirtual,
                  country: editingClinic.country || "",
                  city: editingClinic.city || "",
                  neighborhood: editingClinic.neighborhood || "",
                }
              : undefined
          }
        />
      )}

      {/* Pricing Form */}
      {showPricingForm && (
        <PricingForm
          isOpen={showPricingForm}
          onClose={onClosePricingForm}
          onSubmit={onSubmitPricing}
          selectedClinicId={selectedClinicId}
          clinics={clinics.map((clinic) => ({
            id: clinic.id,
            name: clinic.name,
            isVirtual: clinic.isVirtual,
          }))}
          pricing={
            editingPricing
              ? {
                  id: editingPricing.id,
                  title: editingPricing.title,
                  price: editingPricing.price,
                  currency: editingPricing.currency,
                  durationMinutes: editingPricing.durationMinutes,
                  description: editingPricing.description || "",
                  isActive: editingPricing.isActive,
                }
              : undefined
          }
        />
      )}
    </>
  );
}
