// Layout for patient dashboard routes.
// Avoid forcing dynamic here; pages remain dynamic due to auth checks & server actions.
import { PatientLayout } from "@/components/ui/navigation";
import { requirePatient } from "@/lib/auth-guards";
import { setRequestLocale } from "next-intl/server";

export default async function PatientDashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  await requirePatient();
  return <PatientLayout>{children}</PatientLayout>;
}
