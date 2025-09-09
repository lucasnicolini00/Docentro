"use client";

import { Session } from "next-auth";
import { useSession } from "next-auth/react";

interface DoctorHeaderProps {
  session: Session;
  title?: string;
  subtitle?: string;
  showDate?: boolean;
  showProfile?: boolean;
  customContent?: React.ReactNode;
}

export default function DoctorHeader({
  session,
  subtitle,
  showDate = true,
  showProfile = true,
}: DoctorHeaderProps) {
  const { status } = useSession();
  const getDoctorName = () => {
    if (!session?.user?.name) return "Doctor";

    const fullName = session.user.name.trim();
    const nameParts = fullName.split(" ");
    if (
      fullName.toLowerCase().includes("dr.") ||
      fullName.toLowerCase().includes("dra.")
    ) {
      return fullName;
    }
    return `Dr. ${nameParts[0]}`;
  };
  const defaultSubtitle = showDate
    ? `Panel de control médico - ${new Date().toLocaleDateString("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })}`
    : "Panel de control médico";

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-900 text-white -m-6 mb-6">
      <div className="px-3 py-5 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">
              {status === "loading" ? (
                <span className="animate-pulse">¡Bienvenido de vuelta!</span>
              ) : (
                `¡Bienvenido de vuelta, ${getDoctorName()}!`
              )}
            </h1>
            <p className="mt-2 text-blue-100">{subtitle || defaultSubtitle}</p>
          </div>

          {showProfile && (
            <div className="hidden md:block ml-6">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="h-14 w-14 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold">
                      {session.user.name?.charAt(0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
