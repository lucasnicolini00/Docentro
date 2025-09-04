import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Verify user is a patient
    const patient = await prisma.patient.findUnique({
      where: { userId: session.user.id },
      include: {
        user: true,
      },
    });

    if (!patient) {
      return NextResponse.json(
        { error: "Usuario no es un paciente" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      patientName,
      patientSurname,
      patientEmail,
      patientPhone,
      birthdate,
      gender,
    } = body;

    // Start a transaction to update all related data
    const result = await prisma.$transaction(async (tx) => {
      // Update user data
      const updatedUser = await tx.user.update({
        where: { id: session.user.id },
        data: {
          firstName,
          lastName,
          email,
          phone: phone || null,
        },
      });

      // Update patient data
      const updatedPatient = await tx.patient.update({
        where: { id: patient.id },
        data: {
          name: patientName,
          surname: patientSurname,
          email: patientEmail,
          phone: patientPhone || null,
          birthdate: birthdate ? new Date(birthdate) : null,
          gender: gender || null,
        },
      });

      return { updatedUser, updatedPatient };
    });

    return NextResponse.json({
      message: "Perfil actualizado exitosamente",
      user: result.updatedUser,
      patient: result.updatedPatient,
    });
  } catch (error) {
    console.error("Error updating patient profile:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Get patient data with related information
    const patient = await prisma.patient.findUnique({
      where: { userId: session.user.id },
      include: {
        user: true,
      },
    });

    if (!patient) {
      return NextResponse.json(
        { error: "Usuario no es un paciente" },
        { status: 403 }
      );
    }

    return NextResponse.json({
      patient,
    });
  } catch (error) {
    console.error("Error fetching patient profile:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
