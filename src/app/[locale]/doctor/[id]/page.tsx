import { getT } from "@/lib/getT";
import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { getDoctorPublicProfile } from "@/lib/actions/doctors";
import { getBatchImageUrls } from "@/lib/actions/images-uploader";
import { Map, ClientMarkdownPreview } from "@/components/ui";
import DoctorGallery from "@/components/features/doctor-profile/DoctorGallery";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getMessages as getMessagesIntl } from "@/app/messages";
import type {
  Image,
  DoctorSpeciality,
  Experience,
  DoctorClinic,
  Pricing,
} from "@/lib/types";

interface DoctorProfilePageProps {
  params: Promise<{ id: string }>;
}

export default async function DoctorProfilePage({
  params,
}: DoctorProfilePageProps) {
  const { id } = await params;
  const locale = await getLocale();
  const t = await getT("doctorProfile");

  const result = await getDoctorPublicProfile(id);

  if (!result.success || !result.data) {
    notFound();
  }

  const doctor = result.data;

  // Get fresh signed URLs for images
  let imageUrls: Record<string, string> = {};
  if (doctor.images && doctor.images.length > 0) {
    const imageIds = doctor.images.map((img: Pick<Image, "id">) => img.id);
    imageUrls = await getBatchImageUrls(imageIds);
  }

  // Get messages for client components
  const messages = await getMessagesIntl(locale, ["modals", "doctorProfile"]);

  // Serialize doctor data to convert Decimal types to numbers for client components
  const serializedDoctor = {
    ...doctor,
    pricings: doctor.pricings?.map((p: Pricing) => ({
      ...p,
      price: p.price ? Number(p.price) : null,
    })),
  };

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          href={`/${locale}/search`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t("backToSearch")}</span>
        </Link>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white text-3xl font-bold">
                {doctor.user?.firstName?.[0]}
              </div>
            </div>
            <div className="flex-grow">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Dr(a). {doctor.user?.firstName} {doctor.user?.lastName}
              </h1>
              <div className="flex flex-wrap gap-2 mb-4">
                {doctor.specialities?.map(
                  (
                    s: DoctorSpeciality & { speciality: { name: string } },
                    index: number
                  ) => (
                    <span
                      key={`specialty-${s.specialityId}-${index}`}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {s.speciality.name}
                    </span>
                  )
                )}
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                {doctor.bio || t("noBio")}
              </p>
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-sm text-gray-600">{t("rating")}</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {doctor.rating?.toFixed(1) || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t("opinions")}</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {doctor.opinions?.length || 0}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    {t("experienceYears")}
                  </p>
                  <p className="text-xl font-semibold text-gray-900">
                    {doctor?.yearsOfExperience || "-"}
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <Link
                  href={`/${locale}/book/${doctor.id}`}
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                >
                  {t("bookAppointment")}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {t("experience")}
            </h2>
            <div className="space-y-4">
              {doctor.experiences && doctor.experiences.length > 0 ? (
                doctor.experiences.map((exp: Experience, index: number) => (
                  <div
                    key={exp.id || `experience-${index}`}
                    className="border-b border-gray-100 pb-4 last:border-b-0 mb-4 last:mb-0"
                  >
                    <h3 className="font-medium text-gray-900">{exp.title}</h3>
                    {exp.institution && (
                      <p className="text-sm text-gray-600">{exp.institution}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1 mb-3">
                      {exp.startDate
                        ? new Date(exp.startDate).getFullYear()
                        : ""}{" "}
                      -{" "}
                      {exp.endDate
                        ? new Date(exp.endDate).getFullYear()
                        : t("present")}
                    </p>
                    {exp.description && (
                      <ClientMarkdownPreview
                        source={exp.description}
                        className="text-sm text-gray-700 prose prose-sm max-w-none"
                      />
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-sm">{t("noExperience")}</p>
              )}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {t("locations")}
            </h2>
            <div className="h-[300px] mb-4">
              <Map doctors={[serializedDoctor]} />
            </div>
            <div className="space-y-3">
              {doctor.clinics && doctor.clinics.length > 0 ? (
                doctor.clinics.map(
                  (
                    dc: DoctorClinic & {
                      clinic: {
                        id: string;
                        name: string;
                        address: string | null;
                      };
                    },
                    index: number
                  ) => (
                    <div
                      key={`clinic-${dc.clinicId}-${index}`}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {dc.clinic.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          {dc.clinic.address}
                        </p>
                      </div>
                      {serializedDoctor.pricings?.find(
                        (p: Pricing & { price: number | null }) =>
                          p.clinicId === dc.clinic.id
                      )?.price && (
                        <span className="text-sm font-semibold text-blue-600">
                          {t("priceFrom")}{" "}
                          {serializedDoctor.pricings
                            ?.find(
                              (p: Pricing & { price: number | null }) =>
                                p.clinicId === dc.clinic.id
                            )
                            ?.price?.toString()}
                        </span>
                      )}
                    </div>
                  )
                )
              ) : (
                <p className="text-gray-600 text-sm">{t("noClinics")}</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {t("opinions")}
          </h2>
          <div className="space-y-4">
            {doctor.opinions && doctor.opinions.length > 0 ? (
              doctor.opinions.map(
                (
                  op: {
                    id?: string;
                    title?: string;
                    rating: number;
                    description: string;
                  },
                  index: number
                ) => (
                  <div
                    key={op.id || `opinion-${index}`}
                    className="border border-gray-100 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-gray-900">
                        {op.title || t("opinionNoTitle")}
                      </h3>
                      <span className="text-sm font-semibold text-yellow-600">
                        ⭐ {op.rating}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{op.description}</p>
                  </div>
                )
              )
            ) : (
              <p className="text-gray-600 text-sm">{t("noOpinions")}</p>
            )}
          </div>
        </div>

        {/* Gallery Section */}
        {doctor.images && doctor.images.length > 0 && (
          <DoctorGallery
            images={doctor.images.map(
              (img: Pick<Image, "id" | "url" | "filename">) => ({
                id: img.id,
                url: imageUrls[img.id] || img.url,
                filename: img.filename,
              })
            )}
            title={t("gallery")}
          />
        )}
      </div>
    </NextIntlClientProvider>
  );
}
