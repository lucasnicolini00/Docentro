import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  createSchedule,
  updateSchedule,
  deleteSchedule,
  getDoctorSchedules,
  createBulkSchedules,
  getAvailableTimeSlots,
  toggleTimeSlotBlock,
  getTimeSlotsForCalendar,
  getDoctorSchedulesWithSlots,
} from '@/lib/actions/schedules'
import { validateDoctor } from '@/lib/actions/utils'
import { schedulesService } from '@/lib/services/schedulesService'
import { mockDoctor, mockSession, mockClinic } from '../utils/mocks'
import { DayOfWeek } from '@prisma/client'

vi.mock('@/lib/actions/utils')
vi.mock('@/lib/services/schedulesService')
vi.mock('next/cache')

const mockSchedule = {
  id: 'schedule-123',
  doctorId: 'doctor-123',
  clinicId: 'clinic-123',
  dayOfWeek: DayOfWeek.MONDAY,
  startTime: '09:00',
  endTime: '17:00',
  isActive: true,
  clinic: mockClinic,
  timeSlots: [],
}

const mockTimeSlot = {
  id: 'slot-123',
  scheduleId: 'schedule-123',
  startTime: '09:00',
  endTime: '09:30',
  isBooked: false,
  isBlocked: false,
}

describe('schedules actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('createSchedule', () => {
    it('should create schedule successfully', async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        doctor: mockDoctor,
        session: mockSession,
      } as any)

      vi.mocked(schedulesService.getSchedule).mockResolvedValue(null)
      vi.mocked(schedulesService.createSchedule).mockResolvedValue(mockSchedule as any)
      vi.mocked(schedulesService.createTimeSlots).mockResolvedValue(undefined)
      vi.mocked(schedulesService.getScheduleById).mockResolvedValue(mockSchedule as any)

      const result = await createSchedule('clinic-123', {
        dayOfWeek: DayOfWeek.MONDAY,
        startTime: '09:00',
        endTime: '17:00',
        slotDuration: 30,
      })

      expect(result.success).toBe(true)
      expect(result.data).toBeDefined()
    })

    it('should return error if schedule already exists', async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        doctor: mockDoctor,
        session: mockSession,
      } as any)

      vi.mocked(schedulesService.getSchedule).mockResolvedValue(mockSchedule as any)

      const result = await createSchedule('clinic-123', {
        dayOfWeek: DayOfWeek.MONDAY,
        startTime: '09:00',
        endTime: '17:00',
      })

      expect(result.success).toBe(false)
      expect(result.error).toBe('Ya existe un horario para este día en esta clínica')
    })

    it('should return error if validation fails', async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        error: 'No autorizado',
      } as any)

      const result = await createSchedule('clinic-123', {
        dayOfWeek: DayOfWeek.MONDAY,
        startTime: '09:00',
        endTime: '17:00',
      })

      expect(result.success).toBe(false)
      expect(result.error).toBe('No autorizado')
    })
  })

  describe('updateSchedule', () => {
    it('should update schedule successfully', async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        doctor: mockDoctor,
        session: mockSession,
      } as any)

      vi.mocked(schedulesService.getScheduleByIdAndDoctor).mockResolvedValue(mockSchedule as any)
      vi.mocked(schedulesService.updateSchedule).mockResolvedValue({
        ...mockSchedule,
        startTime: '10:00',
      } as any)
      vi.mocked(schedulesService.deleteTimeSlots).mockResolvedValue({ count: 5 } as any)
      vi.mocked(schedulesService.createTimeSlots).mockResolvedValue(undefined)

      const result = await updateSchedule('schedule-123', {
        startTime: '10:00',
        endTime: '18:00',
        isActive: true,
        slotDuration: 30,
      })

      expect(result.success).toBe(true)
      expect(result.data).toBeDefined()
    })

    it('should return error if schedule not found', async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        doctor: mockDoctor,
        session: mockSession,
      } as any)

      vi.mocked(schedulesService.getScheduleByIdAndDoctor).mockResolvedValue(null)

      const result = await updateSchedule('schedule-123', {
        startTime: '10:00',
        endTime: '18:00',
        isActive: true,
      })

      expect(result.success).toBe(false)
      expect(result.error).toBe('Horario no encontrado')
    })

    it('should regenerate time slots if times changed', async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        doctor: mockDoctor,
        session: mockSession,
      } as any)

      vi.mocked(schedulesService.getScheduleByIdAndDoctor).mockResolvedValue(mockSchedule as any)
      vi.mocked(schedulesService.updateSchedule).mockResolvedValue(mockSchedule as any)
      vi.mocked(schedulesService.deleteTimeSlots).mockResolvedValue({ count: 5 } as any)
      vi.mocked(schedulesService.createTimeSlots).mockResolvedValue(undefined)

      await updateSchedule('schedule-123', {
        startTime: '10:00',
        endTime: '18:00',
        isActive: true,
      })

      expect(schedulesService.deleteTimeSlots).toHaveBeenCalled()
      expect(schedulesService.createTimeSlots).toHaveBeenCalled()
    })
  })

  describe('deleteSchedule', () => {
    it('should delete schedule successfully', async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        doctor: mockDoctor,
        session: mockSession,
      } as any)

      vi.mocked(schedulesService.getScheduleForDeletion).mockResolvedValue({
        id: 'schedule-123',
        doctorId: 'doctor-123',
        _count: { timeSlots: 0 },
      } as any)

      vi.mocked(schedulesService.deleteSchedule).mockResolvedValue(mockSchedule as any)

      const result = await deleteSchedule('schedule-123')

      expect(result.success).toBe(true)
    })

    it('should return error if schedule has booked appointments', async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        doctor: mockDoctor,
        session: mockSession,
      } as any)

      vi.mocked(schedulesService.getScheduleForDeletion).mockResolvedValue({
        id: 'schedule-123',
        doctorId: 'doctor-123',
        _count: { timeSlots: 5 },
      } as any)

      const result = await deleteSchedule('schedule-123')

      expect(result.success).toBe(false)
      expect(result.error).toBe('No se puede eliminar un horario con citas reservadas')
    })

    it('should return error if schedule not found', async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        doctor: mockDoctor,
        session: mockSession,
      } as any)

      vi.mocked(schedulesService.getScheduleForDeletion).mockResolvedValue(null)

      const result = await deleteSchedule('schedule-123')

      expect(result.success).toBe(false)
      expect(result.error).toContain('no encontrado')
    })
  })

  describe('getDoctorSchedules', () => {
    it('should get doctor schedules', async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        doctor: mockDoctor,
        session: mockSession,
      } as any)

      vi.mocked(schedulesService.getDoctorSchedules).mockResolvedValue([mockSchedule] as any)

      const result = await getDoctorSchedules()

      expect(result.success).toBe(true)
      expect(result.data).toEqual([mockSchedule])
    })

    it('should return error if validation fails', async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        error: 'No autorizado',
      } as any)

      const result = await getDoctorSchedules()

      expect(result.success).toBe(false)
      expect(result.error).toBe('No autorizado')
    })
  })

  describe('createBulkSchedules', () => {
    it('should create multiple schedules', async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        doctor: mockDoctor,
        session: mockSession,
      } as any)

      vi.mocked(schedulesService.getExistingSchedules).mockResolvedValue([])
      vi.mocked(schedulesService.bulkCreateSchedules).mockResolvedValue(['schedule-123'] as any)
      vi.mocked(schedulesService.getSchedulesByIds).mockResolvedValue([mockSchedule] as any)

      const result = await createBulkSchedules(
        'clinic-123',
        [
          {
            dayOfWeek: DayOfWeek.MONDAY,
            startTime: '09:00',
            endTime: '17:00',
          },
        ],
        false
      )

      expect(result.success).toBe(true)
      expect(result.data).toBeDefined()
    })

    it('should return error if schedules exist and replaceExisting is false', async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        doctor: mockDoctor,
        session: mockSession,
      } as any)

      vi.mocked(schedulesService.getExistingSchedules).mockResolvedValue([
        { dayOfWeek: DayOfWeek.MONDAY, id: 'existing-123', startTime: '09:00', endTime: '17:00', _count: { timeSlots: 0 } },
      ] as any)

      const result = await createBulkSchedules(
        'clinic-123',
        [
          {
            dayOfWeek: DayOfWeek.MONDAY,
            startTime: '09:00',
            endTime: '17:00',
          },
        ],
        false
      )

      expect(result.success).toBe(false)
      expect(result.error).toContain('Ya existen horarios')
      expect(result.data?.requiresConfirmation).toBe(true)
    })

    it('should replace existing schedules when replaceExisting is true', async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        doctor: mockDoctor,
        session: mockSession,
      } as any)

      vi.mocked(schedulesService.getExistingSchedules).mockResolvedValue([
        { dayOfWeek: DayOfWeek.MONDAY, id: 'existing-123', startTime: '09:00', endTime: '17:00', _count: { timeSlots: 0 } },
      ] as any)
      vi.mocked(schedulesService.bulkCreateSchedules).mockResolvedValue(['schedule-123'] as any)
      vi.mocked(schedulesService.getSchedulesByIds).mockResolvedValue([mockSchedule] as any)

      const result = await createBulkSchedules(
        'clinic-123',
        [
          {
            dayOfWeek: DayOfWeek.MONDAY,
            startTime: '09:00',
            endTime: '17:00',
          },
        ],
        true
      )

      expect(result.success).toBe(true)
    })
  })

  describe('getAvailableTimeSlots', () => {
    it('should get available time slots for date', async () => {
      vi.mocked(schedulesService.getScheduleForTimeSlots).mockResolvedValue({
        ...mockSchedule,
        timeSlots: [mockTimeSlot],
      } as any)

      const result = await getAvailableTimeSlots('doctor-123', 'clinic-123', '2025-12-01')

      expect(result.success).toBe(true)
      expect(result.data).toEqual([mockTimeSlot])
    })

    it('should return error if no schedule for day', async () => {
      vi.mocked(schedulesService.getScheduleForTimeSlots).mockResolvedValue(null)

      const result = await getAvailableTimeSlots('doctor-123', 'clinic-123', '2025-12-01')

      expect(result.success).toBe(false)
      expect(result.error).toBe('No hay horarios disponibles para este día')
    })
  })

  describe('toggleTimeSlotBlock', () => {
    it('should block time slot', async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        doctor: mockDoctor,
        session: mockSession,
      } as any)

      vi.mocked(schedulesService.getTimeSlotForToggle).mockResolvedValue({
        id: 'slot-123',
        isBlocked: false,
      } as any)

      vi.mocked(schedulesService.updateTimeSlotBlock).mockResolvedValue({
        ...mockTimeSlot,
        isBlocked: true,
      } as any)

      const result = await toggleTimeSlotBlock('slot-123', true)

      expect(result.success).toBe(true)
      expect(result.data?.isBlocked).toBe(true)
    })

    it('should return early if already in desired state', async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        doctor: mockDoctor,
        session: mockSession,
      } as any)

      vi.mocked(schedulesService.getTimeSlotForToggle).mockResolvedValue({
        id: 'slot-123',
        isBlocked: true,
      } as any)

      const result = await toggleTimeSlotBlock('slot-123', true)

      expect(result.success).toBe(true)
      expect(result.message).toContain('ya está bloqueado')
      expect(schedulesService.updateTimeSlotBlock).not.toHaveBeenCalled()
    })

    it('should return error if time slot not found', async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        doctor: mockDoctor,
        session: mockSession,
      } as any)

      vi.mocked(schedulesService.getTimeSlotForToggle).mockResolvedValue(null)

      const result = await toggleTimeSlotBlock('slot-123', true)

      expect(result.success).toBe(false)
      expect(result.error).toBe('Horario no encontrado o ya reservado')
    })
  })

  describe('getTimeSlotsForCalendar', () => {
    it('should get time slots for calendar view', async () => {
      const slots = [
        {
          id: 'virtual-slot-1',
          startTime: new Date().toISOString(),
          endTime: new Date().toISOString(),
          isBooked: false,
          isBlocked: false,
        },
      ]

      vi.mocked(schedulesService.getTimeSlotsForCalendar).mockResolvedValue(slots as any)

      const result = await getTimeSlotsForCalendar('doctor-123', 'clinic-123')

      expect(result).toEqual(slots)
    })

    it('should return empty array on error', async () => {
      vi.mocked(schedulesService.getTimeSlotsForCalendar).mockRejectedValue(new Error('DB Error'))

      const result = await getTimeSlotsForCalendar('doctor-123', 'clinic-123')

      expect(result).toEqual([])
    })
  })

  describe('getDoctorSchedulesWithSlots', () => {
    it('should get doctor schedules with slots for date range', async () => {
      const schedulesWithSlots = [
        {
          ...mockSchedule,
          date: new Date().toISOString(),
          timeSlots: [mockTimeSlot],
        },
      ]

      vi.mocked(schedulesService.getDoctorSchedulesWithSlots).mockResolvedValue(schedulesWithSlots as any)

      const result = await getDoctorSchedulesWithSlots('doctor-123')

      expect(result).toEqual(schedulesWithSlots)
    })

    it('should return empty array on error', async () => {
      vi.mocked(schedulesService.getDoctorSchedulesWithSlots).mockRejectedValue(new Error('DB Error'))

      const result = await getDoctorSchedulesWithSlots('doctor-123')

      expect(result).toEqual([])
    })
  })
})
