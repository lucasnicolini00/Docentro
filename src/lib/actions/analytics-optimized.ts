"use server";

import { analyticsService } from "@/lib/services/analyticsService";
import { validateDoctor, type ActionResult } from "./utils";

/**
 * Optimized dashboard stats with single aggregated query
 */
export async function getOptimizedDashboardStats(): Promise<ActionResult> {
  try {
    const validation = await validateDoctor();
    if ("error" in validation) {
      return { success: false, error: validation.error };
    }

    const { doctor } = validation;
    
    // Delegate to service layer
    const result = await analyticsService.getDashboardStats(doctor.id);
    
    if (!result || result.length === 0) {
      return { success: false, error: "No data found" };
    }

    const data = result[0];

    // Calculate percentage changes
    const calculateChange = (current: number, previous: number) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return Math.round(((current - previous) / previous) * 100);
    };

    const stats = {
      todayAppointments: Number(data.today_appointments),
      weekAppointments: Number(data.week_appointments),
      monthlyRevenue: Number(data.monthly_revenue),
      utilizationRate: Number(data.utilization_rate),
      pendingBookings: Number(data.pending_bookings),
      totalPatients: Number(data.total_patients),
      changes: {
        appointments: {
          day: calculateChange(
            Number(data.today_appointments),
            Number(data.yesterday_appointments)
          ),
          week: calculateChange(
            Number(data.week_appointments),
            Number(data.last_week_appointments)
          ),
        },
        revenue: calculateChange(
          Number(data.monthly_revenue),
          Number(data.last_month_revenue)
        ),
        utilization: calculateChange(
          Number(data.utilization_rate),
          Number(data.last_month_utilization)
        ),
        patients: calculateChange(
          Number(data.total_patients),
          Number(data.last_month_patients)
        ),
      },
    };

    return { success: true, data: stats };
  } catch (error) {
    console.error("Error fetching optimized dashboard stats:", error);
    return {
      success: false,
      error: "Error al cargar estadísticas del dashboard",
    };
  }
}

/**
 * Optimized recent activities with single query
 */
export async function getOptimizedRecentActivities(): Promise<ActionResult> {
  try {
    const validation = await validateDoctor();
    if ("error" in validation) {
      return { success: false, error: validation.error };
    }

    const { doctor } = validation;

    // Delegate to service layer
    const activities = await analyticsService.getRecentActivities(doctor.id);

    return { success: true, data: activities };
  } catch (error) {
    console.error("Error fetching optimized recent activities:", error);
    return { success: false, error: "Error al cargar actividades recientes" };
  }
}

/**
 * Optimized upcoming appointments with single query
 */
export async function getOptimizedUpcomingAppointments(): Promise<ActionResult> {
  try {
    const validation = await validateDoctor();
    if ("error" in validation) {
      return { success: false, error: validation.error };
    }

    const { doctor } = validation;

    // Delegate to service layer
    const appointments = await analyticsService.getUpcomingAppointments(doctor.id);

    const formattedAppointments = appointments.map((appointment) => ({
      id: appointment.id,
      datetime: appointment.datetime,
      status: appointment.status,
      patient: {
        name: `${appointment.patient.user.firstName} ${appointment.patient.user.lastName}`,
        email: appointment.patient.user.email,
      },
      clinic: {
        name: appointment.clinic?.name || "Clínica no especificada",
        address: appointment.clinic?.address,
      },
      service: {
        name: appointment.pricing?.title || "Consulta general",
        price: appointment.pricing?.price
          ? Number(appointment.pricing.price)
          : 0,
      },
    }));

    return { success: true, data: formattedAppointments };
  } catch (error) {
    console.error("Error fetching optimized upcoming appointments:", error);
    return { success: false, error: "Error al cargar próximas citas" };
  }
}
