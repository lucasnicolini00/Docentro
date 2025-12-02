import {
  createClinic,
  updateClinic,
  createPricing,
  updatePricing,
  deletePricing,
  deleteClinic,
} from "@/lib/actions/clinics";

interface ClinicFormData {
  name: string;
  address: string;
  isVirtual: boolean | string;
  country?: string;
  city?: string;
  neighborhood?: string;
  latitude?: number | null;
  longitude?: number | null;
}

interface PricingFormData {
  clinicId?: string;
  title: string;
  price: string | number;
  currency?: string;
  durationMinutes: string | number;
  description?: string;
  isActive: boolean | string;
}

// Wrapper functions to convert data to expected object format
export async function createClinicWrapper(data: ClinicFormData) {
  const clinicData = {
    name: data.name as string,
    address: data.address as string,
    isVirtual: data.isVirtual === true || data.isVirtual === "true",
    country: data.country || undefined,
    city: data.city || undefined,
    neighborhood: data.neighborhood || undefined,
    latitude: data.latitude || null,
    longitude: data.longitude || null,
  };
  return createClinic(clinicData);
}

export async function updateClinicWrapper(
  clinicId: string,
  data: ClinicFormData
) {
  const clinicData = {
    name: data.name as string,
    address: data.address as string,
    isVirtual: data.isVirtual === true || data.isVirtual === "true",
    country: data.country || undefined,
    city: data.city || undefined,
    neighborhood: data.neighborhood || undefined,
    latitude: data.latitude || null,
    longitude: data.longitude || null,
  };
  return updateClinic(clinicId, clinicData);
}

export async function createPricingWrapper(data: PricingFormData) {
  const pricingData = {
    clinicId: data.clinicId as string,
    title: data.title as string,
    price: typeof data.price === "number" ? data.price : parseFloat(data.price),
    currency: data.currency || "BOB",
    durationMinutes:
      typeof data.durationMinutes === "number"
        ? data.durationMinutes
        : parseInt(data.durationMinutes),
    description: data.description || undefined,
    isActive: data.isActive === true || data.isActive === "true",
  };
  return createPricing(pricingData);
}

export async function updatePricingWrapper(
  pricingId: string,
  data: PricingFormData
) {
  const pricingData = {
    title: data.title as string,
    price: typeof data.price === "number" ? data.price : parseFloat(data.price),
    currency: data.currency || "BOB",
    durationMinutes:
      typeof data.durationMinutes === "number"
        ? data.durationMinutes
        : parseInt(data.durationMinutes),
    description: data.description || undefined,
    isActive: data.isActive === true || data.isActive === "true",
  };
  return updatePricing(pricingId, pricingData);
}

export async function deletePricingWrapper(pricingId: string) {
  return deletePricing(pricingId);
}

export async function deleteClinicWrapper(clinicId: string) {
  return deleteClinic(clinicId);
}

export const formatPrice = (price: number, currency: string) => {
  return new Intl.NumberFormat("es-BO", {
    style: "currency",
    currency: currency,
  }).format(price);
};
