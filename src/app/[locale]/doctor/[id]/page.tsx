"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Navbar } from "@/components/ui/navigation";
import { getDoctorPublicProfile } from "@/lib/actions/doctors";
import { Map } from "@/components/ui";
import Link from "next/link";

interface DoctorProfilePageProps {
  params: Promise<{ id: string; locale: string }>;
}

export default function DoctorProfilePage({ params }: DoctorProfilePageProps) {
  const t = useTranslations("doctorProfile");
  const tCommon = useTranslations("common");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [doctor, setDoctor] = useState<any>(null);
  const [locale, setLocale] = useState<string>("es");

  useEffect(() => {
    async function fetchDoctor() {
      setLoading(true);
      setError(null);
      const { id, locale } = await params;
      setLocale(locale || "es");
      const result = await getDoctorPublicProfile(id);
      if (result.success) {
        setDoctor(result.data);
      } else {
        setError(result.error || "Error al cargar el perfil del doctor");
      }
      setLoading(false);
    }
    fetchDoctor();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-900">
              {tCommon("loading")}
            </h2>
          </div>
        </div>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-12">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            {tCommon("errorSomethingWentWrong")}
          </h1>
          <p className="text-gray-600">{error || t("doctorNotFound")}</p>
          <Link
            href={`/${locale}/search`}
            className="inline-block mt-6 text-blue-600 hover:text-blue-700 font-medium"
          >
            ← {t("backToSearch")}
          </Link>
        </div>
      </div>
    );
  }

  const { profile, opinions, clinics, specialities, experiences, pricings } =
    doctor;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white text-3xl font-bold">
                {profile?.firstName?.[0]}
              </div>
            </div>
            <div className="flex-grow">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Dr(a). {profile?.firstName} {profile?.lastName}
              </h1>
              <div className="flex flex-wrap gap-2 mb-4">
                {specialities?.map((s: any) => (
                  <span
                    key={s.id}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {s.speciality.name}
                  </span>
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                {profile?.bio || t("noBio")}
              </p>
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-sm text-gray-600">{t("rating")}</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {profile?.rating?.toFixed(1) || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t("opinions")}</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {opinions?.length || 0}
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
              {experiences && experiences.length > 0 ? (
                experiences.map((exp: any) => (
                  <div
                    key={exp.id}
                    className="border-b border-gray-100 pb-3 last:border-b-0"
                  >
                    <h3 className="font-medium text-gray-900">{exp.title}</h3>
                    <p className="text-sm text-gray-600">{exp.institution}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {exp.startDate
                        ? new Date(exp.startDate).getFullYear()
                        : ""}{" "}
                      -{" "}
                      {exp.endDate
                        ? new Date(exp.endDate).getFullYear()
                        : t("present")}
                    </p>
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
              <Map doctors={[doctor]} />
            </div>
            <div className="space-y-3">
              {clinics && clinics.length > 0 ? (
                clinics.map((dc: any) => (
                  <div
                    key={dc.id}
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
                    <span className="text-sm font-semibold text-blue-600">
                      {t("priceFrom")}{" "}
                      {pricings
                        ?.find((p: any) => p.clinicId === dc.clinic.id)
                        ?.amount?.toLocaleString("es-BO", {
                          style: "currency",
                          currency: "BOB",
                        }) || "-"}
                    </span>
                  </div>
                ))
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
            {opinions && opinions.length > 0 ? (
              opinions.map((op: any) => (
                <div
                  key={op.id}
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
              ))
            ) : (
              <p className="text-gray-600 text-sm">{t("noOpinions")}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
