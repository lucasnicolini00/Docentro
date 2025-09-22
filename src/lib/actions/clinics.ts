"use server";

import { requireDoctor } from "@/lib/auth-guards";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getDoctorClinics() {
  try {
    const session = await requireDoctor();

    const doctor = await prisma.doctor.findUnique({
      where: { userId: session.user.id },
    });

    if (!doctor) {
      return { success: false, error: "Doctor no encontrado" };
    }

    // Get doctor's clinics with pricing data
    const doctorClinics = await prisma.doctorClinic.findMany({
      where: { doctorId: doctor.id },
      include: {
        clinic: {
          include: {
            pricing: {
              where: {
                doctorId: doctor.id,
                deletedAt: null, // Only get non-deleted pricing
              },
              orderBy: { title: "asc" },
            },
          },
        },
      },
    });

    // Properly serialize all Decimal and Date objects
    const clinicsWithPricing = doctorClinics.map((dc) => {
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

    const doctor = await prisma.doctor.findUnique({
      where: { userId: session.user.id },
    });

    if (!doctor) {
      return { success: false, error: "Doctor no encontrado" };
    }

    // Create clinic
    const clinic = await prisma.clinic.create({
      data: {
        name: data.name,
        address: data.address,
        isVirtual: data.isVirtual,
        country: data.country,
        city: data.city,
        neighborhood: data.neighborhood,
        latitude: data.latitude,
        longitude: data.longitude,
      },
    });

    // Link doctor to clinic
    await prisma.doctorClinic.create({
      data: {
        doctorId: doctor.id,
        clinicId: clinic.id,
      },
    });

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

    const doctor = await prisma.doctor.findUnique({
      where: { userId: session.user.id },
    });

    if (!doctor) {
      return { success: false, error: "Doctor no encontrado" };
    }

    // Verify doctor has access to this clinic
    const doctorClinic = await prisma.doctorClinic.findUnique({
      where: {
        doctorId_clinicId: {
          doctorId: doctor.id,
          clinicId: clinicId,
        },
      },
    });

    if (!doctorClinic) {
      return { success: false, error: "No tienes acceso a esta clínica" };
    }

    // Update clinic
    const clinic = await prisma.clinic.update({
      where: { id: clinicId },
      data: {
        name: data.name,
        address: data.address,
        isVirtual: data.isVirtual,
        country: data.country,
        city: data.city,
        neighborhood: data.neighborhood,
        latitude: data.latitude,
        longitude: data.longitude,
      },
    });

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

    const doctor = await prisma.doctor.findUnique({
      where: { userId: session.user.id },
    });

    if (!doctor) {
      return { success: false, error: "Doctor no encontrado" };
    }

    // Verify doctor has access to this clinic
    const doctorClinic = await prisma.doctorClinic.findUnique({
      where: {
        doctorId_clinicId: {
          doctorId: doctor.id,
          clinicId: data.clinicId,
        },
      },
    });

    if (!doctorClinic) {
      return { success: false, error: "No tienes acceso a esta clínica" };
    }

    // Create pricing
    const pricing = await prisma.pricing.create({
      data: {
        doctorId: doctor.id,
        clinicId: data.clinicId,
        title: data.title,
        price: data.price,
        currency: data.currency,
        durationMinutes: data.durationMinutes,
        description: data.description,
        isActive: data.isActive,
      },
    });

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

    const doctor = await prisma.doctor.findUnique({
      where: { userId: session.user.id },
    });

    if (!doctor) {
      return { success: false, error: "Doctor no encontrado" };
    }

    // Verify doctor owns this pricing
    const existingPricing = await prisma.pricing.findUnique({
      where: { id: pricingId },
    });

    if (!existingPricing || existingPricing.doctorId !== doctor.id) {
      return { success: false, error: "No tienes acceso a esta tarifa" };
    }

    // Update pricing
    const pricing = await prisma.pricing.update({
      where: { id: pricingId },
      data: {
        title: data.title,
        price: data.price,
        currency: data.currency,
        durationMinutes: data.durationMinutes,
        description: data.description,
        isActive: data.isActive,
      },
    });

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

    const doctor = await prisma.doctor.findUnique({
      where: { userId: session.user.id },
    });

    if (!doctor) {
      return { success: false, error: "Doctor no encontrado" };
    }

    // Verify doctor owns this pricing
    const existingPricing = await prisma.pricing.findUnique({
      where: { id: pricingId },
    });

    if (!existingPricing || existingPricing.doctorId !== doctor.id) {
      return { success: false, error: "No tienes acceso a esta tarifa" };
    }

    // Toggle status
    const pricing = await prisma.pricing.update({
      where: { id: pricingId },
      data: {
        isActive: !existingPricing.isActive,
      },
    });

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
    console.error("Error toggling pricing status:", error);
    return { success: false, error: "Error al cambiar el estado de la tarifa" };
  }
}

export async function deletePricing(pricingId: string) {
  try {
    const session = await requireDoctor();

    const doctor = await prisma.doctor.findUnique({
      where: { userId: session.user.id },
    });

    if (!doctor) {
      return { success: false, error: "Doctor no encontrado" };
    }

    // First, verify that the pricing belongs to this doctor
    const pricing = await prisma.pricing.findFirst({
      where: {
        id: pricingId,
        doctorId: doctor.id,
        deletedAt: null, // Make sure we're only trying to delete non-deleted pricing
      },
    });

    if (!pricing) {
      return { success: false, error: "Tarifa no encontrada" };
    }

    // Soft delete the pricing
    const deletedPricing = await prisma.pricing.update({
      where: { id: pricingId },
      data: {
        deletedAt: new Date(),
      },
    });

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
