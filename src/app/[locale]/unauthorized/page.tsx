import { redirect } from "next/navigation";

export default async function UnauthorizedPageLocale({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale || "es"}`);
}
