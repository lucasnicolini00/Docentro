"use server";

import { revalidatePath } from "next/cache";
import { validateDoctor, type ActionResult } from "./utils";
import { Storage } from "@google-cloud/storage";
import { imagesService } from "@/lib/services/imagesService";

// Single storage client (optionally configured from env JSON credentials)
const storage = new Storage(
  process.env.GCLOUD_KEY_JSON
    ? {
        projectId: process.env.GCLOUD_PROJECT_ID,
        credentials: JSON.parse(process.env.GCLOUD_KEY_JSON),
      }
    : {}
);

/**
 * Uploads a profile image for the current doctor to Google Cloud Storage and
 * saves the Image row in the database, linking it as the doctor's profile image.
 */
export async function uploadDoctorProfileImage(
  formData: FormData
): Promise<ActionResult> {
  try {
    const validation = await validateDoctor();

    if ("error" in validation) {
      return { success: false, error: validation.error };
    }

    const { doctor } = validation;

    const file = formData.get("file") as File | null;
    if (!file || !file.name) {
      return { success: false, error: "No se proporcionó archivo" };
    }

    const bucketName = process.env.GCLOUD_BUCKET;
    if (!bucketName) {
      return { success: false, error: "GCS bucket no configurado" };
    }

    // Read file buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const key = `doctors/${doctor.id}/${Date.now()}-${safeName}`;
    const bucket = storage.bucket(bucketName);
    const blob = bucket.file(key);

    await blob.save(buffer, { contentType: file.type });

    // Try to make public; if bucket is private, fall back to a signed READ URL
    let publicUrl = `https://storage.googleapis.com/${bucketName}/${key}`;
    try {
      await blob.makePublic().catch(async () => {
        publicUrl = await getSignedReadUrl(key).catch(() => publicUrl);
      });
    } catch {
      // ignore
    }

    // Save Image row and link as profile image using service
    const result = await imagesService.createDoctorProfileImage(doctor.id, {
      url: publicUrl,
      filename: safeName,
      mime: file.type || null,
      size: buffer.length,
    });

    revalidatePath("/dashboard/doctor/profile");

    return { success: true, data: result, message: "Imagen subida" };
  } catch (error) {
    console.error("Error uploading profile image:", error);
    return { success: false, error: "Error subiendo la imagen" };
  }
}

/**
 * Removes the current doctor's profile image both from the DB and
 * attempts to remove the object from GCS if possible.
 */
export async function removeDoctorProfileImage(): Promise<ActionResult> {
  try {
    const validation = await validateDoctor();

    if ("error" in validation) {
      return { success: false, error: validation.error };
    }

    const { doctor } = validation;

    if (!doctor.profileImageId) {
      return { success: false, error: "No hay imagen de perfil para eliminar" };
    }

    // Get the image row so we can attempt to delete the file from storage
    const image = await imagesService.getImage(doctor.profileImageId);

    // Remove DB references and delete the Image row using service
    await imagesService.deleteDoctorProfileImage(doctor.id, doctor.profileImageId);

    // Try to remove from GCS when possible
    const bucketName = process.env.GCLOUD_BUCKET;
    if (bucketName && image?.url) {
      try {
        // Handle both public URLs and signed URLs
        // Signed URLs have query parameters, so we need to extract just the pathname
        const url = new URL(image.url);
        const pathname = url.pathname; // This gives us /bucket/key
        const parts = pathname.split("/").filter(Boolean);

        if (parts.length >= 2 && parts[0] === bucketName) {
          const key = parts.slice(1).join("/");
          const bucket = storage.bucket(bucketName);
          const file = bucket.file(key);
          await file.delete().catch(() => {
            // ignore errors deleting from storage
          });
        } else {
          console.error(
            "Could not extract key from profile image URL:",
            image.url
          );
        }
      } catch {
        // ignore any parsing/storage errors, DB is already updated
      }
    }

    revalidatePath("/dashboard/doctor/profile");

    return { success: true, message: "Imagen eliminada" };
  } catch (error) {
    console.error("Error removing profile image:", error);
    return { success: false, error: "Error eliminando la imagen" };
  }
}

/**
 * Removes a specific doctor image both from the DB and
 * attempts to remove the object from GCS if possible.
 */
export async function removeDoctorImage(
  imageId: string
): Promise<ActionResult> {
  try {
    const validation = await validateDoctor();

    if ("error" in validation) {
      return { success: false, error: validation.error };
    }

    const { doctor } = validation;

    // Verify the image belongs to this doctor and is not a profile image
    const image = await imagesService.getImage(imageId);

    if (!image || image.doctorId !== doctor.id) {
      return { success: false, error: "Imagen no encontrada o no autorizada" };
    }

    // Don't allow deleting profile images through gallery delete
    if (image.profileForDoctor) {
      return {
        success: false,
        error: "No se puede eliminar imagen de perfil desde la galería",
      };
    }

    // Delete the Image row
    await imagesService.deleteImage(imageId);

    // Try to remove from GCS when possible
    const bucketName = process.env.GCLOUD_BUCKET;
    if (bucketName && image.url) {
      try {
        // Handle both public URLs and signed URLs
        // Signed URLs have query parameters, so we need to extract just the pathname
        const url = new URL(image.url);
        const pathname = url.pathname; // This gives us /bucket/key
        const parts = pathname.split("/").filter(Boolean);

        if (parts.length >= 2 && parts[0] === bucketName) {
          const key = parts.slice(1).join("/");
          const bucket = storage.bucket(bucketName);
          const file = bucket.file(key);
          await file.delete().catch((error) => {
            console.error("Failed to delete from GCS:", error);
            // ignore errors deleting from storage
          });
        } else {
          console.error("Could not extract key from URL:", image.url);
        }
      } catch (e) {
        console.error("Error parsing URL for deletion:", e);
        // ignore any parsing/storage errors, DB is already updated
      }
    }

    revalidatePath("/dashboard/doctor/profile");
    revalidatePath("/dashboard/doctor/profile/experiencia");

    return { success: true, message: "Imagen eliminada" };
  } catch (error) {
    console.error("Error removing image:", error);
    return { success: false, error: "Error eliminando la imagen" };
  }
}

export async function getSignedUrl(filename: string, contentType: string) {
  const bucketName = process.env.GCLOUD_BUCKET;
  if (!bucketName) throw new Error("No bucket configured for signed URLs");

  const bucket = storage.bucket(bucketName as string);
  const file = bucket.file(filename);

  const [url] = await file.getSignedUrl({
    version: "v4",
    action: "write",
    expires: Date.now() + 15 * 60 * 1000,
    contentType,
  });

  return url;
}

// Signed READ URL helper (v4) — useful when bucket is private so clients can
// fetch the uploaded object for a short time window.
export async function getSignedReadUrl(filename: string) {
  const bucketName = process.env.GCLOUD_BUCKET;
  if (!bucketName) throw new Error("No bucket configured for signed URLs");

  const bucket = storage.bucket(bucketName as string);
  const file = bucket.file(filename);

  const [url] = await file.getSignedUrl({
    version: "v4",
    action: "read",
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
  });

  return url;
}

/**
 * Upload multiple gallery images for the current doctor.
 * Enforces a maximum of 10 images per doctor.
 */
export async function uploadDoctorImages(
  formData: FormData
): Promise<ActionResult> {
  try {
    const validation = await validateDoctor();
    if ("error" in validation)
      return { success: false, error: validation.error };
    const { doctor } = validation;

    // Collect files - browsers may send multiple entries with the same name
    const files = formData.getAll("files") as File[];
    if (!files || files.length === 0) {
      return { success: false, error: "No se proporcionaron archivos" };
    }

    // Count existing images
    const existingCount = await imagesService.countDoctorImages(doctor.id);
    const MAX = 10;
    if (existingCount + files.length > MAX) {
      return {
        success: false,
        error: `Máximo ${MAX} imágenes permitidas (ya tienes ${existingCount})`,
      };
    }

    const bucketName = process.env.GCLOUD_BUCKET;
    if (!bucketName)
      return { success: false, error: "GCS bucket no configurado" };

    const created: Array<{ id: string; url: string; filename: string | null }> = [];

    // Save files sequentially (could be parallelized)
    for (const file of files) {
      if (!file || !file.name) continue;
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
      const key = `doctors/${doctor.id}/${Date.now()}-${safeName}`;
      const bucket = storage.bucket(bucketName);
      const blob = bucket.file(key);

      await blob.save(buffer, { contentType: file.type }).catch(() => {});

      // Try to make public; if bucket is private, generate a signed READ URL
      let publicUrl = `https://storage.googleapis.com/${bucketName}/${key}`;
      try {
        await blob.makePublic().catch(async () => {
          publicUrl = await getSignedReadUrl(key).catch(() => publicUrl);
        });
      } catch {}

      const image = await imagesService.createImage({
        url: publicUrl,
        filename: safeName,
        mime: file.type || null,
        size: buffer.length,
        doctorId: doctor.id,
      });

      created.push(image);
    }

    revalidatePath("/dashboard/doctor/profile");
    return { success: true, data: created, message: "Imágenes subidas" };
  } catch (error) {
    console.error("Error uploading doctor images:", error);
    return { success: false, error: "Error subiendo imágenes" };
  }
}

/**
 * Return a usable URL for an image: prefer the stored URL, but if the bucket
 * is private and the stored URL points to storage.googleapis.com/<bucket>/<key>
 * then return a signed read URL for the key.
 */
export async function getImageUrl(imageId: string): Promise<ActionResult> {
  try {
    const img = await imagesService.getImage(imageId);
    if (!img) return { success: false, error: "Imagen no encontrada" };

    const bucketName = process.env.GCLOUD_BUCKET;
    if (!bucketName) return { success: true, data: img.url };

    // If the stored url points to storage.googleapis.com/<bucket>/<key>
    try {
      const url = new URL(img.url);
      const parts = url.pathname.split("/").filter(Boolean);
      if (parts.length >= 2 && parts[0] === bucketName) {
        const key = parts.slice(1).join("/");
        const signed = await getSignedReadUrl(key).catch(() => img.url);
        return { success: true, data: signed };
      }
    } catch {
      // ignore parsing errors
    }

    return { success: true, data: img.url };
  } catch (error) {
    console.error("Error getting image url:", error);
    return { success: false, error: "Error obteniendo la imagen" };
  }
}

/**
 * Batch process multiple image URLs to avoid N+1 queries
 * Returns a map of imageId -> URL
 */
export async function getBatchImageUrls(
  imageIds: string[]
): Promise<Record<string, string>> {
  try {
    if (imageIds.length === 0) {
      return {};
    }

    // Fetch all images in one query
    const images = await imagesService.getBatchImages(imageIds);

    const bucketName = process.env.GCLOUD_BUCKET;
    const imageMap: Record<string, string> = {};

    // Process all images
    for (const img of images) {
      // If no bucket configured, use direct URL
      if (!bucketName) {
        imageMap[img.id] = img.url;
        continue;
      }

      // Try to generate signed URL
      try {
        const url = new URL(img.url);
        const parts = url.pathname.split("/").filter(Boolean);
        if (parts.length >= 2 && parts[0] === bucketName) {
          const key = parts.slice(1).join("/");
          const signed = await getSignedReadUrl(key).catch(() => img.url);
          imageMap[img.id] = signed;
        } else {
          imageMap[img.id] = img.url;
        }
      } catch {
        // If URL parsing fails, use direct URL
        imageMap[img.id] = img.url;
      }
    }

    return imageMap;
  } catch (error) {
    console.error("Error getting batch image urls:", error);
    return {};
  }
}

/**
 * Get the profile image URL for the current user (works for both doctors and patients)
 */
export async function getUserProfileImageUrl(): Promise<ActionResult> {
  try {
    const { getServerSession } = await import("next-auth");
    const { authOptions } = await import("@/lib/auth");

    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return { success: false, error: "Usuario no autenticado" };
    }

    // Get user with profile image
    const user = await imagesService.getUserWithProfileImages(session.user.id);

    if (!user) {
      return { success: false, error: "Usuario no encontrado" };
    }

    // Check for profile image in order of priority: Doctor profile > User profile
    let profileImageId: string | null = null;

    if (user.doctor?.profileImageId) {
      profileImageId = user.doctor.profileImageId;
    } else if (user.profileImageId) {
      profileImageId = user.profileImageId;
    }

    if (!profileImageId) {
      return { success: true, data: null }; // No profile image
    }

    // Get the signed URL for the profile image
    const imageResult = await getImageUrl(profileImageId);
    return imageResult;
  } catch (error) {
    console.error("Error getting user profile image:", error);
    return { success: false, error: "Error obteniendo imagen de perfil" };
  }
}
