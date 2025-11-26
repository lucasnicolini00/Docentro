import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  updateDoctorSettings,
  getDoctorSettings,
  updateDoctorPassword,
  exportDoctorData,
} from '@/lib/actions/settings'
import { validateDoctor } from '@/lib/actions/utils'
import { settingsService } from '@/lib/services/settingsService'
import { mockDoctor, mockSession } from '../utils/mocks'

vi.mock('@/lib/actions/utils')
vi.mock('@/lib/services/settingsService')
vi.mock('next/cache')

describe('settings actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('updateDoctorSettings', () => {
    it('should update doctor settings successfully', async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        doctor: mockDoctor,
        session: mockSession,
      } as any)

      const updatedDoctor = {
        ...mockDoctor,
        emailNotifications: true,
        pushNotifications: false,
      }

      vi.mocked(settingsService.updateDoctorSettings).mockResolvedValue(updatedDoctor as any)

      const result = await updateDoctorSettings({
        emailNotifications: true,
        pushNotifications: false,
      })

      expect(result.success).toBe(true)
      expect(result.data).toEqual(updatedDoctor)
      expect(settingsService.updateDoctorSettings).toHaveBeenCalledWith('doctor-123', {
        emailNotifications: true,
        pushNotifications: false,
      })
    })

    it('should return error if validation fails', async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        error: 'No autorizado',
      } as any)

      const result = await updateDoctorSettings({})

      expect(result.success).toBe(false)
      expect(result.error).toBe('No autorizado')
    })

    it('should handle service errors', async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        doctor: mockDoctor,
        session: mockSession,
      } as any)

      vi.mocked(settingsService.updateDoctorSettings).mockRejectedValue(new Error('DB Error'))

      const result = await updateDoctorSettings({
        emailNotifications: true,
      })

      expect(result.success).toBe(false)
      expect(result.error).toBe('Error al actualizar la configuración')
    })
  })

  describe('getDoctorSettings', () => {
    it('should get doctor settings with defaults', async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        doctor: {
          ...mockDoctor,
          emailNotifications: true,
          pushNotifications: false,
          isPublic: true,
          allowOnlineConsultations: false,
          autoBookingEnabled: false,
          remindersEnabled: true,
          consultationPrice: 50000,
        },
        session: mockSession,
      } as any)

      const result = await getDoctorSettings()

      expect(result.success).toBe(true)
      expect(result.data).toEqual({
        emailNotifications: true,
        pushNotifications: false,
        publicAvailability: true,
        onlineConsultations: false,
        autoBooking: false,
        reminders: true,
        consultationPrice: 50000,
      })
    })

    it('should use default values for null fields', async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        doctor: {
          ...mockDoctor,
          emailNotifications: null,
          pushNotifications: null,
          isPublic: null,
          allowOnlineConsultations: null,
          autoBookingEnabled: null,
          remindersEnabled: null,
          consultationPrice: null,
        },
        session: mockSession,
      } as any)

      const result = await getDoctorSettings()

      expect(result.success).toBe(true)
      expect(result.data?.emailNotifications).toBe(true)
      expect(result.data?.pushNotifications).toBe(false)
      expect(result.data?.consultationPrice).toBe(50000)
    })

    it('should return error if validation fails', async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        error: 'No autorizado',
      } as any)

      const result = await getDoctorSettings()

      expect(result.success).toBe(false)
      expect(result.error).toBe('No autorizado')
    })
  })

  describe('updateDoctorPassword', () => {
    it('should update password successfully', async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        doctor: mockDoctor,
        session: mockSession,
      } as any)

      const result = await updateDoctorPassword()

      expect(result.success).toBe(true)
      expect(result.data).toBeNull()
    })

    it('should return error if validation fails', async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        error: 'No autorizado',
      } as any)

      const result = await updateDoctorPassword()

      expect(result.success).toBe(false)
      expect(result.error).toBe('No autorizado')
    })
  })

  describe('exportDoctorData', () => {
    it('should export doctor data successfully', async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        doctor: mockDoctor,
        session: mockSession,
      } as any)

      const doctorData = {
        ...mockDoctor,
        user: { firstName: 'John', lastName: 'Doe' },
        specialities: [],
        experiences: [],
        clinics: [],
        schedules: [],
        appointments: [],
        pricings: [],
      }

      vi.mocked(settingsService.exportDoctorData).mockResolvedValue(doctorData as any)

      const result = await exportDoctorData()

      expect(result.success).toBe(true)
      expect(result.data).toEqual(doctorData)
      expect(settingsService.exportDoctorData).toHaveBeenCalledWith('doctor-123')
    })

    it('should return error if validation fails', async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        error: 'No autorizado',
      } as any)

      const result = await exportDoctorData()

      expect(result.success).toBe(false)
      expect(result.error).toBe('No autorizado')
    })

    it('should handle service errors', async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        doctor: mockDoctor,
        session: mockSession,
      } as any)

      vi.mocked(settingsService.exportDoctorData).mockRejectedValue(new Error('DB Error'))

      const result = await exportDoctorData()

      expect(result.success).toBe(false)
      expect(result.error).toBe('Error al exportar los datos')
    })
  })
})
