import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { $Enums } from "@prisma/client";

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName, phone, userType } =
      await request.json();

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Ya existe una cuenta con este correo electrónico" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Determine user role
    const role =
      userType === "doctor" ? $Enums.UserRole.DOCTOR : $Enums.UserRole.PATIENT;

    // Create user in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create the user
      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          phone,
          role: role,
        },
      });

      // Create corresponding profile based on user type
      if (userType === "patient") {
        await tx.patient.create({
          data: {
            userId: user.id,
            name: firstName,
            surname: lastName,
            email,
            phone: phone || "",
            birthdate: new Date(), // You can make this optional in registration
            gender: "Not specified",
          },
        });
      } else if (userType === "doctor") {
        await tx.doctor.create({
          data: {
            userId: user.id,
            name: firstName,
            surname: lastName,
            email,
            phone: phone || "",
          },
        });
      }

      return user;
    });

    return NextResponse.json({
      success: true,
      message: "Usuario creado exitosamente",
      user: {
        id: result.id,
        email: result.email,
        role: result.role,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
