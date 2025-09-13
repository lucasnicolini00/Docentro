import { Skeleton } from "@/components/ui/feedback";

export default function CalendarLoading() {
  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-8 w-40 mb-2" />
            <Skeleton className="h-4 w-80" />
          </div>
          <div className="flex space-x-3">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-28" />
          </div>
        </div>
      </div>

      {/* Calendar Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-8 w-8 rounded" />
          </div>
          <div className="flex space-x-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-16 rounded" />
            ))}
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {/* Calendar Header */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="text-center py-2">
              <Skeleton className="h-4 w-8 mx-auto" />
            </div>
          ))}
        </div>

        {/* Calendar Body */}
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 35 }).map((_, i) => (
            <div
              key={i}
              className="min-h-[120px] border border-gray-200 rounded p-2"
            >
              <Skeleton className="h-4 w-6 mb-2" />
              {/* Random appointment skeletons */}
              {Math.random() > 0.6 && (
                <div className="space-y-1">
                  <Skeleton className="h-6 w-full rounded text-xs" />
                  {Math.random() > 0.5 && (
                    <Skeleton className="h-6 w-full rounded text-xs" />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar with Today's Appointments */}
      <div className="fixed right-6 top-20 w-80 bg-white rounded-xl shadow-sm border border-gray-100 p-6 hidden xl:block">
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-3">
              <div className="flex items-center space-x-3 mb-2">
                <Skeleton className="w-6 h-6 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-3 w-20 mb-1" />
              <Skeleton className="h-3 w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
