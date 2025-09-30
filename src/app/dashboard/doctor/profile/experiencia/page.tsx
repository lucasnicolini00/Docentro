import {
  getDoctorProfile,
  saveDoctorProfileExperience,
} from "@/lib/actions/doctors";
export const dynamic = "force-dynamic";
import ExperienceEditor from "./ExperienceEditor";

export default async function ExperienciaPage() {
  const profileResult = await getDoctorProfile();

  const description =
    profileResult.success &&
    profileResult.data &&
    profileResult.data.experiences
      ? // find reserved 'Perfil profesional'
        profileResult.data.experiences.find(
          (e: any) => e.title === "Perfil profesional"
        )?.description || ""
      : "";

  return (
    <div className="p-6">
      <ExperienceEditor
        initialValue={description}
        saveAction={saveDoctorProfileExperience}
      />
    </div>
  );
}
