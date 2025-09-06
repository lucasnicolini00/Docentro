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
    });

    // Generate time slots
    await generateTimeSlots(
      schedule.id,
      data.startTime,
      data.endTime,
      data.slotDuration || 30
    );

    revalidatePath("/dashboard/doctor/schedules");
    return { success: true, data: schedule };
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

    // Check if there are any booked appointments
    const hasBookedSlots = await prisma.timeSlot.findFirst({
      where: {
        scheduleId: scheduleId,
        isBooked: true,
      },
    });

    if (hasBookedSlots) {
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
          where: {
            isBooked: false,
            isBlocked: false,
          },
          orderBy: {
            startTime: "asc",
          },
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
 * Server action for getting available time slots for a specific date and clinic
 */
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
