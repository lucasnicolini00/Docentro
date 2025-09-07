import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { createAppointmentWithTimeSlot } from "@/lib/actions/appointments";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== "PATIENT") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { timeSlotId, type, notes, pricingId } = body;

    if (!timeSlotId) {
      return NextResponse.json(
        { error: "ID de horario requerido" },
        { status: 400 }
      );
    }

    // Create form data for the server action
    const formData = new FormData();
    if (pricingId) formData.append("pricingId", pricingId);
    if (type) formData.append("type", type);
    if (notes) formData.append("notes", notes);

    const result = await createAppointmentWithTimeSlot(timeSlotId, formData);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Cita creada exitosamente",
        appointment: result.data,
      });
    } else {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // This could return user's appointments or other appointment data
    // For now, just return a simple response
    return NextResponse.json({
      message: "API de citas disponible",
      user: session.user.id,
    });
  } catch (error) {
    console.error("Error in appointments API:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
