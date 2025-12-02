"use server";

import type { ActionResult } from "./utils";
import { searchService } from "@/lib/services/searchService";
import { convertDoctorDecimals } from "@/lib/utils/serialization";
import type { RawDoctorData, TransformedDoctorData } from "@/lib/types/search";

/**
 * Transform raw doctor data from database to frontend format
 * Flattens user.firstName and user.lastName to name and surname
 */
function transformDoctorData(doctor: RawDoctorData): TransformedDoctorData {
  const converted = convertDoctorDecimals(
    doctor as unknown as Record<string, unknown>
  );
  return {
    ...converted,
    name: doctor.user?.firstName || "",
    surname: doctor.user?.lastName || "",
    email: doctor.user?.email || null,
    phone: doctor.user?.phone || null,
  } as TransformedDoctorData;
}

/**
 * Server action for getting all available specialities for autocomplete
 */
export async function getAllSpecialities(): Promise<ActionResult> {
  try {
    const specialities = await searchService.getAllSpecialities();

    return {
      success: true,
      data: specialities,
    };
  } catch (error) {
    console.error("Error fetching all specialities:", error);
    return {
      success: false,
      error: "Error al obtener especialidades",
    };
  }
}

/**
 * Server action for getting all available cities for autocomplete
 */
export async function getAllCities(): Promise<ActionResult> {
  try {
    const cityNames = await searchService.getAllCities();

    return {
      success: true,
      data: cityNames,
    };
  } catch (error) {
    console.error("Error fetching all cities:", error);
    return {
      success: false,
      error: "Error al obtener ciudades",
    };
  }
}

/**
 * Server action for getting popular specialities
 */
export async function getPopularSpecialities(): Promise<ActionResult> {
  try {
    const specialities = await searchService.getPopularSpecialities();

    return {
      success: true,
      data: specialities,
    };
  } catch (error) {
    console.error("Error fetching popular specialities:", error);
    return {
      success: false,
      error: "Error al obtener especialidades populares",
    };
  }
}

/**
 * Server action for getting featured doctors
 */
export async function getFeaturedDoctors(): Promise<ActionResult> {
  try {
    const doctors = await searchService.getFeaturedDoctors();

    // Convert Decimal fields and flatten user fields for client compatibility
    const serialized: TransformedDoctorData[] = Array.isArray(doctors)
      ? doctors.map((doctor) => transformDoctorData(doctor as RawDoctorData))
      : [];

    return {
      success: true,
      data: serialized,
    };
  } catch (error) {
    console.error("Error fetching featured doctors:", error);
    return { success: false, error: "Error al obtener doctores destacados" };
  }
}

/**
 * Server action for searching doctors with pagination
 */
export async function searchDoctors(
  specialty?: string,
  location?: string,
  page: number = 1,
  pageSize: number = 20
): Promise<ActionResult> {
  try {
    const result = await searchService.searchDoctors(
      specialty,
      location,
      page,
      pageSize
    );

    // Convert Decimal fields and flatten user fields for client compatibility
    const serializedDoctors: TransformedDoctorData[] = result.doctors.map(
      (doctor) => transformDoctorData(doctor as RawDoctorData)
    );

    return {
      success: true,
      data: {
        doctors: serializedDoctors,
        total: result.total,
        page: result.page,
        pageSize: result.pageSize,
        totalPages: result.totalPages,
      },
    };
  } catch (error) {
    console.error("Error searching doctors:", error);
    return { success: false, error: "Error al buscar doctores" };
  }
}

/**
 * Server action for getting all doctors with pagination
 */
export async function getAllDoctors(
  page: number = 1,
  pageSize: number = 20
): Promise<ActionResult> {
  try {
    const result = await searchService.getAllDoctors(page, pageSize);

    // Convert Decimal fields and flatten user fields for client compatibility
    const serializedDoctors: TransformedDoctorData[] = result.doctors.map(
      (doctor) => transformDoctorData(doctor as RawDoctorData)
    );

    return {
      success: true,
      data: {
        doctors: serializedDoctors,
        total: result.total,
        page: result.page,
        pageSize: result.pageSize,
        totalPages: result.totalPages,
      },
    };
  } catch (error) {
    console.error("Error fetching all doctors:", error);
    return { success: false, error: "Error al obtener todos los doctores" };
  }
}
