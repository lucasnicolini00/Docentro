"use client";

import Link from "next/link";
import { Navbar } from "@/components/ui/navigation";
import { Home, Search, ArrowLeft, Phone, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocalePath } from "@/hooks";

export default function NotFoundLocale() {
  const t = useTranslations("common");
  const localePath = useLocalePath();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-16">
        <div className="max-w-lg w-full text-center">
          <div className="mb-8">
            <div className="relative inline-block">
              <div className="text-8xl font-bold text-blue-200 select-none">
                404
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-4xl animate-bounce">🩺</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {t("notFoundTitle")}
              </h1>
              <p className="text-lg text-gray-600">
                {t("notFoundDescription")}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {t("notFoundActionsTitle")}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  href={localePath("/")}
                  className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
                >
                  <div className="h-10 w-10 bg-blue-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Home className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">
                      {t("errorGoHomeTitle")}
                    </p>
                    <p className="text-sm text-gray-600">
                      {t("errorGoHomeSubtitle")}
                    </p>
                  </div>
                </Link>

                <Link
                  href={localePath("/search")}
                  className="flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group"
                >
                  <div className="h-10 w-10 bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Search className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">
                      {t("notFoundSearchTitle")}
                    </p>
                    <p className="text-sm text-gray-600">
                      {t("notFoundSearchSubtitle")}
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => window.history.back()}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t("notFoundBackAction")}</span>
              </button>

              <Link
                href={localePath("/")}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>{t("errorHomeAction")}</span>
              </Link>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-4">
              {t("helpNeedHelp")}
            </h3>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-600">
              <a
                href="mailto:soporte@docentro.com"
                className="flex items-center space-x-2 hover:text-blue-600 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>soporte@docentro.com</span>
              </a>

              <a
                href="tel:+56123456789"
                className="flex items-center space-x-2 hover:text-blue-600 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>+56 123 456 789</span>
              </a>
            </div>
          </div>

          <div className="mt-8 text-sm text-gray-500">
            <p>© 2025 Docentro. {t("footerRightsReserved")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
