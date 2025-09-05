"use client";

import { Session } from "next-auth";

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
  title,
  subtitle,
  showDate = true,
  showProfile = true,
  customContent,
}: DoctorHeaderProps) {
  const defaultTitle = `Bienvenido Dr. ${session.user.name}`;
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
      <div className="px-6 py-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{title || defaultTitle}</h1>
            <p className="mt-2 text-blue-100">{subtitle || defaultSubtitle}</p>
            {customContent && <div className="mt-4">{customContent}</div>}
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
                  <div>
                    <p className="font-medium text-lg">{session.user.name}</p>
                    <p className="text-sm text-blue-100">Especialista Médico</p>
                    <p className="text-xs text-blue-200 mt-1">
                      {session.user.email}
                    </p>
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
