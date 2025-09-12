import { ClinicsListProps } from "./types";
import ClinicCard from "./ClinicCard";
import EmptyState from "./EmptyState";

export default function ClinicsList({
  clinics,
  expandedClinics,
  onToggleExpanded,
  onAddClinic,
  onEditClinic,
  onDeleteClinic,
  onAddPricing,
  onEditPricing,
  onDeletePricing,
  onTogglePricingStatus,
  isPending,
}: ClinicsListProps) {
  if (clinics.length === 0) {
    return <EmptyState onAddClinic={onAddClinic} />;
  }

  return (
    <div className="space-y-4">
      {clinics.map((clinic) => (
        <ClinicCard
          key={clinic.id}
          clinic={clinic}
          isExpanded={expandedClinics.has(clinic.id)}
          onToggleExpanded={onToggleExpanded}
          onEdit={onEditClinic}
          onDelete={onDeleteClinic}
          onAddPricing={onAddPricing}
          onEditPricing={onEditPricing}
          onDeletePricing={onDeletePricing}
          onTogglePricingStatus={onTogglePricingStatus}
          isPending={isPending}
        />
      ))}
    </div>
  );
}
