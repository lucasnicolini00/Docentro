import { Skeleton } from "@/components/ui/feedback";

export default function AnalyticsLoading() {
  return (
    <div className="p-6">
      <div className="animate-pulse space-y-6">
        {/* Header Section */}
        <div className="mb-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center space-x-3">
                <Skeleton className="w-10 h-10 rounded-lg" />
                <div>
                  <Skeleton className="h-8 w-48 mb-2" />
                  <Skeleton className="h-4 w-64" />
                </div>
              </div>
              <div className="mt-4 lg:mt-0">
                <Skeleton className="h-10 w-32 rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
            >
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-8 w-1/2 mb-4" />
              <Skeleton className="h-3 w-1/3" />
            </div>
          ))}
        </div>

       

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
            >
              <Skeleton className="h-6 w-1/3 mb-4" />
              <Skeleton className="h-64 w-full rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
