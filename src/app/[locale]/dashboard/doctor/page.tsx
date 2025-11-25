import { Suspense } from "react";
import { requireDoctor } from "@/lib/auth-guards";
import { getT } from "@/lib/getT";
import { getMessages } from "@/app/messages";
import { NextIntlClientProvider } from "next-intl";
import QuickActions from "./components/components/QuickActions";
import DashboardStats from "./components/DashboardStats";
import DashboardActivities from "./components/DashboardActivities";
import DashboardAppointments from "./components/DashboardAppointments";
import DashboardOnboarding from "./components/DashboardOnboarding";
import {
  StatsSkeleton,
  ActivitiesSkeleton,
  AppointmentsSkeleton,
  OnboardingSkeleton,
} from "./components/DashboardSkeletons";

export const dynamic = "force-dynamic";

export default async function DoctorDashboardLocale({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  await requireDoctor();
  const t = await getT("dashboard_doctor");
  
  // Fetch specific messages for this page's client components
  const messages = await getMessages(locale, ["dashboard_doctor"]);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="p-6">
        <div className="mb-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-900">{t("title")}</h1>
          </div>
        </div>

        <div className="space-y-8">
          {/* Onboarding Banner */}
          <Suspense fallback={<OnboardingSkeleton />}>
            <DashboardOnboarding />
          </Suspense>

          {/* Statistics Grid */}
          <Suspense fallback={<StatsSkeleton />}>
            <DashboardStats />
          </Suspense>

          {/* Quick Actions */}
          <QuickActions />

          {/* Recent Activity */}
          <Suspense fallback={<ActivitiesSkeleton />}>
            <DashboardActivities />
          </Suspense>

          {/* Upcoming Appointments */}
          <Suspense fallback={<AppointmentsSkeleton />}>
            <DashboardAppointments />
          </Suspense>
        </div>
      </div>
    </NextIntlClientProvider>
  );
}
