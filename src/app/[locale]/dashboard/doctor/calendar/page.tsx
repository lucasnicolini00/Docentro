import { requireDoctor } from "@/lib/auth-guards";
import { getDoctorDashboard } from "@/lib/actions";
import { transformAppointmentToCalendarEvent } from "./utils";
import DoctorCalendarClient from "./components/DoctorCalendarClient";
import type { DoctorAppointment } from "@/lib/types";

export const dynamic = "force-dynamic"; // live calendar data

export default async function DoctorCalendarPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params; // locale inferred by next-intl
  await requireDoctor();

  const dashboard = await getDoctorDashboard();
  const data = dashboard.success && dashboard.data ? dashboard.data : null;

  const rawAppointments: DoctorAppointment[] = [
    ...(data?.appointments?.today ?? []),
    ...(data?.appointments?.upcoming ?? []),
    ...(data?.appointments?.pending ?? []),
  ];

  const initialAppointments = rawAppointments.map((a) =>
    transformAppointmentToCalendarEvent(a)
  );

  return (
    <div className="space-y-6">
      <DoctorCalendarClient initialAppointments={initialAppointments} />
    </div>
  );
}
