import prisma from "@/lib/prisma";
import { DayOfWeek } from "@prisma/client";

export const schedulesService = {
  async getSchedule(
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

        // Helper functions need to be imported or duplicated here if not exported
        // For now assuming we pass processed slots or duplicate logic
        // Duplicating logic for simplicity as it's pure calculation
        const parseTime = (timeString: string): number => {
          const [hours, minutes] = timeString.split(":").map(Number);
          return hours * 60 + minutes;
        };
        const formatTime = (minutes: number): string => {
          const hours = Math.floor(minutes / 60);
          const mins = minutes % 60;
          return `${hours.toString().padStart(2, "0")}:${mins
            .toString()
            .padStart(2, "0")}`;
        };

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
            name: true,
            surname: true,
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

    // 3. Generate available slots dynamically
    const resultSlots: any[] = [];
    const dayMapping = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ];

    // Create a Map for O(1) appointment lookups
    const appointmentMap = new Map<number, any>();
    for (const apt of appointments) {
      appointmentMap.set(apt.datetime.getTime(), apt);
    }

    // Pre-group schedules by day of week to avoid repeated find
    const schedulesByDay = new Map<string, any>();
    for (const schedule of schedules) {
      schedulesByDay.set(schedule.dayOfWeek, schedule);
    }

    // Iterate through each day in the range
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dayOfWeek = dayMapping[currentDate.getDay()];
      // O(1) lookup instead of O(n) find
      const scheduleForDay = schedulesByDay.get(dayOfWeek);

      if (scheduleForDay) {
        // For each template slot in the schedule
        for (const templateSlot of scheduleForDay.timeSlots) {
          // Construct the actual datetime for this slot instance
          const [hours, minutes] = templateSlot.startTime.split(":").map(Number);
          const slotDateTime = new Date(currentDate);
          slotDateTime.setHours(hours, minutes, 0, 0);

          // O(1) lookup instead of O(n) find
          const appointment = appointmentMap.get(slotDateTime.getTime());

          // Check if slot is in the past
          // const isPast = slotDateTime < new Date();

          // Only add if not in past (optional, depending on requirements, but usually for booking we want future)
          // But for calendar view we might want past too. Let's keep all.

          resultSlots.push({
            id: `${templateSlot.id}-${slotDateTime.toISOString()}`, // Virtual ID
            startTime: slotDateTime.toISOString(),
            endTime: new Date(
              slotDateTime.getTime() + 30 * 60000
            ).toISOString(), // Assuming 30 min duration or calculate from template
            isBooked: !!appointment,
            isBlocked: templateSlot.isBlocked,
            schedule: {
              dayOfWeek: scheduleForDay.dayOfWeek,
              doctor: scheduleForDay.doctor,
              clinic: scheduleForDay.clinic,
            },
            appointment: appointment
              ? {
                  id: appointment.id,
                  status: appointment.status,
                }
              : null,
          });
        }
      }

      // Next day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return resultSlots;
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
      include: {
        patient: {
          select: {
            name: true,
            surname: true,
          },
        },
      },
    });

    // 3. Generate dynamic view
    // We need to group by schedule (or rather, return a structure that resembles the original return type but with dynamic slots)
    // The original return type was Schedule[], so we should try to maintain that structure but populate 'timeSlots' dynamically
    // However, since 'timeSlots' in the return are specific instances with dates, and a Schedule is generic for a day of week,
    // we can't strictly return Schedule[] if we want to show slots for multiple weeks.
    // BUT, the function name implies it returns Schedules.
    // If the UI expects a list of Schedules (templates), then we can't put specific date slots in them easily if the range spans multiple weeks.
    // Let's look at how it's used. It seems to be used for a calendar view.
    // If the UI expects a flat list of events/slots, the previous function return type (Schedule[]) was actually misleading or wrong for a date range query.
    // The previous query returned `prisma.schedule.findMany` with `timeSlots` filtered by date range.
    // But `TimeSlot` in DB doesn't have a date, only time. So the previous query was definitely returning nothing or wrong data.
    
    // To support the UI, we should probably return a flat list of "DaySchedules" or similar.
    // But to minimize breaking changes, let's see if we can return a structure that the UI can handle.
    // If the UI iterates over schedules and then slots, it might be expecting the slots to have specific dates?
    // Actually, the previous code `startTime: { gte: startDate.toISOString() ... }` suggests the previous dev THOUGHT TimeSlots had dates.
    // Since they don't, the UI must be broken or expecting something else.
    
    // I will return a structure that groups by Day (Date) instead of Schedule Template.
    // OR, I can return a flat list of slots like `getTimeSlotsForCalendar`.
    // Let's check `getDoctorSchedulesWithSlots` usage in `schedules.ts`.
    // It just calls this service and returns data.
    
    // I'll stick to returning a structure that contains the generated slots, but maybe grouped by day?
    // Let's return a flat list of "DailySchedule" objects which contain the date and the slots for that date.
    
    const result: any[] = [];
    const dayMapping = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ];

    const currentDate = new Date(startDate);
    
    // Create a Map for O(1) appointment lookups instead of O(n) find
    // Key format: "timestamp_clinicId"
    const appointmentMap = new Map<string, any>();
    for (const apt of appointments) {
      const key = `${apt.datetime.getTime()}_${apt.clinicId}`;
      appointmentMap.set(key, apt);
    }
    
    // Pre-group schedules by day of week to avoid repeated filtering
    const schedulesByDay = new Map<string, typeof schedules>();
    for (const schedule of schedules) {
      const existing = schedulesByDay.get(schedule.dayOfWeek) || [];
      existing.push(schedule);
      schedulesByDay.set(schedule.dayOfWeek, existing);
    }
    
    while (currentDate <= endDate) {
      const dayOfWeek = dayMapping[currentDate.getDay()];
      // O(1) lookup instead of O(n) filter
      const daySchedules = schedulesByDay.get(dayOfWeek) || [];

      for (const schedule of daySchedules) {
        const slotsForDay: any[] = [];
        
        for (const templateSlot of schedule.timeSlots) {
          const [hours, minutes] = templateSlot.startTime.split(":").map(Number);
          const slotDateTime = new Date(currentDate);
          slotDateTime.setHours(hours, minutes, 0, 0);

          // O(1) lookup instead of O(n) find
          const appointmentKey = `${slotDateTime.getTime()}_${schedule.clinicId}`;
          const appointment = appointmentMap.get(appointmentKey);

          slotsForDay.push({
            id: templateSlot.id, // Keep template ID or virtual?
            startTime: slotDateTime.toISOString(),
            endTime: new Date(slotDateTime.getTime() + 30 * 60000).toISOString(),
            isBooked: !!appointment,
            isBlocked: templateSlot.isBlocked,
            appointment: appointment
              ? {
                  id: appointment.id,
                  status: appointment.status,
                  patient: appointment.patient,
                }
              : null,
          });
        }

        if (slotsForDay.length > 0) {
          result.push({
            ...schedule,
            date: currentDate.toISOString(), // Add date to the schedule object
            timeSlots: slotsForDay,
          });
        }
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return result;
  },
};
