"use server";

import { revalidatePath } from "next/cache";
import {
  validateAuth,
  validatePatient,
  validateDoctor,
  type ActionResult,
} from "./utils";
import { AppointmentStatus, AppointmentType } from "@prisma/client";
import { appointmentsService } from "@/lib/services/appointmentsService";

/**
 * Create appointment via Server Action (replaces /api/appointments POST)
 */
export async function createAppointmentAction(
  timeSlotId: string,
  formData: FormData
): Promise<ActionResult> {
  try {
    const validation = await validatePatient();
    if ("error" in validation) {
      return { success: false, error: validation.error };
    }

    if (!timeSlotId) {
      return { success: false, error: "ID de horario requerido" };
    }

    const result = await createAppointmentWithTimeSlot(timeSlotId, formData);

    if (result.success) {
      revalidatePath("/dashboard/patient/appointments");
      revalidatePath("/dashboard/doctor/appointments");
      return {
        success: true,
        data: result.data,
        message: "Cita creada exitosamente",
      };
    }

    return result;
  } catch (error) {
    console.error("Error creating appointment:", error);
    return { success: false, error: "Error interno del servidor" };
  }
}

/**
 * Get user appointments (replaces /api/appointments GET)
 */
export async function getUserAppointments(): Promise<ActionResult> {
  try {
    const authResult = await validateAuth();
    if (!authResult) {
      return { success: false, error: "No autorizado" };
    }

    const session = authResult;

    if (!session.user?.email) {
      return { success: false, error: "Email de usuario requerido" };
    }

    if (session.user.role === "PATIENT") {
      const patient = await appointmentsService.getPatient(session.user.email);

      if (!patient) {
        return { success: false, error: "Paciente no encontrado" };
      }

      const appointments = await appointmentsService.getPatientAppointments(patient.id);

      return { success: true, data: appointments };
    } else if (session.user.role === "DOCTOR") {
      const doctor = await appointmentsService.getDoctor(session.user.email);

      if (!doctor) {
        return { success: false, error: "Doctor no encontrado" };
      }

      const appointments = await appointmentsService.getDoctorAppointments(doctor.id);

      return { success: true, data: appointments };
    }

    return { success: false, error: "Rol de usuario no válido" };
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return { success: false, error: "Error interno del servidor" };
  }
}

/**
 * Get doctor appointments for calendar view
 */
export async function getDoctorAppointments(
  doctorId: string,
  options?: {
    startDate?: Date;
    endDate?: Date;
    status?: AppointmentStatus[];
  }
) {
  try {
    const whereClause: any = {
      doctorId: doctorId,
    };

    if (options?.startDate && options?.endDate) {
      whereClause.datetime = {
        gte: options.startDate,
        lte: options.endDate,
      };
    }

    if (options?.status) {
      whereClause.status = {
        in: options.status,
      };
    }

    const appointments = await appointmentsService.getDoctorAppointmentsForCalendar(
      doctorId,
      options?.startDate || new Date(),
      options?.endDate || new Date(),
      options?.status
    );

    return appointments;
  } catch (error) {
    console.error("Error fetching doctor appointments:", error);
    return [];
  }
}

/**
 * Get patient appointments for calendar view
 */
export async function getPatientAppointments(
  patientId: string,
  options?: {
    startDate?: Date;
    endDate?: Date;
    status?: AppointmentStatus[];
  }
) {
  try {
    const whereClause: any = {
      patientId: patientId,
    };

    if (options?.startDate && options?.endDate) {
      whereClause.timeSlot = {
        startTime: {
          gte: options.startDate,
          lte: options.endDate,
        },
      };
    }

    if (options?.status) {
      whereClause.status = {
        in: options.status,
      };
    }

    const appointments = await appointmentsService.getPatientAppointmentsForCalendar(
      patientId,
      options?.startDate || new Date(),
      options?.endDate || new Date(),
      options?.status
    );

    return appointments;
  } catch (error) {
    console.error("Error fetching patient appointments:", error);
    return [];
  }
}

/**
 * Server action for creating a new appointment with time slot integration (Patient)
 */
export async function createAppointmentWithTimeSlot(
  timeSlotId: string,
  formData: FormData
): Promise<ActionResult> {
  try {
    const validation = await validatePatient();

    if ("error" in validation) {
      return { success: false, error: validation.error };
    }

    const { patient } = validation;

    // Extract form data
    const pricingId = formData.get("pricingId") as string;
    const type = formData.get("type") as AppointmentType;
    const notes = formData.get("notes") as string;

    // Get the time slot and verify it's available
    const timeSlot = await appointmentsService.getTimeSlotWithRelations(timeSlotId);

    if (!timeSlot) {
      return { success: false, error: "Horario no encontrado" };
    }

    if (timeSlot.isBooked || timeSlot.isBlocked) {
      return { success: false, error: "El horario no está disponible" };
    }

    // Calculate the datetime from schedule and time slot
    const datetime = new Date(); // This would be calculated from the selected date + time slot

    // Create the appointment and mark time slot as booked
    const result = await appointmentsService.createAppointmentWithTimeSlot({
      doctorId: timeSlot.schedule.doctorId,
      patientId: patient.id,
      clinicId: timeSlot.schedule.clinicId,
      timeSlotId: timeSlotId,
      pricingId: pricingId || null,
      datetime,
      durationMinutes:
        parseInt(timeSlot.endTime.split(":")[1]) -
          parseInt(timeSlot.startTime.split(":")[1]) || 30,
      type: type || AppointmentType.IN_PERSON,
      status: AppointmentStatus.PENDING,
      notes: notes || null,
    });

    revalidatePath("/dashboard/patient");
    revalidatePath("/dashboard/doctor");
    revalidatePath("/dashboard/doctor/schedules");

    return {
      success: true,
      message: "Cita agendada exitosamente",
      data: result,
    };
  } catch (error) {
    console.error("Error creating appointment:", error);
    return { success: false, error: "Error al agendar la cita" };
  }
}

/**
 * Server action for creating a new appointment (Patient) - Legacy method
 */
export async function createAppointment(
  formData: FormData
): Promise<ActionResult> {
  try {
    const validation = await validatePatient();

    if ("error" in validation) {
      return { success: false, error: validation.error };
    }

    const { patient } = validation;

    // Extract form data
    const doctorId = formData.get("doctorId") as string;
    const clinicId = formData.get("clinicId") as string;
    const pricingId = formData.get("pricingId") as string;
    const datetime = formData.get("datetime") as string;
    const type = formData.get("type") as AppointmentType;
    const notes = formData.get("notes") as string;
    const durationMinutes =
      parseInt(formData.get("durationMinutes") as string) || 30;

    if (!doctorId || !clinicId || !datetime) {
      return { success: false, error: "Faltan datos requeridos" };
    }

    // Validate the datetime is in the future
    const appointmentDate = new Date(datetime);
    if (appointmentDate <= new Date()) {
      return { success: false, error: "La fecha debe ser en el futuro" };
    }

    // Check if the time slot is available
    const conflictingAppointment = await appointmentsService.checkConflictingAppointment(
      doctorId,
      appointmentDate
    );

    if (conflictingAppointment) {
      return { success: false, error: "El horario no está disponible" };
    }

    // Create the appointment
    const appointment = await appointmentsService.createAppointment({
      doctorId,
      patientId: patient.id,
      clinicId,
      pricingId: pricingId || null,
      datetime: appointmentDate,
      durationMinutes,
      type: type || AppointmentType.IN_PERSON,
      status: AppointmentStatus.PENDING,
      notes: notes || null,
    });

    // Revalidate related pages
    revalidatePath("/dashboard/patient");
    revalidatePath("/dashboard/doctor/appointments");

    return {
      success: true,
      message: "Cita agendada exitosamente",
      data: appointment,
    };
  } catch (error) {
    console.error("Error creating appointment:", error);
    return { success: false, error: "Error al agendar la cita" };
  }
}

/**
 * Server action for getting doctor availability
 */
export async function getDoctorAvailability(
  doctorId: string,
  date: string
): Promise<ActionResult> {
  try {
    if (!doctorId || !date) {
      return { success: false, error: "Doctor ID y fecha requeridos" };
    }

    const targetDate = new Date(date);
    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);

    // Get all appointments for this doctor on this date
    const appointments = await appointmentsService.getDoctorAppointmentsForAvailability(
      doctorId,
      startOfDay,
      endOfDay
    );

    // Generate available slots (9 AM to 6 PM, 30-minute slots)
    const availableSlots: Array<{ datetime: string; time: string }> = [];
    const workStart = 9; // 9 AM
    const workEnd = 18; // 6 PM
    const slotDuration = 30; // 30 minutes

    for (let hour = workStart; hour < workEnd; hour++) {
      for (let minute = 0; minute < 60; minute += slotDuration) {
        const slotTime = new Date(targetDate);
        slotTime.setHours(hour, minute, 0, 0);

        // Skip if slot is in the past
        if (slotTime <= new Date()) continue;

        // Check if this slot conflicts with existing appointments
        const isConflict = appointments.some((apt) => {
          const aptStart = new Date(apt.datetime);
          const aptEnd = new Date(
            aptStart.getTime() + apt.durationMinutes * 60000
          );
          const slotEnd = new Date(slotTime.getTime() + slotDuration * 60000);

          return (
            (slotTime >= aptStart && slotTime < aptEnd) ||
            (slotEnd > aptStart && slotEnd <= aptEnd) ||
            (slotTime <= aptStart && slotEnd >= aptEnd)
          );
        });

        if (!isConflict) {
          availableSlots.push({
            datetime: slotTime.toISOString(),
            time: slotTime.toLocaleTimeString("es-ES", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          });
        }
      }
    }

    return {
      success: true,
      data: availableSlots,
    };
  } catch (error) {
    console.error("Error getting doctor availability:", error);
    return { success: false, error: "Error al obtener disponibilidad" };
  }
}

/**
 * Server action for getting doctor clinics and pricing
 */
export async function getDoctorClinicsAndPricing(
  doctorId: string
): Promise<ActionResult> {
  try {
    const doctor = await appointmentsService.getDoctorWithRelations(doctorId);

    if (!doctor) {
      return { success: false, error: "Doctor no encontrado" };
    }

    // Serialize the data to ensure Decimal and Date objects are properly converted
    const serializedDoctor = {
      ...doctor,
      createdAt: doctor.createdAt.toISOString(),
      updatedAt: doctor.updatedAt.toISOString(),
      deletedAt: doctor.deletedAt?.toISOString() || null,
      user: {
        ...doctor.user,
        createdAt: doctor.user.createdAt.toISOString(),
        updatedAt: doctor.user.updatedAt.toISOString(),
        deletedAt: doctor.user.deletedAt?.toISOString() || null,
      },
      clinics: doctor.clinics.map((dc) => ({
        ...dc,
        createdAt: dc.createdAt.toISOString(),
        clinic: {
          ...dc.clinic,
          createdAt: dc.clinic.createdAt.toISOString(),
          updatedAt: dc.clinic.updatedAt.toISOString(),
          deletedAt: dc.clinic.deletedAt?.toISOString() || null,
        },
      })),
      pricings: doctor.pricings.map((pricing) => ({
        ...pricing,
        price: pricing.price.toNumber(), // Convert Decimal to number
        createdAt: pricing.createdAt.toISOString(),
        updatedAt: pricing.updatedAt.toISOString(),
        deletedAt: pricing.deletedAt?.toISOString() || null,
        clinic: {
          ...pricing.clinic,
          createdAt: pricing.clinic.createdAt.toISOString(),
          updatedAt: pricing.clinic.updatedAt.toISOString(),
          deletedAt: pricing.clinic.deletedAt?.toISOString() || null,
        },
      })),
    };

    return {
      success: true,
      data: serializedDoctor,
    };
  } catch (error) {
    console.error("Error getting doctor clinics and pricing:", error);
    return { success: false, error: "Error al obtener información del doctor" };
  }
}

/**
 * Server action for updating appointment status (Doctor)
 */
export async function updateAppointmentStatus(
  appointmentId: string,
  status: AppointmentStatus
): Promise<ActionResult> {
  try {
    const validation = await validateDoctor();

    if ("error" in validation) {
      return { success: false, error: validation.error };
    }

    const { doctor } = validation;

    // Verify the appointment belongs to this doctor
    const appointment = await appointmentsService.getAppointmentForStatusUpdate(
      appointmentId,
      doctor.id
    );

    if (!appointment) {
      return { success: false, error: "Cita no encontrada" };
    }

    // Update the appointment status
    const updatedAppointment = await appointmentsService.updateAppointmentStatus(
      appointmentId,
      status
    );

    // Revalidate related pages
    revalidatePath("/dashboard/doctor");
    revalidatePath("/dashboard/patient");

    return {
      success: true,
      message: `Cita ${status.toLowerCase()} exitosamente`,
      data: updatedAppointment,
    };
  } catch (error) {
    console.error("Error updating appointment status:", error);
    return { success: false, error: "Error al actualizar la cita" };
  }
}

/**
 * Server action for canceling appointment (Patient or Doctor)
 */
export async function cancelAppointment(
  appointmentId: string
): Promise<ActionResult> {
  try {
    const authValidation = await validateAuth();

    if (!authValidation) {
      return { success: false, error: "No autorizado" };
    }

    // Get the appointment and verify ownership
    const appointment = await appointmentsService.getAppointmentForCancellation(appointmentId);

    if (!appointment) {
      return { success: false, error: "Cita no encontrada" };
    }

    // Verify the user owns this appointment (either as patient or doctor)
    const isPatientOwner =
      appointment.patient.userId === authValidation.user.id;
    const isDoctorOwner = appointment.doctor.userId === authValidation.user.id;

    if (!isPatientOwner && !isDoctorOwner) {
      return {
        success: false,
        error: "No tienes permisos para cancelar esta cita",
      };
    }

    // Update the appointment status to canceled
    const updatedAppointment = await appointmentsService.cancelAppointment(appointmentId);

    // Revalidate related pages
    revalidatePath("/dashboard/doctor");
    revalidatePath("/dashboard/patient");

    return {
      success: true,
      message: "Cita cancelada exitosamente",
      data: updatedAppointment,
    };
  } catch (error) {
    console.error("Error canceling appointment:", error);
    return { success: false, error: "Error al cancelar la cita" };
  }
}
