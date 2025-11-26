import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  updatePatientProfile,
  getPatientProfile,
  getPatientDashboard,
} from '@/lib/actions/patients'
import { validatePatient } from '@/lib/actions/utils'
import { patientsService } from '@/lib/services/patientsService'
import { mockPatient, mockSession, createMockFormData } from '../utils/mocks'

vi.mock('@/lib/actions/utils')
vi.mock('@/lib/services/patientsService')
vi.mock('next/cache')

describe('patients actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('updatePatientProfile', () => {
    it('should update patient profile successfully', async () => {
      vi.mocked(validatePatient).mockResolvedValue({
        patient: mockPatient,
        session: mockSession,
      } as any)

      vi.mocked(patientsService.updatePatientProfile).mockResolvedValue({
        updatedUser: { id: 'user-123', firstName: 'Jane', lastName: 'Smith' },
        updatedPatient: { id: 'patient-123', name: 'Jane', surname: 'Smith' },
      } as any)

      const formData = createMockFormData({
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        phone: '+1234567890',
        patientName: 'Jane',
        patientSurname: 'Smith',
        patientEmail: 'jane.patient@example.com',
        patientPhone: '+0987654321',
        birthdate: '1990-01-01',
        gender: 'female',
      })

      const result = await updatePatientProfile(formData)

      expect(result.success).toBe(true)
      expect(result.message).toBe('Perfil actualizado exitosamente')
      expect(result.data).toBeDefined()
      expect(patientsService.updatePatientProfile).toHaveBeenCalled()
    })

    it('should return error if validation fails', async () => {
      vi.mocked(validatePatient).mockResolvedValue({
        error: 'No autorizado',
      } as any)

      const formData = createMockFormData({})

      const result = await updatePatientProfile(formData)

      expect(result.success).toBe(false)
      expect(result.error).toBe('No autorizado')
    })

    it('should handle service errors', async () => {
      vi.mocked(validatePatient).mockResolvedValue({
        patient: mockPatient,
        session: mockSession,
      } as any)

      vi.mocked(patientsService.updatePatientProfile).mockRejectedValue(new Error('DB Error'))

      const formData = createMockFormData({
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        phone: '',
        patientName: 'Jane',
        patientSurname: 'Smith',
        patientEmail: 'jane.patient@example.com',
        patientPhone: '',
        birthdate: '',
        gender: '',
      })

      const result = await updatePatientProfile(formData)

      expect(result.success).toBe(false)
      expect(result.error).toBe('Error interno del servidor')
    })
  })

  describe('getPatientProfile', () => {
    it('should return patient profile', async () => {
      vi.mocked(validatePatient).mockResolvedValue({
        patient: mockPatient,
        session: mockSession,
      } as any)

      const result = await getPatientProfile()

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockPatient)
    })

    it('should return error if validation fails', async () => {
      vi.mocked(validatePatient).mockResolvedValue({
        error: 'No autorizado',
      } as any)

      const result = await getPatientProfile()

      expect(result.success).toBe(false)
      expect(result.error).toBe('No autorizado')
    })

    it('should handle errors', async () => {
      vi.mocked(validatePatient).mockRejectedValue(new Error('Unexpected error'))

      const result = await getPatientProfile()

      expect(result.success).toBe(false)
      expect(result.error).toBe('Error al obtener el perfil del paciente')
    })
  })

  describe('getPatientDashboard', () => {
    it('should return dashboard with filtered appointments', async () => {
      const futureDate = new Date('2025-12-01')
      const pastDate = new Date('2024-01-01')

      const patientWithAppointments = {
        ...mockPatient,
        appointments: [
          { id: 'appt-1', datetime: futureDate },
          { id: 'appt-2', datetime: pastDate },
        ],
      }

      vi.mocked(validatePatient).mockResolvedValue({
        patient: mockPatient,
        session: mockSession,
      } as any)

      vi.mocked(patientsService.getPatientDashboard).mockResolvedValue(patientWithAppointments as any)

      const result = await getPatientDashboard()

      expect(result.success).toBe(true)
      expect(result.data?.patient).toEqual(patientWithAppointments)
      expect(result.data?.upcomingAppointments).toBeDefined()
      expect(result.data?.pastAppointments).toBeDefined()
      expect(result.data?.session).toEqual(mockSession)
    })

    it('should return error if patient not found', async () => {
      vi.mocked(validatePatient).mockResolvedValue({
        patient: mockPatient,
        session: mockSession,
      } as any)

      vi.mocked(patientsService.getPatientDashboard).mockResolvedValue(null)

      const result = await getPatientDashboard()

      expect(result.success).toBe(false)
      expect(result.error).toBe('Paciente no encontrado')
    })

    it('should return error if validation fails', async () => {
      vi.mocked(validatePatient).mockResolvedValue({
        error: 'No autorizado',
      } as any)

      const result = await getPatientDashboard()

      expect(result.success).toBe(false)
      expect(result.error).toBe('No autorizado')
    })

    it('should handle service errors', async () => {
      vi.mocked(validatePatient).mockResolvedValue({
        patient: mockPatient,
        session: mockSession,
      } as any)

      vi.mocked(patientsService.getPatientDashboard).mockRejectedValue(new Error('DB Error'))

      const result = await getPatientDashboard()

      expect(result.success).toBe(false)
      expect(result.error).toBe('Error al obtener el dashboard del paciente')
    })
  })
})
