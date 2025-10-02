import { Skeleton } from "@/components/ui/feedback";

export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Skeleton className="w-8 h-8 rounded" />
              <div>
                <Skeleton className="h-6 w-56" />
                <Skeleton className="h-4 w-64 mt-2" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Main */}
          <div className="space-y-6">
            {/* Profile Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-start gap-6">
              <div className="flex-none">
                <Skeleton className="w-24 h-24 rounded-full" />
              </div>
              <div className="flex-1">
                <Skeleton className="h-6 w-64 mb-3" />
                <Skeleton className="h-4 w-48 mb-4" />
                <div className="flex items-center gap-3">
                  <Skeleton className="h-9 w-36" />
                  <Skeleton className="h-9 w-28" />
                </div>
              </div>
            </div>

            {/* Basic Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center mb-4">
                <Skeleton className="h-5 w-40" />
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full rounded-lg" />
                ))}
              </div>
            </div>

            {/* Actions */}
          </div>
        </div>
      </div>
    </div>
  );
}
