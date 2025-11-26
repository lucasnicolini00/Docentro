import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  createAppointmentAction,
  getUserAppointments,
  getDoctorAppointments,
  getPatientAppointments,
  createAppointmentWithTimeSlot,
  createAppointment,
  getDoctorAvailability,
  getDoctorClinicsAndPricing,
  updateAppointmentStatus,
  cancelAppointment,
} from '@/lib/actions/appointments'
import { validateAuth, validatePatient, validateDoctor } from '@/lib/actions/utils'
import { appointmentsService } from '@/lib/services/appointmentsService'
import { mockPatient, mockDoctor, mockSession, createMockFormData } from '../utils/mocks'
import { AppointmentStatus, AppointmentType } from '@prisma/client'

vi.mock('@/lib/actions/utils')
vi.mock('@/lib/services/appointmentsService')
vi.mock('next/cache')

const mockAppointment = {
  id: 'appt-123',
  doctorId: 'doctor-123',
  patientId: 'patient-123',
  clinicId: 'clinic-123',
  datetime: new Date('2025-12-01T10:00:00'),
  durationMinutes: 30,
  status: AppointmentStatus.PENDING,
  type: AppointmentType.IN_PERSON,
  notes: null,
  pricingId: null,
  timeSlotId: 'slot-123',
  doctor: mockDoctor,
  patient: mockPatient,
  clinic: { id: 'clinic-123', name: 'Test Clinic' },
  pricing: null,
  timeSlot: null,
}

describe('appointments actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('createAppointmentAction', () => {
    it('should create appointment successfully', async () => {
      vi.mocked(validatePatient).mockResolvedValue({
        patient: mockPatient,
        session: mockSession,
      } as any)

      vi.mocked(appointmentsService.getTimeSlotWithRelations).mockResolvedValue({
        id: 'slot-123',
        startTime: '10:00',
        endTime: '10:30',
        isBooked: false,
        isBlocked: false,
        schedule: {
          doctorId: 'doctor-123',
          clinicId: 'clinic-123',
        },
      } as any)

      vi.mocked(appointmentsService.createAppointmentWithTimeSlot).mockResolvedValue(mockAppointment as any)

      const formData = createMockFormData({
        pricingId: 'pricing-123',
        type: AppointmentType.IN_PERSON,
        notes: 'Test notes',
      })

      const result = await createAppointmentAction('slot-123', formData)

      expect(result.success).toBe(true)
      expect(result.message).toBe('Cita creada exitosamente')
    })

    it('should return error if validation fails', async () => {
      vi.mocked(validatePatient).mockResolvedValue({
        error: 'No autorizado',
      } as any)

      const formData = createMockFormData({})

      const result = await createAppointmentAction('slot-123', formData)

      expect(result.success).toBe(false)
      expect(result.error).toBe('No autorizado')
    })

    it('should return error if timeSlotId is missing', async () => {
      vi.mocked(validatePatient).mockResolvedValue({
        patient: mockPatient,
        session: mockSession,
      } as any)

      const formData = createMockFormData({})

      const result = await createAppointmentAction('', formData)

      expect(result.success).toBe(false)
      expect(result.error).toBe('ID de horario requerido')
    })
  })

  describe('getUserAppointments', () => {
    it('should get patient appointments', async () => {
      vi.mocked(validateAuth).mockResolvedValue({
        user: { id: 'user-123', email: 'patient@example.com', role: 'PATIENT' },
      } as any)

      vi.mocked(appointmentsService.getPatient).mockResolvedValue(mockPatient as any)
      vi.mocked(appointmentsService.getPatientAppointments).mockResolvedValue({
        appointments: [mockAppointment],
        total: 1,
        totalPages: 1,
      } as any)

      const result = await getUserAppointments()

      expect(result.success).toBe(true)
      expect(result.data).toBeDefined()
    })

    it('should get doctor appointments', async () => {
      vi.mocked(validateAuth).mockResolvedValue({
        user: { id: 'user-123', email: 'doctor@example.com', role: 'DOCTOR' },
      } as any)

      vi.mocked(appointmentsService.getDoctor).mockResolvedValue(mockDoctor as any)
      vi.mocked(appointmentsService.getDoctorAppointments).mockResolvedValue({
        appointments: [mockAppointment],
        total: 1,
        totalPages: 1,
      } as any)

      const result = await getUserAppointments()

      expect(result.success).toBe(true)
    })

    it('should return error if not authenticated', async () => {
      vi.mocked(validateAuth).mockResolvedValue(null)

      const result = await getUserAppointments()

      expect(result.success).toBe(false)
      expect(result.error).toBe('No autorizado')
    })

    it('should return error if patient not found', async () => {
      vi.mocked(validateAuth).mockResolvedValue({
        user: { id: 'user-123', email: 'patient@example.com', role: 'PATIENT' },
      } as any)

      vi.mocked(appointmentsService.getPatient).mockResolvedValue(null)

      const result = await getUserAppointments()

      expect(result.success).toBe(false)
      expect(result.error).toBe('Paciente no encontrado')
    })
  })

  describe('getDoctorAppointments', () => {
    it('should get doctor appointments for calendar', async () => {
      vi.mocked(appointmentsService.getDoctorAppointmentsForCalendar).mockResolvedValue([mockAppointment] as any)

      const result = await getDoctorAppointments('doctor-123', {
        startDate: new Date('2025-12-01'),
        endDate: new Date('2025-12-31'),
        status: [AppointmentStatus.CONFIRMED],
      })

      expect(result).toHaveLength(1)
    })

    it('should return empty array on error', async () => {
      vi.mocked(appointmentsService.getDoctorAppointmentsForCalendar).mockRejectedValue(new Error('DB Error'))

      const result = await getDoctorAppointments('doctor-123')

      expect(result).toEqual([])
    })
  })

  describe('createAppointmentWithTimeSlot', () => {
    it('should create appointment with time slot', async () => {
      vi.mocked(validatePatient).mockResolvedValue({
        patient: mockPatient,
        session: mockSession,
      } as any)

      vi.mocked(appointmentsService.getTimeSlotWithRelations).mockResolvedValue({
        id: 'slot-123',
        startTime: '10:00',
        endTime: '10:30',
        isBooked: false,
        isBlocked: false,
        schedule: {
          doctorId: 'doctor-123',
          clinicId: 'clinic-123',
        },
      } as any)

      vi.mocked(appointmentsService.createAppointmentWithTimeSlot).mockResolvedValue(mockAppointment as any)

      const formData = createMockFormData({
        pricingId: 'pricing-123',
        type: AppointmentType.IN_PERSON,
        notes: '',
      })

      const result = await createAppointmentWithTimeSlot('slot-123', formData)

      expect(result.success).toBe(true)
      expect(result.message).toBe('Cita agendada exitosamente')
    })

    it('should return error if time slot not found', async () => {
      vi.mocked(validatePatient).mockResolvedValue({
        patient: mockPatient,
        session: mockSession,
      } as any)

      vi.mocked(appointmentsService.getTimeSlotWithRelations).mockResolvedValue(null)

      const formData = createMockFormData({})

      const result = await createAppointmentWithTimeSlot('slot-123', formData)

      expect(result.success).toBe(false)
      expect(result.error).toBe('Horario no encontrado')
    })

    it('should return error if time slot is booked', async () => {
      vi.mocked(validatePatient).mockResolvedValue({
        patient: mockPatient,
        session: mockSession,
      } as any)

      vi.mocked(appointmentsService.getTimeSlotWithRelations).mockResolvedValue({
        id: 'slot-123',
        isBooked: true,
        isBlocked: false,
      } as any)

      const formData = createMockFormData({})

      const result = await createAppointmentWithTimeSlot('slot-123', formData)

      expect(result.success).toBe(false)
      expect(result.error).toBe('El horario no está disponible')
    })
  })

  describe('createAppointment', () => {
    it('should create appointment successfully', async () => {
      vi.mocked(validatePatient).mockResolvedValue({
        patient: mockPatient,
        session: mockSession,
      } as any)

      vi.mocked(appointmentsService.checkConflictingAppointment).mockResolvedValue(null)
      vi.mocked(appointmentsService.createAppointment).mockResolvedValue(mockAppointment as any)

      const formData = createMockFormData({
        doctorId: 'doctor-123',
        clinicId: 'clinic-123',
        pricingId: 'pricing-123',
        datetime: '2025-12-01T10:00:00',
        type: AppointmentType.IN_PERSON,
        notes: '',
        durationMinutes: '30',
      })

      const result = await createAppointment(formData)

      expect(result.success).toBe(true)
      expect(result.message).toBe('Cita agendada exitosamente')
    })

    it('should return error if required fields missing', async () => {
      vi.mocked(validatePatient).mockResolvedValue({
        patient: mockPatient,
        session: mockSession,
      } as any)

      const formData = createMockFormData({})

      const result = await createAppointment(formData)

      expect(result.success).toBe(false)
      expect(result.error).toBe('Faltan datos requeridos')
    })

    it('should return error if datetime is in the past', async () => {
      vi.mocked(validatePatient).mockResolvedValue({
        patient: mockPatient,
        session: mockSession,
      } as any)

      const formData = createMockFormData({
        doctorId: 'doctor-123',
        clinicId: 'clinic-123',
        datetime: '2020-01-01T10:00:00',
      })

      const result = await createAppointment(formData)

      expect(result.success).toBe(false)
      expect(result.error).toBe('La fecha debe ser en el futuro')
    })

    it('should return error if time slot conflicts', async () => {
      vi.mocked(validatePatient).mockResolvedValue({
        patient: mockPatient,
        session: mockSession,
      } as any)

      vi.mocked(appointmentsService.checkConflictingAppointment).mockResolvedValue(mockAppointment as any)

      const formData = createMockFormData({
        doctorId: 'doctor-123',
        clinicId: 'clinic-123',
        datetime: '2025-12-01T10:00:00',
      })

      const result = await createAppointment(formData)

      expect(result.success).toBe(false)
      expect(result.error).toBe('El horario no está disponible')
    })
  })

  describe('getDoctorAvailability', () => {
    it('should return available slots', async () => {
      vi.mocked(appointmentsService.getDoctorAppointmentsForAvailability).mockResolvedValue([])

      const result = await getDoctorAvailability('doctor-123', '2025-12-01')

      expect(result.success).toBe(true)
      expect(result.data).toBeDefined()
    })

    it('should return error if params missing', async () => {
      const result = await getDoctorAvailability('', '')

      expect(result.success).toBe(false)
      expect(result.error).toBe('Doctor ID y fecha requeridos')
    })
  })

  describe('getDoctorClinicsAndPricing', () => {
    it('should get doctor with clinics and pricing', async () => {
      const doctorWithRelations = {
        ...mockDoctor,
        clinics: [],
        pricings: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        user: {
          ...mockDoctor.user,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      }

      vi.mocked(appointmentsService.getDoctorWithRelations).mockResolvedValue(doctorWithRelations as any)

      const result = await getDoctorClinicsAndPricing('doctor-123')

      expect(result.success).toBe(true)
      expect(result.data).toBeDefined()
    })

    it('should return error if doctor not found', async () => {
      vi.mocked(appointmentsService.getDoctorWithRelations).mockResolvedValue(null)

      const result = await getDoctorClinicsAndPricing('doctor-123')

      expect(result.success).toBe(false)
      expect(result.error).toBe('Doctor no encontrado')
    })
  })

  describe('updateAppointmentStatus', () => {
    it('should update appointment status', async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        doctor: mockDoctor,
        session: mockSession,
      } as any)

      vi.mocked(appointmentsService.getAppointmentForStatusUpdate).mockResolvedValue(mockAppointment as any)
      vi.mocked(appointmentsService.updateAppointmentStatus).mockResolvedValue({
        ...mockAppointment,
        status: AppointmentStatus.CONFIRMED,
      } as any)

      const result = await updateAppointmentStatus('appt-123', AppointmentStatus.CONFIRMED)

      expect(result.success).toBe(true)
      expect(result.message).toContain('confirmed')
    })

    it('should return error if appointment not found', async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        doctor: mockDoctor,
        session: mockSession,
      } as any)

      vi.mocked(appointmentsService.getAppointmentForStatusUpdate).mockResolvedValue(null)

      const result = await updateAppointmentStatus('appt-123', AppointmentStatus.CONFIRMED)

      expect(result.success).toBe(false)
      expect(result.error).toBe('Cita no encontrada')
    })
  })

  describe('cancelAppointment', () => {
    it('should cancel appointment as patient', async () => {
      vi.mocked(validateAuth).mockResolvedValue({
        user: { id: 'user-123' },
      } as any)

      vi.mocked(appointmentsService.getAppointmentForCancellation).mockResolvedValue({
        ...mockAppointment,
        patient: { ...mockPatient, userId: 'user-123' },
        doctor: mockDoctor,
      } as any)

      vi.mocked(appointmentsService.cancelAppointment).mockResolvedValue({
        ...mockAppointment,
        status: AppointmentStatus.CANCELED,
      } as any)

      const result = await cancelAppointment('appt-123')

      expect(result.success).toBe(true)
      expect(result.message).toBe('Cita cancelada exitosamente')
    })

    it('should cancel appointment as doctor', async () => {
      vi.mocked(validateAuth).mockResolvedValue({
        user: { id: 'user-123' },
      } as any)

      vi.mocked(appointmentsService.getAppointmentForCancellation).mockResolvedValue({
        ...mockAppointment,
        patient: mockPatient,
        doctor: { ...mockDoctor, userId: 'user-123' },
      } as any)

      vi.mocked(appointmentsService.cancelAppointment).mockResolvedValue({
        ...mockAppointment,
        status: AppointmentStatus.CANCELED,
      } as any)

      const result = await cancelAppointment('appt-123')

      expect(result.success).toBe(true)
    })

    it('should return error if not authorized', async () => {
      vi.mocked(validateAuth).mockResolvedValue(null)

      const result = await cancelAppointment('appt-123')

      expect(result.success).toBe(false)
      expect(result.error).toBe('No autorizado')
    })

    it('should return error if appointment not found', async () => {
      vi.mocked(validateAuth).mockResolvedValue({
        user: { id: 'user-123' },
      } as any)

      vi.mocked(appointmentsService.getAppointmentForCancellation).mockResolvedValue(null)

      const result = await cancelAppointment('appt-123')

      expect(result.success).toBe(false)
      expect(result.error).toBe('Cita no encontrada')
    })

    it('should return error if user does not own appointment', async () => {
      vi.mocked(validateAuth).mockResolvedValue({
        user: { id: 'other-user' },
      } as any)

      vi.mocked(appointmentsService.getAppointmentForCancellation).mockResolvedValue({
        ...mockAppointment,
        patient: { ...mockPatient, userId: 'user-123' },
        doctor: { ...mockDoctor, userId: 'doctor-user' },
      } as any)

      const result = await cancelAppointment('appt-123')

      expect(result.success).toBe(false)
      expect(result.error).toBe('No tienes permisos para cancelar esta cita')
    })
  })
})
