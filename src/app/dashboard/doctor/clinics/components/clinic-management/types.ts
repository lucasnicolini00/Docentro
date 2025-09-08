export interface Clinic {
  id: string;
  name: string;
  address: string | null;
  country: string | null;
  city: string | null;
  neighborhood: string | null;
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
