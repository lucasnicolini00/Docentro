"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

/**
 * Validates if the current user is authenticated
 * @returns Promise<{ user: { id: string } } | null>
 */
export async function validateAuth() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return null;
  }

  return session;
}

/**
 * Validates if the current user is a patient
 * @returns Promise<{ patient: Patient, session: Session } | { error: string }>
 */
export async function validatePatient() {
  const session = await validateAuth();

  if (!session) {
    return { error: "No autorizado" };
  }

  const patient = await prisma.patient.findUnique({
    where: { userId: session.user.id },
    include: {
      user: true,
    },
  });

  if (!patient) {
    return { error: "Usuario no es un paciente" };
  }

  return { patient, session };
}

/**
 * Validates if the current user is a doctor
 * @returns Promise<{ doctor: Doctor, session: Session } | { error: string }>
 */
export async function validateDoctor() {
  const session = await validateAuth();

  if (!session) {
    return { error: "No autorizado" };
  }

  const doctor = await prisma.doctor.findUnique({
    where: { userId: session.user.id },
    include: {
      user: true,
      specialities: true,
      experiences: true,
    },
  });

  if (!doctor) {
    return { error: "Usuario no es un doctor" };
  }

  return { doctor, session };
}

/**
 * Standard action result type
 */
export type ActionResult<T = any> = {
  success: boolean;
  error?: string;
  message?: string;
  data?: T;
};
