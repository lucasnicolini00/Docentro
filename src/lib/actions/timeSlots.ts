"use server";

import { validateAuth, type ActionResult } from "./utils";
import { DayOfWeek } from "@prisma/client";
import { getTimeSlotsForCalendar } from "./schedules";
import { timeSlotsService } from "@/lib/services/timeSlotsService";

/**
 * Server action to get available time slots for a doctor at a specific clinic on a specific date
 * Replaces /api/time-slots/[doctorId]/[clinicId] API route
 */
export async function getTimeSlotsForBooking(
  doctorId: string,
  clinicId: string,
  targetDayOfWeek: DayOfWeek
): Promise<ActionResult> {
  try {
    const validation = await validateAuth();
    if (!validation || "error" in validation) {
      return { success: false, error: "Authentication failed" };
    }

    // Validate input parameters
    if (!doctorId || !clinicId || !targetDayOfWeek) {
      return { success: false, error: "Parámetros requeridos faltantes" };
    }

    // Verify doctor and clinic exist
    const doctor = await timeSlotsService.getDoctor(doctorId);

    if (!doctor) {
      return { success: false, error: "Doctor no encontrado" };
    }

    const clinic = await timeSlotsService.getClinic(clinicId);

    if (!clinic) {
      return { success: false, error: "Clínica no encontrada" };
    }

    // Get schedules for this doctor, clinic, and day of week
    const schedule = await timeSlotsService.getScheduleForDay(
      doctorId,
      clinicId,
      targetDayOfWeek
    );

    if (!schedule) {
      return {
        success: true,
        data: {
          doctor: {
            id: doctor.id,
            name: `${doctor.name} ${doctor.surname}`,
            specialties: doctor.specialities.map((ds) => ds.speciality.name),
          },
          clinic: {
            id: clinic.id,
            name: clinic.name,
            address: clinic.address,
          },
          timeSlots: [],
          message: "No hay horarios disponibles para este día",
        },
      };
    }

    // Format the response
    const timeSlots = schedule.timeSlots.map((slot) => ({
      id: slot.id,
      startTime: slot.startTime,
      endTime: slot.endTime,
      available: !slot.isBooked && !slot.isBlocked,
    }));

    const result = {
      doctor: {
        id: doctor.id,
        name: `${doctor.name} ${doctor.surname}`,
        specialties: doctor.specialities.map((ds) => ds.speciality.name),
      },
      clinic: {
        id: clinic.id,
        name: clinic.name,
        address: clinic.address,
      },
      schedule: {
        id: schedule.id,
        dayOfWeek: schedule.dayOfWeek,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
      },
      timeSlots,
    };

    return { success: true, data: result };
  } catch (error) {
    console.error("Error fetching time slots:", error);
    return {
      success: false,
      error: "Error al obtener los horarios disponibles",
    };
  }
}

/**
 * Server action to get doctor's weekly schedule overview
 */
export async function getDoctorWeeklySchedule(
  doctorId: string
): Promise<ActionResult> {
  try {
    const validation = await validateAuth();
    if (!validation || "error" in validation) {
      return { success: false, error: "Authentication failed" };
    }

    // Get all schedules for the doctor
    const schedules = await timeSlotsService.getDoctorWeeklySchedule(doctorId);

    // Group by day of week
    const weeklySchedule = schedules.map((schedule) => {
      const daySlots = schedule.timeSlots.map((slot) => ({
        id: slot.id,
        startTime: slot.startTime,
        endTime: slot.endTime,
        isBooked: slot.isBooked,
        isBlocked: slot.isBlocked,
        clinic: schedule.clinic.name,
        appointment: slot.appointment
          ? {
              id: slot.appointment.id,
              patientName: `${slot.appointment.patient.user.firstName} ${slot.appointment.patient.user.lastName}`,
              status: slot.appointment.status,
            }
          : null,
      }));

      return {
        dayOfWeek: schedule.dayOfWeek,
        clinic: {
          id: schedule.clinic.id,
          name: schedule.clinic.name,
        },
        schedule: {
          id: schedule.id,
          startTime: schedule.startTime,
          endTime: schedule.endTime,
        },
        slots: daySlots,
        totalSlots: daySlots.length,
        bookedSlots: daySlots.filter((s) => s.isBooked).length,
        availableSlots: daySlots.filter((s) => !s.isBooked && !s.isBlocked)
          .length,
      };
    });

    return { success: true, data: weeklySchedule };
  } catch (error) {
    console.error("Error fetching weekly schedule:", error);
    return { success: false, error: "Error al obtener el horario semanal" };
  }
}

/**
 * Server action to get available time slots for multiple clinics and days
 */
export async function getAvailabilityOverview(
  doctorId: string,
  clinicId?: string
): Promise<ActionResult> {
  try {
    const validation = await validateAuth();
    if (!validation || "error" in validation) {
      return { success: false, error: "Authentication failed" };
    }

    const schedules = await timeSlotsService.getAvailabilityOverview(
      doctorId,
      clinicId
    );

    // Group by day and clinic
    const availability = schedules.map((schedule) => ({
      dayOfWeek: schedule.dayOfWeek,
      clinic: {
        id: schedule.clinic.id,
        name: schedule.clinic.name,
        address: schedule.clinic.address,
      },
      schedule: {
        id: schedule.id,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
      },
      availableSlots: schedule.timeSlots.map((slot) => ({
        id: slot.id,
        startTime: slot.startTime,
        endTime: slot.endTime,
      })),
      totalAvailable: schedule.timeSlots.length,
    }));

    return { success: true, data: availability };
  } catch (error) {
    console.error("Error fetching availability overview:", error);
    return { success: false, error: "Error al obtener la disponibilidad" };
  }
}

/**
 * Server action to get time slots for calendar display (replaces /api/time-slots/[doctorId]/[clinicId])
 * Returns same format as the API route for seamless migration
 */
export async function getTimeSlotsForCalendarAction(
  doctorId: string,
  clinicId: string,
  options?: {
    startDate?: Date;
    endDate?: Date;
  }
): Promise<ActionResult> {
  try {
    const validation = await validateAuth();
    if (!validation || "error" in validation) {
      return { success: false, error: "Authentication failed" };
    }

    // Validate input parameters
    if (!doctorId || !clinicId) {
      return { success: false, error: "Doctor ID y Clinic ID son requeridos" };
    }

    const timeSlots = await getTimeSlotsForCalendar(
      doctorId,
      clinicId,
      options
    );

    // Transform to include availability info (matching API format)
    const slotsWithAvailability = timeSlots.map((slot) => ({
      id: slot.id,
      startTime: slot.startTime,
      endTime: slot.endTime,
      isBooked: slot.isBooked,
      isBlocked: slot.isBlocked,
      // Available if not booked, not blocked, and no appointment exists
      isAvailable: !slot.isBooked && !slot.isBlocked && !slot.appointment,
      appointment: slot.appointment
        ? {
            id: slot.appointment.id,
            status: slot.appointment.status,
          }
        : null,
      schedule: {
        doctorName: slot.schedule?.doctor
          ? `${slot.schedule.doctor.name} ${slot.schedule.doctor.surname}`
          : null,
        clinicName: slot.schedule?.clinic?.name || null,
      },
    }));

    return { success: true, data: slotsWithAvailability };
  } catch (error) {
    console.error("Error fetching time slots for calendar:", error);
    return { success: false, error: "Error al obtener horarios disponibles" };
  }
}
