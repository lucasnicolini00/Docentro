"use server";

import {
  registerUser,
  loginUser,
  type RegisterData,
  type LoginData,
} from "@/lib/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import type { ActionResult } from "./utils";

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

    redirect("/login?message=registered");
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

  const result = await loginUser(data);

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

    redirect("/");
  }

  return result;
}

/**
 * Server action for logout
 */
export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("user-session");
  redirect("/");
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
