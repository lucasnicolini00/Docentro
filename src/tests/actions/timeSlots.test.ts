import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  getTimeSlotsForBooking,
  getDoctorWeeklySchedule,
  getAvailabilityOverview,
  getTimeSlotsForCalendarAction,
} from "@/lib/actions/timeSlots";
import { validateAuth } from "@/lib/actions/utils";
import { timeSlotsService } from "@/lib/services/timeSlotsService";
import { getTimeSlotsForCalendar } from "@/lib/actions/schedules";
import { mockDoctor, mockClinic, mockSession } from "../utils/mocks";
import { DayOfWeek } from "@prisma/client";

vi.mock("@/lib/actions/utils");
vi.mock("@/lib/services/timeSlotsService");
vi.mock("@/lib/actions/schedules");

const mockSchedule = {
  id: "schedule-123",
  dayOfWeek: DayOfWeek.MONDAY,
  startTime: "09:00",
  endTime: "17:00",
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

describe("timeSlots actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getTimeSlotsForBooking", () => {
    it("should get time slots for booking", async () => {
      vi.mocked(validateAuth).mockResolvedValue(mockSession as any);
      vi.mocked(timeSlotsService.getDoctor).mockResolvedValue({
        ...mockDoctor,
        specialities: [{ speciality: { name: "Cardiology" } }],
      } as any);
      vi.mocked(timeSlotsService.getClinic).mockResolvedValue(
        mockClinic as any
      );
      vi.mocked(timeSlotsService.getScheduleForDay).mockResolvedValue(
        mockSchedule as any
      );

      const result = await getTimeSlotsForBooking(
        "doctor-123",
        "clinic-123",
        DayOfWeek.MONDAY
      );

      expect(result.success).toBe(true);
      expect(result.data?.timeSlots).toHaveLength(1);
      expect(result.data?.doctor).toBeDefined();
      expect(result.data?.clinic).toBeDefined();
    });

    it("should return error if authentication fails", async () => {
      vi.mocked(validateAuth).mockResolvedValue(null);

      const result = await getTimeSlotsForBooking(
        "doctor-123",
        "clinic-123",
        DayOfWeek.MONDAY
      );

      expect(result.success).toBe(false);
      expect(result.error).toBe("Authentication failed");
    });

    it("should return error if parameters missing", async () => {
      vi.mocked(validateAuth).mockResolvedValue(mockSession as any);

      const result = await getTimeSlotsForBooking("", "", DayOfWeek.MONDAY);

      expect(result.success).toBe(false);
      expect(result.error).toBe("Parámetros requeridos faltantes");
    });

    it("should return error if doctor not found", async () => {
      vi.mocked(validateAuth).mockResolvedValue(mockSession as any);
      vi.mocked(timeSlotsService.getDoctor).mockResolvedValue(null);

      const result = await getTimeSlotsForBooking(
        "doctor-123",
        "clinic-123",
        DayOfWeek.MONDAY
      );

      expect(result.success).toBe(false);
      expect(result.error).toBe("Doctor no encontrado");
    });

    it("should return error if clinic not found", async () => {
      vi.mocked(validateAuth).mockResolvedValue(mockSession as any);
      vi.mocked(timeSlotsService.getDoctor).mockResolvedValue(
        mockDoctor as any
      );
      vi.mocked(timeSlotsService.getClinic).mockResolvedValue(null);

      const result = await getTimeSlotsForBooking(
        "doctor-123",
        "clinic-123",
        DayOfWeek.MONDAY
      );

      expect(result.success).toBe(false);
      expect(result.error).toBe("Clínica no encontrada");
    });

    it("should return empty slots if no schedule for day", async () => {
      vi.mocked(validateAuth).mockResolvedValue(mockSession as any);
      vi.mocked(timeSlotsService.getDoctor).mockResolvedValue({
        ...mockDoctor,
        specialities: [],
      } as any);
      vi.mocked(timeSlotsService.getClinic).mockResolvedValue(
        mockClinic as any
      );
      vi.mocked(timeSlotsService.getScheduleForDay).mockResolvedValue(null);

      const result = await getTimeSlotsForBooking(
        "doctor-123",
        "clinic-123",
        DayOfWeek.MONDAY
      );

      expect(result.success).toBe(true);
      expect(result.data?.timeSlots).toEqual([]);
      expect(result.data?.message).toBe(
        "No hay horarios disponibles para este día"
      );
    });
  });

  describe("getDoctorWeeklySchedule", () => {
    it("should get doctor weekly schedule", async () => {
      vi.mocked(validateAuth).mockResolvedValue(mockSession as any);
      vi.mocked(timeSlotsService.getDoctorWeeklySchedule).mockResolvedValue([
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
              appointment: null,
            },
          ],
        },
      ] as any);

      const result = await getDoctorWeeklySchedule("doctor-123");

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
      expect(result.data?.[0].totalSlots).toBe(1);
      expect(result.data?.[0].availableSlots).toBe(1);
    });

    it("should return error if authentication fails", async () => {
      vi.mocked(validateAuth).mockResolvedValue(null);

      const result = await getDoctorWeeklySchedule("doctor-123");

      expect(result.success).toBe(false);
      expect(result.error).toBe("Authentication failed");
    });
  });

  describe("getAvailabilityOverview", () => {
    it("should get availability overview", async () => {
      vi.mocked(validateAuth).mockResolvedValue(mockSession as any);
      vi.mocked(timeSlotsService.getAvailabilityOverview).mockResolvedValue([
        {
          ...mockSchedule,
          clinic: mockClinic,
          timeSlots: [
            {
              id: "slot-1",
              startTime: "09:00",
              endTime: "09:30",
            },
          ],
        },
      ] as any);

      const result = await getAvailabilityOverview("doctor-123");

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
      expect(result.data?.[0].totalAvailable).toBe(1);
    });

    it("should filter by clinic if provided", async () => {
      vi.mocked(validateAuth).mockResolvedValue(mockSession as any);
      vi.mocked(timeSlotsService.getAvailabilityOverview).mockResolvedValue([]);

      await getAvailabilityOverview("doctor-123", "clinic-123");

      expect(timeSlotsService.getAvailabilityOverview).toHaveBeenCalledWith(
        "doctor-123",
        "clinic-123"
      );
    });

    it("should return error if authentication fails", async () => {
      vi.mocked(validateAuth).mockResolvedValue(null);

      const result = await getAvailabilityOverview("doctor-123");

      expect(result.success).toBe(false);
      expect(result.error).toBe("Authentication failed");
    });
  });

  describe("getTimeSlotsForCalendarAction", () => {
    it("should get time slots for calendar", async () => {
      vi.mocked(validateAuth).mockResolvedValue(mockSession as any);
      vi.mocked(getTimeSlotsForCalendar).mockResolvedValue([
        {
          id: "virtual-slot-1",
          startTime: new Date().toISOString(),
          endTime: new Date().toISOString(),
          isBooked: false,
          isBlocked: false,
          appointment: null,
          schedule: {
            doctor: {
              id: "doctor-123",
              user: { firstName: "John", lastName: "Doe" },
            },
            clinic: { name: "Test Clinic" },
          },
        },
      ] as any);

      const result = await getTimeSlotsForCalendarAction(
        "doctor-123",
        "clinic-123"
      );

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
      expect(result.data?.[0].isAvailable).toBe(true);
    });

    it("should return error if parameters missing", async () => {
      vi.mocked(validateAuth).mockResolvedValue(mockSession as any);

      const result = await getTimeSlotsForCalendarAction("", "");

      expect(result.success).toBe(false);
      expect(result.error).toBe("Doctor ID y Clinic ID son requeridos");
    });

    it("should mark slot as unavailable if booked", async () => {
      vi.mocked(validateAuth).mockResolvedValue(mockSession as any);
      vi.mocked(getTimeSlotsForCalendar).mockResolvedValue([
        {
          id: "virtual-slot-1",
          startTime: new Date().toISOString(),
          endTime: new Date().toISOString(),
          isBooked: true,
          isBlocked: false,
          appointment: { id: "appt-1", status: "CONFIRMED" },
          schedule: null,
        },
      ] as any);

      const result = await getTimeSlotsForCalendarAction(
        "doctor-123",
        "clinic-123"
      );

      expect(result.success).toBe(true);
      expect(result.data?.[0].isAvailable).toBe(false);
    });
  });
});
