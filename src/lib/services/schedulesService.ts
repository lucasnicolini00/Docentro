import prisma from "@/lib/prisma";
import { DayOfWeek } from "@prisma/client";
import {
  generateTimeSlotsForDateRange,
  parseTime,
  formatTime,
} from "./slotGenerationHelper";

export const schedulesService = {
  async getSchedule(doctorId: string, clinicId: string, dayOfWeek: DayOfWeek) {
    return prisma.schedule.findUnique({
      where: {
        doctorId_clinicId_dayOfWeek: {
          doctorId,
          clinicId,
          dayOfWeek,
        },
      },
    });
  },

  async createSchedule(data: {
    doctorId: string;
    clinicId: string;
    dayOfWeek: DayOfWeek;
    startTime: string;
    endTime: string;
  }) {
    return prisma.schedule.create({
      data,
      include: {
        clinic: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
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

  async getScheduleById(id: string) {
    return prisma.schedule.findUnique({
      where: { id },
      include: {
        clinic: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
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

  async getScheduleByIdAndDoctor(id: string, doctorId: string) {
    return prisma.schedule.findFirst({
      where: {
        id,
        doctorId,
      },
    });
  },

  async updateSchedule(
    id: string,
    data: {
      startTime: string;
      endTime: string;
      isActive: boolean;
    }
  ) {
    return prisma.schedule.update({
      where: { id },
      data,
    });
  },

  async deleteTimeSlots(scheduleId: string) {
    return prisma.timeSlot.deleteMany({
      where: {
        scheduleId,
        isBooked: false,
      },
    });
  },

  async createTimeSlots(
    slots: Array<{
      scheduleId: string;
      startTime: string;
      endTime: string;
    }>
  ) {
    if (slots.length === 0) return;
    return prisma.timeSlot.createMany({
      data: slots,
    });
  },

  async getScheduleForDeletion(id: string, doctorId: string) {
    return prisma.schedule.findFirst({
      where: {
        id,
        doctorId,
      },
      select: {
        id: true,
        doctorId: true,
        _count: {
          select: {
            timeSlots: {
              where: {
                isBooked: true,
              },
            },
          },
        },
      },
    });
  },

  async deleteSchedule(id: string) {
    return prisma.schedule.delete({
      where: { id },
    });
  },

  async getDoctorSchedules(doctorId: string) {
    return prisma.schedule.findMany({
      where: {
        doctorId,
      },
      include: {
        clinic: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
        timeSlots: {
          orderBy: {
            startTime: "asc",
          },
          take: 100,
        },
      },
      orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
    });
  },

  async getExistingSchedules(
    doctorId: string,
    clinicId: string,
    daysOfWeek: DayOfWeek[]
  ) {
    return prisma.schedule.findMany({
      where: {
        doctorId,
        clinicId,
        dayOfWeek: {
          in: daysOfWeek,
        },
      },
      select: {
        dayOfWeek: true,
        id: true,
        startTime: true,
        endTime: true,
        _count: {
          select: {
            timeSlots: true,
          },
        },
      },
    });
  },

  async bulkCreateSchedules(
    doctorId: string,
    clinicId: string,
    scheduleData: Array<{
      dayOfWeek: DayOfWeek;
      startTime: string;
      endTime: string;
      slotDuration?: number;
    }>,
    replaceExisting: boolean,
    existingSchedules: Array<{ id: string }>
  ) {
    return prisma.$transaction(
      async (tx) => {
        if (replaceExisting && existingSchedules.length > 0) {
          const scheduleIdsToDelete = existingSchedules.map((s) => s.id);
          await tx.timeSlot.deleteMany({
            where: {
              scheduleId: {
                in: scheduleIdsToDelete,
              },
            },
          });
          await tx.schedule.deleteMany({
            where: {
              id: {
                in: scheduleIdsToDelete,
              },
            },
          });
        }

        const scheduleCreationPromises = scheduleData.map((data) =>
          tx.schedule.create({
            data: {
              doctorId,
              clinicId,
              dayOfWeek: data.dayOfWeek,
              startTime: data.startTime,
              endTime: data.endTime,
            },
          })
        );

        const createdSchedules = await Promise.all(scheduleCreationPromises);

        const allSlots: Array<{
          scheduleId: string;
          startTime: string;
          endTime: string;
        }> = [];

        for (let i = 0; i < createdSchedules.length; i++) {
          const schedule = createdSchedules[i];
          const data = scheduleData[i];
          const start = parseTime(data.startTime);
          const end = parseTime(data.endTime);
          const slotDuration = data.slotDuration || 30;

          let current = start;
          while (current < end) {
            const slotStart = formatTime(current);
            current += slotDuration;
            const slotEnd = formatTime(current);

            allSlots.push({
              scheduleId: schedule.id,
              startTime: slotStart,
              endTime: slotEnd,
            });
          }
        }

        if (allSlots.length > 0) {
          await tx.timeSlot.createMany({
            data: allSlots,
          });
        }

        return createdSchedules.map((s) => s.id);
      },
      {
        timeout: replaceExisting ? 15000 : 30000,
      }
    );
  },

  async getSchedulesByIds(ids: string[], replaceExisting: boolean) {
    return prisma.schedule.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        clinic: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
        timeSlots: {
          orderBy: {
            startTime: "asc",
          },
          take: replaceExisting ? 50 : undefined,
        },
      },
      orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
    });
  },

  async getScheduleForTimeSlots(
    doctorId: string,
    clinicId: string,
    dayOfWeek: DayOfWeek
  ) {
    return prisma.schedule.findUnique({
      where: {
        doctorId_clinicId_dayOfWeek: {
          doctorId,
          clinicId,
          dayOfWeek,
        },
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

  async getTimeSlotForToggle(timeSlotId: string, doctorId: string) {
    return prisma.timeSlot.findFirst({
      where: {
        id: timeSlotId,
        schedule: {
          doctorId,
        },
        isBooked: false,
      },
      select: {
        id: true,
        isBlocked: true,
      },
    });
  },

  async updateTimeSlotBlock(timeSlotId: string, isBlocked: boolean) {
    return prisma.timeSlot.update({
      where: { id: timeSlotId },
      data: { isBlocked },
      select: {
        id: true,
        startTime: true,
        endTime: true,
        isBlocked: true,
        isBooked: true,
      },
    });
  },

  async getTimeSlotsForCalendar(
    doctorId: string,
    clinicId: string,
    startDate: Date,
    endDate: Date
  ) {
    // 1. Get all active schedules for this doctor and clinic
    const schedules = await prisma.schedule.findMany({
      where: {
        doctorId,
        clinicId,
        isActive: true,
      },
      include: {
        timeSlots: {
          where: {
            isBlocked: false, // We only care about slots that aren't permanently blocked
          },
          orderBy: {
            startTime: "asc",
          },
        },
        clinic: {
          select: {
            name: true,
            address: true,
          },
        },
        doctor: {
          select: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    // 2. Get all existing appointments in the date range
    const appointments = await prisma.appointment.findMany({
      where: {
        doctorId,
        clinicId,
        datetime: {
          gte: startDate,
          lte: endDate,
        },
        status: {
          not: "CANCELED",
        },
      },
      select: {
        datetime: true,
        durationMinutes: true,
        id: true,
        status: true,
      },
    });

    // 3. Use shared helper to generate slots
    return generateTimeSlotsForDateRange(
      schedules,
      appointments,
      startDate,
      endDate,
      false
    );
  },

  async getDoctorSchedulesWithSlots(
    doctorId: string,
    startDate: Date,
    endDate: Date,
    clinicId?: string
  ) {
    // 1. Get active schedules
    const whereClause: any = {
      doctorId,
      isActive: true,
    };
    if (clinicId) whereClause.clinicId = clinicId;

    const schedules = await prisma.schedule.findMany({
      where: whereClause,
      include: {
        clinic: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
        timeSlots: {
          orderBy: {
            startTime: "asc",
          },
        },
      },
    });

    // 2. Get appointments
    const appointments = await prisma.appointment.findMany({
      where: {
        doctorId,
        clinicId: clinicId || undefined,
        datetime: {
          gte: startDate,
          lte: endDate,
        },
        status: {
          not: "CANCELED",
        },
      },
      select: {
        datetime: true,
        durationMinutes: true,
        id: true,
        status: true,
        clinicId: true,
        patient: {
          select: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    // 3. Use shared helper to generate dynamic slots
    const generatedSlots = generateTimeSlotsForDateRange(
      schedules,
      appointments,
      startDate,
      endDate,
      true // Use clinic-specific matching
    );

    // 4. Group slots by schedule and date
    const result: any[] = [];
    const slotsByScheduleAndDate = new Map<string, any[]>();

    for (const slot of generatedSlots) {
      const scheduleId = slot.id.split("-")[0]; // Extract original schedule ID
      const date = new Date(slot.startTime).toISOString().split("T")[0];
      const key = `${scheduleId}_${date}`;

      const existing = slotsByScheduleAndDate.get(key) || [];
      existing.push(slot);
      slotsByScheduleAndDate.set(key, existing);
    }

    // 5. Build result structure matching original format
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split("T")[0];

      for (const schedule of schedules) {
        const key = `${schedule.id}_${dateStr}`;
        const slotsForDay = slotsByScheduleAndDate.get(key) || [];

        if (slotsForDay.length > 0) {
          result.push({
            ...schedule,
            date: currentDate.toISOString(),
            timeSlots: slotsForDay,
          });
        }
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return result;
  },
};
