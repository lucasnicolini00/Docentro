"use server";

import { analyticsService } from "@/lib/services/analyticsService";
import { validateDoctor, type ActionResult } from "./utils";

/**
 * Optimized server action to get dashboard statistics
 */
export async function getDashboardStats(): Promise<ActionResult> {
  const validation = await validateDoctor();
  if ("error" in validation) {
    return { success: false, error: validation.error };
  }
  const { doctor } = validation;
  const result = await analyticsService.getDashboardStats(doctor.id);
  if (!result || result.length === 0) {
    return { success: false, error: "No se pudieron obtener las estadísticas" };
  }
  return { success: true, data: result[0] };
}

/**
 * Server action to get recent activities for the dashboard
 */
export async function getRecentActivities(): Promise<ActionResult> {
  const validation = await validateDoctor();
  if ("error" in validation) {
    return { success: false, error: validation.error };
  }
  const { doctor } = validation;
  const result = await analyticsService.getRecentActivities(doctor.id);
  return { success: true, data: result };
}

/**
 * Server action to get upcoming appointments for the dashboard
 */
export async function getUpcomingAppointments(): Promise<ActionResult> {
  const validation = await validateDoctor();
  if ("error" in validation) {
    return { success: false, error: validation.error };
  }
  const { doctor } = validation;
  const result = await analyticsService.getUpcomingAppointments(doctor.id);
  return { success: true, data: result };
}

/**
 * Server action to get schedule analytics (replaces /api/schedules/analytics)
 */
export async function getScheduleAnalytics(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  timeRange: "week" | "month" | "quarter" = "week",
  doctorId?: string
): Promise<ActionResult> {
  // If doctorId not provided, validate current doctor
  let effectiveDoctorId = doctorId;
  if (!effectiveDoctorId) {
    const validation = await validateDoctor();
    if ("error" in validation) {
      return { success: false, error: validation.error };
    }
    effectiveDoctorId = validation.doctor.id;
  }
  const result = await analyticsService.getDashboardStats(effectiveDoctorId);
  if (!result || result.length === 0) {
    return { success: false, error: "No schedule analytics available" };
  }
  return { success: true, data: result[0] };
}

/**
 * Advanced patient analytics for doctors
 */
export async function getPatientAnalytics(
  doctorId?: string,
  timeRange: "month" | "quarter" | "year" = "month"
): Promise<ActionResult> {
  // Resolve doctorId if not provided
  let effectiveDoctorId = doctorId;
  if (!effectiveDoctorId) {
    const validation = await validateDoctor();
    if ("error" in validation) {
      return { success: false, error: validation.error };
    }
    effectiveDoctorId = validation.doctor.id;
  }
  const result = await analyticsService.getPatientAnalytics(effectiveDoctorId, timeRange);
  return { success: true, data: result };
}

/**
 * Revenue and financial analytics
 */
export async function getRevenueAnalytics(
  doctorId?: string,
  timeRange: "month" | "quarter" | "year" = "month"
): Promise<ActionResult> {
  // Resolve doctorId if not provided
  let effectiveDoctorId = doctorId;
  if (!effectiveDoctorId) {
    const validation = await validateDoctor();
    if ("error" in validation) {
      return { success: false, error: validation.error };
    }
    effectiveDoctorId = validation.doctor.id;
  }
  const result = await analyticsService.getRevenueAnalytics(effectiveDoctorId, timeRange);
  return { success: true, data: result };
}
