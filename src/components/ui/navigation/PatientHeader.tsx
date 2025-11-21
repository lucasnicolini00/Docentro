"use client";

import { Session } from "next-auth";
import { useTranslations } from "next-intl";
import { User, Calendar } from "lucide-react";

interface PatientHeaderProps {
  session: Session | null;
  title?: string;
  subtitle?: string;
  showDate?: boolean;
  showProfile?: boolean;
  customContent?: React.ReactNode;
}

export default function PatientHeader({
  session,
  title,
  subtitle,
  showDate = true,
  showProfile = true,
  customContent,
}: PatientHeaderProps) {
  const t = useTranslations("navigation");
  const formatDate = () => {
    return new Intl.DateTimeFormat("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date());
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  if (customContent) {
    return <div className="mb-6">{customContent}</div>;
  }

  return (
    <div className="mb-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-6 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center space-x-4">
            {showProfile && (
              <div className="bg-white/20 p-3 rounded-full">
                <User className="w-8 h-8 text-white" />
              </div>
            )}
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold">
                {title ||
                  t("patientHeaderGreeting", {
                    name: session?.user?.name || t("patientHeaderDefaultName"),
                  })}
              </h1>
              <p className="text-blue-100 mt-1">
                {subtitle || t("patientHeaderSubtitle")}
              </p>
            </div>
          </div>

          {showDate && (
            <div className="mt-4 lg:mt-0 flex items-center space-x-2 text-blue-100">
              <Calendar className="w-5 h-5" />
              <span className="text-sm lg:text-base">
                {capitalizeFirstLetter(formatDate())}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
