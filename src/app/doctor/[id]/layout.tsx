"use client";

import { Navbar } from "@/components/ui/navigation";

interface DoctorProfileLayoutProps {
  children: React.ReactNode;
}

export default function DoctorProfileLayout({
  children,
}: DoctorProfileLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
