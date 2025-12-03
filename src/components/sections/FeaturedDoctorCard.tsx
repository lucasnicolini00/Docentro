"use client";

import Link from "next/link";

interface FeaturedDoctorCardProps {
  doctor: {
    id: string;
    user: {
      firstName: string;
      lastName: string;
    };
    profileImageUrl: string | null;
  };
  primarySpeciality: string;
  viewProfileText: string;
  locale: string;
}

export default function FeaturedDoctorCard({
  doctor,
  primarySpeciality,
  viewProfileText,
  locale,
}: FeaturedDoctorCardProps) {
  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      {/* Circular Profile Picture */}
      <div className="flex-shrink-0">
        {doctor.profileImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={doctor.profileImageUrl}
            alt={`${doctor.user.firstName} ${doctor.user.lastName}`}
            className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200">
            <span className="text-2xl">👨‍⚕️</span>
          </div>
        )}
      </div>

      {/* Doctor Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {doctor.user.firstName} {doctor.user.lastName}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{primarySpeciality}</p>
        <Link
          href={`/${locale}/doctor/${doctor.id}`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
        >
          <span>{viewProfileText}</span>
        </Link>
      </div>
    </div>
  );
}
