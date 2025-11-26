import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mockDeep, mockReset, type DeepMockProxy } from 'vitest-mock-extended'
import type { PrismaClient } from '@prisma/client'
import { searchService } from '@/lib/services/searchService'
import prisma from '@/lib/prisma'
import { mockSpeciality, mockDoctor } from '../utils/mocks'

vi.mock('@/lib/prisma', () => ({
  default: mockDeep<PrismaClient>(),
}))

const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>

describe('searchService', () => {
  beforeEach(() => {
    mockReset(prismaMock)
  })

  describe('getAllSpecialities', () => {
    it('should return all specialities ordered by name', async () => {
      const specialities = [
        { id: '1', name: 'Cardiology' },
        { id: '2', name: 'Dermatology' },
      ]
      
      prismaMock.speciality.findMany.mockResolvedValue(specialities as any)

      const result = await searchService.getAllSpecialities()

      expect(result).toEqual(specialities)
      expect(prismaMock.speciality.findMany).toHaveBeenCalledWith({
        orderBy: { name: 'asc' },
        select: { id: true, name: true },
      })
    })

    it('should handle errors', async () => {
      prismaMock.speciality.findMany.mockRejectedValue(new Error('DB Error'))

      await expect(searchService.getAllSpecialities()).rejects.toThrow('DB Error')
    })
  })

  describe('getAllCities', () => {
    it('should return unique cities from clinics', async () => {
      const clinics = [
        { city: 'New York' },
        { city: 'Los Angeles' },
        { city: 'New York' },
      ]
      
      prismaMock.clinic.findMany.mockResolvedValue(clinics as any)

      const result = await searchService.getAllCities()

      expect(result).toEqual(['New York', 'Los Angeles', 'New York'])
      expect(prismaMock.clinic.findMany).toHaveBeenCalledWith({
        where: { city: { not: null } },
        select: { city: true },
        distinct: ['city'],
        orderBy: { city: 'asc' },
      })
    })

    it('should filter out null cities', async () => {
      const clinics = [
        { city: 'New York' },
        { city: null },
        { city: 'Boston' },
      ]
      
      prismaMock.clinic.findMany.mockResolvedValue(clinics as any)

      const result = await searchService.getAllCities()

      expect(result).toEqual(['New York', 'Boston'])
    })
  })

  describe('getPopularSpecialities', () => {
    it('should return top 4 specialities', async () => {
      const specialities = [
        mockSpeciality,
        { ...mockSpeciality, id: '2', name: 'Dermatology' },
      ]
      
      prismaMock.speciality.findMany.mockResolvedValue(specialities as any)

      const result = await searchService.getPopularSpecialities()

      expect(result).toEqual(specialities)
      expect(prismaMock.speciality.findMany).toHaveBeenCalledWith({
        take: 4,
        orderBy: { name: 'asc' },
      })
    })
  })

  describe('getFeaturedDoctors', () => {
    it('should return featured doctors with relations', async () => {
      const doctors = [mockDoctor]
      
      prismaMock.doctor.findMany.mockResolvedValue(doctors as any)

      const result = await searchService.getFeaturedDoctors()

      expect(result).toEqual(doctors)
      expect(prismaMock.doctor.findMany).toHaveBeenCalledWith({
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
      })
    })
  })

  describe('searchDoctors', () => {
    it('should search doctors without filters', async () => {
      const doctors = [mockDoctor]
      
      prismaMock.doctor.findMany.mockResolvedValue(doctors as any)
      prismaMock.doctor.count.mockResolvedValue(1)

      const result = await searchService.searchDoctors()

      expect(result).toEqual({
        doctors,
        total: 1,
        page: 1,
        pageSize: 20,
        totalPages: 1,
      })
    })

    it('should search doctors by specialty', async () => {
      const doctors = [mockDoctor]
      
      prismaMock.doctor.findMany.mockResolvedValue(doctors as any)
      prismaMock.doctor.count.mockResolvedValue(1)

      await searchService.searchDoctors('Cardiology')

      expect(prismaMock.doctor.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            specialities: {
              some: {
                speciality: {
                  name: {
                    contains: 'Cardiology',
                    mode: 'insensitive',
                  },
                },
              },
            },
          }),
        })
      )
    })

    it('should search doctors by location', async () => {
      const doctors = [mockDoctor]
      
      prismaMock.doctor.findMany.mockResolvedValue(doctors as any)
      prismaMock.doctor.count.mockResolvedValue(1)

      await searchService.searchDoctors(undefined, 'New York')

      expect(prismaMock.doctor.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            clinics: {
              some: {
                clinic: {
                  OR: [
                    {
                      name: {
                        contains: 'New York',
                        mode: 'insensitive',
                      },
                    },
                    {
                      address: {
                        contains: 'New York',
                        mode: 'insensitive',
                      },
                    },
                  ],
                },
              },
            },
          }),
        })
      )
    })

    it('should handle pagination correctly', async () => {
      const doctors = [mockDoctor]
      
      prismaMock.doctor.findMany.mockResolvedValue(doctors as any)
      prismaMock.doctor.count.mockResolvedValue(50)

      const result = await searchService.searchDoctors(undefined, undefined, 2, 10)

      expect(result.page).toBe(2)
      expect(result.pageSize).toBe(10)
      expect(result.totalPages).toBe(5)
      expect(prismaMock.doctor.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: 10,
          take: 10,
        })
      )
    })
  })

  describe('getAllDoctors', () => {
    it('should return all doctors with pagination', async () => {
      const doctors = [mockDoctor]
      
      prismaMock.doctor.findMany.mockResolvedValue(doctors as any)
      prismaMock.doctor.count.mockResolvedValue(1)

      const result = await searchService.getAllDoctors()

      expect(result).toEqual({
        doctors,
        total: 1,
        page: 1,
        pageSize: 20,
        totalPages: 1,
      })
    })

    it('should handle custom page size', async () => {
      const doctors = [mockDoctor]
      
      prismaMock.doctor.findMany.mockResolvedValue(doctors as any)
      prismaMock.doctor.count.mockResolvedValue(100)

      const result = await searchService.getAllDoctors(3, 25)

      expect(result.page).toBe(3)
      expect(result.pageSize).toBe(25)
      expect(result.totalPages).toBe(4)
      expect(prismaMock.doctor.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: 50,
          take: 25,
        })
      )
    })
  })
})
