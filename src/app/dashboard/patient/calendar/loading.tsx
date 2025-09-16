import { Skeleton } from "@/components/ui/feedback";

export default function CalendarLoading() {
  return (
    <>
      <div className="mb-8">
        <Skeleton className="h-9 w-64 mb-2" />
        <Skeleton className="h-5 w-96" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar Section */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <Skeleton className="h-8 w-32" />
              <div className="flex space-x-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="space-y-4">
              {/* Week Days Header */}
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 7 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-full" />
                ))}
              </div>

              {/* Calendar Days */}
              {Array.from({ length: 5 }).map((_, weekIndex) => (
                <div key={weekIndex} className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 7 }).map((_, dayIndex) => (
                    <div
                      key={dayIndex}
                      className="h-24 p-2 border border-gray-200 rounded"
                    >
                      <Skeleton className="h-5 w-6 mb-2" />
                      {Math.random() > 0.7 && (
                        <Skeleton className="h-4 w-full rounded" />
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Skeleton className="h-6 w-20 mb-4" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full rounded-lg" />
              ))}
            </div>
          </div>

          {/* Appointment Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex justify-between items-center">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-12" />
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Skeleton className="h-6 w-28 mb-4" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
