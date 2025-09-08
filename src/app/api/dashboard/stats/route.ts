import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get doctor from session
    const doctor = await prisma.doctor.findFirst({
      where: {
        user: {
          email: session.user.email,
        },
      },
      include: {
        user: true,
      },
    });

    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }

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

    return NextResponse.json({ success: true, data: stats });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
