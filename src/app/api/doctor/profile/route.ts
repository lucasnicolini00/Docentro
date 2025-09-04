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

    // Verify user is a doctor
    const doctor = await prisma.doctor.findUnique({
      where: { userId: session.user.id },
      include: {
        user: true,
        specialities: true,
        experiences: true,
      },
    });

    if (!doctor) {
      return NextResponse.json(
        { error: "Usuario no es un doctor" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      doctorName,
      doctorSurname,
      doctorEmail,
      doctorPhone,
      specialities,
      experiences,
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

      // Update doctor data
      const updatedDoctor = await tx.doctor.update({
        where: { id: doctor.id },
        data: {
          name: doctorName,
          surname: doctorSurname,
          email: doctorEmail,
          phone: doctorPhone,
        },
      });

      // Update specialities
      // First, remove all existing specialities
      await tx.doctorSpeciality.deleteMany({
        where: { doctorId: doctor.id },
      });

      // Then add the new ones
      if (specialities && specialities.length > 0) {
        await tx.doctorSpeciality.createMany({
          data: specialities.map((specialityId: string) => ({
            doctorId: doctor.id,
            specialityId,
          })),
        });
      }

      // Update experiences
      // Delete existing experiences that are not in the new list
      const existingExperienceIds = experiences
        .filter((exp: any) => !exp.isNew && exp.id)
        .map((exp: any) => exp.id);

      await tx.experience.deleteMany({
        where: {
          doctorId: doctor.id,
          id: {
            notIn: existingExperienceIds,
          },
        },
      });

      // Update or create experiences
      for (const experience of experiences) {
        if (!experience.institution || !experience.title) continue;

        const experienceData = {
          doctorId: doctor.id,
          title: experience.title,
          institution: experience.institution,
          startDate: new Date(experience.startDate),
          endDate: experience.endDate ? new Date(experience.endDate) : null,
          description: experience.description || null,
        };

        if (experience.isNew || experience.id.startsWith("new-")) {
          // Create new experience
          await tx.experience.create({
            data: experienceData,
          });
        } else {
          // Update existing experience
          await tx.experience.update({
            where: { id: experience.id },
            data: experienceData,
          });
        }
      }

      return { updatedUser, updatedDoctor };
    });

    return NextResponse.json({
      message: "Perfil actualizado exitosamente",
      user: result.updatedUser,
      doctor: result.updatedDoctor,
    });
  } catch (error) {
    console.error("Error updating doctor profile:", error);
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

    // Get doctor data with related information
    const doctor = await prisma.doctor.findUnique({
      where: { userId: session.user.id },
      include: {
        user: true,
        specialities: {
          include: {
            speciality: true,
          },
        },
        experiences: {
          orderBy: {
            startDate: "desc",
          },
        },
      },
    });

    if (!doctor) {
      return NextResponse.json(
        { error: "Usuario no es un doctor" },
        { status: 403 }
      );
    }

    // Get all available specialities
    const allSpecialities = await prisma.speciality.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json({
      doctor,
      allSpecialities,
    });
  } catch (error) {
    console.error("Error fetching doctor profile:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
