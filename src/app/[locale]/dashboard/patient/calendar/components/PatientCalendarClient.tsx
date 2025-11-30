"use client";

import dynamic from "next/dynamic";

const PatientCalendar = dynamic(() => import("./PatientCalendar"), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] w-full flex items-center justify-center bg-white rounded-lg border border-gray-200">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  ),
});

export default PatientCalendar;
