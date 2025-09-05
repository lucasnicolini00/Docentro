"use client";

import { DoctorLayout } from "@/components/ui/navigation";

interface DoctorDashboardLayoutProps {
  children: React.ReactNode;
}

export default function DoctorDashboardLayout({
  children,
}: DoctorDashboardLayoutProps) {
  return <DoctorLayout>{children}</DoctorLayout>;
}
