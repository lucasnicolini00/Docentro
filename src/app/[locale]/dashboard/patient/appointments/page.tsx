import { requirePatient } from "@/lib/auth-guards";
import { getPatientDashboard } from "@/lib/actions";
import AppointmentList from "./components/AppointmentList";
import { getT } from "@/lib/getT";
import { getLocale, setRequestLocale } from "next-intl/server";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function PatientAppointmentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  await requirePatient();

  const dashboard = await getPatientDashboard();
  const data = dashboard.success && dashboard.data ? dashboard.data : null;

  const t = await getT("dashboard_patient");

  const upcoming = data?.upcomingAppointments ?? [];
  const past = data?.pastAppointments ?? [];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {t("appointmentsTitle", { fallback: "Mis Citas" })}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            {t("appointmentsSubtitle", { fallback: "Gestiona tus citas" })}
          </p>
        </div>
        <Link
          href={`/${locale}/search`}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
        >
          {t("searchDoctorsButton", { fallback: "Buscar Doctores" })}
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <AppointmentList
          appointments={upcoming}
          title={t("upcomingAppointmentsTitle", { fallback: "Próximas Citas" })}
        />
        <AppointmentList
          appointments={past}
          title={t("pastAppointmentsTitle", { fallback: "Historial" })}
          showActions={false}
        />
      </div>
    </div>
  );
}
