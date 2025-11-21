import { Skeleton } from "@/components/ui/feedback";
import { useTranslations } from "next-intl";

export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header card */}
        <div className="mb-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {useTranslations("dashboard_doctor")(
                    "professionalExperienceTitle"
                  )}
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  {useTranslations("dashboard_doctor")("experienceIntro")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Editor skeleton */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="mb-4">
            <Skeleton className="h-6 w-48" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-10 w-full rounded" />
            <Skeleton className="h-10 w-full rounded" />
            <Skeleton className="h-10 w-full rounded" />
            <Skeleton className="h-10 w-full rounded" />
            <Skeleton className="h-48 w-full rounded" />
          </div>

          <div className="flex w-full justify-end mt-6">
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
}
