"use server";

import { revalidatePath } from "next/cache";
import { validateDoctor, type ActionResult } from "./utils";
import { getBatchImageUrls } from "./images-uploader";
import { doctorsService } from "@/lib/services/doctorsService";

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

    // Delegate to service
    await doctorsService.updateDoctorProfile(session.user.id, doctor.id, {
      firstName,
      lastName,
      email,
      phone,
      doctorName,
      doctorSurname,
      doctorEmail,
      doctorPhone,
      specialityIds,
      experiences,
    });

    revalidatePath("/dashboard/doctor/profile");

    return {
      success: true,
      message: "Perfil actualizado correctamente",
    };
  } catch (error) {
    console.error("Error updating doctor profile:", error);
    return {
      success: false,
      error: "Error al actualizar el perfil",
    };
  }
}

/**
 * Server action for getting doctor specialities (example of read action)
 */
export async function getDoctorSpecialities() {
  try {
    const specialities = await doctorsService.getAllSpecialities();
    return { success: true, data: specialities };
  } catch (error) {
    console.error("Error fetching specialities:", error);
    return {
      success: false,
      error: "Error al cargar las especialidades",
    };
  }
}

/**
 * Server action for getting doctor profile data
 */
export async function getDoctorProfile(): Promise<ActionResult> {
  try {
    const validation = await validateDoctor();

    if ("error" in validation) {
      return { success: false, error: validation.error };
    }

    const { session } = validation;

    const fullDoctor = await doctorsService.getDoctorProfile(session.user.id);

    if (!fullDoctor) {
      return {
        success: false,
        error: "Doctor no encontrado",
      };
    }

    // Get signed URLs for images using batch processing
    const imageIds = fullDoctor.images.map((img) => img.id);
    if (fullDoctor.profileImage) {
      imageIds.push(fullDoctor.profileImage.id);
    }

    const imageUrlMap = await getBatchImageUrls(imageIds);

    const profileImageUrl = fullDoctor.profileImage
      ? imageUrlMap[fullDoctor.profileImage.id] || null
      : null;

    const imagesWithUrls = fullDoctor.images.map((img) => ({
      id: img.id,
      url: imageUrlMap[img.id] || img.url,
      createdAt: img.createdAt,
    }));

    return {
      success: true,
      data: {
        ...fullDoctor,
        profileImageUrl,
        images: imagesWithUrls,
      },
    };
  } catch (error) {
    console.error("Error fetching doctor profile:", error);
    return {
      success: false,
      error: "Error al cargar el perfil del doctor",
    };
  }
}

export async function getAllDoctorImages(): Promise<ActionResult> {
  try {
    const validation = await validateDoctor();

    if ("error" in validation) {
      return { success: false, error: validation.error };
    }

    const { doctor } = validation;

    const images = await doctorsService.getDoctorImages(doctor.id);

    // Batch process image URLs
    const imageIds = images.map((img) => img.id);
    const imageUrlMap = await getBatchImageUrls(imageIds);

    const imagesWithUrls = images.map((img) => ({
      id: img.id,
      url: imageUrlMap[img.id] || "",
      createdAt: img.createdAt,
    }));

    return {
      success: true,
      data: imagesWithUrls,
    };
  } catch (error) {
    console.error("Error fetching doctor images:", error);
    return {
      success: false,
      error: "Error al cargar las imágenes del doctor",
    };
  }
}

/**
 * Helper to get doctor id from user id
 */
export async function getDoctorIdFromUserId(userId: string): Promise<string> {
  return doctorsService.getDoctorIdFromUserId(userId);
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
    const specialities = await doctorsService.getAllSpecialities();
    return { success: true, data: specialities };
  } catch (error) {
    console.error("Error fetching specialities:", error);
    return {
      success: false,
      error: "Error al cargar las especialidades",
    };
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

    const { doctor } = validation;

    const doctorData = await doctorsService.getDoctorDashboard(doctor.id);

    if (!doctorData) {
      return {
        success: false,
        error: "Doctor no encontrado",
      };
    }

    return {
      success: true,
      data: doctorData,
    };
  } catch (error) {
    console.error("Error fetching doctor dashboard:", error);
    return {
      success: false,
      error: "Error al cargar el dashboard del doctor",
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
    const doctor = await doctorsService.getDoctorPublicProfile(id);

    if (!doctor) {
      return {
        success: false,
        error: "Doctor no encontrado",
      };
    }

    // Convert Decimal fields to numbers for client compatibility
    const serializedDoctor = {
      ...doctor,
      pricings: doctor.pricings?.map(
        (p: {
          id: string;
          clinicId: string;
          price: number | { toNumber: () => number };
        }) => ({
          ...p,
          price: typeof p.price === "number" ? p.price : p.price.toNumber(),
        })
      ),
    };

    return {
      success: true,
      data: serializedDoctor,
    };
  } catch (error) {
    console.error("Error fetching doctor public profile:", error);
    return {
      success: false,
      error: "Error al cargar el perfil del doctor",
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
    const images = await doctorsService.getDoctorImages(doctorId);

    // Batch process image URLs
    const imageIds = images.map((img) => img.id);
    const imageUrlMap = await getBatchImageUrls(imageIds);

    const imagesWithUrls = images.map((img) => ({
      id: img.id,
      url: imageUrlMap[img.id] || "",
      createdAt: img.createdAt,
    }));

    return {
      success: true,
      data: imagesWithUrls,
    };
  } catch (error) {
    console.error("Error fetching doctor images by ID:", error);
    return {
      success: false,
      error: "Error al cargar las imágenes del doctor",
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

    const description = formData.get("description") as string;

    if (!description || description.trim() === "") {
      return {
        success: false,
        error: "La descripción no puede estar vacía",
      };
    }

    // Check if profile experience already exists
    const existing = await doctorsService.getProfileExperience(doctor.id);

    if (existing) {
      await doctorsService.updateProfileExperience(existing.id, description);
    } else {
      await doctorsService.createProfileExperience(doctor.id, description);
    }

    revalidatePath("/dashboard/doctor/profile/experience");

    return {
      success: true,
      message: "Perfil profesional guardado correctamente",
    };
  } catch (error) {
    console.error("Error saving doctor profile experience:", error);
    return {
      success: false,
      error: "Error al guardar el perfil profesional",
    };
  }
}
