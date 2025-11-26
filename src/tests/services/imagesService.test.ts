import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mockDeep, mockReset, type DeepMockProxy } from 'vitest-mock-extended'
import type { PrismaClient } from '@prisma/client'
import { imagesService } from '@/lib/services/imagesService'
import prisma from '@/lib/prisma'
import { mockImage } from '../utils/mocks'

vi.mock('@/lib/prisma', () => ({
  default: mockDeep<PrismaClient>(),
}))

const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>

describe('imagesService', () => {
  beforeEach(() => {
    mockReset(prismaMock)
  })

  describe('createImage', () => {
    it('should create an image', async () => {
      const imageData = {
        url: 'https://example.com/image.jpg',
        doctorId: 'doctor-123',
      }

      prismaMock.image.create.mockResolvedValue(mockImage as any)

      const result = await imagesService.createImage(imageData)

      expect(result).toEqual(mockImage)
      expect(prismaMock.image.create).toHaveBeenCalledWith({
        data: imageData,
      })
    })
  })

  describe('getImage', () => {
    it('should get image with relations', async () => {
      const imageWithRelations = {
        ...mockImage,
        profileForDoctor: null,
      }

      prismaMock.image.findUnique.mockResolvedValue(imageWithRelations as any)

      const result = await imagesService.getImage('img-123')

      expect(result).toEqual(imageWithRelations)
      expect(prismaMock.image.findUnique).toHaveBeenCalledWith({
        where: { id: 'img-123' },
        include: { profileForDoctor: true },
      })
    })

    it('should return null if image not found', async () => {
      prismaMock.image.findUnique.mockResolvedValue(null)

      const result = await imagesService.getImage('invalid-id')

      expect(result).toBeNull()
    })
  })

  describe('deleteImage', () => {
    it('should delete an image', async () => {
      prismaMock.image.delete.mockResolvedValue(mockImage as any)

      const result = await imagesService.deleteImage('img-123')

      expect(result).toEqual(mockImage)
      expect(prismaMock.image.delete).toHaveBeenCalledWith({
        where: { id: 'img-123' },
      })
    })
  })

  describe('countDoctorImages', () => {
    it('should count images for a doctor', async () => {
      prismaMock.image.count.mockResolvedValue(5)

      const result = await imagesService.countDoctorImages('doctor-123')

      expect(result).toBe(5)
      expect(prismaMock.image.count).toHaveBeenCalledWith({
        where: { doctorId: 'doctor-123' },
      })
    })

    it('should return 0 if no images', async () => {
      prismaMock.image.count.mockResolvedValue(0)

      const result = await imagesService.countDoctorImages('doctor-123')

      expect(result).toBe(0)
    })
  })

  describe('createDoctorProfileImage', () => {
    it('should create profile image and update doctor', async () => {
      const imageData = {
        url: 'https://example.com/profile.jpg',
      }

      prismaMock.$transaction.mockImplementation(async (callback: any) => {
        return callback({
          image: {
            create: vi.fn().mockResolvedValue({ ...mockImage, id: 'new-img-123' }),
          },
          doctor: {
            update: vi.fn().mockResolvedValue({ id: 'doctor-123', profileImageId: 'new-img-123' }),
          },
        })
      })

      const result = await imagesService.createDoctorProfileImage('doctor-123', imageData)

      expect(result).toEqual({ ...mockImage, id: 'new-img-123' })
      expect(prismaMock.$transaction).toHaveBeenCalled()
    })
  })

  describe('deleteDoctorProfileImage', () => {
    it('should delete profile image and update doctor', async () => {
      prismaMock.$transaction.mockImplementation(async (callback: any) => {
        return callback({
          doctor: {
            update: vi.fn().mockResolvedValue({ id: 'doctor-123', profileImageId: null }),
          },
          image: {
            delete: vi.fn().mockResolvedValue(mockImage),
          },
        })
      })

      await imagesService.deleteDoctorProfileImage('doctor-123', 'img-123')

      expect(prismaMock.$transaction).toHaveBeenCalled()
    })
  })

  describe('getUserWithProfileImages', () => {
    it('should get user with all profile images', async () => {
      const userData = {
        id: 'user-123',
        email: 'test@example.com',
        profileImage: mockImage,
        doctor: {
          id: 'doctor-123',
          profileImage: mockImage,
        },
        patient: null,
      }

      prismaMock.user.findUnique.mockResolvedValue(userData as any)

      const result = await imagesService.getUserWithProfileImages('user-123')

      expect(result).toEqual(userData)
      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: { id: 'user-123' },
        include: {
          profileImage: true,
          doctor: {
            include: {
              profileImage: true,
            },
          },
          patient: true,
        },
      })
    })
  })

  describe('getBatchImages', () => {
    it('should get multiple images by IDs', async () => {
      const images = [
        { id: 'img-1', url: 'url-1' },
        { id: 'img-2', url: 'url-2' },
      ]

      prismaMock.image.findMany.mockResolvedValue(images as any)

      const result = await imagesService.getBatchImages(['img-1', 'img-2'])

      expect(result).toEqual(images)
      expect(prismaMock.image.findMany).toHaveBeenCalledWith({
        where: { id: { in: ['img-1', 'img-2'] } },
        select: { id: true, url: true },
      })
    })

    it('should handle empty array', async () => {
      prismaMock.image.findMany.mockResolvedValue([])

      const result = await imagesService.getBatchImages([])

      expect(result).toEqual([])
    })
  })
})
