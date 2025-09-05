"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  Clock,
  User,
  Settings,
  FileText,
  BarChart3,
  Users,
  MessageSquare,
  Home,
} from "lucide-react";

const sidebarItems = [
  {
    label: "Dashboard",
    href: "/dashboard/doctor",
    icon: Home,
  },
  {
    label: "Mis Citas",
    href: "/dashboard/doctor/appointments",
    icon: CalendarDays,
  },
  {
    label: "Horarios",
    href: "/dashboard/doctor/schedules",
    icon: Clock,
  },
  {
    label: "Pacientes",
    href: "/dashboard/doctor/patients",
    icon: Users,
  },
  {
    label: "Mensajes",
    href: "/dashboard/doctor/messages",
    icon: MessageSquare,
  },
  {
    label: "Reportes",
    href: "/dashboard/doctor/reports",
    icon: BarChart3,
  },
  {
    label: "Historial Médico",
    href: "/dashboard/doctor/medical-records",
    icon: FileText,
  },
  {
    label: "Mi Perfil",
    href: "/dashboard/doctor/profile",
    icon: User,
  },
  {
    label: "Configuración",
    href: "/dashboard/doctor/settings",
    icon: Settings,
  },
];

interface DoctorSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DoctorSidebar({ isOpen, onClose }: DoctorSidebarProps) {
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
          fixed top-0 left-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">Panel Médico</h2>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200
                  ${
                    isActive
                      ? "bg-blue-50 text-blue-700 border-r-4 border-blue-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  }
                `}
              >
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? "text-blue-600" : "text-gray-500"
                  }`}
                />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            <p>Docentro Medical</p>
            <p>v1.0.0</p>
          </div>
        </div>
      </div>
    </>
  );
}
