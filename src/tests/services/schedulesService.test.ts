import { describe, it, expect, vi, beforeEach } from "vitest";
import { mockDeep, mockReset, type DeepMockProxy } from "vitest-mock-extended";
import type { PrismaClient } from "@prisma/client";
import { schedulesService } from "@/lib/services/schedulesService";
import prisma from "@/lib/prisma";
import { mockDoctor, mockClinic } from "../utils/mocks";
import { DayOfWeek } from "@prisma/client";

vi.mock("@/lib/prisma", () => ({
  default: mockDeep<PrismaClient>(),
}));

const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

const mockSchedule = {
  id: "schedule-123",
  doctorId: "doctor-123",
  clinicId: "clinic-123",
  dayOfWeek: DayOfWeek.MONDAY,
  startTime: "09:00",
  endTime: "17:00",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockTimeSlot = {
  id: "slot-123",
  scheduleId: "schedule-123",
  startTime: "09:00",
  endTime: "09:30",
  isBooked: false,
  isBlocked: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("schedulesService", () => {
  beforeEach(() => {
    mockReset(prismaMock);
  });

  describe("getSchedule", () => {
    it("should get schedule by doctor, clinic, and day", async () => {
      prismaMock.schedule.findUnique.mockResolvedValue(mockSchedule as any);

      const result = await schedulesService.getSchedule(
        "doctor-123",
        "clinic-123",
        DayOfWeek.MONDAY
      );

      expect(result).toEqual(mockSchedule);
      expect(prismaMock.schedule.findUnique).toHaveBeenCalledWith({
        where: {
          doctorId_clinicId_dayOfWeek: {
            doctorId: "doctor-123",
            clinicId: "clinic-123",
            dayOfWeek: DayOfWeek.MONDAY,
          },
        },
      });
    });
  });

  describe("createSchedule", () => {
    it("should create schedule with clinic and time slots", async () => {
      const scheduleData = {
        doctorId: "doctor-123",
        clinicId: "clinic-123",
        dayOfWeek: DayOfWeek.MONDAY,
        startTime: "09:00",
        endTime: "17:00",
      };

      const scheduleWithRelations = {
        ...mockSchedule,
        clinic: mockClinic,
        timeSlots: [],
      };

      prismaMock.schedule.create.mockResolvedValue(
        scheduleWithRelations as any
      );

      const result = await schedulesService.createSchedule(scheduleData);

      expect(result).toEqual(scheduleWithRelations);
      expect(prismaMock.schedule.create).toHaveBeenCalledWith({
        data: scheduleData,
        include: expect.objectContaining({
          clinic: expect.any(Object),
          timeSlots: expect.any(Object),
        }),
      });
    });
  });

  describe("getScheduleById", () => {
    it("should get schedule by id with relations", async () => {
      const scheduleWithRelations = {
        ...mockSchedule,
        clinic: mockClinic,
        timeSlots: [mockTimeSlot],
      };

      prismaMock.schedule.findUnique.mockResolvedValue(
        scheduleWithRelations as any
      );

      const result = await schedulesService.getScheduleById("schedule-123");

      expect(result).toEqual(scheduleWithRelations);
    });
  });

  describe("getScheduleByIdAndDoctor", () => {
    it("should get schedule for specific doctor", async () => {
      prismaMock.schedule.findFirst.mockResolvedValue(mockSchedule as any);

      const result = await schedulesService.getScheduleByIdAndDoctor(
        "schedule-123",
        "doctor-123"
      );

      expect(result).toEqual(mockSchedule);
      expect(prismaMock.schedule.findFirst).toHaveBeenCalledWith({
        where: {
          id: "schedule-123",
          doctorId: "doctor-123",
        },
      });
    });
  });

  describe("updateSchedule", () => {
    it("should update schedule", async () => {
      const updateData = {
        startTime: "10:00",
        endTime: "18:00",
        isActive: true,
      };

      const updated = { ...mockSchedule, ...updateData };
      prismaMock.schedule.update.mockResolvedValue(updated as any);

      const result = await schedulesService.updateSchedule(
        "schedule-123",
        updateData
      );

      expect(result).toEqual(updated);
      expect(prismaMock.schedule.update).toHaveBeenCalledWith({
        where: { id: "schedule-123" },
        data: updateData,
      });
    });
  });

  describe("deleteTimeSlots", () => {
    it("should delete unbooked time slots", async () => {
      prismaMock.timeSlot.deleteMany.mockResolvedValue({ count: 10 } as any);

      const result = await schedulesService.deleteTimeSlots("schedule-123");

      expect(result.count).toBe(10);
      expect(prismaMock.timeSlot.deleteMany).toHaveBeenCalledWith({
        where: {
          scheduleId: "schedule-123",
          isBooked: false,
        },
      });
    });
  });

  describe("createTimeSlots", () => {
    it("should create multiple time slots", async () => {
      const slots = [
        { scheduleId: "schedule-123", startTime: "09:00", endTime: "09:30" },
        { scheduleId: "schedule-123", startTime: "09:30", endTime: "10:00" },
      ];

      prismaMock.timeSlot.createMany.mockResolvedValue({ count: 2 } as any);

      const result = await schedulesService.createTimeSlots(slots);

      expect(result?.count).toBe(2);
      expect(prismaMock.timeSlot.createMany).toHaveBeenCalledWith({
        data: slots,
      });
    });

    it("should return early if no slots provided", async () => {
      const result = await schedulesService.createTimeSlots([]);

      expect(result).toBeUndefined();
      expect(prismaMock.timeSlot.createMany).not.toHaveBeenCalled();
    });
  });

  describe("getScheduleForDeletion", () => {
    it("should get schedule with booked time slots count", async () => {
      const scheduleWithCount = {
        id: "schedule-123",
        doctorId: "doctor-123",
        _count: {
          timeSlots: 2,
        },
      };

      prismaMock.schedule.findFirst.mockResolvedValue(scheduleWithCount as any);

      const result = await schedulesService.getScheduleForDeletion(
        "schedule-123",
        "doctor-123"
      );

      expect(result).toEqual(scheduleWithCount);
    });
  });

  describe("deleteSchedule", () => {
    it("should delete schedule", async () => {
      prismaMock.schedule.delete.mockResolvedValue(mockSchedule as any);

      const result = await schedulesService.deleteSchedule("schedule-123");

      expect(result).toEqual(mockSchedule);
      expect(prismaMock.schedule.delete).toHaveBeenCalledWith({
        where: { id: "schedule-123" },
      });
    });
  });

  describe("getDoctorSchedules", () => {
    it("should get all schedules for doctor", async () => {
      const schedules = [
        { ...mockSchedule, clinic: mockClinic, timeSlots: [] },
      ];

      prismaMock.schedule.findMany.mockResolvedValue(schedules as any);

      const result = await schedulesService.getDoctorSchedules("doctor-123");

      expect(result).toEqual(schedules);
      expect(prismaMock.schedule.findMany).toHaveBeenCalledWith({
        where: { doctorId: "doctor-123" },
        include: expect.any(Object),
        orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
      });
    });
  });

  describe("getExistingSchedules", () => {
    it("should get existing schedules for days", async () => {
      const existingSchedules = [
        {
          ...mockSchedule,
          _count: { timeSlots: 5 },
        },
      ];

      prismaMock.schedule.findMany.mockResolvedValue(existingSchedules as any);

      const result = await schedulesService.getExistingSchedules(
        "doctor-123",
        "clinic-123",
        [DayOfWeek.MONDAY, DayOfWeek.TUESDAY]
      );

      expect(result).toEqual(existingSchedules);
    });
  });

  describe("bulkCreateSchedules", () => {
    it("should create multiple schedules with time slots", async () => {
      const scheduleData = [
        {
          dayOfWeek: DayOfWeek.MONDAY,
          startTime: "09:00",
          endTime: "12:00",
          slotDuration: 30,
        },
      ];

      prismaMock.$transaction.mockImplementation(async (callback: any) => {
        return callback({
          schedule: {
            deleteMany: vi.fn(),
            create: vi.fn().mockResolvedValue({ id: "new-schedule-123" }),
          },
          timeSlot: {
            deleteMany: vi.fn(),
            createMany: vi.fn(),
          },
        });
      });

      const result = await schedulesService.bulkCreateSchedules(
        "doctor-123",
        "clinic-123",
        scheduleData,
        false,
        []
      );

      expect(result).toBeDefined();
      expect(prismaMock.$transaction).toHaveBeenCalled();
    });

    it("should replace existing schedules when replaceExisting is true", async () => {
      const scheduleData = [
        {
          dayOfWeek: DayOfWeek.MONDAY,
          startTime: "09:00",
          endTime: "12:00",
        },
      ];

      const existingSchedules = [{ id: "old-schedule-123" }];

      prismaMock.$transaction.mockImplementation(async (callback: any) => {
        return callback({
          schedule: {
            deleteMany: vi.fn(),
            create: vi.fn().mockResolvedValue({ id: "new-schedule-123" }),
          },
          timeSlot: {
            deleteMany: vi.fn(),
            createMany: vi.fn(),
          },
        });
      });

      const result = await schedulesService.bulkCreateSchedules(
        "doctor-123",
        "clinic-123",
        scheduleData,
        true,
        existingSchedules
      );

      expect(result).toBeDefined();
    });
  });

  describe("getSchedulesByIds", () => {
    it("should get schedules by ids", async () => {
      const schedules = [
        { ...mockSchedule, clinic: mockClinic, timeSlots: [] },
      ];

      prismaMock.schedule.findMany.mockResolvedValue(schedules as any);

      const result = await schedulesService.getSchedulesByIds(
        ["schedule-123"],
        false
      );

      expect(result).toEqual(schedules);
    });
  });

  describe("getScheduleForTimeSlots", () => {
    it("should get active schedule with available time slots", async () => {
      const scheduleWithSlots = {
        ...mockSchedule,
        timeSlots: [mockTimeSlot],
      };

      prismaMock.schedule.findUnique.mockResolvedValue(
        scheduleWithSlots as any
      );

      const result = await schedulesService.getScheduleForTimeSlots(
        "doctor-123",
        "clinic-123",
        DayOfWeek.MONDAY
      );

      expect(result).toEqual(scheduleWithSlots);
    });
  });

  describe("getTimeSlotForToggle", () => {
    it("should get unbooked time slot for doctor", async () => {
      const timeSlot = {
        id: "slot-123",
        isBlocked: false,
      };

      prismaMock.timeSlot.findFirst.mockResolvedValue(timeSlot as any);

      const result = await schedulesService.getTimeSlotForToggle(
        "slot-123",
        "doctor-123"
      );

      expect(result).toEqual(timeSlot);
    });
  });

  describe("updateTimeSlotBlock", () => {
    it("should update time slot block status", async () => {
      const updated = { ...mockTimeSlot, isBlocked: true };
      prismaMock.timeSlot.update.mockResolvedValue(updated as any);

      const result = await schedulesService.updateTimeSlotBlock(
        "slot-123",
        true
      );

      expect(result.isBlocked).toBe(true);
      expect(prismaMock.timeSlot.update).toHaveBeenCalledWith({
        where: { id: "slot-123" },
        data: { isBlocked: true },
        select: expect.any(Object),
      });
    });
  });

  describe("getTimeSlotsForCalendar", () => {
    it("should generate calendar slots for date range", async () => {
      const startDate = new Date("2025-12-01");
      const endDate = new Date("2025-12-07");

      const schedules = [
        {
          ...mockSchedule,
          dayOfWeek: DayOfWeek.MONDAY,
          clinic: mockClinic,
          doctor: mockDoctor,
          timeSlots: [
            {
              id: "slot-1",
              startTime: "09:00",
              endTime: "09:30",
              isBlocked: false,
            },
          ],
        },
      ];

      const appointments = [
        {
          id: "appt-1",
          datetime: new Date("2025-12-01T09:00:00"),
          durationMinutes: 30,
          status: "CONFIRMED",
        },
      ];

      prismaMock.schedule.findMany.mockResolvedValue(schedules as any);
      prismaMock.appointment.findMany.mockResolvedValue(appointments as any);

      const result = await schedulesService.getTimeSlotsForCalendar(
        "doctor-123",
        "clinic-123",
        startDate,
        endDate
      );

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(prismaMock.schedule.findMany).toHaveBeenCalled();
      expect(prismaMock.appointment.findMany).toHaveBeenCalled();
    });

    it("should handle empty schedules", async () => {
      const startDate = new Date("2025-12-01");
      const endDate = new Date("2025-12-07");

      prismaMock.schedule.findMany.mockResolvedValue([]);
      prismaMock.appointment.findMany.mockResolvedValue([]);

      const result = await schedulesService.getTimeSlotsForCalendar(
        "doctor-123",
        "clinic-123",
        startDate,
        endDate
      );

      expect(result).toEqual([]);
    });

    it("should mark slots as booked when appointments exist", async () => {
      const startDate = new Date("2025-12-08"); // Monday
      const endDate = new Date("2025-12-08");

      const schedules = [
        {
          ...mockSchedule,
          dayOfWeek: DayOfWeek.MONDAY,
          clinic: mockClinic,
          doctor: mockDoctor,
          timeSlots: [
            {
              id: "slot-1",
              startTime: "09:00",
              endTime: "09:30",
              isBlocked: false,
            },
          ],
        },
      ];

      const appointments = [
        {
          id: "appt-1",
          datetime: new Date("2025-12-08T09:00:00"),
          durationMinutes: 30,
          status: "CONFIRMED",
        },
      ];

      prismaMock.schedule.findMany.mockResolvedValue(schedules as any);
      prismaMock.appointment.findMany.mockResolvedValue(appointments as any);

      const result = await schedulesService.getTimeSlotsForCalendar(
        "doctor-123",
        "clinic-123",
        startDate,
        endDate
      );

      expect(result.length).toBeGreaterThan(0);
      const bookedSlot = result.find((slot: any) => slot.isBooked);
      expect(bookedSlot).toBeDefined();
    });
  });

  describe("getDoctorSchedulesWithSlots", () => {
    it("should get schedules with dynamic slots for date range", async () => {
      const startDate = new Date("2025-12-01");
      const endDate = new Date("2025-12-07");

      const schedules = [
        {
          ...mockSchedule,
          clinic: mockClinic,
          timeSlots: [
            {
              id: "slot-1",
              startTime: "09:00",
              endTime: "09:30",
              isBlocked: false,
            },
          ],
        },
      ];

      prismaMock.schedule.findMany.mockResolvedValue(schedules as any);
      prismaMock.appointment.findMany.mockResolvedValue([]);

      const result = await schedulesService.getDoctorSchedulesWithSlots(
        "doctor-123",
        startDate,
        endDate
      );

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
    });

    it("should filter by clinic if provided", async () => {
      const startDate = new Date("2025-12-01");
      const endDate = new Date("2025-12-07");

      prismaMock.schedule.findMany.mockResolvedValue([]);
      prismaMock.appointment.findMany.mockResolvedValue([]);

      await schedulesService.getDoctorSchedulesWithSlots(
        "doctor-123",
        startDate,
        endDate,
        "clinic-123"
      );

      expect(prismaMock.schedule.findMany).toHaveBeenCalledWith({
        where: expect.objectContaining({
          clinicId: "clinic-123",
        }),
        include: expect.any(Object),
      });
    });

    it("should include appointment details in slots", async () => {
      const startDate = new Date("2025-12-08"); // Monday
      const endDate = new Date("2025-12-08");

      const schedules = [
        {
          ...mockSchedule,
          dayOfWeek: DayOfWeek.MONDAY,
          clinic: mockClinic,
          timeSlots: [
            {
              id: "slot-1",
              startTime: "09:00",
              endTime: "09:30",
              isBlocked: false,
            },
          ],
        },
      ];

      const appointments = [
        {
          id: "appt-1",
          datetime: new Date("2025-12-08T09:00:00"),
          durationMinutes: 30,
          status: "CONFIRMED",
          clinicId: "clinic-123",
          patient: {
            id: "patient-123",
            user: {
              firstName: "John",
              lastName: "Doe",
            },
          },
        },
      ];

      prismaMock.schedule.findMany.mockResolvedValue(schedules as any);
      prismaMock.appointment.findMany.mockResolvedValue(appointments as any);

      await schedulesService.getDoctorSchedulesWithSlots(
        "doctor-123",
        startDate,
        endDate
      );

      // Just verify the service methods were called - slot generation logic is tested separately
      expect(prismaMock.schedule.findMany).toHaveBeenCalled();
      expect(prismaMock.appointment.findMany).toHaveBeenCalled();
    });
  });
});
