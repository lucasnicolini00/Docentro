import { requirePatient } from "@/lib/auth-guards";
import { getPatientDashboard } from "@/lib/actions";
import { getT } from "@/lib/getT";
import PatientCalendarClient from "./components/PatientCalendarClient";

export const dynamic = "force-dynamic";

export default async function PatientCalendarPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params; // locale inferred
  await requirePatient();

  const dashboard = await getPatientDashboard();
  const data = dashboard.success && dashboard.data ? dashboard.data : null;

  const appts = [
    ...(data?.upcomingAppointments ?? []),
    ...(data?.pastAppointments ?? []),
  ];

  const initialAppointments = appts.map((apt: any) => {
    const start = new Date(apt.datetime);
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    return {
      id: apt.id,
      title:
        `Dr. ${apt.doctor?.user?.firstName || ""} ${apt.doctor?.user?.lastName || ""}`.trim(),
      start: start.toISOString(),
      end: end.toISOString(),
      extendedProps: {
        status: apt.status,
        doctorName:
          `${apt.doctor?.user?.firstName || ""} ${apt.doctor?.user?.lastName || ""}`.trim(),
        specialty: apt.doctor?.speciality?.name || "",
        clinicName: apt.clinic?.name || "",
        clinicAddress: apt.clinic?.address || "",
        notes: apt.notes || undefined,
        type: apt.type || "IN_PERSON",
      },
    };
  });

  const t = await getT("dashboard_patient");
  const { locale } = await params;

  // Calculate appointment statistics
  const now = new Date();
  const upcomingCount = appts.filter(
    (apt: any) => new Date(apt.datetime) >= now && apt.status !== "CANCELED"
  ).length;
  const completedCount = appts.filter(
    (apt: any) => apt.status === "COMPLETED"
  ).length;
  const canceledCount = appts.filter(
    (apt: any) => apt.status === "CANCELED"
  ).length;
  const thisMonthCount = appts.filter((apt: any) => {
    const aptDate = new Date(apt.datetime);
    return (
      aptDate.getMonth() === now.getMonth() &&
      aptDate.getFullYear() === now.getFullYear()
    );
  }).length;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Calendar Section */}
        <div className="lg:col-span-3 space-y-6">
          {/* Header with Button */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                {t("calendarTitle", { fallback: "Calendario" })}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {t("calendarSubtitle", { fallback: "Todas tus citas" })}
              </p>
            </div>
            <a
              href={`/${locale}/search`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
            >
              + {t("newAppointmentButton", { fallback: "Nueva Cita" })}
            </a>
          </div>

          <PatientCalendarClient initialAppointments={initialAppointments} />
        </div>

        {/* Sidebar - Resumen de Citas */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              {t("appointmentsSummary")}
            </h2>

            {/* Statistics Cards */}
            <div className="space-y-2">
              {/* This Month */}
              <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-sm text-gray-600">
                  {t("thisMonthLabel")}
                </span>
                <span className="font-medium text-lg">{thisMonthCount}</span>
              </div>

              {/* Upcoming */}
              <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-sm text-gray-600">
                  {t("upcomingLabel")}
                </span>
                <span className="font-medium text-lg">{upcomingCount}</span>
              </div>

              {/* Completed */}
              <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-sm text-gray-600">
                  {t("completedLabelSummary")}
                </span>
                <span className="font-medium text-lg">{completedCount}</span>
              </div>

              {/* Canceled */}
              {canceledCount > 0 && (
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-sm text-gray-600">
                    {t("canceledLabelSummary")}
                  </span>
                  <span className="font-medium text-lg">{canceledCount}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
