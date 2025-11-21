import React from "react";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("navigation");
  return (
    <DoctorPageWrapper
      title={t("doctorDashboardTitle")}
      subtitle={t("doctorDashboardSubtitle")}
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
  const t = useTranslations("navigation");
  return (
    <DoctorPageWrapper
      title={t("doctorAppointmentsTitle")}
      subtitle={t("doctorAppointmentsSubtitle")}
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
  const t = useTranslations("navigation");
  return (
    <DoctorPageWrapper
      title={t("doctorProfileTitle")}
      subtitle={t("doctorProfileSubtitle")}
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
  const t = useTranslations("navigation");
  return (
    <DoctorPageWrapper
      title={t("doctorClinicsTitle")}
      subtitle={t("doctorClinicsSubtitle")}
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
  const t = useTranslations("navigation");
  return (
    <DoctorPageWrapper
      title={t("doctorSchedulesTitle")}
      subtitle={t("doctorSchedulesSubtitle")}
      showDate={false}
      showProfile={false}
    >
      {children}
    </DoctorPageWrapper>
  );
}
