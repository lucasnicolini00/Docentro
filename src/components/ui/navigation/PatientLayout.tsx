"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Navbar } from "@/components/ui/navigation";
import { useTranslations } from "next-intl";
import PatientSidebar from "./PatientSidebar";
import PatientHeader from "./PatientHeader";
import { Menu } from "lucide-react";

interface PatientLayoutProps {
  children: React.ReactNode;
  headerTitle?: string;
  headerSubtitle?: string;
  showDate?: boolean;
  showProfile?: boolean;
  customHeaderContent?: React.ReactNode;
  hideHeader?: boolean;
}

export default function PatientLayout({
  children,
  headerTitle,
  headerSubtitle,
  showDate = true,
  showProfile = true,
  customHeaderContent,
  hideHeader = false,
}: PatientLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session } = useSession();
  const t = useTranslations("navigation");

  // Server-side guard already enforced role; removing client unauthorized fallback.

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex h-[calc(100vh-65px)]">
        {/* Sidebar */}
        <PatientSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main content */}
        <div className="flex-1 lg:ml-0 flex flex-col h-full overflow-hidden">
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
            <div className="p-6">
              {!hideHeader && (
                <PatientHeader
                  session={session}
                  title={headerTitle}
                  subtitle={headerSubtitle}
                  showDate={showDate}
                  showProfile={showProfile}
                  customContent={customHeaderContent}
                />
              )}
              <div className="max-w-7xl mx-auto">{children}</div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
