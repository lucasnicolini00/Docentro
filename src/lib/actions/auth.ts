"use server";

import {
  registerUser,
  loginUser,
  type RegisterData,
  type LoginData,
} from "@/lib/auth";
import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import type { ActionResult } from "./utils";
import { detectPreferredLocaleFromStrings } from "@/lib/detectLocale";

/**
 * Server action for user registration
 */
export async function registerAction(
  formData: FormData
): Promise<ActionResult> {
  const data: RegisterData = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    phone: (formData.get("phone") as string) || undefined,
    userType: formData.get("userType") as "patient" | "doctor",
  };

  // Locale-aware redirect support (hidden input in form)
  const locale = (formData.get("locale") as string) || "es";

  const result = await registerUser(data);

  if (result.success) {
    // Set a simple session cookie (in production, use proper JWT/session management)
    const cookieStore = await cookies();
    cookieStore.set(
      "user-session",
      JSON.stringify({
        userId: result.user?.id,
        email: result.user?.email,
        role: result.user?.role,
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 1 week
      }
    );

    // Redirect to locale login (default es) after registration
    redirect(`/${locale}/login?message=registered`);
  }

  return result;
}

/**
 * Server action for user login
 */
export async function loginAction(formData: FormData): Promise<ActionResult> {
  const data: LoginData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const locale = (formData.get("locale") as string) || "es";
  const result = await loginUser(data);

  if (result.success) {
    const cookieStore = await cookies();
    cookieStore.set(
      "user-session",
      JSON.stringify({
        userId: result.user?.id,
        email: result.user?.email,
        role: result.user?.role,
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
      }
    );

    const role = result.user?.role;
    if (role === "DOCTOR") {
      redirect(`/${locale}/dashboard/doctor`);
    } else if (role === "PATIENT") {
      redirect(`/${locale}/dashboard/patient`);
    } else {
      redirect(`/${locale}`);
    }
  }

  return result;
}

/**
 * Server action for logout
 */
export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  const headersList = await headers();

  // Detect user's preferred locale
  const localeCookie = cookieStore.get("NEXT_LOCALE");
  const acceptLanguage = headersList.get("accept-language");
  const locale = detectPreferredLocaleFromStrings(
    localeCookie?.value,
    acceptLanguage
  );

  cookieStore.delete("user-session");
  // Redirect to user's locale home after logout
  redirect(`/${locale}`);
}

/**
 * Get current user session
 */
export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("user-session");

    if (!session) {
      return null;
    }

    const sessionData = JSON.parse(session.value);
    return sessionData;
  } catch {
    return null;
  }
}
