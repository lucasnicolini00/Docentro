// Server component shell for locale-scoped Search page
import {
  getAllDoctors,
  searchDoctors,
  getAllSpecialities,
  getAllCities,
} from "@/lib/actions/search";
import SearchPageClient from "./SearchPageClient";

// This page queries the database; render it dynamically to avoid SSG/prerender DB access
export const dynamic = "force-dynamic";

export default async function Search({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const specialtyParam = Array.isArray(params?.specialty)
    ? params?.specialty[0]
    : (params?.specialty as string) || "";
  const locationParam = Array.isArray(params?.location)
    ? params?.location[0]
    : (params?.location as string) || "";

  const [doctorsRes, specialtiesRes, citiesRes] = await Promise.all([
    specialtyParam || locationParam
      ? searchDoctors(specialtyParam, locationParam)
      : getAllDoctors(),
    getAllSpecialities(),
    getAllCities(),
  ]);

  const doctors = doctorsRes.success ? (doctorsRes.data as any[]) : [];
  const specialties = specialtiesRes.success
    ? (specialtiesRes.data as Array<{ id: string; name: string }>).map(
        (s) => s.name
      )
    : [];
  const cities = citiesRes.success ? (citiesRes.data as string[]) : [];

  return (
    <SearchPageClient
      doctors={doctors}
      initialSpecialty={specialtyParam}
      initialLocation={locationParam}
      specialties={specialties}
      cities={cities}
    />
  );
}
