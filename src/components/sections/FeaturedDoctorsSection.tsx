import { getFeaturedDoctors } from "@/lib/actions/search";
import { getImageUrl } from "@/lib/actions/images-uploader";
import type {
  Doctor,
  DoctorSpeciality,
  Speciality,
  Opinion,
  DoctorClinic,
  Clinic,
  Pricing,
} from "@prisma/client";
import Link from "next/link";
import { getT } from "@/lib/getT";

type DoctorWithRelations = Doctor & {
  specialities: (DoctorSpeciality & {
    speciality: Speciality;
  })[];
  opinions: Opinion[];
  clinics: (DoctorClinic & {
    clinic: Clinic;
  })[];
  pricings: (Pricing & {
    clinic: Clinic;
  })[];
  profileImage?: {
    id: string;
    url: string;
  } | null;
};
export default async function FeaturedDoctorsSection({
  locale,
}: {
  locale: string;
}) {
  // Fetch real data from database using Server Action
  const result = await getFeaturedDoctors();
  const doctors: DoctorWithRelations[] = result.success
    ? result.data || []
    : [];

  // Get signed URLs for profile images
  const doctorsWithSignedUrls = await Promise.all(
    doctors.map(async (doctor) => {
      let profileImageUrl = null;
      if (doctor.profileImage?.id) {
        const imageResult = await getImageUrl(doctor.profileImage.id);
        if (imageResult.success) {
          profileImageUrl = imageResult.data;
        }
      }
      return {
        ...doctor,
        profileImageUrl,
      };
    })
  );

  // Get translations using request locale instead of hardcoded Spanish
  const t = await getT("featuredDoctors", locale);

  return (
    <section
      id="profesionales"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("sectionTitle")}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("sectionDescription")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctorsWithSignedUrls.map((doctor) => {
            const primarySpeciality =
              doctor.specialities[0]?.speciality?.name ||
              t("defaultSpeciality");

            return (
              <div
                key={doctor.id}
                className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                {/* Circular Profile Picture */}
                <div className="flex-shrink-0">
                  {doctor.profileImageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={doctor.profileImageUrl}
                      alt={`${doctor.name} ${doctor.surname}`}
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
                    {doctor.name} {doctor.surname}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {primarySpeciality}
                  </p>
                  <Link
                    href={`/${locale}/doctor/${doctor.id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                  >
                    <span>{t("viewProfile")}</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
