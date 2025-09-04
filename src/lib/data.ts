import { prisma } from "@/lib/prisma";

export async function getPopularSpecialities() {
  try {
    return await prisma.speciality.findMany({
      take: 4,
      orderBy: { name: "asc" },
    });
  } catch (error) {
    console.warn("Database not available, returning mock data:", error);
    // Return mock data for build/development
    return [
      {
        id: "1",
        name: "Cardiología",
        description: "Especialista en el sistema cardiovascular",
      },
      {
        id: "2",
        name: "Dermatología",
        description: "Especialista en enfermedades de la piel",
      },
      {
        id: "3",
        name: "Pediatría",
        description: "Especialista en medicina infantil",
      },
      {
        id: "4",
        name: "Neurología",
        description: "Especialista en el sistema nervioso",
      },
    ];
  }
}

export async function getFeaturedDoctors() {
  try {
    return await prisma.doctor.findMany({
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
  } catch (error) {
    console.warn("Database not available, returning mock data:", error);
    // Return mock data for build/development
    return [];
  }
}

export async function searchDoctors(speciality?: string, location?: string) {
  try {
    return await prisma.doctor.findMany({
      where: {
        ...(speciality && {
          specialities: {
            some: {
              speciality: {
                name: {
                  contains: speciality,
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
                city: {
                  contains: location,
                  mode: "insensitive",
                },
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
  } catch (error) {
    console.warn("Database not available, returning empty results:", error);
    return [];
  }
}

export async function getAllDoctors() {
  try {
    return await prisma.doctor.findMany({
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
  } catch (error) {
    console.warn("Database not available, returning empty results:", error);
    return [];
  }
}

export async function getDoctorById(id: string) {
  try {
    return await prisma.doctor.findUnique({
      where: { id },
      include: {
        specialities: {
          include: {
            speciality: true,
          },
        },
        experiences: true,
        opinions: {
          include: {
            patient: true,
          },
        },
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
  } catch (error) {
    console.warn("Database not available, returning null:", error);
    return null;
  }
}
