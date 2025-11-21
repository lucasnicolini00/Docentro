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
    "dashboard_doctor",
    "dashboard_patient",
    "disclaimer",
    "featuredDoctors",
    "filtersModal",
    "footer",
    "hero",
    "howItWorks",
    "locationPicker",
    "login",
    "register",
    "map",
    "mapModal",
    "search",
    "specialties",
    "testimonials",
    "forms",
    "book",
    "doctor_public",
    "feedback",
  ]);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <AuthProvider>{children}</AuthProvider>
    </NextIntlClientProvider>
  );
}
