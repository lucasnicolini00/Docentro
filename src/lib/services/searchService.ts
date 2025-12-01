import prisma from "@/lib/prisma";
import { withErrorHandling } from "./errorHandler";

export const searchService = {
  async getAllSpecialities() {
    return withErrorHandling(
      () =>
        prisma.speciality.findMany({
          where: { deletedAt: null },
          orderBy: { name: "asc" },
          select: { id: true, name: true },
        }),
      { service: "searchService", method: "getAllSpecialities" }
    );
  },

  async getAllCities() {
    return withErrorHandling(
      async () => {
        const cities = await prisma.clinic.findMany({
          where: { city: { not: null }, deletedAt: null },
          select: { city: true },
          distinct: ["city"],
          orderBy: { city: "asc" },
        });
        return cities
          .filter((clinic) => clinic.city)
          .map((clinic) => clinic.city as string);
      },
      { service: "searchService", method: "getAllCities" }
    );
  },

  async getPopularSpecialities() {
    return withErrorHandling(
      () =>
        prisma.speciality.findMany({
          where: { deletedAt: null },
          take: 4,
          orderBy: { name: "asc" },
        }),
      { service: "searchService", method: "getPopularSpecialities" }
    );
  },

  async getFeaturedDoctors() {
    return withErrorHandling(
      () =>
        prisma.doctor.findMany({
          where: { deletedAt: null },
          include: {
            specialities: { include: { speciality: true } },
            opinions: true,
            clinics: { include: { clinic: true } },
            pricings: {
              include: { clinic: true },
              where: { isActive: true },
            },
            profileImage: { select: { id: true, url: true } },
          },
          take: 3,
        }),
      { service: "searchService", method: "getFeaturedDoctors" }
    );
  },

  async searchDoctors(
    specialty?: string,
    location?: string,
    page: number = 1,
    pageSize: number = 20
  ) {
    return withErrorHandling(
      async () => {
        const skip = (page - 1) * pageSize;

        const where = {
          deletedAt: null,
          ...(specialty && {
            specialities: {
              some: {
                speciality: {
                  name: {
                    contains: specialty,
                    mode: "insensitive" as const,
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
                        mode: "insensitive" as const,
                      },
                    },
                    {
                      address: {
                        contains: location,
                        mode: "insensitive" as const,
                      },
                    },
                  ],
                },
              },
            },
          }),
        };

        const include = {
          specialities: {
            select: {
              speciality: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          opinions: {
            select: {
              id: true,
              rating: true,
            },
            take: 5, // Limit opinions for search results
          },
          clinics: {
            select: {
              clinic: {
                select: {
                  id: true,
                  name: true,
                  city: true,
                  isVirtual: true,
                },
              },
            },
          },
          pricings: {
            select: {
              id: true,
              price: true,
              currency: true,
              clinic: { select: { id: true, name: true } },
            },
            where: { isActive: true },
            take: 3, // Limit pricing options for search results
          },
          user: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
          profileImage: {
            select: {
              id: true,
              url: true,
            },
          },
        };

        const [doctors, total] = await Promise.all([
          prisma.doctor.findMany({
            where,
            include,
            skip,
            take: pageSize,
          }),
          prisma.doctor.count({ where }),
        ]);

        return {
          doctors,
          total,
          page,
          pageSize,
          totalPages: Math.ceil(total / pageSize),
        };
      },
      {
        service: "searchService",
        method: "searchDoctors",
        params: { specialty, location, page, pageSize },
      }
    );
  },

  async getAllDoctors(page: number = 1, pageSize: number = 20) {
    return withErrorHandling(
      async () => {
        const skip = (page - 1) * pageSize;

        const include = {
          specialities: {
            select: {
              speciality: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          opinions: {
            select: {
              id: true,
              rating: true,
            },
            take: 5, // Limit opinions for search results
          },
          clinics: {
            select: {
              clinic: {
                select: {
                  id: true,
                  name: true,
                  city: true,
                  isVirtual: true,
                },
              },
            },
          },
          pricings: {
            select: {
              id: true,
              price: true,
              currency: true,
              clinic: { select: { id: true, name: true } },
            },
            where: { isActive: true },
            take: 3, // Limit pricing options for search results
          },
          user: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
          profileImage: {
            select: {
              id: true,
              url: true,
            },
          },
        };

        const [doctors, total] = await Promise.all([
          prisma.doctor.findMany({
            where: { deletedAt: null },
            include,
            skip,
            take: pageSize,
          }),
          prisma.doctor.count({ where: { deletedAt: null } }),
        ]);

        return {
          doctors,
          total,
          page,
          pageSize,
          totalPages: Math.ceil(total / pageSize),
        };
      },
      {
        service: "searchService",
        method: "getAllDoctors",
        params: { page, pageSize },
      }
    );
  },
};
