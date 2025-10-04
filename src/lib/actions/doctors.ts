"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { validateDoctor, validateAuth, type ActionResult } from "./utils";
import { getImageUrl } from "./images-uploader";

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

/**
 * Server action for getting doctor profile data
 */
export async function getDoctorProfile(): Promise<ActionResult> {
  try {
    const session = await validateAuth();

    if (!session || !session.user?.id) {
      return { success: false, error: "No autorizado" };
    }

    // Get doctor with all related information. Use userId from session to avoid
    // doing an extra doctor lookup (validateDoctor previously fetched the
    // doctor record which caused two DB calls). Also limit images returned to
    // the most recent 6 to reduce payload for the profile page.
    const fullDoctor = await prisma.doctor.findUnique({
      where: { userId: session.user.id },
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        phone: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
        specialities: {
          include: {
            speciality: {
              select: { id: true, name: true },
            },
          },
        },
        // Limit experiences to recent ones to avoid loading large histories
        experiences: {
          orderBy: { startDate: "desc" },
          take: 10,
        },
        profileImage: {
          select: { id: true, url: true, createdAt: true },
        },
        images: {
          orderBy: { createdAt: "desc" },
          take: 6,
          select: { id: true, url: true, createdAt: true },
        },
      },
    });

    if (!fullDoctor) {
      return { success: false, error: "Doctor no encontrado" };
    }

    return {
      success: true,
      data: fullDoctor,
    };
  } catch (error) {
    console.error("Error fetching doctor profile:", error);
    return { success: false, error: "Error al obtener el perfil del doctor" };
  }
}
export async function getAllDoctorImages(): Promise<ActionResult> {
  try {
    const session = await validateAuth();

    if (!session || !session.user?.id) {
      return { success: false, error: "No autorizado" };
    }

    const images = await prisma.image.findMany({
      where: {
        doctorId: await getDoctorIdFromUserId(session.user.id),
        profileForDoctor: null, // Exclude profile images from gallery
      },
      orderBy: { createdAt: "desc" },
      select: { id: true, createdAt: true },
    });

    // Generate fresh signed URLs for each image
    const imagesWithUrls = await Promise.all(
      images.map(async (img) => {
        const urlResult = await getImageUrl(img.id);
        return {
          id: img.id,
          url: urlResult.success ? urlResult.data : "", // should always succeed
          createdAt: img.createdAt,
        };
      })
    );

    return {
      success: true,
      data: imagesWithUrls,
    };
  } catch (error) {
    console.error("Error fetching doctor images:", error);
    return { success: false, error: "Error al obtener imágenes" };
  }
}

/**
 * Helper to get doctor id from user id
 */
async function getDoctorIdFromUserId(userId: string): Promise<string> {
  const doctor = await prisma.doctor.findUnique({
    where: { userId },
    select: { id: true },
  });
  if (!doctor) throw new Error("Doctor not found");
  return doctor.id;
}

/**
 * Uploads a profile image for the current doctor to Google Cloud Storage and
 * saves the Image row in the database, linking it as the doctor's profile image.
 */
// upload/remove image actions moved to images-uploader.ts

/**
 * Server action for getting all specialities
 */
export async function getAllSpecialities(): Promise<ActionResult> {
  try {
    const specialities = await prisma.speciality.findMany({
      orderBy: { name: "asc" },
    });

    return {
      success: true,
      data: specialities,
    };
  } catch (error) {
    console.error("Error fetching all specialities:", error);
    return { success: false, error: "Error al obtener especialidades" };
  }
}

/**
 * Server action for getting doctor dashboard data with appointments
 */
export async function getDoctorDashboard(): Promise<ActionResult> {
  try {
    const validation = await validateDoctor();

    if ("error" in validation) {
      return { success: false, error: validation.error };
    }

    const { doctor: validatedDoctor, session } = validation;

    // Get doctor data with all appointments
    const doctor = await prisma.doctor.findUnique({
      where: { id: validatedDoctor.id },
      include: {
        appointments: {
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
          },
          orderBy: {
            datetime: "desc",
          },
        },
        specialities: {
          include: {
            speciality: true,
          },
        },
      },
    });

    if (!doctor) {
      return { success: false, error: "Doctor no encontrado" };
    }

    // Separate appointments into categories
    const now = new Date();
    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000);

    const pendingAppointments = doctor.appointments.filter(
      (apt) => apt.status === "PENDING" && new Date(apt.datetime) > now
    );

    const todayAppointments = doctor.appointments.filter(
      (apt) =>
        new Date(apt.datetime) >= todayStart &&
        new Date(apt.datetime) < todayEnd
    );

    const upcomingAppointments = doctor.appointments.filter(
      (apt) =>
        new Date(apt.datetime) > todayEnd &&
        (apt.status === "CONFIRMED" || apt.status === "PENDING")
    );

    const pastAppointments = doctor.appointments.filter(
      (apt) =>
        new Date(apt.datetime) < now &&
        (apt.status === "COMPLETED" || apt.status === "CANCELED")
    );

    return {
      success: true,
      data: {
        doctor,
        session,
        stats: {
          total: doctor.appointments.length,
          today: todayAppointments.length,
          pending: pendingAppointments.length,
          specialties: doctor.specialities.length,
        },
        appointments: {
          pending: pendingAppointments,
          today: todayAppointments,
          upcoming: upcomingAppointments,
          past: pastAppointments,
        },
      },
    };
  } catch (error) {
    console.error("Error fetching doctor dashboard:", error);
    return {
      success: false,
      error: "Error al obtener el dashboard del doctor",
    };
  }
}

/**
 * Server action for getting a doctor's public profile by ID
 */
export async function getDoctorPublicProfile(
  id: string
): Promise<ActionResult> {
  try {
    const doctor = await prisma.doctor.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        specialities: {
          include: {
            speciality: true,
          },
        },
        clinics: {
          include: {
            clinic: {
              select: {
                id: true,
                name: true,
                address: true,
                city: true,
                neighborhood: true,
                isVirtual: true,
              },
            },
          },
        },
        experiences: {
          orderBy: {
            startDate: "desc",
          },
        },
      },
    });

    if (!doctor) {
      return {
        success: false,
        error: "Doctor no encontrado",
      };
    }

    // Get profile image URL
    let profileImageUrl = null;
    try {
      const imageResult = await getImageUrl(`doctors/${id}/profile.jpg`);
      if (imageResult.success && imageResult.data) {
        profileImageUrl = imageResult.data;
      }
    } catch {
      console.warn("Profile image not found for doctor:", id);
    }

    return {
      success: true,
      data: {
        ...doctor,
        profileImageUrl,
      },
    };
  } catch (error) {
    console.error("Error fetching doctor public profile:", error);
    return {
      success: false,
      error: "Error al obtener el perfil del doctor",
    };
  }
}

/**
 * Server action for getting all gallery images for a specific doctor by ID
 */
export async function getDoctorImagesById(
  doctorId: string
): Promise<ActionResult> {
  try {
    const images = await prisma.image.findMany({
      where: {
        doctorId: doctorId,
        profileForDoctor: null, // Exclude profile images from gallery
      },
      orderBy: { createdAt: "desc" },
      select: { id: true, createdAt: true },
    });

    // Generate fresh signed URLs for each image
    const imagesWithUrls = await Promise.all(
      images.map(async (img) => {
        const urlResult = await getImageUrl(img.id);
        return {
          id: img.id,
          url: urlResult.success ? urlResult.data : "", // should always succeed
          createdAt: img.createdAt,
        };
      })
    );

    return {
      success: true,
      data: imagesWithUrls,
    };
  } catch (error) {
    console.error("Error fetching doctor images by ID:", error);
    return {
      success: false,
      error: "Error al obtener las imágenes del doctor",
    };
  }
}

/**
 * Save a single 'Perfil profesional' experience (markdown biography) for the current doctor
 */
export async function saveDoctorProfileExperience(
  formData: FormData
): Promise<ActionResult> {
  try {
    const validation = await validateDoctor();

    if ("error" in validation) {
      return { success: false, error: validation.error };
    }

    const { doctor } = validation;

    let description = (formData.get("description") as string) || "";

    // Simple server-side validation
    const minLen = 10;
    const maxLen = 5000;
    if (description.trim().length < minLen) {
      return {
        success: false,
        error: `La descripción debe tener al menos ${minLen} caracteres.`,
      };
    }
    if (description.length > maxLen) {
      return {
        success: false,
        error: `La descripción no puede exceder ${maxLen} caracteres.`,
      };
    }

    // Simple sanitization: remove script tags and on* attributes
    description = description.replace(
      /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
      ""
    );
    description = description.replace(/on\w+\s*=\s*\"[^"]*\"/gi, "");
    description = description.replace(/on\w+\s*=\s*'[^']*'/gi, "");

    // Find an existing profile experience with a reserved title
    const existing = await prisma.experience.findFirst({
      where: {
        doctorId: doctor.id,
        title: "Perfil profesional",
        experienceType: "OTHER",
      },
    });

    if (existing) {
      await prisma.experience.update({
        where: { id: existing.id },
        data: { description },
      });
    } else {
      await prisma.experience.create({
        data: {
          doctorId: doctor.id,
          experienceType: "OTHER",
          title: "Perfil profesional",
          institution: null,
          startDate: null,
          endDate: null,
          description,
        },
      });
    }

    revalidatePath("/dashboard/doctor/profile");

    return { success: true, message: "Experiencia guardada" };
  } catch (error) {
    console.error("Error saving profile experience:", error);
    return { success: false, error: "Error guardando la experiencia" };
  }
}
