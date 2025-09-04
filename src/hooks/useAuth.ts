"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useAuth() {
  const { data: session, status } = useSession();
  const user = session?.user;

  return {
    session,
    user,
    isLoading: status === "loading",
    isAuthenticated: !!session,
    isDoctor: user?.role === "DOCTOR",
    isPatient: user?.role === "PATIENT",
    doctorId: user?.doctorId,
    patientId: user?.patientId,
  };
}

export function useRequireAuth() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  return { isAuthenticated, isLoading };
}
