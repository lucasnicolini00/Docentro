"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function UserMenu() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center space-x-4">
        <div className="h-8 w-20 bg-gray-200 animate-pulse rounded"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center space-x-4">
        <Link
          href="/login"
          className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer"
        >
          Iniciar Sesión
        </Link>
        <Link
          href="/register"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors font-medium cursor-pointer"
        >
          Registrarse
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <span className="text-gray-700">Hola, {session.user.name}</span>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {session.user.role === "DOCTOR" ? "Doctor" : "Paciente"}
        </span>
      </div>

      {/* Dashboard link based on role */}
      {session.user.role === "DOCTOR" && (
        <Link
          href="/dashboard/doctor"
          className="text-gray-700 hover:text-blue-600 font-medium"
        >
          Dashboard
        </Link>
      )}

      {session.user.role === "PATIENT" && (
        <Link
          href="/dashboard/patient"
          className="text-gray-700 hover:text-blue-600 font-medium"
        >
          Mi Perfil
        </Link>
      )}

      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="text-gray-700 hover:text-red-600 font-medium cursor-pointer"
      >
        Cerrar Sesión
      </button>
    </div>
  );
}
