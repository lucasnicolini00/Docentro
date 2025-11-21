"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Navbar } from "@/components/ui/navigation";
import DoctorSidebar from "./DoctorSidebar";
import DoctorHeader from "./DoctorHeader";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";

interface DoctorLayoutProps {
  children: React.ReactNode;
  headerTitle?: string;
  headerSubtitle?: string;
  showDate?: boolean;
  showProfile?: boolean;
  customHeaderContent?: React.ReactNode;
  hideHeader?: boolean;
}

export default function DoctorLayout({
  children,
  headerTitle,
  headerSubtitle,
  showProfile = true,
  customHeaderContent,
  hideHeader = false,
}: DoctorLayoutProps) {
  const t = useTranslations("navigation");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session } = useSession();

  // Server-side guard already enforced role; client fallback removed to avoid flicker.

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex h-[calc(100vh-65px)]">
        {/* Sidebar */}
        <DoctorSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main content - Add left margin on desktop to account for sidebar */}
        <div className="flex-1 lg:ml-0 flex flex-col h-full overflow-hidden w-full">
          {/* Mobile menu button */}
          <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
            >
              <Menu className="w-6 h-6" />
              <span className="font-medium">{t("menu")}</span>
            </button>
          </div>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto">
            {!hideHeader && (
              <DoctorHeader
                session={session}
                title={headerTitle}
                subtitle={headerSubtitle}
                showProfile={showProfile}
                customContent={customHeaderContent}
              />
            )}
            <div className="w-full p-6">
              <div className="max-w-7xl mx-auto">{children}</div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
