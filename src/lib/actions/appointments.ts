"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
  validateAuth,
  validatePatient,
  validateDoctor,
  type ActionResult,
} from "./utils";
import { AppointmentStatus, AppointmentType } from "@prisma/client";

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
      const patient = await prisma.patient.findFirst({
        where: { user: { email: session.user.email } },
      });

      if (!patient) {
        return { success: false, error: "Paciente no encontrado" };
      }

      const appointments = await prisma.appointment.findMany({
        where: { patientId: patient.id },
        include: {
          doctor: {
            include: { user: true },
          },
          clinic: true,
          pricing: true,
          timeSlot: true,
        },
        orderBy: { datetime: "asc" },
      });

      return { success: true, data: appointments };
    } else if (session.user.role === "DOCTOR") {
      const doctor = await prisma.doctor.findFirst({
        where: { user: { email: session.user.email } },
      });

      if (!doctor) {
        return { success: false, error: "Doctor no encontrado" };
      }

      const appointments = await prisma.appointment.findMany({
        where: { doctorId: doctor.id },
        include: {
          patient: {
            include: { user: true },
          },
          clinic: true,
          pricing: true,
          timeSlot: true,
        },
        orderBy: { datetime: "asc" },
      });

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
      timeSlot: {
        schedule: {
          doctorId: doctorId,
        },
      },
    };

    if (options?.startDate && options?.endDate) {
      whereClause.timeSlot.startTime = {
        gte: options.startDate,
        lte: options.endDate,
      };
    }

    if (options?.status) {
      whereClause.status = {
        in: options.status,
      };
    }

    const appointments = await prisma.appointment.findMany({
      where: whereClause,
      include: {
        patient: {
          select: {
            id: true,
            name: true,
            surname: true,
            email: true,
            phone: true,
          },
        },
        clinic: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
        timeSlot: {
          select: {
            id: true,
            startTime: true,
            endTime: true,
            schedule: {
              select: {
                clinic: {
                  select: {
                    name: true,
                    address: true,
                  },
                },
              },
            },
          },
        },
        pricing: {
          select: {
            title: true,
            price: true,
          },
        },
      },
      orderBy: {
        datetime: "asc",
      },
    });

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

    const appointments = await prisma.appointment.findMany({
      where: whereClause,
      include: {
        timeSlot: {
          select: {
            id: true,
            startTime: true,
            endTime: true,
            schedule: {
              select: {
                doctor: {
                  select: {
                    name: true,
                    surname: true,
                    // Note: specialty field needs to be checked in schema
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
          },
        },
        pricing: {
          select: {
            title: true,
            price: true,
          },
        },
      },
      orderBy: {
        timeSlot: {
          startTime: "asc",
        },
      },
    });

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
    const timeSlot = await prisma.timeSlot.findUnique({
      where: { id: timeSlotId },
      include: {
        schedule: {
          include: {
            doctor: true,
            clinic: true,
          },
        },
      },
    });

    if (!timeSlot) {
      return { success: false, error: "Horario no encontrado" };
    }

    if (timeSlot.isBooked || timeSlot.isBlocked) {
      return { success: false, error: "El horario no está disponible" };
    }

    // Calculate the datetime from schedule and time slot
    const datetime = new Date(); // This would be calculated from the selected date + time slot

    // Create the appointment and mark time slot as booked in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Update time slot to mark as booked
      await tx.timeSlot.update({
        where: { id: timeSlotId },
        data: { isBooked: true },
      });

      // Create the appointment
      const appointment = await tx.appointment.create({
        data: {
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
        },
        include: {
          doctor: {
            include: {
              user: true,
              specialities: {
                include: {
                  speciality: true,
                },
              },
            },
          },
          clinic: true,
          pricing: true,
          timeSlot: true,
        },
      });

      return appointment;
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
    const conflictingAppointment = await prisma.appointment.findFirst({
      where: {
        doctorId,
        datetime: appointmentDate,
        status: {
          not: AppointmentStatus.CANCELED,
        },
      },
    });

    if (conflictingAppointment) {
      return { success: false, error: "El horario no está disponible" };
    }

    // Create the appointment
    const appointment = await prisma.appointment.create({
      data: {
        doctorId,
        patientId: patient.id,
        clinicId,
        pricingId: pricingId || null,
        datetime: appointmentDate,
        durationMinutes,
        type: type || AppointmentType.IN_PERSON,
        status: AppointmentStatus.PENDING,
        notes: notes || null,
      },
      include: {
        doctor: {
          include: {
            user: true,
            specialities: {
              include: {
                speciality: true,
              },
            },
          },
        },
        clinic: true,
        pricing: true,
      },
    });

    // Revalidate related pages
    revalidatePath("/dashboard/patient");
    revalidatePath("/dashboard/doctor");

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
    const appointments = await prisma.appointment.findMany({
      where: {
        doctorId,
        datetime: {
          gte: startOfDay,
          lte: endOfDay,
        },
        status: {
          not: AppointmentStatus.CANCELED,
        },
      },
      select: {
        datetime: true,
        durationMinutes: true,
      },
    });

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
    const doctor = await prisma.doctor.findUnique({
      where: { id: doctorId },
      include: {
        user: true,
        specialities: {
          include: {
            speciality: true,
          },
        },
        clinics: {
          include: {
            clinic: true,
          },
        },
        pricings: {
          where: {
            isActive: true,
          },
          include: {
            clinic: true,
          },
        },
      },
    });

    if (!doctor) {
      return { success: false, error: "Doctor no encontrado" };
    }

    return {
      success: true,
      data: doctor,
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
    const appointment = await prisma.appointment.findFirst({
      where: {
        id: appointmentId,
        doctorId: doctor.id,
      },
    });

    if (!appointment) {
      return { success: false, error: "Cita no encontrada" };
    }

    // Update the appointment status
    const updatedAppointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status },
      include: {
        patient: {
          include: {
            user: true,
          },
        },
        clinic: true,
      },
    });

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
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: {
        patient: {
          include: {
            user: true,
          },
        },
        doctor: {
          include: {
            user: true,
          },
        },
      },
    });

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
    const updatedAppointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        status: AppointmentStatus.CANCELED,
        updatedAt: new Date(),
      },
    });

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
