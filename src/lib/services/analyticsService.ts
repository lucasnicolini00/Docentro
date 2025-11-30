import prisma from "@/lib/prisma";

export const analyticsService = {
  async getDashboardStats(doctorId: string) {
    const now = new Date();
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Previous periods
    const yesterday = new Date(startOfToday.getTime() - 24 * 60 * 60 * 1000);
    const lastWeekStart = new Date(
      startOfWeek.getTime() - 7 * 24 * 60 * 60 * 1000
    );
    const lastWeekEnd = new Date(startOfWeek.getTime() - 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

    const endOfToday = new Date(startOfToday.getTime() + 24 * 60 * 60 * 1000);
    const endOfYesterday = startOfToday;
    const endOfWeek = now;
    const endOfMonth = now;

    // Use type-safe Prisma queries instead of raw SQL
    const [
      todayCount,
      yesterdayCount,
      weekCount,
      lastWeekCount,
      pendingCount,
      totalPatients,
      lastMonthPatients,
      monthSlots,
      monthBookedSlots,
      lastMonthSlots,
      lastMonthBookedSlots,
    ] = await Promise.all([
      // Today's appointments
      prisma.appointment.count({
        where: { doctorId, datetime: { gte: startOfToday, lt: endOfToday } },
      }),
      // Yesterday's appointments
      prisma.appointment.count({
        where: { doctorId, datetime: { gte: yesterday, lt: endOfYesterday } },
      }),
      // This week's appointments
      prisma.appointment.count({
        where: { doctorId, datetime: { gte: startOfWeek, lte: endOfWeek } },
      }),
      // Last week's appointments
      prisma.appointment.count({
        where: { doctorId, datetime: { gte: lastWeekStart, lte: lastWeekEnd } },
      }),
      // Pending appointments
      prisma.appointment.count({
        where: { doctorId, status: "PENDING" },
      }),
      // Total unique patients
      prisma.appointment.findMany({
        where: { doctorId },
        distinct: ["patientId"],
        select: { patientId: true },
      }),
      // Last month's unique patients
      prisma.appointment.findMany({
        where: {
          doctorId,
          datetime: { gte: lastMonthStart, lte: lastMonthEnd },
        },
        distinct: ["patientId"],
        select: { patientId: true },
      }),
      // This month's total time slots
      prisma.timeSlot.count({
        where: {
          schedule: { doctorId },
          createdAt: { gte: startOfMonth, lt: endOfMonth },
        },
      }),
      // This month's booked time slots
      prisma.timeSlot.count({
        where: {
          schedule: { doctorId },
          createdAt: { gte: startOfMonth, lt: endOfMonth },
          isBooked: true,
        },
      }),
      // Last month's total time slots
      prisma.timeSlot.count({
        where: {
          schedule: { doctorId },
          createdAt: { gte: lastMonthStart, lt: lastMonthEnd },
        },
      }),
      // Last month's booked time slots
      prisma.timeSlot.count({
        where: {
          schedule: { doctorId },
          createdAt: { gte: lastMonthStart, lt: lastMonthEnd },
          isBooked: true,
        },
      }),
    ]);

    // Calculate revenue (need to fetch actual pricing data)
    const monthlyAppointments = await prisma.appointment.findMany({
      where: {
        doctorId,
        status: "COMPLETED",
        datetime: { gte: startOfMonth, lte: endOfMonth },
        pricingId: { not: null },
      },
      include: { pricing: { select: { price: true } } },
    });

    const lastMonthAppointments = await prisma.appointment.findMany({
      where: {
        doctorId,
        status: "COMPLETED",
        datetime: { gte: lastMonthStart, lte: lastMonthEnd },
        pricingId: { not: null },
      },
      include: { pricing: { select: { price: true } } },
    });

    const monthRevenue = monthlyAppointments.reduce(
      (sum, apt) => sum + (Number(apt.pricing?.price) || 0),
      0
    );
    const lastRevenue = lastMonthAppointments.reduce(
      (sum, apt) => sum + (Number(apt.pricing?.price) || 0),
      0
    );

    // Calculate utilization rates
    const totalSlots = monthSlots || 1; // Avoid division by zero
    const bookedSlots = monthBookedSlots || 0;
    const utilizationRate = Math.round((bookedSlots / totalSlots) * 100);

    const lastTotalSlots = lastMonthSlots || 1;
    const lastBookedSlots = lastMonthBookedSlots || 0;
    const lastMonthUtilization = Math.round(
      (lastBookedSlots / lastTotalSlots) * 100
    );

    return [
      {
        today_appointments: todayCount,
        yesterday_appointments: yesterdayCount,
        week_appointments: weekCount,
        last_week_appointments: lastWeekCount,
        pending_bookings: pendingCount,
        total_patients: totalPatients.length,
        last_month_patients: lastMonthPatients.length,
        monthly_revenue: monthRevenue,
        last_month_revenue: lastRevenue,
        total_slots: totalSlots,
        booked_slots: bookedSlots,
        last_month_total_slots: lastTotalSlots,
        last_month_booked_slots: lastBookedSlots,
        utilization_rate: utilizationRate,
        last_month_utilization: lastMonthUtilization,
      },
    ];
  },

  async getRecentActivities(doctorId: string) {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Get recent appointments
    const recentAppointments = await prisma.appointment.findMany({
      where: {
        doctorId,
        createdAt: { gte: sevenDaysAgo },
      },
      include: {
        patient: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
      take: 10,
      orderBy: { createdAt: "desc" },
    });

    // Get schedule updates
    const scheduleUpdates = await prisma.schedule.findMany({
      where: {
        doctorId,
        updatedAt: { gte: sevenDaysAgo },
        NOT: {
          updatedAt: {
            equals: prisma.schedule.fields.createdAt,
          },
        },
      },
      include: {
        clinic: {
          select: {
            name: true,
          },
        },
      },
      take: 10,
      orderBy: { updatedAt: "desc" },
    });

    // Get new patients (first appointments)
    const allDoctorAppointments = await prisma.appointment.findMany({
      where: { doctorId },
      select: {
        patientId: true,
        createdAt: true,
        patient: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "asc" },
    });

    // Find first appointment for each patient within last 7 days
    const patientFirstAppointments = new Map<string, any>();
    for (const apt of allDoctorAppointments) {
      if (!patientFirstAppointments.has(apt.patientId)) {
        patientFirstAppointments.set(apt.patientId, apt);
      }
    }

    const newPatients = Array.from(patientFirstAppointments.values()).filter(
      (apt) => apt.createdAt >= sevenDaysAgo
    );

    // Combine and format all activities
    const activities = [
      ...recentAppointments.map((apt) => ({
        type: "appointment",
        title: "Nueva cita programada",
        description: `Cita con ${apt.patient.user.firstName} ${apt.patient.user.lastName}`,
        timestamp: apt.createdAt,
        item_id: apt.id,
      })),
      ...scheduleUpdates.map((schedule) => ({
        type: "schedule",
        title: "Horario actualizado",
        description: `Horario para ${schedule.clinic.name}`,
        timestamp: schedule.updatedAt,
        item_id: schedule.id,
      })),
      ...newPatients.map((apt) => ({
        type: "patient",
        title: "Nuevo paciente",
        description: `Primera cita con ${apt.patient.user.firstName} ${apt.patient.user.lastName}`,
        timestamp: apt.createdAt,
        item_id: apt.patient.id,
      })),
    ];

    // Sort by timestamp and limit to 10
    return activities
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 10);
  },

  async getUpcomingAppointments(doctorId: string) {
    const now = new Date();
    return prisma.appointment.findMany({
      where: {
        doctorId,
        datetime: {
          gte: now,
        },
        status: {
          in: ["CONFIRMED", "PENDING"],
        },
      },
      include: {
        patient: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
        clinic: {
          select: {
            name: true,
            address: true,
          },
        },
        pricing: {
          select: {
            price: true,
            title: true,
          },
        },
      },
      orderBy: {
        datetime: "asc",
      },
      take: 5,
    });
  },
  
  async getPatientAnalytics(
    doctorId: string,
    timeRange: "month" | "quarter" | "year" = "month"
  ) {
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
        doctorId: doctorId,
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

    return appointments;
  },

  async getRevenueAnalytics(
    doctorId: string,
    timeRange: "month" | "quarter" | "year" = "month"
  ) {
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
        doctorId: doctorId,
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

    // Monthly comparison (current vs previous month)
    const previousMonthStart = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      1
    );
    const previousMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

    const previousMonthAppointments = await prisma.appointment.count({
      where: {
        doctorId: doctorId,
        status: "COMPLETED",
        datetime: {
          gte: previousMonthStart,
          lte: previousMonthEnd,
        },
      },
    });

    return {
      completedAppointments,
      previousMonthAppointments,
    };
  },
  
};
