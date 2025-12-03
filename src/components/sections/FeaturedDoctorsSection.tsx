import { getFeaturedDoctors } from "@/lib/actions/search";
import { getImageUrl } from "@/lib/actions/images-uploader";
import { getT } from "@/lib/getT";
import type { DoctorWithRelations } from "@/lib/types";
import FeaturedDoctorCard from "./FeaturedDoctorCard";

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

  // Get translations
  const t = await getT("featuredDoctors");

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
              <FeaturedDoctorCard
                key={doctor.id}
                doctor={{
                  id: doctor.id,
                  user: doctor.user,
                  profileImageUrl: doctor.profileImageUrl,
                }}
                primarySpeciality={primarySpeciality}
                viewProfileText={t("viewProfile")}
                locale={locale}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
