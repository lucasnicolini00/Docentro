import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { AuthProvider } from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563eb",
};

export const metadata: Metadata = {
  title: "Docentro - Encuentra tu Profesional de Salud Ideal",
  description:
    "Plataforma líder en Bolivia para conectar pacientes con profesionales de la salud. Agenda tu consulta de forma segura y confiable.",
  keywords:
    "doctores, médicos, salud, Bolivia, citas médicas, especialistas, consultas",
  authors: [{ name: "Docentro Bolivia S.A." }],
  openGraph: {
    title: "Docentro - Encuentra tu Profesional de Salud Ideal",
    description:
      "Conectamos pacientes con los mejores profesionales de la salud en Bolivia",
    type: "website",
    locale: "es_BO",
  },
  twitter: {
    card: "summary_large_image",
    title: "Docentro - Encuentra tu Profesional de Salud Ideal",
    description:
      "Conectamos pacientes con los mejores profesionales de la salud en Bolivia",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.variable} font-sans antialiased text-gray-900`}>
        <AuthProvider>
          <div className="min-h-screen">{children}</div>
        </AuthProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: "#10b981",
                secondary: "#fff",
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
