"use server";

import {
  registerUser,
  loginUser,
  type RegisterData,
  type LoginData,
} from "@/lib/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Server action for user registration
export async function registerAction(formData: FormData) {
  const data: RegisterData = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    phone: (formData.get("phone") as string) || undefined,
    userType: formData.get("userType") as "patient" | "doctor",
  };

  const result = await registerUser(data);

  if (result.success) {
    // Set a simple session cookie (in production, use proper JWT/session management)
    const cookieStore = await cookies();
    cookieStore.set(
      "user-session",
      JSON.stringify({
        userId: result.user?.id,
        email: result.user?.email,
        role: result.user?.role,
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 1 week
      }
    );

    redirect("/login?message=registered");
  }

  return result;
}

// Server action for user login
export async function loginAction(formData: FormData) {
  const data: LoginData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const result = await loginUser(data);

  if (result.success) {
    // Set a simple session cookie (in production, use proper JWT/session management)
    const cookieStore = await cookies();
    cookieStore.set(
      "user-session",
      JSON.stringify({
        userId: result.user?.id,
        email: result.user?.email,
        role: result.user?.role,
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 1 week
      }
    );

    redirect("/");
  }

  return result;
}

// Server action for logout
export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("user-session");
  redirect("/");
}

// Get current user session
export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("user-session");

    if (!session) {
      return null;
    }

    const sessionData = JSON.parse(session.value);
    return sessionData;
  } catch {
    return null;
  }
}

// Server action for updating patient profile
export async function updatePatientProfile(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return { success: false, error: "No autorizado" };
    }

    // Verify user is a patient
    const patient = await prisma.patient.findUnique({
      where: { userId: session.user.id },
      include: {
        user: true,
      },
    });

    if (!patient) {
      return { success: false, error: "Usuario no es un paciente" };
    }

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
      user: result.updatedUser,
      patient: result.updatedPatient,
    };
  } catch (error) {
    console.error("Error updating patient profile:", error);
    return { success: false, error: "Error interno del servidor" };
  }
}

// Server action for updating doctor profile
export async function updateDoctorProfile(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return { success: false, error: "No autorizado" };
    }

    // Verify user is a doctor
    const doctor = await prisma.doctor.findUnique({
      where: { userId: session.user.id },
      include: {
        user: true,
        specialities: true,
        experiences: true,
      },
    });

    if (!doctor) {
      return { success: false, error: "Usuario no es un doctor" };
    }

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
      user: result.updatedUser,
      doctor: result.updatedDoctor,
    };
  } catch (error) {
    console.error("Error updating doctor profile:", error);
    return { success: false, error: "Error interno del servidor" };
  }
}
