import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get("timeRange") || "week";
    const doctorId = searchParams.get("doctorId");

    // Get doctor from session or parameter
    let doctor;
    if (doctorId) {
      doctor = await prisma.doctor.findUnique({
        where: { id: doctorId },
        include: { user: true },
      });
    } else {
      doctor = await prisma.doctor.findFirst({
        where: {
          user: {
            email: session.user.email,
          },
        },
        include: { user: true },
      });
    }

    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
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

    return NextResponse.json({ success: true, data: analytics });
  } catch (error) {
    console.error("Error fetching schedule analytics:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
