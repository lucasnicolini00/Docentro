import { describe, it, expect, vi, beforeEach } from "vitest";
import { mockDeep, mockReset, type DeepMockProxy } from "vitest-mock-extended";
import type { PrismaClient } from "@prisma/client";
import { timeSlotsService } from "@/lib/services/timeSlotsService";
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
  timeSlots: [],
};

describe("timeSlotsService", () => {
  beforeEach(() => {
    mockReset(prismaMock);
  });

  describe("getDoctor", () => {
    it("should get doctor with user and specialities", async () => {
      const doctorWithRelations = {
        ...mockDoctor,
        user: { id: "user-123", firstName: "John", lastName: "Doe" },
        specialities: [],
      };

      prismaMock.doctor.findUnique.mockResolvedValue(
        doctorWithRelations as any
      );

      const result = await timeSlotsService.getDoctor("doctor-123");

      expect(result).toEqual(doctorWithRelations);
      expect(prismaMock.doctor.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: "doctor-123" },
        })
      );
    });
  });

  describe("getClinic", () => {
    it("should get clinic by id", async () => {
      prismaMock.clinic.findUnique.mockResolvedValue(mockClinic as any);

      const result = await timeSlotsService.getClinic("clinic-123");

      expect(result).toEqual(mockClinic);
      expect(prismaMock.clinic.findUnique).toHaveBeenCalledWith({
        where: { id: "clinic-123" },
      });
    });
  });

  describe("getScheduleForDay", () => {
    it("should get active schedule with available time slots", async () => {
      const scheduleWithSlots = {
        ...mockSchedule,
        timeSlots: [
          {
            id: "slot-1",
            startTime: "09:00",
            endTime: "09:30",
            isBooked: false,
            isBlocked: false,
          },
        ],
      };

      prismaMock.schedule.findFirst.mockResolvedValue(scheduleWithSlots as any);

      const result = await timeSlotsService.getScheduleForDay(
        "doctor-123",
        "clinic-123",
        DayOfWeek.MONDAY
      );

      expect(result).toEqual(scheduleWithSlots);
      expect(prismaMock.schedule.findFirst).toHaveBeenCalledWith({
        where: {
          doctorId: "doctor-123",
          clinicId: "clinic-123",
          dayOfWeek: DayOfWeek.MONDAY,
          isActive: true,
        },
        include: expect.any(Object),
      });
    });

    it("should return null if no schedule found", async () => {
      prismaMock.schedule.findFirst.mockResolvedValue(null);

      const result = await timeSlotsService.getScheduleForDay(
        "doctor-123",
        "clinic-123",
        DayOfWeek.MONDAY
      );

      expect(result).toBeNull();
    });
  });

  describe("getDoctorWeeklySchedule", () => {
    it("should get all active schedules for doctor", async () => {
      const schedules = [
        {
          ...mockSchedule,
          clinic: mockClinic,
          timeSlots: [
            {
              id: "slot-1",
              appointment: null,
            },
          ],
        },
      ];

      prismaMock.schedule.findMany.mockResolvedValue(schedules as any);

      const result =
        await timeSlotsService.getDoctorWeeklySchedule("doctor-123");

      expect(result).toEqual(schedules);
      expect(prismaMock.schedule.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            doctorId: "doctor-123",
            isActive: true,
          },
          orderBy: {
            dayOfWeek: "asc",
          },
        })
      );
    });
  });

  describe("getAvailabilityOverview", () => {
    it("should get availability overview for doctor", async () => {
      const schedules = [
        {
          ...mockSchedule,
          clinic: mockClinic,
          timeSlots: [
            {
              id: "slot-1",
              startTime: "09:00",
              endTime: "09:30",
              isBooked: false,
              isBlocked: false,
            },
          ],
        },
      ];

      prismaMock.schedule.findMany.mockResolvedValue(schedules as any);

      const result =
        await timeSlotsService.getAvailabilityOverview("doctor-123");

      expect(result).toEqual(schedules);
    });

    it("should filter by clinic if provided", async () => {
      prismaMock.schedule.findMany.mockResolvedValue([]);

      await timeSlotsService.getAvailabilityOverview(
        "doctor-123",
        "clinic-123"
      );

      expect(prismaMock.schedule.findMany).toHaveBeenCalledWith({
        where: expect.objectContaining({
          doctorId: "doctor-123",
          clinicId: "clinic-123",
        }),
        include: expect.any(Object),
        orderBy: {
          dayOfWeek: "asc",
        },
      });
    });
  });
});
