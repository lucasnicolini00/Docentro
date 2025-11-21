// Removed force-dynamic to allow static optimization; page only renders a client form.

interface PageProps {
  params: Promise<{ locale: string }>;
}

import LoginFormClient from "./LoginFormClient";

export default async function LocaleLoginPage({ params }: PageProps) {
  const { locale } = await params;
  return <LoginFormClient locale={locale} />;
}
