"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLocalePath } from "@/hooks";
import { usePathname } from "next/navigation";
import { CalendarDays, Home, User, Calendar } from "lucide-react";

// Sidebar items will be defined inside the component to use translations

interface PatientSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PatientSidebar({
  isOpen,
  onClose,
}: PatientSidebarProps) {
  const t = useTranslations("navigation");
  const localePath = useLocalePath();
  const sidebarItems = [
    {
      label: t("patientSidebarDashboard"),
      href: localePath("/dashboard/patient"),
      icon: Home,
    },
    {
      label: t("patientSidebarAppointments"),
      href: localePath("/dashboard/patient/appointments"),
      icon: CalendarDays,
    },
    {
      label: t("patientSidebarCalendar"),
      href: localePath("/dashboard/patient/calendar"),
      icon: Calendar,
    },
    {
      label: t("patientSidebarProfile"),
      href: localePath("/dashboard/patient/profile"),
      icon: User,
    },
  ];
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
          w-64 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          flex flex-col h-full lg:h-[calc(100vh-65px)]
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
          <div className="flex items-center space-x-2">
            <span className="text-lg">🏥</span>
            <span className="font-semibold text-gray-900">
              {t("patientSidebarHeader")}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-2 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`
                  flex items-center space-x-3 lg:space-x-4 px-4 py-3 rounded-lg transition-colors duration-200
                  ${
                    isActive
                      ? "bg-blue-50 text-blue-700 border-r-4 border-blue-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  }
                `}
              >
                <Icon
                  className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-gray-500"}`}
                />
                <span className="font-medium text-sm lg:text-base">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="text-xs lg:text-sm text-gray-500 text-center">
            <p className="font-medium">Docentro Medical</p>
            <p>{t("patientSidebarFooter")}</p>
          </div>
        </div>
      </div>
    </>
  );
}
