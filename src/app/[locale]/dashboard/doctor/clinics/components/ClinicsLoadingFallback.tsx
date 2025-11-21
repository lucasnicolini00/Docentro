import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ClinicsLoadingFallback() {
  const t = useTranslations("dashboard_doctor");
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center space-y-4">
        {/* Spinner */}
        <div className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>

        {/* Loading text */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-gray-900">
            {t("clinicsLoadingTitle")}
          </h3>
          <p className="text-sm text-gray-600">{t("clinicsLoadingSubtitle")}</p>
        </div>

        {/* Loading skeleton */}
        <div className="mt-8 space-y-4 max-w-2xl mx-auto">
          <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
          <div className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
