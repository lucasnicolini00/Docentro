"use server";

import type { ActionResult } from "./utils";
import { searchService } from "@/lib/services/searchService";
import { convertDoctorDecimals } from "@/lib/utils/serialization";


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

    return {
      success: true,
      data: doctors,
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

    // Convert Decimal fields to numbers for client compatibility
    const serializedDoctors = result.doctors.map(convertDoctorDecimals);

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

    // Convert Decimal fields to numbers for client compatibility
    const serializedDoctors = result.doctors.map(convertDoctorDecimals);

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
