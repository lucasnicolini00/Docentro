"use client";

import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useTranslations, useLocale } from "next-intl";

interface DoctorHeaderProps {
  session: Session | null;
  title?: string;
  subtitle?: string;
  showProfile?: boolean;
  customContent?: React.ReactNode;
}

export default function DoctorHeader({
  session,
  subtitle,
  showProfile = true,
}: DoctorHeaderProps) {
  const t = useTranslations("navigation");
  const locale = useLocale();
  const { status } = useSession();

  const getDoctorName = () => {
    if (!session?.user?.name) return t("doctor");
    const fullName = session.user.name.trim();
    const nameParts = fullName.split(" ");
    const lower = fullName.toLowerCase();
    if (lower.includes("dr.") || lower.includes("dra.")) return fullName;
    return `Dr. ${nameParts[0]}`;
  };

  const getFormattedDate = () => {
    const date = new Date();
    
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    return date.toLocaleDateString(locale, options);
  };

  return (
    <div className="p-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-900 text-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">
              {status === "loading" ? (
                <span className="animate-pulse">{t("doctorLoading")}</span>
              ) : (
                t("doctorWelcome", { name: getDoctorName() })
              )}
            </h1>
            <p className="mt-2 text-blue-100">
              {subtitle || `${t("doctorSubtitle")} - ${getFormattedDate()}`}
            </p>
          </div>

          {showProfile && (
            <div className="hidden md:block ml-6">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="h-14 w-14 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold">
                      {session?.user?.name?.charAt(0) || "D"}
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
