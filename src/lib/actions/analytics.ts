"use server";

import prisma from "@/lib/prisma";
import { validateDoctor, type ActionResult } from "./utils";

/**
 * Server action to get dashboard statistics (replaces /api/dashboard/stats)
 */
export async function getDashboardStats(): Promise<ActionResult> {
  try {
    const validation = await validateDoctor();
    if ("error" in validation) {
      return { success: false, error: validation.error };
    }

    const { doctor } = validation;

    // Get current date ranges
    const now = new Date();
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Get today's appointments
    const todayAppointments = await prisma.appointment.count({
      where: {
        doctorId: doctor.id,
        datetime: {
          gte: startOfToday,
          lt: new Date(startOfToday.getTime() + 24 * 60 * 60 * 1000),
        },
      },
    });

    // Get this week's appointments
    const weekAppointments = await prisma.appointment.count({
      where: {
        doctorId: doctor.id,
        datetime: {
          gte: startOfWeek,
          lt: now,
        },
      },
    });

    // Get pending appointments
    const pendingBookings = await prisma.appointment.count({
      where: {
        doctorId: doctor.id,
        status: "PENDING",
      },
    });

    // Get total unique patients
    const totalPatients = await prisma.appointment.groupBy({
      by: ["patientId"],
      where: {
        doctorId: doctor.id,
      },
      _count: {
        patientId: true,
      },
    });

    // Calculate monthly revenue using pricing relation
    const monthlyAppointments = await prisma.appointment.findMany({
      where: {
        doctorId: doctor.id,
        datetime: {
          gte: startOfMonth,
          lt: now,
        },
        status: "COMPLETED",
      },
      include: {
        pricing: true,
      },
    });

    const monthlyRevenue = monthlyAppointments.reduce(
      (total, appointment) =>
        total +
        (appointment.pricing?.price ? Number(appointment.pricing.price) : 0),
      0
    );

    // Calculate utilization rate using time slots
    const totalTimeSlots = await prisma.timeSlot.count({
      where: {
        schedule: {
          doctorId: doctor.id,
        },
        createdAt: {
          gte: startOfMonth,
          lt: now,
        },
      },
    });

    const bookedTimeSlots = await prisma.timeSlot.count({
      where: {
        schedule: {
          doctorId: doctor.id,
        },
        isBooked: true,
        createdAt: {
          gte: startOfMonth,
          lt: now,
        },
      },
    });

    const utilizationRate =
      totalTimeSlots > 0
        ? Math.round((bookedTimeSlots / totalTimeSlots) * 100)
        : 0;

    const stats = {
      todayAppointments,
      weekAppointments,
      monthlyRevenue,
      utilizationRate,
      pendingBookings,
      totalPatients: totalPatients.length,
    };

    return { success: true, data: stats };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return { success: false, error: "Failed to fetch dashboard statistics" };
  }
}

/**
 * Server action to get schedule analytics (replaces /api/schedules/analytics)
 */
export async function getScheduleAnalytics(
  timeRange: "week" | "month" | "quarter" = "week",
  doctorId?: string
): Promise<ActionResult> {
  try {
    let doctor;

    if (doctorId) {
      doctor = await prisma.doctor.findUnique({
        where: { id: doctorId },
        include: { user: true },
      });
    } else {
      const validation = await validateDoctor();
      if ("error" in validation) {
        return { success: false, error: validation.error };
      }
      doctor = validation.doctor;
    }

    if (!doctor) {
      return { success: false, error: "Doctor not found" };
    }

    // Calculate date range based on timeRange
    const now = new Date();
    let startDate: Date;

    switch (timeRange) {
      case "month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case "quarter":
        const currentQuarter = Math.floor(now.getMonth() / 3);
        startDate = new Date(now.getFullYear(), currentQuarter * 3, 1);
        break;
      default: // week
        startDate = new Date(now);
        startDate.setDate(now.getDate() - now.getDay());
        break;
    }

    // Get all time slots for the doctor in the time range
    const timeSlots = await prisma.timeSlot.findMany({
      where: {
        schedule: {
          doctorId: doctor.id,
        },
        createdAt: {
          gte: startDate,
          lte: now,
        },
      },
      include: {
        schedule: {
          include: {
            clinic: true,
          },
        },
        appointment: {
          include: {
            pricing: true,
          },
        },
      },
    });

    // Calculate analytics
    const totalSlots = timeSlots.length;
    const bookedSlots = timeSlots.filter((slot) => slot.isBooked).length;
    const blockedSlots = timeSlots.filter((slot) => slot.isBlocked).length;
    const availableSlots = totalSlots - bookedSlots - blockedSlots;
    const utilizationRate =
      totalSlots > 0 ? Math.round((bookedSlots / totalSlots) * 100) : 0;

    // Group by day of week
    const schedulesByDay = {
      Lunes: 0,
      Martes: 0,
      Miércoles: 0,
      Jueves: 0,
      Viernes: 0,
      Sábado: 0,
      Domingo: 0,
    };

    const dayNames = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];

    timeSlots.forEach((slot) => {
      const dayOfWeek = new Date(slot.createdAt).getDay();
      const dayName = dayNames[dayOfWeek] as keyof typeof schedulesByDay;
      if (schedulesByDay.hasOwnProperty(dayName)) {
        schedulesByDay[dayName]++;
      }
    });

    // Group by clinic
    const clinicDistribution = timeSlots.reduce((acc, slot) => {
      const clinicName = slot.schedule.clinic.name;
      acc[clinicName] = (acc[clinicName] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Calculate revenue from completed appointments
    const completedAppointments = timeSlots.filter(
      (slot) => slot.appointment?.status === "COMPLETED"
    );

    const totalRevenue = completedAppointments.reduce((total, slot) => {
      const price = slot.appointment?.pricing?.price
        ? Number(slot.appointment.pricing.price)
        : 0;
      return total + price;
    }, 0);

    const averagePrice =
      completedAppointments.length > 0
        ? totalRevenue / completedAppointments.length
        : 0;

    // Peak hours analysis
    const hourlyDistribution = timeSlots.reduce((acc, slot) => {
      const hour = parseInt(slot.startTime.split(":")[0]);
      acc[hour] = (acc[hour] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    const peakHours = Object.entries(hourlyDistribution)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([hour, count]) => ({ hour: parseInt(hour), count }));

    // Weekly overview for charts
    const weeklyOverview: Array<{
      day: string;
      booked: number;
      available: number;
      blocked: number;
    }> = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      const daySlots = timeSlots.filter((slot) => {
        const slotDate = new Date(slot.createdAt);
        return slotDate.toDateString() === date.toDateString();
      });

      weeklyOverview.push({
        day: date.toLocaleDateString("es-ES", { weekday: "short" }),
        booked: daySlots.filter((s) => s.isBooked).length,
        available: daySlots.filter((s) => !s.isBooked && !s.isBlocked).length,
        blocked: daySlots.filter((s) => s.isBlocked).length,
      });
    }

    const analytics = {
      totalSlots,
      availableSlots,
      bookedSlots,
      blockedSlots,
      utilizationRate,
      schedulesByDay,
      clinicDistribution,
      weeklyOverview,
      totalRevenue,
      averagePrice,
      peakHours,
      insights: [
        utilizationRate < 50
          ? "Baja utilización: considera ajustar horarios o promocionar disponibilidad"
          : "Buena utilización de horarios",
        availableSlots > bookedSlots
          ? "Muchos slots disponibles: oportunidad para marketing"
          : "Alta demanda: considera expandir horarios",
        peakHours.length > 0
          ? `Horas pico: ${peakHours.map((p) => `${p.hour}:00`).join(", ")}`
          : "Distribución pareja durante el día",
      ],
    };

    return { success: true, data: analytics };
  } catch (error) {
    console.error("Error fetching schedule analytics:", error);
    return { success: false, error: "Failed to fetch schedule analytics" };
  }
}

/**
 * Advanced patient analytics for doctors
 */
export async function getPatientAnalytics(
  doctorId?: string,
  timeRange: "month" | "quarter" | "year" = "month"
): Promise<ActionResult> {
  try {
    let doctor;

    if (doctorId) {
      doctor = await prisma.doctor.findUnique({
        where: { id: doctorId },
      });
    } else {
      const validation = await validateDoctor();
      if ("error" in validation) {
        return { success: false, error: validation.error };
      }
      doctor = validation.doctor;
    }

    if (!doctor) {
      return { success: false, error: "Doctor not found" };
    }

    // Calculate date range
    const now = new Date();
    let startDate: Date;

    switch (timeRange) {
      case "year":
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      case "quarter":
        const currentQuarter = Math.floor(now.getMonth() / 3);
        startDate = new Date(now.getFullYear(), currentQuarter * 3, 1);
        break;
      default: // month
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
    }

    // Get all appointments in date range
    const appointments = await prisma.appointment.findMany({
      where: {
        doctorId: doctor.id,
        datetime: {
          gte: startDate,
          lte: now,
        },
      },
      include: {
        patient: {
          include: {
            user: true,
          },
        },
        pricing: true,
      },
    });

    // Patient demographics
    const patientAges = appointments
      .map((apt) => {
        const birthDate = apt.patient.birthdate;
        if (!birthDate) return null;
        const age = now.getFullYear() - birthDate.getFullYear();
        return age;
      })
      .filter(Boolean) as number[];

    const ageGroups = {
      "0-17": 0,
      "18-30": 0,
      "31-50": 0,
      "51-70": 0,
      "70+": 0,
    };

    patientAges.forEach((age) => {
      if (age <= 17) ageGroups["0-17"]++;
      else if (age <= 30) ageGroups["18-30"]++;
      else if (age <= 50) ageGroups["31-50"]++;
      else if (age <= 70) ageGroups["51-70"]++;
      else ageGroups["70+"]++;
    });

    // Gender distribution
    const genderDistribution = appointments.reduce((acc, apt) => {
      const gender = apt.patient.gender || "No especificado";
      acc[gender] = (acc[gender] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // New vs returning patients
    const uniquePatients = new Set(appointments.map((apt) => apt.patientId));
    const totalUniquePatients = uniquePatients.size;

    // Calculate returning patients (patients with more than 1 appointment)
    const patientAppointmentCounts = appointments.reduce((acc, apt) => {
      acc[apt.patientId] = (acc[apt.patientId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const returningPatients = Object.values(patientAppointmentCounts).filter(
      (count) => count > 1
    ).length;

    const newPatients = totalUniquePatients - returningPatients;
    const retentionRate =
      totalUniquePatients > 0
        ? Math.round((returningPatients / totalUniquePatients) * 100)
        : 0;

    // Appointment status distribution
    const statusDistribution = appointments.reduce((acc, apt) => {
      acc[apt.status] = (acc[apt.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Monthly trends
    const monthlyTrends: Array<{
      month: string;
      patients: number;
      appointments: number;
      revenue: number;
    }> = [];

    for (let i = 0; i < 6; i++) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);

      const monthAppointments = appointments.filter((apt) => {
        const aptDate = new Date(apt.datetime);
        return aptDate >= monthStart && aptDate <= monthEnd;
      });

      const monthlyPatients = new Set(
        monthAppointments.map((apt) => apt.patientId)
      ).size;

      monthlyTrends.unshift({
        month: monthStart.toLocaleDateString("es-ES", {
          month: "short",
          year: "numeric",
        }),
        patients: monthlyPatients,
        appointments: monthAppointments.length,
        revenue: monthAppointments
          .filter((apt) => apt.status === "COMPLETED")
          .reduce((total, apt) => total + (Number(apt.pricing?.price) || 0), 0),
      });
    }

    const analytics = {
      totalPatients: totalUniquePatients,
      newPatients,
      returningPatients,
      retentionRate,
      ageGroups,
      genderDistribution,
      statusDistribution,
      monthlyTrends,
      insights: [
        retentionRate > 60
          ? "Excelente retención de pacientes"
          : "Oportunidad de mejorar retención de pacientes",
        newPatients > returningPatients
          ? "Alto crecimiento en nuevos pacientes"
          : "Base sólida de pacientes recurrentes",
        statusDistribution.COMPLETED > statusDistribution.CANCELLED
          ? "Baja tasa de cancelaciones"
          : "Revisar proceso de confirmación de citas",
      ],
    };

    return { success: true, data: analytics };
  } catch (error) {
    console.error("Error fetching patient analytics:", error);
    return { success: false, error: "Failed to fetch patient analytics" };
  }
}

/**
 * Revenue and financial analytics
 */
export async function getRevenueAnalytics(
  doctorId?: string,
  timeRange: "month" | "quarter" | "year" = "month"
): Promise<ActionResult> {
  try {
    let doctor;

    if (doctorId) {
      doctor = await prisma.doctor.findUnique({
        where: { id: doctorId },
      });
    } else {
      const validation = await validateDoctor();
      if ("error" in validation) {
        return { success: false, error: validation.error };
      }
      doctor = validation.doctor;
    }

    if (!doctor) {
      return { success: false, error: "Doctor not found" };
    }

    // Calculate date range
    const now = new Date();
    let startDate: Date;

    switch (timeRange) {
      case "year":
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      case "quarter":
        const currentQuarter = Math.floor(now.getMonth() / 3);
        startDate = new Date(now.getFullYear(), currentQuarter * 3, 1);
        break;
      default: // month
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
    }

    // Get completed appointments with pricing
    const completedAppointments = await prisma.appointment.findMany({
      where: {
        doctorId: doctor.id,
        status: "COMPLETED",
        datetime: {
          gte: startDate,
          lte: now,
        },
      },
      include: {
        pricing: {
          include: {
            clinic: true,
          },
        },
        timeSlot: {
          include: {
            schedule: {
              include: {
                clinic: true,
              },
            },
          },
        },
      },
    });

    // Calculate total revenue
    const totalRevenue = completedAppointments.reduce(
      (total, apt) => total + (Number(apt.pricing?.price) || 0),
      0
    );

    // Revenue by clinic
    const revenueByClinic = completedAppointments.reduce((acc, apt) => {
      const clinicName =
        apt.timeSlot?.schedule?.clinic?.name ||
        apt.pricing?.clinic?.name ||
        "Sin clínica";
      const revenue = Number(apt.pricing?.price) || 0;
      acc[clinicName] = (acc[clinicName] || 0) + revenue;
      return acc;
    }, {} as Record<string, number>);

    // Daily revenue trends (last 30 days)
    const dailyRevenue: Array<{
      date: string;
      revenue: number;
      appointments: number;
    }> = [];

    for (let i = 29; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      const dayStart = new Date(date.setHours(0, 0, 0, 0));
      const dayEnd = new Date(date.setHours(23, 59, 59, 999));

      const dayAppointments = completedAppointments.filter((apt) => {
        const aptDate = new Date(apt.datetime);
        return aptDate >= dayStart && aptDate <= dayEnd;
      });

      const dayRevenue = dayAppointments.reduce(
        (total, apt) => total + (Number(apt.pricing?.price) || 0),
        0
      );

      dailyRevenue.push({
        date: dayStart.toISOString().split("T")[0],
        revenue: dayRevenue,
        appointments: dayAppointments.length,
      });
    }

    // Average appointment value
    const averageValue =
      completedAppointments.length > 0
        ? totalRevenue / completedAppointments.length
        : 0;

    // Monthly comparison (current vs previous month)
    const previousMonthStart = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      1
    );
    const previousMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

    const previousMonthAppointments = await prisma.appointment.count({
      where: {
        doctorId: doctor.id,
        status: "COMPLETED",
        datetime: {
          gte: previousMonthStart,
          lte: previousMonthEnd,
        },
      },
    });

    const currentMonthAppointments = completedAppointments.length;
    const growthRate =
      previousMonthAppointments > 0
        ? Math.round(
            ((currentMonthAppointments - previousMonthAppointments) /
              previousMonthAppointments) *
              100
          )
        : 100;

    // Peak revenue days
    const peakDays = dailyRevenue
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5)
      .map((day) => ({
        date: new Date(day.date).toLocaleDateString("es-ES", {
          weekday: "long",
          day: "numeric",
          month: "short",
        }),
        revenue: day.revenue,
        appointments: day.appointments,
      }));

    const analytics = {
      totalRevenue,
      averageValue,
      totalAppointments: completedAppointments.length,
      growthRate,
      revenueByClinic,
      dailyRevenue,
      peakDays,
      insights: [
        growthRate > 10
          ? `Crecimiento excelente: ${growthRate}% vs mes anterior`
          : growthRate > 0
          ? `Crecimiento moderado: ${growthRate}% vs mes anterior`
          : `Oportunidad de crecimiento: ${Math.abs(
              growthRate
            )}% menos que el mes anterior`,
        averageValue > 50000
          ? "Valor promedio de consulta alto"
          : "Oportunidad de incrementar valor promedio",
        Object.keys(revenueByClinic).length > 1
          ? "Buena diversificación entre clínicas"
          : "Considera expandir a más clínicas",
      ],
    };

    return { success: true, data: analytics };
  } catch (error) {
    console.error("Error fetching revenue analytics:", error);
    return { success: false, error: "Failed to fetch revenue analytics" };
  }
}
