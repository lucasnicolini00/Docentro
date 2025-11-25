import prisma from "@/lib/prisma";
import { withErrorHandling } from "./errorHandler";

export const searchService = {
  async getAllSpecialities() {
    return withErrorHandling(
      () => prisma.speciality.findMany({
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
          where: { city: { not: null } },
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
      () => prisma.speciality.findMany({
        take: 4,
        orderBy: { name: "asc" },
      }),
      { service: "searchService", method: "getPopularSpecialities" }
    );
  },

  async getFeaturedDoctors() {
    return withErrorHandling(
      () => prisma.doctor.findMany({
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
          specialities: { include: { speciality: true } },
          opinions: {
            select: {
              id: true,
              rating: true,
              title: true,
              description: true,
            },
          },
          clinics: { include: { clinic: true } },
          pricings: {
            include: {
              clinic: { select: { id: true, name: true } },
            },
            where: { isActive: true },
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
      { service: "searchService", method: "searchDoctors", params: { specialty, location, page, pageSize } }
    );
  },

  async getAllDoctors(page: number = 1, pageSize: number = 20) {
    return withErrorHandling(
      async () => {
        const skip = (page - 1) * pageSize;

        const include = {
          specialities: { include: { speciality: true } },
          opinions: {
            select: {
              id: true,
              rating: true,
              title: true,
              description: true,
            },
          },
          clinics: { include: { clinic: true } },
          pricings: {
            include: {
              clinic: { select: { id: true, name: true } },
            },
            where: { isActive: true },
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
        };

        const [doctors, total] = await Promise.all([
          prisma.doctor.findMany({
            include,
            skip,
            take: pageSize,
          }),
          prisma.doctor.count(),
        ]);

        return {
          doctors,
          total,
          page,
          pageSize,
          totalPages: Math.ceil(total / pageSize),
        };
      },
      { service: "searchService", method: "getAllDoctors", params: { page, pageSize } }
    );
  },
};
