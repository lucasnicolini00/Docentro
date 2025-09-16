"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Navbar } from "@/components/ui/navigation";
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

  // Only show patient layout for patients
  if (session?.user?.role !== "PATIENT") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Acceso no autorizado
            </h1>
            <p className="text-gray-600">
              Solo los pacientes pueden acceder a esta página.
            </p>
          </div>
        </div>
      </div>
    );
  }

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
              <span className="font-medium">Menú</span>
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
