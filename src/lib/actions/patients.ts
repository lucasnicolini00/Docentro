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
