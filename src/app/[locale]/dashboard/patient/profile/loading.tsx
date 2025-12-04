import { Skeleton } from "@/components";

export default function ProfileLoading() {
  return (
    <>
      {/* Header */}
      <div className="mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-4">
              <Skeleton className="w-14 h-14 rounded-full bg-white/20" />
              <div>
                <Skeleton className="h-8 w-32 mb-2 bg-white/20" />
                <Skeleton className="h-4 w-64 bg-white/20" />
              </div>
            </div>
            <div className="mt-4 lg:mt-0">
              <Skeleton className="h-10 w-40 rounded-lg bg-white/20" />
              <div className="p-6">
                <div className="h-6 w-48 bg-gray-200 rounded mb-4" />
                <div className="h-4 w-72 bg-gray-200 rounded" />
              </div>
              <Skeleton className="h-4 w-56" />
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full rounded-lg" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Medical Information Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100">
              <Skeleton className="h-6 w-36 mb-2" />
              <Skeleton className="h-4 w-72" />
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-10 w-full rounded-lg" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <Skeleton className="h-12 w-24 rounded-lg" />
            <Skeleton className="h-12 w-36 rounded-xl" />
          </div>
        </div>
      </div>
    </>
  );
}
