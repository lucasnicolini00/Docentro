// Server component shell for locale-scoped Search page
import {
  getAllDoctors,
  searchDoctors,
  getAllSpecialities,
  getAllCities,
} from "@/lib/actions/search";
import { getMessages } from "@/app/messages";
import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import SearchPageClient from "./SearchPageClient";

// This page queries the database; use ISR to cache results for 60 seconds
export const revalidate = 60;

export default async function Search({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  try {
    const params = await searchParams;
    const locale = await getLocale();

    const specialtyParam = Array.isArray(params?.specialty)
      ? params?.specialty[0]
      : (params?.specialty as string) || "";
    const locationParam = Array.isArray(params?.location)
      ? params?.location[0]
      : (params?.location as string) || "";

    const [doctorsRes, specialtiesRes, citiesRes, messages] = await Promise.all(
      [
        specialtyParam || locationParam
          ? searchDoctors(specialtyParam, locationParam)
          : getAllDoctors(),
        getAllSpecialities(),
        getAllCities(),
        getMessages(locale, [
          "common",
          "navigation",
          "search",
          "filtersModal",
          "map",
          "mapModal",
        ]),
      ]
    );

    // Extract doctors from the nested data structure
    const doctors =
      doctorsRes.success && doctorsRes.data
        ? (doctorsRes.data as any).doctors || []
        : [];
    const specialties = specialtiesRes.success
      ? (specialtiesRes.data as Array<{ id: string; name: string }>).map(
          (s) => s.name
        )
      : [];
    const cities = citiesRes.success ? (citiesRes.data as string[]) : [];

    return (
      <NextIntlClientProvider locale={locale} messages={messages}>
        <SearchPageClient
          doctors={doctors}
          initialSpecialty={specialtyParam}
          initialLocation={locationParam}
          specialties={specialties}
          cities={cities}
        />
      </NextIntlClientProvider>
    );
  } catch (error) {
    console.error("Error in Search page:", error);
    throw error;
  }
}
