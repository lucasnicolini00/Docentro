import prisma from "@/lib/prisma";

export const clinicsService = {
  async getDoctorClinics(userId: string) {
    const doctor = await prisma.doctor.findUnique({
      where: { userId },
    });

    if (!doctor) {
      throw new Error("Doctor not found");
    }

    return prisma.doctorClinic.findMany({
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
  },

  async createClinic(
    userId: string,
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
    const doctor = await prisma.doctor.findUnique({
      where: { userId },
    });

    if (!doctor) {
      throw new Error("Doctor not found");
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

    return clinic;
  },

  async updateClinic(
    userId: string,
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
    const doctor = await prisma.doctor.findUnique({
      where: { userId },
    });

    if (!doctor) {
      throw new Error("Doctor not found");
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
      throw new Error("No tienes acceso a esta clínica");
    }

    return prisma.clinic.update({
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
  },

  async createPricing(
    userId: string,
    data: {
      clinicId: string;
      title: string;
      price: number;
      currency: string;
      durationMinutes: number;
      description?: string;
      isActive: boolean;
    }
  ) {
    const doctor = await prisma.doctor.findUnique({
      where: { userId },
    });

    if (!doctor) {
      throw new Error("Doctor not found");
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
      throw new Error("No tienes acceso a esta clínica");
    }

    return prisma.pricing.create({
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
  },

  async updatePricing(
    userId: string,
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
    const doctor = await prisma.doctor.findUnique({
      where: { userId },
    });

    if (!doctor) {
      throw new Error("Doctor not found");
    }

    // Verify doctor owns this pricing
    const existingPricing = await prisma.pricing.findUnique({
      where: { id: pricingId },
    });

    if (!existingPricing || existingPricing.doctorId !== doctor.id) {
      throw new Error("No tienes acceso a esta tarifa");
    }

    return prisma.pricing.update({
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
  },

  async togglePricingStatus(userId: string, pricingId: string) {
    // Development mode bypass
    if (
      process.env.NODE_ENV === "development" &&
      userId === "dev-user-id"
    ) {
      return {
        id: pricingId,
        doctorId: "dev-doctor-id",
        clinicId: "dev-clinic-1",
        title: "Dev Pricing",
        price: 150,
        currency: "BOB",
        durationMinutes: 30,
        description: "Development pricing",
        isActive: true, // Toggle the status
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
    }

    const doctor = await prisma.doctor.findUnique({
      where: { userId },
    });

    if (!doctor) {
      throw new Error("Doctor not found");
    }

    // Verify doctor owns this pricing
    const existingPricing = await prisma.pricing.findUnique({
      where: { id: pricingId },
    });

    if (!existingPricing || existingPricing.doctorId !== doctor.id) {
      throw new Error("No tienes acceso a esta tarifa");
    }

    return prisma.pricing.update({
      where: { id: pricingId },
      data: {
        isActive: !existingPricing.isActive,
      },
    });
  },

  async deletePricing(userId: string, pricingId: string) {
    const doctor = await prisma.doctor.findUnique({
      where: { userId },
    });

    if (!doctor) {
      throw new Error("Doctor not found");
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
      throw new Error("Tarifa no encontrada");
    }

    // Soft delete the pricing
    return prisma.pricing.update({
      where: { id: pricingId },
      data: {
        deletedAt: new Date(),
      },
    });
  },

  async deleteClinic(userId: string, clinicId: string) {
    const doctor = await prisma.doctor.findUnique({
      where: { userId },
    });

    if (!doctor) {
      throw new Error("Doctor not found");
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
      throw new Error("No tienes acceso a esta clínica");
    }

    // Check if clinic has any active appointments
    const activeAppointments = await prisma.appointment.findFirst({
      where: {
        clinicId: clinicId,
        status: { in: ["PENDING", "CONFIRMED"] },
        datetime: { gte: new Date() }, // Future appointments
      },
    });

    if (activeAppointments) {
      throw new Error(
        "No se puede eliminar la clínica porque tiene citas pendientes o confirmadas"
      );
    }

    // Soft delete the clinic
    return prisma.clinic.update({
      where: { id: clinicId },
      data: {
        deletedAt: new Date(),
      },
    });
  },
};
