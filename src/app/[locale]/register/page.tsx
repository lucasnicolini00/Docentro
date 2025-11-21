import RegisterPageClient from "./RegisterPageClient";

interface PageProps {
  params: Promise<{ locale: string }>;
}

// Removed force-dynamic; registration uses client form + server action redirect.

export default async function RegisterPage({ params }: PageProps) {
  const { locale } = await params;
  return <RegisterPageClient locale={locale || "es"} />;
}
