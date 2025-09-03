import { prisma } from "@/lib/prisma";

export async function getPopularSpecialities() {
  return await prisma.speciality.findMany({
    take: 4,
    orderBy: { name: "asc" },
  });
}

export async function getFeaturedDoctors() {
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
    },
    take: 3,
  });
}

export async function searchDoctors(speciality?: string, location?: string) {
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
}

export async function getAllDoctors() {
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
}

export async function getDoctorById(id: string) {
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
}
