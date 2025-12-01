import prisma from "@/lib/prisma";
import { DayOfWeek } from "@prisma/client";

export const timeSlotsService = {
  async getDoctor(doctorId: string) {
    return prisma.doctor.findUnique({
      where: { id: doctorId },
      select: {
        id: true,
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
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
      select: {
        id: true,
        dayOfWeek: true,
        startTime: true,
        endTime: true,
        clinic: {
          select: {
            id: true,
            name: true,
            address: true,
            isVirtual: true,
          },
        },
        timeSlots: {
          select: {
            id: true,
            startTime: true,
            endTime: true,
            isBooked: true,
            isBlocked: true,
            appointment: {
              select: {
                id: true,
                status: true,
                patient: {
                  select: {
                    id: true,
                    user: {
                      select: {
                        firstName: true,
                        lastName: true,
                      },
                    },
                  },
                },
              },
            },
          },
          orderBy: {
            startTime: "asc",
          },
          take: 50, // Limit time slots per schedule
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
