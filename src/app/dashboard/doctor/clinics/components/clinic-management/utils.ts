import {
  createClinic,
  updateClinic,
  createPricing,
  updatePricing,
  deletePricing,
} from "@/lib/actions/clinics";

// Wrapper functions to convert data to expected object format
export async function createClinicWrapper(data: any) {
  const clinicData = {
    name: data.name as string,
    address: data.address as string,
    isVirtual: data.isVirtual === true || data.isVirtual === "true",
    country: data.country || undefined,
    city: data.city || undefined,
    neighborhood: data.neighborhood || undefined,
  };
  return createClinic(clinicData);
}

export async function updateClinicWrapper(clinicId: string, data: any) {
  const clinicData = {
    name: data.name as string,
    address: data.address as string,
    isVirtual: data.isVirtual === true || data.isVirtual === "true",
    country: data.country || undefined,
    city: data.city || undefined,
    neighborhood: data.neighborhood || undefined,
  };
  return updateClinic(clinicId, clinicData);
}

export async function createPricingWrapper(data: any) {
  const pricingData = {
    clinicId: data.clinicId as string,
    title: data.title as string,
    price: parseFloat(data.price),
    currency: data.currency || "BOB",
    durationMinutes: parseInt(data.durationMinutes),
    description: data.description || undefined,
    isActive: data.isActive === true || data.isActive === "true",
  };
  return createPricing(pricingData);
}

export async function updatePricingWrapper(pricingId: string, data: any) {
  const pricingData = {
    title: data.title as string,
    price: parseFloat(data.price),
    currency: data.currency || "BOB",
    durationMinutes: parseInt(data.durationMinutes),
    description: data.description || undefined,
    isActive: data.isActive === true || data.isActive === "true",
  };
  return updatePricing(pricingId, pricingData);
}

export async function deletePricingWrapper(pricingId: string) {
  return deletePricing(pricingId);
}

export const formatPrice = (price: number, currency: string) => {
  return new Intl.NumberFormat("es-BO", {
    style: "currency",
    currency: currency,
  }).format(price);
};
