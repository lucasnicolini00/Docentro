import { Clinic, Pricing } from "./types";
import ClinicCardHeader from "./ClinicCardHeader";
import PricingList from "./PricingList";

interface ClinicCardProps {
  clinic: Clinic;
  isExpanded: boolean;
  onToggleExpanded: (clinicId: string) => void;
  onEdit: (clinic: Clinic) => void;
  onDelete: (clinicId: string) => void;
  onAddPricing: (clinicId: string) => void;
  onEditPricing: (pricing: Pricing, clinicId: string) => void;
  onDeletePricing: (pricingId: string, clinicId: string) => void;
  onTogglePricingStatus: (pricingId: string, clinicId: string) => void;
  isPending: boolean;
}

export default function ClinicCard({
  clinic,
  isExpanded,
  onToggleExpanded,
  onEdit,
  onDelete,
  onAddPricing,
  onEditPricing,
  onDeletePricing,
  onTogglePricingStatus,
  isPending,
}: ClinicCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <ClinicCardHeader
        clinic={clinic}
        isExpanded={isExpanded}
        onToggleExpanded={onToggleExpanded}
        onEdit={onEdit}
        onDelete={onDelete}
        isPending={isPending}
      />

      {isExpanded && (
        <PricingList
          pricings={clinic.pricings}
          clinicId={clinic.id}
          onAddPricing={onAddPricing}
          onEditPricing={onEditPricing}
          onDeletePricing={onDeletePricing}
          onTogglePricingStatus={onTogglePricingStatus}
          isPending={isPending}
        />
      )}
    </div>
  );
}
