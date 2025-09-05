"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { validatePatient, type ActionResult } from "./utils";

/**
 * Server action for updating patient profile
 */
export async function updatePatientProfile(
  formData: FormData
): Promise<ActionResult> {
  try {
    const validation = await validatePatient();

    if ("error" in validation) {
      return { success: false, error: validation.error };
    }

    const { patient, session } = validation;

    // Extract form data
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const patientName = formData.get("patientName") as string;
    const patientSurname = formData.get("patientSurname") as string;
    const patientEmail = formData.get("patientEmail") as string;
    const patientPhone = formData.get("patientPhone") as string;
    const birthdate = formData.get("birthdate") as string;
    const gender = formData.get("gender") as string;

    // Start a transaction to update all related data
    const result = await prisma.$transaction(async (tx) => {
      // Update user data
      const updatedUser = await tx.user.update({
        where: { id: session.user.id },
        data: {
          firstName,
          lastName,
          email,
          phone: phone || null,
        },
      });

      // Update patient data
      const updatedPatient = await tx.patient.update({
        where: { id: patient.id },
        data: {
          name: patientName,
          surname: patientSurname,
          email: patientEmail,
          phone: patientPhone || null,
          birthdate: birthdate ? new Date(birthdate) : null,
          gender: gender || null,
        },
      });

      return { updatedUser, updatedPatient };
    });

    // Revalidate the profile page to show updated data
    revalidatePath("/dashboard/patient/profile");

    return {
      success: true,
      message: "Perfil actualizado exitosamente",
      data: {
        user: result.updatedUser,
        patient: result.updatedPatient,
      },
    };
  } catch (error) {
    console.error("Error updating patient profile:", error);
    return { success: false, error: "Error interno del servidor" };
  }
}

/**
 * Server action for getting patient profile data
 */
export async function getPatientProfile(): Promise<ActionResult> {
  try {
    const validation = await validatePatient();

    if ("error" in validation) {
      return { success: false, error: validation.error };
    }

    const { patient } = validation;

    return {
      success: true,
      data: patient,
    };
  } catch (error) {
    console.error("Error fetching patient profile:", error);
    return { success: false, error: "Error al obtener el perfil del paciente" };
  }
}

/**
 * Server action for getting patient dashboard data with appointments
 */
export async function getPatientDashboard(): Promise<ActionResult> {
  try {
    const validation = await validatePatient();

    if ("error" in validation) {
      return { success: false, error: validation.error };
    }

    const { patient: validatedPatient, session } = validation;

    // Get patient data with appointments
    const patient = await prisma.patient.findUnique({
      where: { id: validatedPatient.id },
      include: {
        appointments: {
          include: {
            doctor: true,
            clinic: true,
          },
          orderBy: {
            datetime: "desc",
          },
        },
      },
    });

    if (!patient) {
      return { success: false, error: "Paciente no encontrado" };
    }

    const now = new Date();
    const upcomingAppointments = patient.appointments.filter(
      (appointment) => appointment.datetime > now
    );
    const pastAppointments = patient.appointments.filter(
      (appointment) => appointment.datetime <= now
    );

    return {
      success: true,
      data: {
        patient,
        upcomingAppointments,
        pastAppointments,
        session,
      },
    };
  } catch (error) {
    console.error("Error fetching patient dashboard:", error);
    return {
      success: false,
      error: "Error al obtener el dashboard del paciente",
    };
  }
}
