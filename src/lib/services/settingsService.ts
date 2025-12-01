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
      select: {
        id: true,
        createdAt: true,
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
          select: {
            speciality: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        experiences: {
          select: {
            id: true,
            title: true,
            institution: true,
            startDate: true,
            endDate: true,
            description: true,
          },
        },
        clinics: {
          select: {
            clinic: {
              select: {
                id: true,
                name: true,
                address: true,
                city: true,
                isVirtual: true,
              },
            },
          },
        },
        schedules: {
          select: {
            id: true,
            dayOfWeek: true,
            startTime: true,
            endTime: true,
            isActive: true,
            timeSlots: {
              select: {
                id: true,
                startTime: true,
                endTime: true,
                isBooked: true,
              },
              take: 100, // Limit time slots for performance
            },
          },
        },
        appointments: {
          select: {
            id: true,
            datetime: true,
            status: true,
            type: true,
            patient: {
              select: {
                user: {
                  select: {
                    firstName: true,
                    lastName: true,
                    email: true,
                  },
                },
              },
            },
          },
          take: 500, // Limit appointments for data export
        },
        pricings: {
          select: {
            id: true,
            title: true,
            price: true,
            currency: true,
            durationMinutes: true,
            isActive: true,
          },
        },
      },
    });
  },
};
