"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { validateDoctor, type ActionResult } from "./utils";
import { DayOfWeek } from "@prisma/client";

/**
 * Server action for creating a doctor's schedule
 */
export async function createSchedule(
  clinicId: string,
  data: {
    dayOfWeek: DayOfWeek;
    startTime: string;
    endTime: string;
    slotDuration?: number; // in minutes, default 30
  }
): Promise<ActionResult> {
  try {
    const validation = await validateDoctor();

    if ("error" in validation) {
      return { success: false, error: validation.error };
    }

    const { doctor } = validation;

    // Check if schedule already exists for this day
    const existingSchedule = await prisma.schedule.findUnique({
      where: {
        doctorId_clinicId_dayOfWeek: {
          doctorId: doctor.id,
          clinicId: clinicId,
          dayOfWeek: data.dayOfWeek,
        },
      },
    });

    if (existingSchedule) {
      return {
        success: false,
        error: "Ya existe un horario para este día en esta clínica",
      };
    }

    // Create the schedule
    const schedule = await prisma.schedule.create({
      data: {
        doctorId: doctor.id,
        clinicId: clinicId,
        dayOfWeek: data.dayOfWeek,
        startTime: data.startTime,
        endTime: data.endTime,
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

    // Generate time slots
    await generateTimeSlots(
      schedule.id,
      data.startTime,
      data.endTime,
      data.slotDuration || 30
    );

    // Fetch the schedule again with time slots included
    const scheduleWithSlots = await prisma.schedule.findUnique({
      where: { id: schedule.id },
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

    revalidatePath("/dashboard/doctor/schedules");
    return { success: true, data: scheduleWithSlots || schedule };
  } catch (error) {
    console.error("Error creating schedule:", error);
    return { success: false, error: "Error al crear el horario" };
  }
}

/**
 * Server action for updating a doctor's schedule
 */
export async function updateSchedule(
  scheduleId: string,
  data: {
    startTime: string;
    endTime: string;
    isActive: boolean;
    slotDuration?: number;
  }
): Promise<ActionResult> {
  try {
    const validation = await validateDoctor();

    if ("error" in validation) {
      return { success: false, error: validation.error };
    }

    const { doctor } = validation;

    // Verify ownership
    const schedule = await prisma.schedule.findFirst({
      where: {
        id: scheduleId,
        doctorId: doctor.id,
      },
    });

    if (!schedule) {
      return { success: false, error: "Horario no encontrado" };
    }

    // Update the schedule
    const updatedSchedule = await prisma.schedule.update({
      where: { id: scheduleId },
      data: {
        startTime: data.startTime,
        endTime: data.endTime,
        isActive: data.isActive,
      },
    });

    // Regenerate time slots if times changed
    if (
      data.startTime !== schedule.startTime ||
      data.endTime !== schedule.endTime
    ) {
      // Delete existing time slots that aren't booked
      await prisma.timeSlot.deleteMany({
        where: {
          scheduleId: scheduleId,
          isBooked: false,
        },
      });

      // Generate new time slots
      await generateTimeSlots(
        scheduleId,
        data.startTime,
        data.endTime,
        data.slotDuration || 30
      );
    }

    revalidatePath("/dashboard/doctor/schedules");
    return { success: true, data: updatedSchedule };
  } catch (error) {
    console.error("Error updating schedule:", error);
    return { success: false, error: "Error al actualizar el horario" };
  }
}

/**
 * Server action for deleting a schedule
 */
export async function deleteSchedule(
  scheduleId: string
): Promise<ActionResult> {
  try {
    const validation = await validateDoctor();

    if ("error" in validation) {
      return { success: false, error: validation.error };
    }

    const { doctor } = validation;

    // First, let's check if the schedule exists and belongs to this doctor
    const schedule = await prisma.schedule.findUnique({
      where: {
        id: scheduleId,
      },
      include: {
        clinic: true,
        timeSlots: {
          where: {
            isBooked: true,
          },
        },
      },
    });

    if (!schedule) {
      return {
        success: false,
        error: "Horario no encontrado",
      };
    }

    if (schedule.doctorId !== doctor.id) {
      return {
        success: false,
        error: "No tienes permisos para eliminar este horario",
      };
    }

    // Check if there are any booked appointments
    if (schedule.timeSlots.length > 0) {
      return {
        success: false,
        error: "No se puede eliminar un horario con citas reservadas",
      };
    }

    // Delete the schedule (cascade will delete time slots)
    await prisma.schedule.delete({
      where: {
        id: scheduleId,
        doctorId: doctor.id,
      },
    });

    revalidatePath("/dashboard/doctor/schedules");
    return { success: true };
  } catch (error) {
    console.error("Error deleting schedule:", error);
    return { success: false, error: "Error al eliminar el horario" };
  }
}
/**
 * Server action for getting doctor's schedules
 */
export async function getDoctorSchedules(): Promise<ActionResult> {
  try {
    const validation = await validateDoctor();

    if ("error" in validation) {
      return { success: false, error: validation.error };
    }

    const { doctor } = validation;

    // Optimized query with proper indexing on doctorId and dayOfWeek
    // Recommended indexes: (doctorId), (doctorId, dayOfWeek), (scheduleId, isBooked, isBlocked)
    const schedules = await prisma.schedule.findMany({
      where: {
        doctorId: doctor.id,
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
          // Include all time slots for proper management
          take: 100, // Reasonable limit for UI display
        },
      },
      orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
    });

    return { success: true, data: schedules };
  } catch (error) {
    console.error("Error fetching schedules:", error);
    return { success: false, error: "Error al obtener los horarios" };
  }
}

/**
 * Server action for creating multiple schedules at once (bulk creation)
 */
export async function createBulkSchedules(
  clinicId: string,
  scheduleData: Array<{
    dayOfWeek: DayOfWeek;
    startTime: string;
    endTime: string;
    slotDuration?: number;
  }>,
  replaceExisting = false
): Promise<ActionResult> {
  try {
    const validation = await validateDoctor();

    if ("error" in validation) {
      return { success: false, error: validation.error };
    }

    const { doctor } = validation;

    // Check for existing schedules first
    const existingSchedules = await prisma.schedule.findMany({
      where: {
        doctorId: doctor.id,
        clinicId: clinicId,
        dayOfWeek: {
          in: scheduleData.map((data) => data.dayOfWeek),
        },
      },
      select: {
        dayOfWeek: true,
        id: true,
        startTime: true,
        endTime: true,
        // Pre-load time slot count for performance tracking
        _count: {
          select: {
            timeSlots: true,
          },
        },
      },
    });

    if (existingSchedules.length > 0 && !replaceExisting) {
      const existingDays = existingSchedules.map((s) => s.dayOfWeek);
      return {
        success: false,
        error: "Ya existen horarios para algunos días. ¿Deseas reemplazarlos?",
        data: {
          existingDays,
          requiresConfirmation: true,
        },
      };
    }

    // Use a single atomic transaction for all operations (delete + create)
    // This ensures data consistency and better performance
    const result = await prisma.$transaction(
      async (tx) => {
        // If replacing, delete existing schedules and time slots first
        if (replaceExisting && existingSchedules.length > 0) {
          // Get the schedule IDs for direct deletion (more efficient than nested queries)
          const scheduleIdsToDelete = existingSchedules.map((s) => s.id);

          // Delete time slots first using direct schedule IDs (much faster)
          await tx.timeSlot.deleteMany({
            where: {
              scheduleId: {
                in: scheduleIdsToDelete,
              },
            },
          });

          // Then delete schedules using direct IDs
          await tx.schedule.deleteMany({
            where: {
              id: {
                in: scheduleIdsToDelete,
              },
            },
          });
        }

        // Create all schedules in parallel for maximum performance
        const scheduleCreationPromises = scheduleData.map((data) =>
          tx.schedule.create({
            data: {
              doctorId: doctor.id,
              clinicId: clinicId,
              dayOfWeek: data.dayOfWeek,
              startTime: data.startTime,
              endTime: data.endTime,
            },
          })
        );

        const createdSchedules = await Promise.all(scheduleCreationPromises);

        // Prepare all time slots for bulk creation to minimize database round trips
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

        // Create all time slots in a single batch operation for optimal performance
        // This can handle hundreds of slots efficiently
        if (allSlots.length > 0) {
          await tx.timeSlot.createMany({
            data: allSlots,
          });
        }

        return createdSchedules.map((s) => s.id);
      },
      {
        // Shorter timeout for replacements, longer for initial creation
        timeout: replaceExisting ? 15000 : 30000, // 15s for replace, 30s for create
      }
    );

    // Fetch all created schedules with their relations in a single optimized query
    const createdSchedules = await prisma.schedule.findMany({
      where: {
        id: {
          in: result,
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
            startTime: "asc", // Order time slots for better UX
          },
          // Limit time slots in response to improve network transfer
          // UI typically doesn't need all slots immediately
          take: replaceExisting ? 50 : undefined, // Fewer slots when replacing for faster response
        },
      },
      orderBy: [
        { dayOfWeek: "asc" }, // Order by day of week for consistency
        { startTime: "asc" },
      ],
    });

    revalidatePath("/dashboard/doctor/schedules");
    return { success: true, data: createdSchedules };
  } catch (error) {
    console.error("Error creating bulk schedules:", error);
    return { success: false, error: "Error al crear los horarios" };
  }
}
export async function getAvailableTimeSlots(
  doctorId: string,
  clinicId: string,
  date: string
): Promise<ActionResult> {
  try {
    const appointmentDate = new Date(date);
    const dayOfWeek = getDayOfWeekFromDate(appointmentDate);

    // Get the schedule for this day
    const schedule = await prisma.schedule.findUnique({
      where: {
        doctorId_clinicId_dayOfWeek: {
          doctorId: doctorId,
          clinicId: clinicId,
          dayOfWeek: dayOfWeek,
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

    if (!schedule) {
      return {
        success: false,
        error: "No hay horarios disponibles para este día",
      };
    }

    return { success: true, data: schedule.timeSlots };
  } catch (error) {
    console.error("Error fetching available time slots:", error);
    return {
      success: false,
      error: "Error al obtener los horarios disponibles",
    };
  }
}

/**
 * Server action for blocking/unblocking time slots
 */
export async function toggleTimeSlotBlock(
  timeSlotId: string,
  isBlocked: boolean
): Promise<ActionResult> {
  try {
    const validation = await validateDoctor();

    if ("error" in validation) {
      return { success: false, error: validation.error };
    }

    const { doctor } = validation;

    // Verify ownership through schedule
    const timeSlot = await prisma.timeSlot.findFirst({
      where: {
        id: timeSlotId,
        schedule: {
          doctorId: doctor.id,
        },
        isBooked: false, // Can't block booked slots
      },
    });

    if (!timeSlot) {
      return { success: false, error: "Horario no encontrado o ya reservado" };
    }

    const updatedSlot = await prisma.timeSlot.update({
      where: { id: timeSlotId },
      data: { isBlocked },
    });

    revalidatePath("/dashboard/doctor/schedules");
    return { success: true, data: updatedSlot };
  } catch (error) {
    console.error("Error toggling time slot block:", error);
    return { success: false, error: "Error al actualizar el horario" };
  }
}

/**
 * Helper function to generate time slots for a schedule
 */
async function generateTimeSlots(
  scheduleId: string,
  startTime: string,
  endTime: string,
  slotDurationMinutes: number
): Promise<void> {
  const slots: Array<{
    scheduleId: string;
    startTime: string;
    endTime: string;
  }> = [];
  const start = parseTime(startTime);
  const end = parseTime(endTime);

  let current = start;
  while (current < end) {
    const slotStart = formatTime(current);
    current += slotDurationMinutes;
    const slotEnd = formatTime(current);

    slots.push({
      scheduleId,
      startTime: slotStart,
      endTime: slotEnd,
    });
  }

  if (slots.length > 0) {
    await prisma.timeSlot.createMany({
      data: slots,
    });
  }
}

/**
 * Helper function to parse time string to minutes
 */
function parseTime(timeString: string): number {
  const [hours, minutes] = timeString.split(":").map(Number);
  return hours * 60 + minutes;
}

/**
 * Helper function to format minutes to time string
 */
function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}`;
}

/**
 * Helper function to get DayOfWeek enum from Date
 */
function getDayOfWeekFromDate(date: Date): DayOfWeek {
  const dayIndex = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const days: DayOfWeek[] = [
    DayOfWeek.SUNDAY,
    DayOfWeek.MONDAY,
    DayOfWeek.TUESDAY,
    DayOfWeek.WEDNESDAY,
    DayOfWeek.THURSDAY,
    DayOfWeek.FRIDAY,
    DayOfWeek.SATURDAY,
  ];
  return days[dayIndex];
}

/**
 * Get available time slots for calendar view (for calendar booking)
 */
export async function getTimeSlotsForCalendar(
  doctorId: string,
  clinicId: string,
  options?: {
    startDate?: Date;
    endDate?: Date;
  }
) {
  try {
    const startDate = options?.startDate || new Date();
    const endDate =
      options?.endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now

    const timeSlots = await prisma.timeSlot.findMany({
      where: {
        schedule: {
          doctorId: doctorId,
          clinicId: clinicId,
          isActive: true,
        },
        startTime: {
          gte: startDate.toISOString(),
          lte: endDate.toISOString(),
        },
      },
      include: {
        schedule: {
          select: {
            dayOfWeek: true,
            doctor: {
              select: {
                name: true,
                surname: true,
              },
            },
            clinic: {
              select: {
                name: true,
                address: true,
              },
            },
          },
        },
        appointment: {
          select: {
            id: true,
            status: true,
          },
        },
      },
      orderBy: {
        startTime: "asc",
      },
    });

    return timeSlots;
  } catch (error) {
    console.error("Error fetching time slots for calendar:", error);
    return [];
  }
}

/**
 * Get doctor schedules with time slots for calendar display
 */
export async function getDoctorSchedulesWithSlots(
  doctorId: string,
  options?: {
    startDate?: Date;
    endDate?: Date;
    clinicId?: string;
  }
) {
  try {
    const startDate = options?.startDate || new Date();
    const endDate =
      options?.endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    const whereClause: any = {
      doctorId: doctorId,
      isActive: true,
    };

    if (options?.clinicId) {
      whereClause.clinicId = options.clinicId;
    }

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
          where: {
            startTime: {
              gte: startDate.toISOString(),
              lte: endDate.toISOString(),
            },
          },
          include: {
            appointment: {
              select: {
                id: true,
                status: true,
                patient: {
                  select: {
                    name: true,
                    surname: true,
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
    });

    return schedules;
  } catch (error) {
    console.error("Error fetching doctor schedules with slots:", error);
    return [];
  }
}
