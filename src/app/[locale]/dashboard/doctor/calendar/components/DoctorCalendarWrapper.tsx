"use client";

import dynamic from "next/dynamic";

const DoctorCalendar = dynamic(() => import("./DoctorCalendar"), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] w-full flex items-center justify-center bg-white rounded-lg border border-gray-200">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  ),
});

export default function DoctorCalendarWrapper(props: any) {
  return <DoctorCalendar {...props} />;
}
