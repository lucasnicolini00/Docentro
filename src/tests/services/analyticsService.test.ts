import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mockDeep, mockReset, type DeepMockProxy } from 'vitest-mock-extended'
import type { PrismaClient } from '@prisma/client'
import { analyticsService } from '@/lib/services/analyticsService'
import prisma from '@/lib/prisma'
import { mockDoctor, mockPatient } from '../utils/mocks'

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
  status: 'CONFIRMED',
  patient: mockPatient,
  clinic: { name: 'Test Clinic', address: '123 Main St' },
  pricing: { price: 50000, title: 'Consultation' },
}

describe('analyticsService', () => {
  beforeEach(() => {
    mockReset(prismaMock)
  })

  describe('getDashboardStats', () => {
    it('should get dashboard statistics', async () => {
      const mockStats = [{
        today_appointments: 5,
        yesterday_appointments: 3,
        week_appointments: 20,
        last_week_appointments: 15,
        pending_bookings: 2,
        total_patients: 50,
        last_month_patients: 10,
        monthly_revenue: 500000,
        last_month_revenue: 400000,
        total_slots: 100,
        booked_slots: 60,
        last_month_total_slots: 100,
        last_month_booked_slots: 50,
        utilization_rate: 60,
        last_month_utilization: 50,
      }]

      prismaMock.$queryRawUnsafe.mockResolvedValue(mockStats as any)

      const result = await analyticsService.getDashboardStats('doctor-123')

      expect(result).toEqual(mockStats)
      expect(prismaMock.$queryRawUnsafe).toHaveBeenCalled()
    })
  })

  describe('getRecentActivities', () => {
    it('should get recent activities', async () => {
      const mockActivities = [
        {
          type: 'appointment',
          title: 'Nueva cita programada',
          description: 'Cita con John Doe',
          timestamp: new Date(),
          item_id: 'appt-123',
        },
        {
          type: 'schedule',
          title: 'Horario actualizado',
          description: 'Horario para Test Clinic',
          timestamp: new Date(),
          item_id: 'schedule-123',
        },
      ]

      prismaMock.$queryRaw.mockResolvedValue(mockActivities as any)

      const result = await analyticsService.getRecentActivities('doctor-123')

      expect(result).toEqual(mockActivities)
      expect(prismaMock.$queryRaw).toHaveBeenCalled()
    })
  })

  describe('getUpcomingAppointments', () => {
    it('should get upcoming appointments', async () => {
      const upcomingAppointments = [
        {
          ...mockAppointment,
          patient: {
            ...mockPatient,
            user: {
              firstName: 'John',
              lastName: 'Doe',
              email: 'john@example.com',
            },
          },
        },
      ]

      prismaMock.appointment.findMany.mockResolvedValue(upcomingAppointments as any)

      const result = await analyticsService.getUpcomingAppointments('doctor-123')

      expect(result).toEqual(upcomingAppointments)
      expect(prismaMock.appointment.findMany).toHaveBeenCalledWith({
        where: expect.objectContaining({
          doctorId: 'doctor-123',
          status: {
            in: ['CONFIRMED', 'PENDING'],
          },
        }),
        include: expect.any(Object),
        orderBy: {
          datetime: 'asc',
        },
        take: 5,
      })
    })
  })

  describe('getPatientAnalytics', () => {
    it('should get patient analytics for month', async () => {
      const appointments = [mockAppointment]

      prismaMock.appointment.findMany.mockResolvedValue(appointments as any)

      const result = await analyticsService.getPatientAnalytics('doctor-123', 'month')

      expect(result).toEqual(appointments)
      expect(prismaMock.appointment.findMany).toHaveBeenCalledWith({
        where: expect.objectContaining({
          doctorId: 'doctor-123',
        }),
        include: expect.any(Object),
      })
    })

    it('should get patient analytics for quarter', async () => {
      prismaMock.appointment.findMany.mockResolvedValue([])

      await analyticsService.getPatientAnalytics('doctor-123', 'quarter')

      expect(prismaMock.appointment.findMany).toHaveBeenCalled()
    })

    it('should get patient analytics for year', async () => {
      prismaMock.appointment.findMany.mockResolvedValue([])

      await analyticsService.getPatientAnalytics('doctor-123', 'year')

      expect(prismaMock.appointment.findMany).toHaveBeenCalled()
    })
  })

  describe('getRevenueAnalytics', () => {
    it('should get revenue analytics for month', async () => {
      const completedAppointments = [
        {
          ...mockAppointment,
          status: 'COMPLETED',
          pricing: {
            price: 50000,
            clinic: { name: 'Test Clinic' },
          },
          timeSlot: {
            schedule: {
              clinic: { name: 'Test Clinic' },
            },
          },
        },
      ]

      prismaMock.appointment.findMany.mockResolvedValue(completedAppointments as any)
      prismaMock.appointment.count.mockResolvedValue(10)

      const result = await analyticsService.getRevenueAnalytics('doctor-123', 'month')

      expect(result.completedAppointments).toEqual(completedAppointments)
      expect(result.previousMonthAppointments).toBe(10)
    })

    it('should get revenue analytics for quarter', async () => {
      prismaMock.appointment.findMany.mockResolvedValue([])
      prismaMock.appointment.count.mockResolvedValue(5)

      const result = await analyticsService.getRevenueAnalytics('doctor-123', 'quarter')

      expect(result.completedAppointments).toEqual([])
      expect(result.previousMonthAppointments).toBe(5)
    })

    it('should get revenue analytics for year', async () => {
      prismaMock.appointment.findMany.mockResolvedValue([])
      prismaMock.appointment.count.mockResolvedValue(0)

      const result = await analyticsService.getRevenueAnalytics('doctor-123', 'year')

      expect(result.completedAppointments).toEqual([])
      expect(result.previousMonthAppointments).toBe(0)
    })
  })
})
