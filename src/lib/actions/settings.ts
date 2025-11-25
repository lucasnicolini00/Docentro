"use server";

import { revalidatePath } from "next/cache";
import { validateDoctor, type ActionResult } from "./utils";
import { settingsService } from "@/lib/services/settingsService";

interface DoctorSettingsUpdate {
  emailNotifications?: boolean;
  pushNotifications?: boolean;
  publicAvailability?: boolean;
  onlineConsultations?: boolean;
  autoBooking?: boolean;
  reminders?: boolean;
  consultationPrice?: number;
}

/**
 * Server action for updating doctor settings
 */
export async function updateDoctorSettings(
  settings: DoctorSettingsUpdate
): Promise<ActionResult> {
  try {
    const validation = await validateDoctor();

    if ("error" in validation) {
      return { success: false, error: validation.error };
    }

    const { doctor } = validation;

    // Delegate to service
    const updatedDoctor = await settingsService.updateDoctorSettings(
      doctor.id,
      settings
    );

    revalidatePath("/dashboard/doctor/profile");
    return { success: true, data: updatedDoctor };
  } catch (error) {
    console.error("Error updating doctor settings:", error);
    return { success: false, error: "Error al actualizar la configuración" };
  }
}

/**
 * Server action for getting doctor settings
 */
export async function getDoctorSettings(): Promise<ActionResult> {
  try {
    const validation = await validateDoctor();

    if ("error" in validation) {
      return { success: false, error: validation.error };
    }

    const { doctor } = validation;

    const settings = {
      emailNotifications: doctor.emailNotifications ?? true,
      pushNotifications: doctor.pushNotifications ?? false,
      publicAvailability: doctor.isPublic ?? true,
      onlineConsultations: doctor.allowOnlineConsultations ?? false,
      autoBooking: doctor.autoBookingEnabled ?? false,
      reminders: doctor.remindersEnabled ?? true,
      consultationPrice: doctor.consultationPrice ?? 50000,
    };

    return { success: true, data: settings };
  } catch (error) {
    console.error("Error fetching doctor settings:", error);
    return { success: false, error: "Error al cargar la configuración" };
  }
}

/**
 * Server action for updating doctor password
 */
export async function updateDoctorPassword(): Promise<ActionResult> {
  try {
    const validation = await validateDoctor();

    if ("error" in validation) {
      return { success: false, error: validation.error };
    }

    // TODO: Implement password update logic with bcrypt
    // Verify current password (you'd need to implement bcrypt comparison)
    // This is a placeholder - implement proper password verification

    // Update password (you'd need to hash the new password)
    // This is a placeholder - implement proper password hashing

    revalidatePath("/dashboard/doctor/profile");
    return { success: true, data: null };
  } catch (error) {
    console.error("Error updating password:", error);
    return { success: false, error: "Error al actualizar la contraseña" };
  }
}

/**
 * Server action for exporting doctor data
 */
export async function exportDoctorData(): Promise<ActionResult> {
  try {
    const validation = await validateDoctor();

    if ("error" in validation) {
      return { success: false, error: validation.error };
    }

    const { doctor } = validation;

    // Delegate to service
    const doctorData = await settingsService.exportDoctorData(doctor.id);

    return { success: true, data: doctorData };
  } catch (error) {
    console.error("Error exporting doctor data:", error);
    return { success: false, error: "Error al exportar los datos" };
  }
}
