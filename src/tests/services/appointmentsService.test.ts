import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mockDeep, mockReset, type DeepMockProxy } from 'vitest-mock-extended'
import type { PrismaClient } from '@prisma/client'
import { appointmentsService } from '@/lib/services/appointmentsService'
import prisma from '@/lib/prisma'
import { mockPatient, mockDoctor } from '../utils/mocks'
import { AppointmentStatus, AppointmentType } from '@prisma/client'

vi.mock('@/lib/prisma', () => ({
  default: mockDeep<PrismaClient>(),
}))

const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>

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
  timeSlotId: null,
  createdAt: new Date(),
  updatedAt: new Date(),
}

describe('appointmentsService', () => {
  beforeEach(() => {
    mockReset(prismaMock)
  })

  describe('getPatient', () => {
    it('should get patient by email', async () => {
      prismaMock.patient.findFirst.mockResolvedValue(mockPatient as any)

      const result = await appointmentsService.getPatient('test@example.com')

      expect(result).toEqual(mockPatient)
      expect(prismaMock.patient.findFirst).toHaveBeenCalledWith({
        where: { user: { email: 'test@example.com' } },
      })
    })
  })

  describe('getPatientAppointments', () => {
    it('should get patient appointments with pagination', async () => {
      const appointments = [mockAppointment]
      
      prismaMock.appointment.findMany.mockResolvedValue(appointments as any)
      prismaMock.appointment.count.mockResolvedValue(1)

      const result = await appointmentsService.getPatientAppointments('patient-123', 1, 10)

      expect(result.appointments).toEqual(appointments)
      expect(result.total).toBe(1)
      expect(result.totalPages).toBe(1)
    })

    it('should handle pagination correctly', async () => {
      prismaMock.appointment.findMany.mockResolvedValue([])
      prismaMock.appointment.count.mockResolvedValue(25)

      const result = await appointmentsService.getPatientAppointments('patient-123', 2, 10)

      expect(result.totalPages).toBe(3)
      expect(prismaMock.appointment.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: 10,
          take: 10,
        })
      )
    })
  })

  describe('getDoctor', () => {
    it('should get doctor by email', async () => {
      prismaMock.doctor.findFirst.mockResolvedValue(mockDoctor as any)

      const result = await appointmentsService.getDoctor('doctor@example.com')

      expect(result).toEqual(mockDoctor)
    })
  })

  describe('getDoctorAppointments', () => {
    it('should get doctor appointments with pagination', async () => {
      const appointments = [mockAppointment]
      
      prismaMock.appointment.findMany.mockResolvedValue(appointments as any)
      prismaMock.appointment.count.mockResolvedValue(1)

      const result = await appointmentsService.getDoctorAppointments('doctor-123')

      expect(result.appointments).toEqual(appointments)
      expect(result.total).toBe(1)
    })
  })

  describe('getDoctorAppointmentsForCalendar', () => {
    it('should get appointments within date range', async () => {
      const startDate = new Date('2025-12-01')
      const endDate = new Date('2025-12-31')
      const appointments = [mockAppointment]

      prismaMock.appointment.findMany.mockResolvedValue(appointments as any)

      const result = await appointmentsService.getDoctorAppointmentsForCalendar(
        'doctor-123',
        startDate,
        endDate
      )

      expect(result).toEqual(appointments)
      expect(prismaMock.appointment.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            doctorId: 'doctor-123',
            datetime: {
              gte: startDate,
              lte: endDate,
            },
          }),
        })
      )
    })

    it('should filter by status', async () => {
      prismaMock.appointment.findMany.mockResolvedValue([])

      await appointmentsService.getDoctorAppointmentsForCalendar(
        'doctor-123',
        new Date(),
        new Date(),
        [AppointmentStatus.CONFIRMED, AppointmentStatus.PENDING]
      )

      expect(prismaMock.appointment.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            status: {
              in: [AppointmentStatus.CONFIRMED, AppointmentStatus.PENDING],
            },
          }),
        })
      )
    })
  })

  describe('createAppointmentWithTimeSlot', () => {
    it('should create appointment and mark time slot as booked', async () => {
      const appointmentData = {
        doctorId: 'doctor-123',
        patientId: 'patient-123',
        clinicId: 'clinic-123',
        timeSlotId: 'slot-123',
        pricingId: null,
        datetime: new Date(),
        durationMinutes: 30,
        type: AppointmentType.IN_PERSON,
        status: AppointmentStatus.PENDING,
        notes: null,
      }

      prismaMock.$transaction.mockImplementation(async (callback: any) => {
        return callback({
          timeSlot: {
            update: vi.fn().mockResolvedValue({ id: 'slot-123', isBooked: true }),
          },
          appointment: {
            create: vi.fn().mockResolvedValue(mockAppointment),
          },
        })
      })

      const result = await appointmentsService.createAppointmentWithTimeSlot(appointmentData)

      expect(result).toEqual(mockAppointment)
      expect(prismaMock.$transaction).toHaveBeenCalled()
    })
  })

  describe('checkConflictingAppointment', () => {
    it('should find conflicting appointment', async () => {
      prismaMock.appointment.findFirst.mockResolvedValue(mockAppointment as any)

      const result = await appointmentsService.checkConflictingAppointment(
        'doctor-123',
        new Date('2025-12-01T10:00:00')
      )

      expect(result).toEqual(mockAppointment)
    })

    it('should return null if no conflict', async () => {
      prismaMock.appointment.findFirst.mockResolvedValue(null)

      const result = await appointmentsService.checkConflictingAppointment(
        'doctor-123',
        new Date('2025-12-01T10:00:00')
      )

      expect(result).toBeNull()
    })
  })

  describe('createAppointment', () => {
    it('should create appointment', async () => {
      const appointmentData = {
        doctorId: 'doctor-123',
        patientId: 'patient-123',
        clinicId: 'clinic-123',
        pricingId: null,
        datetime: new Date(),
        durationMinutes: 30,
        type: AppointmentType.IN_PERSON,
        status: AppointmentStatus.PENDING,
        notes: null,
      }

      prismaMock.appointment.create.mockResolvedValue(mockAppointment as any)

      const result = await appointmentsService.createAppointment(appointmentData)

      expect(result).toEqual(mockAppointment)
      expect(prismaMock.appointment.create).toHaveBeenCalledWith({
        data: appointmentData,
        include: expect.any(Object),
      })
    })
  })

  describe('updateAppointmentStatus', () => {
    it('should update appointment status', async () => {
      const updated = { ...mockAppointment, status: AppointmentStatus.CONFIRMED }
      prismaMock.appointment.update.mockResolvedValue(updated as any)

      const result = await appointmentsService.updateAppointmentStatus(
        'appt-123',
        AppointmentStatus.CONFIRMED
      )

      expect(result.status).toBe(AppointmentStatus.CONFIRMED)
      expect(prismaMock.appointment.update).toHaveBeenCalledWith({
        where: { id: 'appt-123' },
        data: { status: AppointmentStatus.CONFIRMED },
        include: expect.any(Object),
      })
    })
  })

  describe('cancelAppointment', () => {
    it('should cancel appointment', async () => {
      const canceled = { ...mockAppointment, status: AppointmentStatus.CANCELED }
      prismaMock.appointment.update.mockResolvedValue(canceled as any)

      const result = await appointmentsService.cancelAppointment('appt-123')

      expect(result.status).toBe(AppointmentStatus.CANCELED)
      expect(prismaMock.appointment.update).toHaveBeenCalledWith({
        where: { id: 'appt-123' },
        data: expect.objectContaining({
          status: AppointmentStatus.CANCELED,
        }),
      })
    })
  })

  describe('getAppointmentForStatusUpdate', () => {
    it('should get appointment for doctor', async () => {
      prismaMock.appointment.findFirst.mockResolvedValue(mockAppointment as any)

      const result = await appointmentsService.getAppointmentForStatusUpdate('appt-123', 'doctor-123')

      expect(result).toEqual(mockAppointment)
      expect(prismaMock.appointment.findFirst).toHaveBeenCalledWith({
        where: {
          id: 'appt-123',
          doctorId: 'doctor-123',
        },
      })
    })
  })

  describe('getAppointmentForCancellation', () => {
    it('should get appointment with relations', async () => {
      const appointmentWithRelations = {
        ...mockAppointment,
        patient: mockPatient,
        doctor: mockDoctor,
      }

      prismaMock.appointment.findUnique.mockResolvedValue(appointmentWithRelations as any)

      const result = await appointmentsService.getAppointmentForCancellation('appt-123')

      expect(result).toEqual(appointmentWithRelations)
    })
  })

  describe('getDoctorWithRelations', () => {
    it('should get doctor with all relations', async () => {
      const doctorWithRelations = {
        ...mockDoctor,
        clinics: [],
        pricings: [],
      }

      prismaMock.doctor.findUnique.mockResolvedValue(doctorWithRelations as any)

      const result = await appointmentsService.getDoctorWithRelations('doctor-123')

      expect(result).toEqual(doctorWithRelations)
    })
  })

  describe('getDoctorAppointmentsForAvailability', () => {
    it('should get non-canceled appointments for date range', async () => {
      const appointments = [
        { datetime: new Date('2025-12-01T10:00:00'), durationMinutes: 30 },
      ]

      prismaMock.appointment.findMany.mockResolvedValue(appointments as any)

      const result = await appointmentsService.getDoctorAppointmentsForAvailability(
        'doctor-123',
        new Date('2025-12-01T00:00:00'),
        new Date('2025-12-01T23:59:59')
      )

      expect(result).toEqual(appointments)
      expect(prismaMock.appointment.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            status: {
              not: AppointmentStatus.CANCELED,
            },
          }),
        })
      )
    })
  })

  describe('getTimeSlotWithRelations', () => {
    it('should get time slot with schedule', async () => {
      const timeSlot = {
        id: 'slot-123',
        startTime: '10:00',
        endTime: '10:30',
        isBooked: false,
        isBlocked: false,
        schedule: {
          doctorId: 'doctor-123',
          clinicId: 'clinic-123',
        },
      }

      prismaMock.timeSlot.findUnique.mockResolvedValue(timeSlot as any)

      const result = await appointmentsService.getTimeSlotWithRelations('slot-123')

      expect(result).toEqual(timeSlot)
    })
  })
})
