import { Skeleton } from "@/components/ui/feedback";

export default function CalendarLoading() {
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-8 w-40 mb-2" />
            <Skeleton className="h-4 w-80" />
          </div>
          <div className="flex space-x-3">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </div>

      {/* Calendar Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-8 w-8 rounded" />
          </div>
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="grid grid-cols-7 gap-2 mb-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="text-center py-2">
              <Skeleton className="h-4 w-10 mx-auto" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 35 }).map((_, i) => (
            <div
              key={i}
              className="min-h-[100px] border border-gray-200 rounded p-2"
            >
              <Skeleton className="h-4 w-6 mb-2" />
              {/* Appointment placeholders */}
              {i % 5 === 0 && (
                <div className="space-y-1">
                  <Skeleton className="h-6 w-full rounded" />
                  {i % 10 === 0 && <Skeleton className="h-6 w-full rounded" />}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
