import {
  createClinic,
  updateClinic,
  createPricing,
  updatePricing,
} from "@/lib/actions/clinics";

// Wrapper functions to convert FormData to expected object format
export async function createClinicWrapper(formData: FormData) {
  const data = {
    name: formData.get("name") as string,
    address: formData.get("address") as string,
    isVirtual: formData.get("isVirtual") === "true",
    country: (formData.get("country") as string) || undefined,
    city: (formData.get("city") as string) || undefined,
    neighborhood: (formData.get("neighborhood") as string) || undefined,
  };
  return createClinic(data);
}

export async function updateClinicWrapper(
  clinicId: string,
  formData: FormData
) {
  const data = {
    name: formData.get("name") as string,
    address: formData.get("address") as string,
    isVirtual: formData.get("isVirtual") === "true",
    country: (formData.get("country") as string) || undefined,
    city: (formData.get("city") as string) || undefined,
    neighborhood: (formData.get("neighborhood") as string) || undefined,
  };
  return updateClinic(clinicId, data);
}

export async function createPricingWrapper(formData: FormData) {
  const data = {
    clinicId: formData.get("clinicId") as string,
    title: formData.get("title") as string,
    price: parseFloat(formData.get("price") as string),
    currency: (formData.get("currency") as string) || "BOB",
    durationMinutes: parseInt(formData.get("durationMinutes") as string),
    description: (formData.get("description") as string) || undefined,
    isActive: formData.get("isActive") === "true",
  };
  return createPricing(data);
}

export async function updatePricingWrapper(
  pricingId: string,
  formData: FormData
) {
  const data = {
    title: formData.get("title") as string,
    price: parseFloat(formData.get("price") as string),
    currency: (formData.get("currency") as string) || "BOB",
    durationMinutes: parseInt(formData.get("durationMinutes") as string),
    description: (formData.get("description") as string) || undefined,
    isActive: formData.get("isActive") === "true",
  };
  return updatePricing(pricingId, data);
}

export const formatPrice = (price: number, currency: string) => {
  return new Intl.NumberFormat("es-BO", {
    style: "currency",
    currency: currency,
  }).format(price);
};
