import { ClinicCardProps } from "./types";
import ClinicCardHeader from "./ClinicCardHeader";
import PricingList from "./PricingList";

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
