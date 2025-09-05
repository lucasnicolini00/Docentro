"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Navbar } from "@/components/ui/navigation";
import DoctorSidebar from "./DoctorSidebar";
import { Menu } from "lucide-react";

interface DoctorLayoutProps {
  children: React.ReactNode;
}

export default function DoctorLayout({ children }: DoctorLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session } = useSession();

  // Only show doctor layout for doctors
  if (session?.user?.role !== "DOCTOR") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Acceso no autorizado
            </h1>
            <p className="text-gray-600">
              Solo los doctores pueden acceder a esta página.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <DoctorSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main content */}
        <div className="flex-1 lg:ml-0 flex flex-col h-full">
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
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </div>
  );
}
