"use server";

import { requireDoctor } from "@/lib/auth-guards";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getDoctorClinics() {
  try {
    const session = await requireDoctor();

    const doctor = await prisma.doctor.findUnique({
      where: { userId: session.user.id },
      include: {
        clinics: {
          include: {
            clinic: {
              include: {
                pricing: {
                  where: { doctorId: { not: undefined } },
                  orderBy: { title: "asc" },
                },
              },
            },
          },
        },
      },
    });

    if (!doctor) {
      return { success: false, error: "Doctor no encontrado" };
    }

    const clinicsWithPricing = doctor.clinics.map((dc) => ({
      ...dc.clinic,
      pricings: dc.clinic.pricing,
    }));

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
      data: clinic,
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
      },
    });

    revalidatePath("/dashboard/doctor/clinics");

    return {
      success: true,
      data: clinic,
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
      data: pricing,
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
      data: pricing,
    };
  } catch (error) {
    console.error("Error updating pricing:", error);
    return { success: false, error: "Error al actualizar la tarifa" };
  }
}

export async function togglePricingStatus(pricingId: string) {
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
      data: pricing,
    };
  } catch (error) {
    console.error("Error toggling pricing status:", error);
    return { success: false, error: "Error al cambiar el estado de la tarifa" };
  }
}
