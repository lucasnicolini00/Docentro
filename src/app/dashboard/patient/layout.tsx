"use client";

import { PatientLayout } from "@/components/ui/navigation";

interface PatientDashboardLayoutProps {
  children: React.ReactNode;
}

export default function PatientDashboardLayout({
  children,
}: PatientDashboardLayoutProps) {
  return <PatientLayout>{children}</PatientLayout>;
}
