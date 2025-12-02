import prisma from "@/lib/prisma";
import { withErrorHandling } from "./errorHandler";
import type { RawDoctorData, PaginatedDoctorResults } from "@/lib/types/search";

/**
 * Shared include configuration for doctor queries
 * IMPORTANT: If you modify these fields, update the types in src/lib/types/search.ts
 */
const DOCTOR_SEARCH_INCLUDE = {
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
          address: true,
          latitude: true,
          longitude: true,
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
      title: true,
      clinic: { select: { id: true, name: true } },
    },
    where: { isActive: true },
    take: 3, // Limit pricing options for search results
  },
  user: {
    select: {
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
    },
  },
  profileImage: {
    select: {
      id: true,
      url: true,
    },
  },
} as const;

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

  async getFeaturedDoctors(): Promise<RawDoctorData[]> {
    return withErrorHandling(
      () =>
        prisma.doctor.findMany({
          where: { deletedAt: null },
          include: DOCTOR_SEARCH_INCLUDE,
          take: 3,
        }) as Promise<RawDoctorData[]>,
      { service: "searchService", method: "getFeaturedDoctors" }
    );
  },

  async searchDoctors(
    specialty?: string,
    location?: string,
    page: number = 1,
    pageSize: number = 20
  ): Promise<
    Omit<PaginatedDoctorResults, "doctors"> & { doctors: RawDoctorData[] }
  > {
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

        const [doctors, total] = await Promise.all([
          prisma.doctor.findMany({
            where,
            include: DOCTOR_SEARCH_INCLUDE,
            skip,
            take: pageSize,
          }) as Promise<RawDoctorData[]>,
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

  async getAllDoctors(
    page: number = 1,
    pageSize: number = 20
  ): Promise<
    Omit<PaginatedDoctorResults, "doctors"> & { doctors: RawDoctorData[] }
  > {
    return withErrorHandling(
      async () => {
        const skip = (page - 1) * pageSize;

        const [doctors, total] = await Promise.all([
          prisma.doctor.findMany({
            where: { deletedAt: null },
            include: DOCTOR_SEARCH_INCLUDE,
            skip,
            take: pageSize,
          }) as Promise<RawDoctorData[]>,
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
