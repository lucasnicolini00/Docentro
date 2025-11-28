// Root layout: global styles, fonts, and app-wide providers that don't depend on locale
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body
        className={`${inter.variable} font-sans antialiased text-gray-900 min-h-screen`}
      >
        {children}
        <Toaster position="bottom-right" />
        <Analytics />
        <SpeedInsights />
        
      </body>
    </html>
  );
}
