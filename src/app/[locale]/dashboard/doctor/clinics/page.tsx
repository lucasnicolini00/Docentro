import { requireDoctor } from "@/lib/auth-guards";
import { getDoctorClinics } from "@/lib/actions";
import { getMessages } from "@/app/messages";
import { NextIntlClientProvider } from "next-intl";
import ClinicsManagement from "./components/ClinicsManagement";

export const dynamic = "force-dynamic"; // requires live data & auth

export default async function DoctorClinicsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  await requireDoctor();

  const clinicsResult = await getDoctorClinics();
  const initialClinics =
    clinicsResult.success && clinicsResult.data
      ? clinicsResult.data.clinics
      : [];

  // Fetch messages for client components
  const messages = await getMessages(locale, [
    "dashboard_doctor",
    "locationPicker",
  ]);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="space-y-6">
        <ClinicsManagement initialClinics={initialClinics} />
      </div>
    </NextIntlClientProvider>
  );
}
