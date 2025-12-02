import type { Clinic as BaseClinic, Pricing as BasePricing } from "@/lib/types";

// Form data interfaces
export interface ClinicFormData {
  name: string;
  address: string;
  isVirtual: boolean;
  country?: string;
  city?: string;
  neighborhood?: string;
  latitude?: number | null;
  longitude?: number | null;
}

export interface PricingFormData {
  clinicId?: string;
  title: string;
  price: number;
  currency: string;
  durationMinutes: number;
  description: string;
  isActive: boolean;
}

// Extend base types with dashboard-specific fields
export interface Clinic
  extends Omit<BaseClinic, "createdAt" | "updatedAt" | "deletedAt"> {
  pricings: Pricing[];
  _count?: {
    appointments: number;
  };
}

export type Pricing = Omit<
  BasePricing,
  "doctorId" | "clinicId" | "createdAt" | "updatedAt" | "deletedAt"
>;

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
  onSubmit: (clinicData: ClinicFormData) => Promise<void>;
  isPending?: boolean;
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
  onSubmitClinic: (formData: ClinicFormData) => Promise<void>;

  // Pricing Form Props
  showPricingForm: boolean;
  editingPricing: Pricing | null;
  clinics: Clinic[];
  selectedClinicId?: string;
  onClosePricingForm: () => void;
  onSubmitPricing: (formData: PricingFormData) => Promise<void>;
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
  onSubmit: (pricingData: PricingFormData) => void;
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
