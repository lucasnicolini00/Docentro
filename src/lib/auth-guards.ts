import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { redirect } from "next/navigation";
import { $Enums } from "@prisma/client";

export async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/login");
  }
  return session;
}

export async function requireDoctor() {
  const session = await requireAuth();
  if (session.user.role !== $Enums.UserRole.DOCTOR) {
    redirect("/unauthorized");
  }
  return session;
}

export async function requirePatient() {
  const session = await requireAuth();
  if (session.user.role !== $Enums.UserRole.PATIENT) {
    redirect("/unauthorized");
  }
  return session;
}

export async function requireAdmin() {
  const session = await requireAuth();
  // You can add ADMIN role to your enum if needed
  if (session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }
  return session;
}
