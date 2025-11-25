import prisma from "@/lib/prisma";
import { DayOfWeek } from "@prisma/client";

export const timeSlotsService = {
  async getDoctor(doctorId: string) {
    return prisma.doctor.findUnique({
      where: { id: doctorId },
      include: {
        user: true,
        specialities: {
          include: {
            speciality: true,
          },
        },
      },
    });
  },

  async getClinic(clinicId: string) {
    return prisma.clinic.findUnique({
      where: { id: clinicId },
    });
  },

  async getScheduleForDay(
    doctorId: string,
    clinicId: string,
    dayOfWeek: DayOfWeek
  ) {
    return prisma.schedule.findFirst({
      where: {
        doctorId,
        clinicId,
        dayOfWeek,
        isActive: true,
      },
      include: {
        timeSlots: {
          where: {
            isBooked: false,
            isBlocked: false,
          },
          orderBy: {
            startTime: "asc",
          },
        },
      },
    });
  },

  async getDoctorWeeklySchedule(doctorId: string) {
    return prisma.schedule.findMany({
      where: {
        doctorId,
        isActive: true,
      },
      include: {
        clinic: true,
        timeSlots: {
          include: {
            appointment: {
              include: {
                patient: {
                  include: {
                    user: true,
                  },
                },
              },
            },
          },
          orderBy: {
            startTime: "asc",
          },
        },
      },
      orderBy: {
        dayOfWeek: "asc",
      },
    });
  },

  async getAvailabilityOverview(doctorId: string, clinicId?: string) {
    const whereClause: any = {
      doctorId,
      isActive: true,
      ...(clinicId && { clinicId }),
    };

    return prisma.schedule.findMany({
      where: whereClause,
      include: {
        clinic: true,
        timeSlots: {
          where: {
            isBooked: false,
            isBlocked: false,
          },
          orderBy: {
            startTime: "asc",
          },
        },
      },
      orderBy: {
        dayOfWeek: "asc",
      },
    });
  },
};
