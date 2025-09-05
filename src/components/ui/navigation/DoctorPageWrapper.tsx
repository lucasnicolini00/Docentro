import React from "react";
import { DoctorLayout } from "@/components/ui/navigation";

interface DoctorPageWrapperProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showDate?: boolean;
  showProfile?: boolean;
  customHeaderContent?: React.ReactNode;
  hideHeader?: boolean;
}

/**
 * Wrapper component for doctor pages that provides easy header customization
 */
export default function DoctorPageWrapper({
  children,
  title,
  subtitle,
  showDate = true,
  showProfile = true,
  customHeaderContent,
  hideHeader = false,
}: DoctorPageWrapperProps) {
  return (
    <DoctorLayout
      headerTitle={title}
      headerSubtitle={subtitle}
      showDate={showDate}
      showProfile={showProfile}
      customHeaderContent={customHeaderContent}
      hideHeader={hideHeader}
    >
      {children}
    </DoctorLayout>
  );
}

// Example usage components for different page types

export function DashboardPageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DoctorPageWrapper
      title="Panel de Control"
      subtitle="Resumen de tu actividad médica"
      showDate={true}
      showProfile={true}
    >
      {children}
    </DoctorPageWrapper>
  );
}

export function AppointmentsPageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DoctorPageWrapper
      title="Gestión de Citas"
      subtitle="Administra y programa tus citas médicas"
      showDate={true}
      showProfile={false}
    >
      {children}
    </DoctorPageWrapper>
  );
}

export function ProfilePageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DoctorPageWrapper
      title="Mi Perfil Profesional"
      subtitle="Actualiza tu información y especialidades"
      showDate={false}
      showProfile={true}
    >
      {children}
    </DoctorPageWrapper>
  );
}

export function ClinicsPageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DoctorPageWrapper
      title="Clínicas y Precios"
      subtitle="Gestiona tus ubicaciones y tarifas"
      showDate={false}
      showProfile={false}
    >
      {children}
    </DoctorPageWrapper>
  );
}

export function SchedulesPageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DoctorPageWrapper
      title="Horarios de Atención"
      subtitle="Configura tu disponibilidad semanal"
      showDate={false}
      showProfile={false}
    >
      {children}
    </DoctorPageWrapper>
  );
}
