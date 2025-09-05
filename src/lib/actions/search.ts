"use server";

import prisma from "@/lib/prisma";
import type { ActionResult } from "./utils";

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
    });

    return {
      success: true,
      data: doctors,
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
    });

    return {
      success: true,
      data: doctors,
    };
  } catch (error) {
    console.error("Error fetching all doctors:", error);
    return { success: false, error: "Error al obtener todos los doctores" };
  }
}
