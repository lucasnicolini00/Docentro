// Layout for patient dashboard routes.
// Avoid forcing dynamic here; pages remain dynamic due to auth checks & server actions.
import { PatientLayout } from "@/components/ui/navigation";
import { requirePatient } from "@/lib/auth-guards";

export default async function PatientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requirePatient();
  return <PatientLayout>{children}</PatientLayout>;
}
