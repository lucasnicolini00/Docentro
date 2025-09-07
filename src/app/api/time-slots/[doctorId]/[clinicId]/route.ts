import { NextRequest, NextResponse } from "next/server";
import { getTimeSlotsForCalendar } from "@/lib/actions/schedules";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ doctorId: string; clinicId: string }> }
) {
  try {
    const { doctorId, clinicId } = await context.params;
    const { searchParams } = new URL(request.url);

    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const options: any = {};

    if (startDate) {
      options.startDate = new Date(startDate);
    }

    if (endDate) {
      options.endDate = new Date(endDate);
    }

    const timeSlots = await getTimeSlotsForCalendar(
      doctorId,
      clinicId,
      options
    );

    // Transform to include availability info
    const slotsWithAvailability = timeSlots.map((slot) => ({
      id: slot.id,
      startTime: slot.startTime,
      endTime: slot.endTime,
      isBooked: slot.isBooked,
      isBlocked: slot.isBlocked,
      // Available if not booked, not blocked, and no appointment exists
      isAvailable: !slot.isBooked && !slot.isBlocked && !slot.appointment,
      appointment: slot.appointment
        ? {
            id: slot.appointment.id,
            status: slot.appointment.status,
          }
        : null,
      schedule: {
        doctorName: slot.schedule?.doctor
          ? `${slot.schedule.doctor.name} ${slot.schedule.doctor.surname}`
          : null,
        clinicName: slot.schedule?.clinic?.name || null,
      },
    }));

    return NextResponse.json(slotsWithAvailability);
  } catch (error) {
    console.error("Error fetching time slots:", error);
    return NextResponse.json(
      { error: "Error al obtener horarios disponibles" },
      { status: 500 }
    );
  }
}
