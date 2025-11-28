import { Skeleton } from "@/components/ui/feedback/Skeleton";

export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
          <Skeleton className="h-8 w-16 mb-2" />
          <Skeleton className="h-4 w-32" />
        </div>
      ))}
    </div>
  );
}

export function ActivitiesSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <Skeleton className="h-6 w-40 mb-6" />
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-start space-x-4">
            <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AppointmentsSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <Skeleton className="h-6 w-48 mb-6" />
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <Skeleton className="h-8 w-20 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function OnboardingSkeleton() {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
      <div className="flex items-start space-x-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-2/3" />
          <div className="space-y-4 mt-4">
             <div className="flex items-center space-x-3">
               <Skeleton className="h-6 w-6 rounded-full" />
               <div className="space-y-2 flex-1">
                 <Skeleton className="h-4 w-1/4" />
                 <Skeleton className="h-3 w-1/2" />
               </div>
             </div>
             <div className="flex items-center space-x-3">
               <Skeleton className="h-6 w-6 rounded-full" />
               <div className="space-y-2 flex-1">
                 <Skeleton className="h-4 w-1/4" />
                 <Skeleton className="h-3 w-1/2" />
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
