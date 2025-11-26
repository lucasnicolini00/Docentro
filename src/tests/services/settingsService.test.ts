import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mockDeep, mockReset, type DeepMockProxy } from 'vitest-mock-extended'
import type { PrismaClient } from '@prisma/client'
import { settingsService } from '@/lib/services/settingsService'
import prisma from '@/lib/prisma'
import { mockDoctor } from '../utils/mocks'

vi.mock('@/lib/prisma', () => ({
  default: mockDeep<PrismaClient>(),
}))

const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>

describe('settingsService', () => {
  beforeEach(() => {
    mockReset(prismaMock)
  })

  describe('updateDoctorSettings', () => {
    it('should update doctor settings', async () => {
      const settings = {
        emailNotifications: true,
        pushNotifications: false,
        publicAvailability: true,
        onlineConsultations: true,
        autoBooking: false,
        reminders: true,
        consultationPrice: 50000,
      }

      const updatedDoctor = {
        ...mockDoctor,
        emailNotifications: true,
        pushNotifications: false,
        isPublic: true,
        allowOnlineConsultations: true,
        autoBookingEnabled: false,
        remindersEnabled: true,
        consultationPrice: 50000,
      }

      prismaMock.doctor.update.mockResolvedValue(updatedDoctor as any)

      const result = await settingsService.updateDoctorSettings('doctor-123', settings)

      expect(result).toEqual(updatedDoctor)
      expect(prismaMock.doctor.update).toHaveBeenCalledWith({
        where: { id: 'doctor-123' },
        data: {
          emailNotifications: true,
          pushNotifications: false,
          isPublic: true,
          allowOnlineConsultations: true,
          autoBookingEnabled: false,
          remindersEnabled: true,
          consultationPrice: 50000,
        },
      })
    })

    it('should handle partial settings update', async () => {
      const settings = {
        emailNotifications: false,
      }

      prismaMock.doctor.update.mockResolvedValue(mockDoctor as any)

      await settingsService.updateDoctorSettings('doctor-123', settings)

      expect(prismaMock.doctor.update).toHaveBeenCalledWith({
        where: { id: 'doctor-123' },
        data: expect.objectContaining({
          emailNotifications: false,
        }),
      })
    })
  })

  describe('exportDoctorData', () => {
    it('should export all doctor data with relations', async () => {
      const doctorData = {
        ...mockDoctor,
        user: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          phone: '+1234567890',
          createdAt: new Date(),
        },
        specialities: [],
        experiences: [],
        clinics: [],
        schedules: [],
        appointments: [],
        pricings: [],
      }

      prismaMock.doctor.findUnique.mockResolvedValue(doctorData as any)

      const result = await settingsService.exportDoctorData('doctor-123')

      expect(result).toEqual(doctorData)
      expect(prismaMock.doctor.findUnique).toHaveBeenCalledWith({
        where: { id: 'doctor-123' },
        include: expect.objectContaining({
          user: expect.any(Object),
          specialities: expect.any(Object),
          experiences: true,
          clinics: expect.any(Object),
          schedules: expect.any(Object),
          appointments: expect.any(Object),
          pricings: true,
        }),
      })
    })

    it('should return null if doctor not found', async () => {
      prismaMock.doctor.findUnique.mockResolvedValue(null)

      const result = await settingsService.exportDoctorData('invalid-id')

      expect(result).toBeNull()
    })
  })
})
