"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { validateDoctor, type ActionResult } from "./utils";

/**
 * Server action for updating doctor profile
 */
export async function updateDoctorProfile(
  formData: FormData
): Promise<ActionResult> {
  try {
    const validation = await validateDoctor();

    if ("error" in validation) {
      return { success: false, error: validation.error };
    }

    const { doctor, session } = validation;

    // Extract form data
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const doctorName = formData.get("doctorName") as string;
    const doctorSurname = formData.get("doctorSurname") as string;
    const doctorEmail = formData.get("doctorEmail") as string;
    const doctorPhone = formData.get("doctorPhone") as string;

    // Handle specialities (assuming they come as comma-separated IDs)
    const specialitiesData = formData.get("specialities") as string;
    const specialityIds = specialitiesData
      ? specialitiesData
          .split(",")
          .map((id) => id.trim())
          .filter((id) => id !== "")
      : [];

    // Handle experiences (assuming they come as JSON string)
    const experiencesData = formData.get("experiences") as string;
    let experiences = [];
    try {
      experiences = experiencesData ? JSON.parse(experiencesData) : [];
    } catch {
      experiences = [];
    }

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

      // Update doctor data
      const updatedDoctor = await tx.doctor.update({
        where: { id: doctor.id },
        data: {
          name: doctorName,
          surname: doctorSurname,
          email: doctorEmail,
          phone: doctorPhone || null,
        },
      });

      // Update specialities
      if (specialityIds.length > 0) {
        // Remove existing specialities
        await tx.doctorSpeciality.deleteMany({
          where: { doctorId: doctor.id },
        });

        // Add new specialities
        await tx.doctorSpeciality.createMany({
          data: specialityIds.map((specialityId) => ({
            doctorId: doctor.id,
            specialityId,
          })),
        });
      }

      // Update experiences
      if (experiences.length > 0) {
        // Remove existing experiences
        await tx.experience.deleteMany({
          where: { doctorId: doctor.id },
        });

        // Add new experiences
        await tx.experience.createMany({
          data: experiences.map((exp: any) => ({
            doctorId: doctor.id,
            title: exp.title,
            company: exp.company,
            location: exp.location || null,
            startDate: exp.startDate ? new Date(exp.startDate) : new Date(),
            endDate: exp.endDate ? new Date(exp.endDate) : null,
            description: exp.description || null,
          })),
        });
      }

      return { updatedUser, updatedDoctor };
    });

    // Revalidate the profile page to show updated data
    revalidatePath("/dashboard/doctor/profile");

    return {
      success: true,
      message: "Perfil actualizado exitosamente",
      data: {
        user: result.updatedUser,
        doctor: result.updatedDoctor,
      },
    };
  } catch (error) {
    console.error("Error updating doctor profile:", error);
    return { success: false, error: "Error interno del servidor" };
  }
}

/**
 * Server action for getting doctor specialities (example of read action)
 */
export async function getDoctorSpecialities() {
  try {
    const specialities = await prisma.speciality.findMany({
      orderBy: { name: "asc" },
    });

    return {
      success: true,
      data: specialities,
    };
  } catch (error) {
    console.error("Error fetching specialities:", error);
    return { success: false, error: "Error al obtener especialidades" };
  }
}
