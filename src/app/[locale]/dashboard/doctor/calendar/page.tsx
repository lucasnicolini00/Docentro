import { requireDoctor } from "@/lib/auth-guards";
import { getDoctorDashboard } from "@/lib/actions";
import DoctorCalendarWrapper from "./components/DoctorCalendarWrapper";
import { transformAppointmentToCalendarEvent } from "./utils";

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

  const rawAppointments = [
    ...(data?.appointments?.today ?? []),
    ...(data?.appointments?.upcoming ?? []),
    ...(data?.appointments?.pending ?? []),
  ];

  const initialAppointments = rawAppointments.map((a: any) =>
    transformAppointmentToCalendarEvent(a)
  );

  return (
    <div className="space-y-6">
      <DoctorCalendarWrapper initialAppointments={initialAppointments} />
    </div>
  );
}
