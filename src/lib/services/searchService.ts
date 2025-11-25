import prisma from "@/lib/prisma";

export const searchService = {
  async getAllSpecialities() {
    return prisma.speciality.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
      },
    });
  },

  async getAllCities() {
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
    return cities
      .filter((clinic) => clinic.city)
      .map((clinic) => clinic.city as string);
  },

  async getPopularSpecialities() {
    return prisma.speciality.findMany({
      take: 4,
      orderBy: { name: "asc" },
    });
  },

  async getFeaturedDoctors() {
    return prisma.doctor.findMany({
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
        profileImage: {
          select: {
            id: true,
            url: true,
          },
        },
      },
      take: 3,
    });
  },

  async searchDoctors(specialty?: string, location?: string) {
    return prisma.doctor.findMany({
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
  },

  async getAllDoctors() {
    return prisma.doctor.findMany({
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
  },
};
