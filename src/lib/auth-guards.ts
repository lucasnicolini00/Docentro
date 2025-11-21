import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { redirect } from "next/navigation";
import { $Enums } from "@prisma/client";

// TEMP: default locale used for auth redirects after removing legacy non-locale pages
const DEFAULT_LOCALE = "es";

export async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect(`/${DEFAULT_LOCALE}/login`);
  }
  return session;
}

export async function requireDoctor() {
  const session = await requireAuth();
  if (session.user.role !== $Enums.UserRole.DOCTOR) {
    redirect(`/${DEFAULT_LOCALE}/unauthorized`);
  }
  return session;
}

export async function requirePatient() {
  const session = await requireAuth();
  if (session.user.role !== $Enums.UserRole.PATIENT) {
    redirect(`/${DEFAULT_LOCALE}/unauthorized`);
  }
  return session;
}

export async function requireAdmin() {
  const session = await requireAuth();
  // You can add ADMIN role to your enum if needed
  if (session.user.role !== "ADMIN") {
    redirect(`/${DEFAULT_LOCALE}/unauthorized`);
  }
  return session;
}
