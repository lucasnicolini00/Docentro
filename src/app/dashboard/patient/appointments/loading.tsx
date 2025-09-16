import { Skeleton } from "@/components/ui/feedback";

export default function AppointmentsLoading() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>
      </div>

      {/* Upcoming Appointments Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <Skeleton className="h-5 w-48 mb-2" />
                  <Skeleton className="h-4 w-32 mb-1" />
                  <Skeleton className="h-4 w-40" />
                </div>
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
              <div className="flex justify-between items-center">
                <Skeleton className="h-3 w-32" />
                <div className="flex space-x-2">
                  <Skeleton className="h-8 w-20 rounded" />
                  <Skeleton className="h-8 w-16 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Appointments Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-lg p-4 bg-gray-50"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <Skeleton className="h-5 w-48 mb-2" />
                  <Skeleton className="h-4 w-32 mb-1" />
                  <Skeleton className="h-4 w-40" />
                </div>
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
              <Skeleton className="h-3 w-32" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
