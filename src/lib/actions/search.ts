"use server";

import prisma from "@/lib/prisma";
import type { ActionResult } from "./utils";

/**
 * Server action for getting all available specialities for autocomplete
 */
export async function getAllSpecialities(): Promise<ActionResult> {
  try {
    const specialities = await prisma.speciality.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
      },
    });

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
    const cities = await prisma.clinic.findMany({
      where: {
        city: {
          not: null,
        },
      },
      select: {
        city: true,
      },
      distinct: ["city"],
      orderBy: {
        city: "asc",
      },
    });

    // Filter out null values and map to simple string array
    const cityNames = cities
      .filter((clinic) => clinic.city)
      .map((clinic) => clinic.city as string);

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
    const specialities = await prisma.speciality.findMany({
      take: 4,
      orderBy: { name: "asc" },
    });

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
    const doctors = await prisma.doctor.findMany({
      include: {
        specialities: {
          include: {
            speciality: true,
          },
        },
        opinions: true,
        clinics: {
          include: {
            clinic: true,
          },
        },
        pricings: {
          include: {
            clinic: true,
          },
          where: {
            isActive: true,
          },
        },
      },
      take: 3,
    });

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
 * Server action for searching doctors
 */
export async function searchDoctors(
  specialty?: string,
  location?: string
): Promise<ActionResult> {
  try {
    const doctors = await prisma.doctor.findMany({
      where: {
        ...(specialty && {
          specialities: {
            some: {
              speciality: {
                name: {
                  contains: specialty,
                  mode: "insensitive",
                },
              },
            },
          },
        }),
        ...(location && {
          clinics: {
            some: {
              clinic: {
                OR: [
                  {
                    name: {
                      contains: location,
                      mode: "insensitive",
                    },
                  },
                  {
                    address: {
                      contains: location,
                      mode: "insensitive",
                    },
                  },
                ],
              },
            },
          },
        }),
      },
      include: {
        specialities: {
          include: {
            speciality: true,
          },
        },
        opinions: {
          select: {
            id: true,
            rating: true,
            title: true,
            description: true,
          },
        },
        clinics: {
          include: {
            clinic: true,
          },
        },
        pricings: {
          include: {
            clinic: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          where: {
            isActive: true,
          },
        },
        experiences: {
          select: {
            id: true,
            title: true,
            institution: true,
            startDate: true,
            endDate: true,
          },
        },
      },
    });

    // Transform Decimal to number for client compatibility using JSON serialization
    const serializedDoctors = JSON.parse(
      JSON.stringify(doctors, (key, value) =>
        typeof value === "object" &&
        value !== null &&
        value.constructor?.name === "Decimal"
          ? Number(value)
          : value
      )
    );

    return {
      success: true,
      data: serializedDoctors,
    };
  } catch (error) {
    console.error("Error searching doctors:", error);
    return { success: false, error: "Error al buscar doctores" };
  }
}

/**
 * Server action for getting all doctors
 */
export async function getAllDoctors(): Promise<ActionResult> {
  try {
    const doctors = await prisma.doctor.findMany({
      include: {
        specialities: {
          include: {
            speciality: true,
          },
        },
        opinions: {
          select: {
            id: true,
            rating: true,
            title: true,
            description: true,
          },
        },
        clinics: {
          include: {
            clinic: true,
          },
        },
        pricings: {
          include: {
            clinic: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          where: {
            isActive: true,
          },
        },
        experiences: {
          select: {
            id: true,
            title: true,
            institution: true,
            startDate: true,
            endDate: true,
          },
        },
      },
    });

    // Transform Decimal to number for client compatibility using JSON serialization
    const serializedDoctors = JSON.parse(
      JSON.stringify(doctors, (key, value) =>
        typeof value === "object" &&
        value !== null &&
        value.constructor?.name === "Decimal"
          ? Number(value)
          : value
      )
    );

    return {
      success: true,
      data: serializedDoctors,
    };
  } catch (error) {
    console.error("Error fetching all doctors:", error);
    return { success: false, error: "Error al obtener todos los doctores" };
  }
}
