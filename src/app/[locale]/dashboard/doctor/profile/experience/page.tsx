import { requireDoctor } from "@/lib/auth-guards";
import ExperienceEditor from "./ExperienceEditor";
import {
  getDoctorProfile,
  saveDoctorProfileExperience,
  getAllDoctorImages,
} from "@/lib/actions";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";

export const dynamic = "force-dynamic";

export default async function DoctorExperiencePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  await requireDoctor();

  const [profile, images] = await Promise.all([
    getDoctorProfile(),
    getAllDoctorImages(),
  ]);

  const experienceDescription =
    profile.success && profile.data
      ? (profile.data.experiences || []).find(
          (e: { title: string; description?: string | null }) =>
            e.title === "Perfil profesional"
        )?.description || ""
      : "";

  const existingImages = images.success && images.data ? images.data : [];

  const t = await getTranslations("dashboard_doctor");

  return (
    <>
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          {t("professionalExperienceTitle")}
        </h1>
        <p className="text-sm text-gray-600 mt-1">{t("experienceIntro")}</p>
      </div>

      <ExperienceEditor
        initialValue={experienceDescription}
        saveAction={saveDoctorProfileExperience}
        existingImages={existingImages}
      />
    </>
  );
}
