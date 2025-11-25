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

    const statsQuery = `
      WITH date_ranges AS (
        SELECT 
          $1::timestamp as today_start,
          $2::timestamp as today_end,
          $3::timestamp as yesterday_start,
          $4::timestamp as yesterday_end,
          $5::timestamp as week_start,
          $6::timestamp as week_end,
          $7::timestamp as last_week_start,
          $8::timestamp as last_week_end,
          $9::timestamp as month_start,
          $10::timestamp as month_end,
          $11::timestamp as last_month_start,
          $12::timestamp as last_month_end,
          $13::text as doctor_id
      ),
      appointment_stats AS (
        SELECT 
          COUNT(*) FILTER (WHERE datetime >= (SELECT today_start FROM date_ranges) 
                            AND datetime < (SELECT today_end FROM date_ranges)) as today_appointments,
          COUNT(*) FILTER (WHERE datetime >= (SELECT yesterday_start FROM date_ranges) 
                            AND datetime < (SELECT yesterday_end FROM date_ranges)) as yesterday_appointments,
          COUNT(*) FILTER (WHERE datetime >= (SELECT week_start FROM date_ranges) 
                            AND datetime < (SELECT week_end FROM date_ranges)) as week_appointments,
          COUNT(*) FILTER (WHERE datetime >= (SELECT last_week_start FROM date_ranges) 
                            AND datetime < (SELECT last_week_end FROM date_ranges)) as last_week_appointments,
          COUNT(*) FILTER (WHERE status = 'PENDING') as pending_bookings,
          COUNT(DISTINCT patient_id) as total_patients,
          COUNT(DISTINCT patient_id) FILTER (WHERE datetime >= (SELECT last_month_start FROM date_ranges) 
                                              AND datetime < (SELECT last_month_end FROM date_ranges)) as last_month_patients
        FROM "Appointment" 
        WHERE doctor_id = (SELECT doctor_id FROM date_ranges)
      ),
      revenue_stats AS (
        SELECT 
          COALESCE(SUM(p.price), 0) FILTER (WHERE a.datetime >= (SELECT month_start FROM date_ranges) 
                                             AND a.datetime < (SELECT month_end FROM date_ranges) 
                                             AND a.status = 'COMPLETED') as monthly_revenue,
          COALESCE(SUM(p.price), 0) FILTER (WHERE a.datetime >= (SELECT last_month_start FROM date_ranges) 
                                             AND a.datetime < (SELECT last_month_end FROM date_ranges) 
                                             AND a.status = 'COMPLETED') as last_month_revenue
        FROM "Appointment" a
        LEFT JOIN "Pricing" p ON a.pricing_id = p.id
        WHERE a.doctor_id = (SELECT doctor_id FROM date_ranges)
      ),
      slot_stats AS (
        SELECT 
          COUNT(*) FILTER (WHERE ts.created_at >= (SELECT month_start FROM date_ranges) 
                            AND ts.created_at < (SELECT month_end FROM date_ranges)) as total_slots,
          COUNT(*) FILTER (WHERE ts.created_at >= (SELECT month_start FROM date_ranges) 
                            AND ts.created_at < (SELECT month_end FROM date_ranges) 
                            AND ts.is_booked = true) as booked_slots,
          COUNT(*) FILTER (WHERE ts.created_at >= (SELECT last_month_start FROM date_ranges) 
                            AND ts.created_at < (SELECT last_month_end FROM date_ranges)) as last_month_total_slots,
          COUNT(*) FILTER (WHERE ts.created_at >= (SELECT last_month_start FROM date_ranges) 
                            AND ts.created_at < (SELECT last_month_end FROM date_ranges) 
                            AND ts.is_booked = true) as last_month_booked_slots
        FROM "TimeSlot" ts
        INNER JOIN "Schedule" s ON ts.schedule_id = s.id
        WHERE s.doctor_id = (SELECT doctor_id FROM date_ranges)
      )
      SELECT 
        ast.*,
        rst.*,
        sst.*,
        CASE 
          WHEN sst.total_slots > 0 THEN ROUND((sst.booked_slots::float / sst.total_slots) * 100)
          ELSE 0 
        END as utilization_rate,
        CASE 
          WHEN sst.last_month_total_slots > 0 THEN ROUND((sst.last_month_booked_slots::float / sst.last_month_total_slots) * 100)
          ELSE 0 
        END as last_month_utilization
      FROM appointment_stats ast, revenue_stats rst, slot_stats sst;
    `;

    return prisma.$queryRawUnsafe(
      statsQuery,
      startOfToday,
      endOfToday,
      yesterday,
      endOfYesterday,
      startOfWeek,
      endOfWeek,
      lastWeekStart,
      lastWeekEnd,
      startOfMonth,
      endOfMonth,
      lastMonthStart,
      lastMonthEnd,
      doctorId
    ) as Promise<any[]>;
  },

  async getRecentActivities(doctorId: string) {
    return prisma.$queryRaw`
      WITH recent_activities AS (
        -- Recent appointments
        SELECT 
          'appointment' as type,
          'Nueva cita programada' as title,
          CONCAT('Cita con ', p.first_name, ' ', p.last_name) as description,
          a.created_at as timestamp,
          a.id::text as item_id
        FROM "Appointment" a
        INNER JOIN "Patient" pt ON a.patient_id = pt.id
        INNER JOIN "User" p ON pt.user_id = p.id
        WHERE a.doctor_id = ${doctorId}
          AND a.created_at >= NOW() - INTERVAL '7 days'
        
        UNION ALL
        
        -- Schedule updates
        SELECT 
          'schedule' as type,
          'Horario actualizado' as title,
          CONCAT('Horario para ', c.name) as description,
          s.updated_at as timestamp,
          s.id::text as item_id
        FROM "Schedule" s
        INNER JOIN "Clinic" c ON s.clinic_id = c.id
        WHERE s.doctor_id = ${doctorId}
          AND s.updated_at >= NOW() - INTERVAL '7 days'
          AND s.updated_at != s.created_at
        
        UNION ALL
        
        -- New patients (first appointments)
        SELECT 
          'patient' as type,
          'Nuevo paciente' as title,
          CONCAT('Primera cita con ', u.first_name, ' ', u.last_name) as description,
          a.created_at as timestamp,
          pt.id::text as item_id
        FROM "Appointment" a
        INNER JOIN "Patient" pt ON a.patient_id = pt.id
        INNER JOIN "User" u ON pt.user_id = u.id
        WHERE a.doctor_id = ${doctorId}
          AND a.created_at >= NOW() - INTERVAL '7 days'
          AND NOT EXISTS (
            SELECT 1 FROM "Appointment" a2 
            WHERE a2.patient_id = a.patient_id 
              AND a2.doctor_id = a.doctor_id 
              AND a2.created_at < a.created_at
          )
      )
      SELECT * FROM recent_activities
      ORDER BY timestamp DESC
      LIMIT 10;
    ` as Promise<any[]>;
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
