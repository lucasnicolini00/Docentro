import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "../messages";
import { AuthProvider } from "@/components/providers";

export const metadata: Metadata = {
  title: "Docentro - Encuentra tu Profesional de Salud Ideal",
  description:
    "Plataforma líder en Bolivia para conectar pacientes con profesionales de la salud. Agenda tu consulta de forma segura y confiable.",
  alternates: {
    languages: {
      en: "/en",
      es: "/es",
    },
  },
};

export function generateStaticParams(): { locale: string }[] {
  return [{ locale: "es" }, { locale: "en" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolved = await params;
  const locale = resolved.locale || "es";
  const messages = await getMessages(locale, [
    "common",
    "navigation",
    "footer",
    "hero", // For HeroSection client component
    "search", // For SearchPageClient
    "doctor_public", // For doctor profile pages
    "modals",
    "login", // Often needed for auth modals
    "register", // Often needed for auth modals
  ]);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <AuthProvider>{children}</AuthProvider>
    </NextIntlClientProvider>
  );
}
