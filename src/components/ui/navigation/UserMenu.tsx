"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  User,
  LogOut,
  Calendar,
  BarChart3,
  CalendarDays,
  Home,
  Clock,
  Building2,
  Briefcase,
} from "lucide-react";
import { getUserProfileImageUrl } from "@/lib/actions/images-uploader";
import { useTranslations } from "next-intl";
import { useLocalePath } from "@/hooks";

export default function UserMenu() {
  const t = useTranslations("navigation");
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const localePath = useLocalePath();

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch profile image when session is available
  useEffect(() => {
    async function fetchProfileImage() {
      if (session?.user) {
        try {
          const result = await getUserProfileImageUrl();
          if (result.success) {
            setProfileImageUrl(result.data);
          }
        } catch (error) {
          console.error("Error fetching profile image:", error);
        }
      }
    }

    fetchProfileImage();
  }, [session]);

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
          href={localePath("/register")}
          className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer transition-colors"
        >
          {t("register")}
        </Link>
        <Link
          href={localePath("/login")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors font-medium cursor-pointer shadow-sm hover:shadow-md"
        >
          {t("login")}
        </Link>
      </div>
    );
  }

  const menuItems =
    session.user.role === "DOCTOR"
      ? [
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
        ]
      : [
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

  return (
    <div className="relative" ref={menuRef}>
      {/* User Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
      >
        <div className="flex items-center space-x-2">
          {profileImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profileImageUrl}
              alt={`${session.user.name}`}
              className="h-8 w-8 rounded-full object-cover border border-gray-200"
            />
          ) : (
            <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">
                {session.user.name?.charAt(0)?.toUpperCase()}
              </span>
            </div>
          )}
          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium text-gray-700">
              {session.user.name}
            </p>
            <p className="text-xs text-gray-500">
              {session.user.role === "DOCTOR"
                ? t("roleDoctor")
                : t("rolePatient")}
            </p>
          </div>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              {profileImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profileImageUrl}
                  alt={`${session.user.name}`}
                  className="h-10 w-10 rounded-full object-cover border border-gray-200"
                />
              ) : (
                <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">
                    {session.user.name?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <p className="font-medium text-gray-900">{session.user.name}</p>
                <p className="text-sm text-gray-500">{session.user.email}</p>
                <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  {session.user.role === "DOCTOR"
                    ? t("roleDoctor")
                    : t("rolePatient")}
                </span>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Logout */}
          <div className="border-t border-gray-100 pt-2">
            <button
              onClick={() => {
                setIsOpen(false);
                signOut({ callbackUrl: localePath("/") });
              }}
              className="flex items-center space-x-3 w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>{t("logout")}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
