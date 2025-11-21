"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLocalePath } from "@/hooks";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  Clock,
  User,
  BarChart3,
  Home,
  Building2,
  Briefcase,
} from "lucide-react";

interface DoctorSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DoctorSidebar({ isOpen, onClose }: DoctorSidebarProps) {
  const t = useTranslations("navigation");
  const pathname = usePathname();
  const localePath = useLocalePath();
  const sidebarItems = [
    {
      label: t("doctorSidebarDashboard"),
      href: localePath("/dashboard/doctor"),
      icon: Home,
    },
    {
      label: t("doctorSidebarClinics"),
      href: localePath("/dashboard/doctor/clinics"),
      icon: Building2,
    },
    {
      label: t("doctorSidebarSchedules"),
      href: localePath("/dashboard/doctor/schedules"),
      icon: Clock,
    },
    {
      label: t("doctorSidebarAppointments"),
      href: localePath("/dashboard/doctor/appointments"),
      icon: CalendarDays,
    },
    {
      label: t("doctorSidebarCalendar"),
      href: localePath("/dashboard/doctor/calendar"),
      icon: CalendarDays,
    },
    {
      label: t("doctorSidebarAnalytics"),
      href: localePath("/dashboard/doctor/analytics"),
      icon: BarChart3,
    },
    {
      label: t("doctorSidebarProfile"),
      href: localePath("/dashboard/doctor/profile"),
      icon: User,
    },
    {
      label: t("doctorSidebarExperience"),
      href: localePath("/dashboard/doctor/profile/experience"),
      icon: Briefcase,
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar - Fixed on mobile when open, always visible on desktop */}
      <div
        className={`
          fixed lg:sticky top-0 inset-y-0 left-0 z-50 w-64 bg-white shadow-lg flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">
            {t("doctorSidebarTitle") || "Panel Médico"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {t("doctorSidebarSubtitle") || "Gestiona tu consultorio"}
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onClose()} // Close mobile sidebar on navigation
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200
                  ${
                    isActive
                      ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  }
                `}
              >
                <Icon
                  className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-blue-600" : "text-gray-500"}`}
                />
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            <p className="font-medium">Docentro Medical</p>
            <p className="mt-1">v1.0.0</p>
          </div>
        </div>
      </div>
    </>
  );
}
