import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mockDeep, mockReset, type DeepMockProxy } from 'vitest-mock-extended'
import type { PrismaClient } from '@prisma/client'
import { validateAuth, validatePatient, validateDoctor } from '@/lib/actions/utils'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/prisma'
import { mockSession, mockDoctor, mockPatient } from '../utils/mocks'

vi.mock('next-auth')
vi.mock('@/lib/prisma', () => ({
  default: mockDeep<PrismaClient>(),
}))

const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>

describe('utils - validation functions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockReset(prismaMock)
  })

  describe('validateAuth', () => {
    it('should return session for authenticated user', async () => {
      vi.mocked(getServerSession).mockResolvedValue(mockSession as any)

      const result = await validateAuth()

      expect(result).toEqual(mockSession)
    })

    it('should return null if no session', async () => {
      vi.mocked(getServerSession).mockResolvedValue(null)

      const result = await validateAuth()

      expect(result).toBeNull()
    })

    it('should return null if session has no user', async () => {
      vi.mocked(getServerSession).mockResolvedValue({ user: null } as any)

      const result = await validateAuth()

      expect(result).toBeNull()
    })

    it('should return null if session user has no id', async () => {
      vi.mocked(getServerSession).mockResolvedValue({
        user: { email: 'test@example.com' },
      } as any)

      const result = await validateAuth()

      expect(result).toBeNull()
    })
  })

  describe('validatePatient', () => {
    it('should return patient and session for valid patient', async () => {
      vi.mocked(getServerSession).mockResolvedValue(mockSession as any)
      prismaMock.patient.findUnique.mockResolvedValue(mockPatient as any)

      const result = await validatePatient()

      expect(result).toEqual({
        patient: mockPatient,
        session: mockSession,
      })
      expect(prismaMock.patient.findUnique).toHaveBeenCalledWith({
        where: { userId: 'user-123' },
        include: { user: true },
      })
    })

    it('should return error if not authenticated', async () => {
      vi.mocked(getServerSession).mockResolvedValue(null)

      const result = await validatePatient()

      expect(result).toEqual({ error: 'No autorizado' })
    })

    it('should return error if user is not a patient', async () => {
      vi.mocked(getServerSession).mockResolvedValue(mockSession as any)
      prismaMock.patient.findUnique.mockResolvedValue(null)

      const result = await validatePatient()

      expect(result).toEqual({ error: 'Usuario no es un paciente' })
    })
  })

  describe('validateDoctor', () => {
    it('should return doctor and session for valid doctor', async () => {
      vi.mocked(getServerSession).mockResolvedValue(mockSession as any)
      prismaMock.doctor.findUnique.mockResolvedValue(mockDoctor as any)

      const result = await validateDoctor()

      expect(result).toEqual({
        doctor: mockDoctor,
        session: mockSession,
      })
      expect(prismaMock.doctor.findUnique).toHaveBeenCalledWith({
        where: { userId: 'user-123' },
        include: {
          user: true,
          specialities: true,
          experiences: true,
        },
      })
    })

    it('should return error if not authenticated', async () => {
      vi.mocked(getServerSession).mockResolvedValue(null)

      const result = await validateDoctor()

      expect(result).toEqual({ error: 'No autorizado' })
    })

    it('should return error if user is not a doctor', async () => {
      vi.mocked(getServerSession).mockResolvedValue(mockSession as any)
      prismaMock.doctor.findUnique.mockResolvedValue(null)

      const result = await validateDoctor()

      expect(result).toEqual({ error: 'Usuario no es un doctor' })
    })
  })
})
