export interface Clinic {
  id: string;
  name: string;
  address: string | null;
  country: string | null;
  city: string | null;
  neighborhood: string | null;
  latitude: number | null;
  longitude: number | null;
  isVirtual: boolean;
  pricings: Pricing[];
  _count?: {
    appointments: number;
  };
}

export interface Pricing {
  id: string;
  title: string;
  price: number;
  currency: string;
  durationMinutes: number;
  description: string | null;
  isActive: boolean;
}

export interface ClinicsManagementProps {
  initialClinics: Clinic[];
}

export interface ClinicCardProps {
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

export interface ClinicCardHeaderProps {
  clinic: Clinic;
  isExpanded: boolean;
  onToggleExpanded: (clinicId: string) => void;
  onEdit: (clinic: Clinic) => void;
  onDelete: (clinicId: string) => void;
  isPending: boolean;
}

export interface ClinicFormProps {
  isOpen: boolean;
  onClose: () => void;
  clinic?: {
    id?: string;
    name: string;
    address: string;
    isVirtual: boolean;
    country?: string;
    city?: string;
    neighborhood?: string;
    latitude?: number;
    longitude?: number;
  };
  onSubmit: (clinicData: any) => void;
}

export interface ClinicsHeaderProps {
  onAddClinic: () => void;
  isPending: boolean;
}

export interface ClinicsListProps {
  clinics: Clinic[];
  expandedClinics: Set<string>;
  onToggleExpanded: (clinicId: string) => void;
  onAddClinic: () => void;
  onEditClinic: (clinic: Clinic) => void;
  onDeleteClinic: (clinicId: string) => void;
  onAddPricing: (clinicId: string) => void;
  onEditPricing: (pricing: Pricing, clinicId: string) => void;
  onDeletePricing: (pricingId: string, clinicId: string) => void;
  onTogglePricingStatus: (pricingId: string, clinicId: string) => void;
  isPending: boolean;
}

export interface FormsContainerProps {
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

export interface PricingFormProps {
  isOpen: boolean;
  onClose: () => void;
  pricing?: {
    id?: string;
    title: string;
    price: number;
    currency: string;
    durationMinutes: number;
    description: string;
    isActive: boolean;
  };
  clinics: Array<{
    id: string;
    name: string;
    isVirtual: boolean;
  }>;
  selectedClinicId?: string;
  onSubmit: (pricingData: any) => void;
}

export interface PricingListProps {
  pricings: Pricing[];
  clinicId: string;
  onAddPricing: (clinicId: string) => void;
  onEditPricing: (pricing: Pricing, clinicId: string) => void;
  onDeletePricing: (pricingId: string, clinicId: string) => void;
  onTogglePricingStatus: (pricingId: string, clinicId: string) => void;
  isPending: boolean;
}
