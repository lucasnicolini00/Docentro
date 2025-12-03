// Layout for doctor dashboard routes.
// We don't force dynamic at layout level; individual pages already require auth and dynamic data.
import { DoctorLayout } from "@/components/ui/navigation";
import { requireDoctor } from "@/lib/auth-guards";
import { setRequestLocale } from "next-intl/server";

export default async function DoctorDashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  // Server-side role enforcement before any client layout hydration.
  await requireDoctor();
  return <DoctorLayout>{children}</DoctorLayout>;
}
