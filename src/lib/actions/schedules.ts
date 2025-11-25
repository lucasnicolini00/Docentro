"use server";

import { revalidatePath } from "next/cache";
import { validateDoctor, type ActionResult } from "./utils";
import { DayOfWeek } from "@prisma/client";
import { schedulesService } from "@/lib/services/schedulesService";

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
    const existingSchedule = await schedulesService.getSchedule(
      doctor.id,
      clinicId,
      data.dayOfWeek
    );

    if (existingSchedule) {
      return {
        success: false,
        error: "Ya existe un horario para este día en esta clínica",
      };
    }

    // Create the schedule
    const schedule = await schedulesService.createSchedule({
      doctorId: doctor.id,
      clinicId: clinicId,
      dayOfWeek: data.dayOfWeek,
      startTime: data.startTime,
      endTime: data.endTime,
    });

    // Generate time slots
    await generateTimeSlots(
      schedule.id,
      data.startTime,
      data.endTime,
      data.slotDuration || 30
    );

    // Fetch the schedule again with time slots included
    const scheduleWithSlots = await schedulesService.getScheduleById(schedule.id);

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
    const schedule = await schedulesService.getScheduleByIdAndDoctor(scheduleId, doctor.id);

    if (!schedule) {
      return { success: false, error: "Horario no encontrado" };
    }

    // Update the schedule
    const updatedSchedule = await schedulesService.updateSchedule(scheduleId, {
      startTime: data.startTime,
      endTime: data.endTime,
      isActive: data.isActive,
    });

    // Regenerate time slots if times changed
    if (
      data.startTime !== schedule.startTime ||
      data.endTime !== schedule.endTime
    ) {
      // Delete existing time slots that aren't booked
      await schedulesService.deleteTimeSlots(scheduleId);

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

    // Optimized: Single query with ownership validation
    const schedule = await schedulesService.getScheduleForDeletion(scheduleId, doctor.id);

    if (!schedule) {
      return {
        success: false,
        error: "Horario no encontrado o no tienes permisos para eliminarlo",
      };
    }

    // Check if there are any booked appointments using count
    if (schedule._count.timeSlots > 0) {
      return {
        success: false,
        error: "No se puede eliminar un horario con citas reservadas",
      };
    }

    // Delete the schedule (cascade will delete time slots)
    await schedulesService.deleteSchedule(scheduleId);

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
    const schedules = await schedulesService.getDoctorSchedules(doctor.id);

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
    // Check for existing schedules first
    const existingSchedules = await schedulesService.getExistingSchedules(
      doctor.id,
      clinicId,
      scheduleData.map((data) => data.dayOfWeek)
    );

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
    // Use service for bulk creation
    const result = await schedulesService.bulkCreateSchedules(
      doctor.id,
      clinicId,
      scheduleData,
      replaceExisting,
      existingSchedules
    );

    // Fetch all created schedules with their relations using service
    const createdSchedules = await schedulesService.getSchedulesByIds(result, replaceExisting);

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

    // Get the schedule for this day using service
    const schedule = await schedulesService.getScheduleForTimeSlots(
      doctorId,
      clinicId,
      dayOfWeek
    );

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

    // Optimized: Single query with ownership validation and select only what we need
    const timeSlot = await schedulesService.getTimeSlotForToggle(timeSlotId, doctor.id);

    if (!timeSlot) {
      return { success: false, error: "Horario no encontrado o ya reservado" };
    }

    // Optimized: Only update if the value is actually changing
    if (timeSlot.isBlocked === isBlocked) {
      return {
        success: true,
        data: timeSlot,
        message: `Horario ya está ${isBlocked ? "bloqueado" : "disponible"}`,
      };
    }

    const updatedSlot = await schedulesService.updateTimeSlotBlock(timeSlotId, isBlocked);

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
    await schedulesService.createTimeSlots(slots);
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

    const timeSlots = await schedulesService.getTimeSlotsForCalendar(
      doctorId,
      clinicId,
      startDate,
      endDate
    );

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

    const schedules = await schedulesService.getDoctorSchedulesWithSlots(
      doctorId,
      startDate,
      endDate,
      options?.clinicId
    );

    return schedules;
  } catch (error) {
    console.error("Error fetching doctor schedules with slots:", error);
    return [];
  }
}
