import { ActionResult } from "./utils";

/**
 * Server action to get dashboard statistics
 */
export async function getDashboardStats(): Promise<ActionResult> {
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/dashboard/stats`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store", // Always fetch fresh data
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        error: error.message || "Error fetching dashboard stats",
      };
    }

    const data = await response.json();
    return { success: true, data: data.data };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return { success: false, error: "Failed to fetch dashboard statistics" };
  }
}

/**
 * Server action to get schedule analytics
 */
export async function getScheduleAnalytics(
  timeRange: "week" | "month" | "quarter" = "week",
  doctorId?: string
): Promise<ActionResult> {
  try {
    const params = new URLSearchParams({
      timeRange,
      ...(doctorId && { doctorId }),
    });

    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/schedules/analytics?${params}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store", // Always fetch fresh data
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        error: error.message || "Error fetching analytics",
      };
    }

    const data = await response.json();
    return { success: true, data: data.data };
  } catch (error) {
    console.error("Error fetching schedule analytics:", error);
    return { success: false, error: "Failed to fetch schedule analytics" };
  }
}
