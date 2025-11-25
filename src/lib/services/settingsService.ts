import prisma from "@/lib/prisma";

export const settingsService = {
  async updateDoctorSettings(
    doctorId: string,
    settings: {
      emailNotifications?: boolean;
      pushNotifications?: boolean;
      publicAvailability?: boolean;
      onlineConsultations?: boolean;
      autoBooking?: boolean;
      reminders?: boolean;
      consultationPrice?: number;
    }
  ) {
    return prisma.doctor.update({
      where: { id: doctorId },
      data: {
        emailNotifications: settings.emailNotifications,
        pushNotifications: settings.pushNotifications,
        isPublic: settings.publicAvailability,
        allowOnlineConsultations: settings.onlineConsultations,
        autoBookingEnabled: settings.autoBooking,
        remindersEnabled: settings.reminders,
        consultationPrice: settings.consultationPrice,
      },
    });
  },

  async exportDoctorData(doctorId: string) {
    return prisma.doctor.findUnique({
      where: { id: doctorId },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            createdAt: true,
          },
        },
        specialities: {
          include: {
            speciality: true,
          },
        },
        experiences: true,
        clinics: {
          include: {
            clinic: true,
          },
        },
        schedules: {
          include: {
            timeSlots: true,
          },
        },
        appointments: {
          include: {
            patient: {
              select: {
                name: true,
                surname: true,
                email: true,
              },
            },
          },
        },
        pricings: true,
      },
    });
  },
};
