import { User } from "lucide-react";
import { useTranslations } from "next-intl";
import { Doctor } from "./types";

interface DoctorInfoProps {
  doctor: Doctor;
}

export function DoctorInfo({ doctor }: DoctorInfoProps) {
  const t = useTranslations("search");

  const primarySpeciality =
    doctor.specialities[0]?.speciality?.name || t("primarySpecialistFallback");

  // Use doctor.profileImage.url directly.
  // Previous implementation incorrectly fetched current user's image.
  const profileImageUrl = doctor.profileImage?.url;

  return (
    <div className="flex items-start gap-4 mb-6">
      <div className="flex-shrink-0">
        {profileImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profileImageUrl}
            alt={`${doctor.name} ${doctor.surname}`}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 shadow-sm"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-xl text-white font-bold shadow-lg">
            <User className="w-8 h-8" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-xl font-bold text-gray-900">
            {doctor.name} {doctor.surname}
          </h3>
        </div>
        <p className="text-gray-600 mb-3 font-medium">{primarySpeciality}</p>
      </div>
    </div>
  );
}
