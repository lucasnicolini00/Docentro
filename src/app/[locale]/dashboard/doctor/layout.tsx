// Layout for doctor dashboard routes.
// We don't force dynamic at layout level; individual pages already require auth and dynamic data.
import { DoctorLayout } from "@/components/ui/navigation";
import { requireDoctor } from "@/lib/auth-guards";

export default async function DoctorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side role enforcement before any client layout hydration.
  await requireDoctor();
  return <DoctorLayout>{children}</DoctorLayout>;
}
