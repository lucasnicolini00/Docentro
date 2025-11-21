"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Navbar } from "@/components/ui/navigation";
import Link from "next/link";
import { useLocalePath } from "@/hooks";

// Locale-scoped error boundary: has NextIntlClientProvider context via [locale]/layout.tsx
export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("common");
  const localePath = useLocalePath();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-16">
        <div className="max-w-lg w-full text-center space-y-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="h-24 w-24 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-12 h-12 text-red-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              {t("errorSomethingWentWrong")}
            </h1>
            <p className="text-gray-600">{t("errorUnexpected")}</p>
          </div>

          {process.env.NODE_ENV === "development" && (
            <pre className="text-xs text-red-700 bg-red-50 border border-red-200 rounded p-3 overflow-x-auto text-left">
              {error.message}\n{error.digest && `ID: ${error.digest}`}
            </pre>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => reset()}
              className="px-5 py-3 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> {t("errorRetryTitle")}
            </button>
            <Link
              href={localePath("/")}
              className="px-5 py-3 rounded-lg bg-gray-100 text-gray-800 text-sm hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <Home className="w-4 h-4" /> {t("errorHomeAction")}
            </Link>
          </div>
          <p className="text-xs text-gray-400">© 2025 Docentro</p>
        </div>
      </div>
    </div>
  );
}
