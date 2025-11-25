"use server";

import { requireDoctor } from "@/lib/auth-guards";
import { revalidatePath } from "next/cache";
import { ActionResult } from "./utils";
import { clinicsService } from "@/lib/services/clinicsService";

export async function getDoctorClinics() {
  try {
    const session = await requireDoctor();

    // Get doctor's clinics with pricing data
    const doctorClinics = await clinicsService.getDoctorClinics(session.user.id);

    // Filter out soft-deleted clinics and properly serialize all Decimal and Date objects
    const clinicsWithPricing = doctorClinics
      .filter((dc) => dc.clinic && dc.clinic.deletedAt === null) // Only include non-deleted clinics
      .map((dc) => {
        const { pricing, ...clinicWithoutPricing } = dc.clinic;
        return {
          ...clinicWithoutPricing,
          createdAt: dc.clinic.createdAt.toISOString(),
          updatedAt: dc.clinic.updatedAt.toISOString(),
          deletedAt: dc.clinic.deletedAt?.toISOString() || null,
          pricings: pricing.map((pricingItem) => ({
            ...pricingItem,
            price: pricingItem.price.toNumber(), // Convert Decimal to number
            createdAt: pricingItem.createdAt.toISOString(),
            updatedAt: pricingItem.updatedAt.toISOString(),
            deletedAt: pricingItem.deletedAt?.toISOString() || null,
          })),
        };
      });

    return {
      success: true,
      data: {
        clinics: clinicsWithPricing,
      },
    };
  } catch (error) {
    console.error("Error fetching doctor clinics:", error);
    return { success: false, error: "Error al cargar las clínicas" };
  }
}

export async function createClinic(data: {
  name: string;
  address: string;
  isVirtual: boolean;
  country?: string;
  city?: string;
  neighborhood?: string;
  latitude?: number | null;
  longitude?: number | null;
}) {
  try {
    const session = await requireDoctor();

    // Create clinic using service
    const clinic = await clinicsService.createClinic(session.user.id, data);

    revalidatePath("/dashboard/doctor/clinics");

    return {
      success: true,
      data: {
        ...clinic,
        createdAt: clinic.createdAt.toISOString(),
        updatedAt: clinic.updatedAt.toISOString(),
        deletedAt: clinic.deletedAt?.toISOString() || null,
      },
    };
  } catch (error) {
    console.error("Error creating clinic:", error);
    return { success: false, error: "Error al crear la clínica" };
  }
}

export async function updateClinic(
  clinicId: string,
  data: {
    name: string;
    address: string;
    isVirtual: boolean;
    country?: string;
    city?: string;
    neighborhood?: string;
    latitude?: number | null;
    longitude?: number | null;
  }
) {
  try {
    const session = await requireDoctor();

    // Update clinic using service
    const clinic = await clinicsService.updateClinic(session.user.id, clinicId, data);

    revalidatePath("/dashboard/doctor/clinics");

    return {
      success: true,
      data: {
        ...clinic,
        createdAt: clinic.createdAt.toISOString(),
        updatedAt: clinic.updatedAt.toISOString(),
        deletedAt: clinic.deletedAt?.toISOString() || null,
      },
    };
  } catch (error) {
    console.error("Error updating clinic:", error);
    return { success: false, error: "Error al actualizar la clínica" };
  }
}

export async function createPricing(data: {
  clinicId: string;
  title: string;
  price: number;
  currency: string;
  durationMinutes: number;
  description?: string;
  isActive: boolean;
}) {
  try {
    const session = await requireDoctor();

    // Create pricing using service
    const pricing = await clinicsService.createPricing(session.user.id, data);

    revalidatePath("/dashboard/doctor/clinics");

    return {
      success: true,
      data: {
        ...pricing,
        price: pricing.price.toNumber(),
        createdAt: pricing.createdAt.toISOString(),
        updatedAt: pricing.updatedAt.toISOString(),
        deletedAt: pricing.deletedAt?.toISOString() || null,
      },
    };
  } catch (error) {
    console.error("Error creating pricing:", error);
    return { success: false, error: "Error al crear la tarifa" };
  }
}

export async function updatePricing(
  pricingId: string,
  data: {
    title: string;
    price: number;
    currency: string;
    durationMinutes: number;
    description?: string;
    isActive: boolean;
  }
) {
  try {
    const session = await requireDoctor();

    // Update pricing using service
    const pricing = await clinicsService.updatePricing(session.user.id, pricingId, data);

    revalidatePath("/dashboard/doctor/clinics");

    return {
      success: true,
      data: {
        ...pricing,
        price: pricing.price.toNumber(),
        createdAt: pricing.createdAt.toISOString(),
        updatedAt: pricing.updatedAt.toISOString(),
        deletedAt: pricing.deletedAt?.toISOString() || null,
      },
    };
  } catch (error) {
    console.error("Error updating pricing:", error);
    return { success: false, error: "Error al actualizar la tarifa" };
  }
}

export async function togglePricingStatus(pricingId: string) {
  try {
    const session = await requireDoctor();

    // Development mode bypass
    if (
      process.env.NODE_ENV === "development" &&
      session.user.id === "dev-user-id"
    ) {
      return {
        success: true,
        data: {
          id: pricingId,
          doctorId: "dev-doctor-id",
          clinicId: "dev-clinic-1",
          title: "Dev Pricing",
          price: 150,
          currency: "BOB",
          durationMinutes: 30,
          description: "Development pricing",
          isActive: true, // Toggle the status
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          deletedAt: null,
        },
      };
    }

    // Toggle pricing status using service
    const pricing = await clinicsService.togglePricingStatus(session.user.id, pricingId);

    revalidatePath("/dashboard/doctor/clinics");

    return {
      success: true,
      data: {
        ...pricing,
        price: typeof pricing.price === 'number' ? pricing.price : pricing.price.toNumber(),
        createdAt: pricing.createdAt.toISOString(),
        updatedAt: pricing.updatedAt.toISOString(),
        deletedAt: pricing.deletedAt?.toISOString() || null,
      },
    };
  } catch (error) {
    console.error("Error toggling pricing status:", error);
    return { success: false, error: "Error al cambiar el estado de la tarifa" };
  }
}

export async function deletePricing(pricingId: string) {
  try {
    const session = await requireDoctor();

    // Delete pricing using service
    const deletedPricing = await clinicsService.deletePricing(session.user.id, pricingId);

    revalidatePath("/dashboard/doctor/clinics");

    return {
      success: true,
      data: {
        id: deletedPricing.id,
      },
    };
  } catch (error) {
    console.error("Error deleting pricing:", error);
    return { success: false, error: "Error al eliminar la tarifa" };
  }
}

export async function deleteClinic(clinicId: string): Promise<ActionResult> {
  try {
    const session = await requireDoctor();

    // Delete clinic using service
    const deletedClinic = await clinicsService.deleteClinic(session.user.id, clinicId);

    revalidatePath("/dashboard/doctor/clinics");

    return {
      success: true,
      data: {
        id: deletedClinic.id,
      },
    };
  } catch (error) {
    console.error("Error deleting clinic:", error);
    return { success: false, error: "Error al eliminar la clínica" };
  }
}
