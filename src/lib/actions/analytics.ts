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

    // Get previous periods for comparison
    const yesterday = new Date(startOfToday.getTime() - 24 * 60 * 60 * 1000);
    const startOfYesterday = new Date(yesterday);

    const lastWeekStart = new Date(
      startOfWeek.getTime() - 7 * 24 * 60 * 60 * 1000
    );
    const lastWeekEnd = new Date(startOfWeek.getTime() - 1);

    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

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

    // Get yesterday's appointments for comparison
    const yesterdayAppointments = await prisma.appointment.count({
      where: {
        doctorId: doctor.id,
        datetime: {
          gte: startOfYesterday,
          lt: startOfToday,
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

    // Get last week's appointments for comparison
    const lastWeekAppointments = await prisma.appointment.count({
      where: {
        doctorId: doctor.id,
        datetime: {
          gte: lastWeekStart,
          lt: lastWeekEnd,
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

    // Calculate last month's revenue for comparison
    const lastMonthAppointments = await prisma.appointment.findMany({
      where: {
        doctorId: doctor.id,
        datetime: {
          gte: lastMonthStart,
          lt: lastMonthEnd,
        },
        status: "COMPLETED",
      },
      include: {
        pricing: true,
      },
    });

    const lastMonthRevenue = lastMonthAppointments.reduce(
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

    // Calculate last month's utilization for comparison
    const lastMonthTotalSlots = await prisma.timeSlot.count({
      where: {
        schedule: {
          doctorId: doctor.id,
        },
        createdAt: {
          gte: lastMonthStart,
          lt: lastMonthEnd,
        },
      },
    });

    const lastMonthBookedSlots = await prisma.timeSlot.count({
      where: {
        schedule: {
          doctorId: doctor.id,
        },
        isBooked: true,
        createdAt: {
          gte: lastMonthStart,
          lt: lastMonthEnd,
        },
      },
    });

    const lastMonthUtilization =
      lastMonthTotalSlots > 0
        ? Math.round((lastMonthBookedSlots / lastMonthTotalSlots) * 100)
        : 0;

    // Get last month's total patients for comparison
    const lastMonthPatients = await prisma.appointment.groupBy({
      by: ["patientId"],
      where: {
        doctorId: doctor.id,
        datetime: {
          gte: lastMonthStart,
          lt: lastMonthEnd,
        },
      },
      _count: {
        patientId: true,
      },
    });

    // Calculate percentage changes
    const calculateChange = (current: number, previous: number) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return Math.round(((current - previous) / previous) * 100);
    };

    const appointmentDayChange = calculateChange(
      todayAppointments,
      yesterdayAppointments
    );
    const appointmentWeekChange = calculateChange(
      weekAppointments,
      lastWeekAppointments
    );
    const revenueChange = calculateChange(monthlyRevenue, lastMonthRevenue);
    const utilizationChange = calculateChange(
      utilizationRate,
      lastMonthUtilization
    );
    const patientsChange = calculateChange(
      totalPatients.length,
      lastMonthPatients.length
    );

    // Helper function to determine change type
    const getChangeType = (
      value: number
    ): "increase" | "decrease" | "neutral" => {
      if (value > 0) return "increase";
      if (value < 0) return "decrease";
      return "neutral";
    };

    // Helper function to get change text
    const getChangeText = (
      value: number,
      unit: string,
      comparisonPeriod: string
    ): string => {
      if (value === 0) {
        return `Sin cambios vs ${comparisonPeriod}`;
      }
      return `${Math.abs(value)}${unit} ${
        value >= 0 ? "más" : "menos"
      } vs ${comparisonPeriod}`;
    };

    const stats = {
      todayAppointments,
      weekAppointments,
      monthlyRevenue,
      utilizationRate,
      pendingBookings,
      totalPatients: totalPatients.length,
      // Comparative data
      changes: {
        appointmentDay: {
          value: appointmentDayChange,
          type: getChangeType(appointmentDayChange),
          text: getChangeText(appointmentDayChange, "", "ayer"),
        },
        appointmentWeek: {
          value: appointmentWeekChange,
          type: getChangeType(appointmentWeekChange),
          text: getChangeText(appointmentWeekChange, "%", "semana anterior"),
        },
        revenue: {
          value: revenueChange,
          type: getChangeType(revenueChange),
          text: getChangeText(revenueChange, "%", "mes anterior"),
        },
        utilization: {
          value: utilizationChange,
          type: getChangeType(utilizationChange),
          text: getChangeText(utilizationChange, "%", "mes anterior"),
        },
        patients: {
          value: patientsChange,
          type: getChangeType(patientsChange),
          text: getChangeText(patientsChange, "", "mes anterior"),
        },
      },
    };

    return { success: true, data: stats };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return { success: false, error: "Failed to fetch dashboard statistics" };
  }
}

/**
 * Server action to get recent activities for the dashboard
 */
export async function getRecentActivities(): Promise<ActionResult> {
  try {
    const validation = await validateDoctor();
    if ("error" in validation) {
      return { success: false, error: validation.error };
    }

    const { doctor } = validation;

    // Get recent appointments (last 24 hours)
    const recentAppointments = await prisma.appointment.findMany({
      where: {
        doctorId: doctor.id,
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
        },
      },
      include: {
        patient: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3, // Get latest 3 appointments
    });

    // Get recent schedule updates (last 24 hours)
    const recentScheduleUpdates = await prisma.schedule.findMany({
      where: {
        doctorId: doctor.id,
        updatedAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
      include: {
        clinic: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 2, // Get latest 2 schedule updates
    });

    // Get new patients (registered in the last 7 days who have appointments)
    const newPatients = await prisma.appointment.findMany({
      where: {
        doctorId: doctor.id,
        patient: {
          user: {
            createdAt: {
              gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
            },
          },
        },
      },
      include: {
        patient: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        patient: {
          user: {
            createdAt: "desc",
          },
        },
      },
      take: 1, // Get info about recent new patients
    });

    // Format activities with timestamps
    const activities: Array<{
      id: string;
      type: string;
      icon: string;
      title: string;
      timestamp: Date;
      iconColor: string;
    }> = [];

    // Add appointment activities
    recentAppointments.forEach((appointment) => {
      activities.push({
        id: `appointment-${appointment.id}`,
        type: "appointment",
        icon: "Calendar",
        title: `Nueva cita agendada con ${appointment.patient.user.firstName} ${appointment.patient.user.lastName}`,
        timestamp: appointment.createdAt,
        iconColor: "green",
      });
    });

    // Add schedule update activities
    recentScheduleUpdates.forEach((schedule) => {
      activities.push({
        id: `schedule-${schedule.id}`,
        type: "schedule",
        icon: "Clock",
        title: `Horario actualizado para ${schedule.clinic?.name || "clínica"}`,
        timestamp: schedule.updatedAt,
        iconColor: "blue",
      });
    });

    // Add new patient activities
    if (newPatients.length > 0) {
      const uniquePatients = new Map();
      newPatients.forEach((appointment) => {
        const patientId = appointment.patient.id;
        if (!uniquePatients.has(patientId)) {
          uniquePatients.set(patientId, appointment.patient);
        }
      });

      if (uniquePatients.size > 0) {
        activities.push({
          id: `patients-new`,
          type: "patient",
          icon: "Users",
          title: `${uniquePatients.size} ${
            uniquePatients.size === 1
              ? "nuevo paciente registrado"
              : "nuevos pacientes registrados"
          }`,
          timestamp: newPatients[0].patient.user.createdAt,
          iconColor: "purple",
        });
      }
    }

    // Sort all activities by timestamp (most recent first)
    activities.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    // Take only the 3 most recent activities
    const recentActivities = activities.slice(0, 3);

    // Format timestamps for display
    const formatTimestamp = (timestamp: Date) => {
      const now = new Date();
      const diffInMinutes = Math.floor(
        (now.getTime() - timestamp.getTime()) / (1000 * 60)
      );

      if (diffInMinutes < 1) return "Hace un momento";
      if (diffInMinutes < 60)
        return `Hace ${diffInMinutes} minuto${diffInMinutes > 1 ? "s" : ""}`;

      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours < 24)
        return `Hace ${diffInHours} hora${diffInHours > 1 ? "s" : ""}`;

      const diffInDays = Math.floor(diffInHours / 24);
      return `Hace ${diffInDays} día${diffInDays > 1 ? "s" : ""}`;
    };

    const formattedActivities = recentActivities.map((activity) => ({
      ...activity,
      timeAgo: formatTimestamp(new Date(activity.timestamp)),
    }));

    return { success: true, data: formattedActivities };
  } catch (error) {
    console.error("Error fetching recent activities:", error);
    return { success: false, error: "Failed to fetch recent activities" };
  }
}

/**
 * Server action to get upcoming appointments for the dashboard
 */
export async function getUpcomingAppointments(): Promise<ActionResult> {
  try {
    const validation = await validateDoctor();
    if ("error" in validation) {
      return { success: false, error: validation.error };
    }

    const { doctor } = validation;

    // Get current date and next 7 days
    const now = new Date();
    const endOfWeek = new Date(now);
    endOfWeek.setDate(now.getDate() + 7); // Next 7 days

    // Get upcoming appointments
    const upcomingAppointments = await prisma.appointment.findMany({
      where: {
        doctorId: doctor.id,
        datetime: {
          gte: now,
          lte: endOfWeek,
        },
        status: {
          in: ["CONFIRMED", "PENDING"], // Only confirmed or pending appointments
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
      orderBy: {
        datetime: "asc",
      },
      take: 3, // Get next 3 appointments
    });

    // Format appointments for display
    const formatTime = (datetime: Date) => {
      return datetime.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    };

    const formatDate = (datetime: Date) => {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      // Check if it's today
      if (datetime.toDateString() === today.toDateString()) {
        return "Hoy";
      }

      // Check if it's tomorrow
      if (datetime.toDateString() === tomorrow.toDateString()) {
        return "Mañana";
      }

      // Check if it's this week
      const diffTime = datetime.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays <= 7) {
        const dayNames = [
          "Domingo",
          "Lunes",
          "Martes",
          "Miércoles",
          "Jueves",
          "Viernes",
          "Sábado",
        ];
        return dayNames[datetime.getDay()];
      }

      // Otherwise, return formatted date
      return datetime.toLocaleDateString("es-ES", {
        month: "short",
        day: "numeric",
      });
    };

    const getAppointmentType = (pricing: any) => {
      if (pricing?.title) {
        return pricing.title;
      }
      return "Consulta general";
    };

    const formattedAppointments = upcomingAppointments.map((appointment) => ({
      id: appointment.id,
      patientName: `${appointment.patient.user.firstName} ${appointment.patient.user.lastName}`,
      type: getAppointmentType(appointment.pricing),
      time: formatTime(appointment.datetime),
      date: formatDate(appointment.datetime),
      status: appointment.status,
      datetime: appointment.datetime,
    }));

    return { success: true, data: formattedAppointments };
  } catch (error) {
    console.error("Error fetching upcoming appointments:", error);
    return { success: false, error: "Failed to fetch upcoming appointments" };
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
