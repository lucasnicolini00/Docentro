import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  getDashboardStats,
  getRecentActivities,
  getUpcomingAppointments,
  getScheduleAnalytics,
  getPatientAnalytics,
  getRevenueAnalytics,
} from "@/lib/actions/analytics";
import { validateDoctor } from "@/lib/actions/utils";
import { analyticsService } from "@/lib/services/analyticsService";
import { mockDoctor, mockSession, mockPatient } from "../utils/mocks";

vi.mock("@/lib/actions/utils");
vi.mock("@/lib/services/analyticsService");

const mockStats = {
  today_appointments: 5,
  yesterday_appointments: 3,
  week_appointments: 20,
  last_week_appointments: 15,
  pending_bookings: 2,
  total_patients: 50,
  last_month_patients: 10,
  monthly_revenue: 500000,
  last_month_revenue: 0,
  total_slots: 100,
  booked_slots: 60,
  last_month_total_slots: 100,
  last_month_booked_slots: 50,
  utilization_rate: 60,
  last_month_utilization: 50,
};

const mockAppointment = {
  id: "appt-123",
  doctorId: "doctor-123",
  patientId: "patient-123",
  datetime: new Date("2025-12-01T10:00:00"),
  status: "CONFIRMED",
  patient: {
    ...mockPatient,
    user: {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
    },
  },
  clinic: { name: "Test Clinic", address: "123 Main St" },
  pricing: { price: 50000, title: "Consultation" },
};

describe("analytics actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getDashboardStats", () => {
    it("should get dashboard statistics", async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        doctor: mockDoctor,
        session: mockSession,
      } as any);

      vi.mocked(analyticsService.getDashboardStats).mockResolvedValue([
        mockStats,
      ] as any);

      const result = await getDashboardStats();

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockStats);
      expect(analyticsService.getDashboardStats).toHaveBeenCalledWith(
        "doctor-123"
      );
    });

    it("should return error if validation fails", async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        error: "No autorizado",
      } as any);

      const result = await getDashboardStats();

      expect(result.success).toBe(false);
      expect(result.error).toBe("No autorizado");
    });

    it("should return error if no stats available", async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        doctor: mockDoctor,
        session: mockSession,
      } as any);

      vi.mocked(analyticsService.getDashboardStats).mockResolvedValue([]);

      const result = await getDashboardStats();

      expect(result.success).toBe(false);
      expect(result.error).toBe("No se pudieron obtener las estadísticas");
    });
  });

  describe("getRecentActivities", () => {
    it("should get recent activities", async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        doctor: mockDoctor,
        session: mockSession,
      } as any);

      const activities = [
        {
          type: "appointment",
          title: "Nueva cita programada",
          description: "Cita con John Doe",
          timestamp: new Date(),
        },
      ];

      vi.mocked(analyticsService.getRecentActivities).mockResolvedValue(
        activities as any
      );

      const result = await getRecentActivities();

      expect(result.success).toBe(true);
      expect(result.data).toEqual(activities);
    });

    it("should return error if validation fails", async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        error: "No autorizado",
      } as any);

      const result = await getRecentActivities();

      expect(result.success).toBe(false);
      expect(result.error).toBe("No autorizado");
    });
  });

  describe("getUpcomingAppointments", () => {
    it("should get upcoming appointments", async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        doctor: mockDoctor,
        session: mockSession,
      } as any);

      vi.mocked(analyticsService.getUpcomingAppointments).mockResolvedValue([
        mockAppointment,
      ] as any);

      const result = await getUpcomingAppointments();

      expect(result.success).toBe(true);
      expect(result.data).toEqual([mockAppointment]);
    });

    it("should return error if validation fails", async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        error: "No autorizado",
      } as any);

      const result = await getUpcomingAppointments();

      expect(result.success).toBe(false);
      expect(result.error).toBe("No autorizado");
    });
  });

  describe("getScheduleAnalytics", () => {
    it("should get schedule analytics for current doctor", async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        doctor: mockDoctor,
        session: mockSession,
      } as any);

      vi.mocked(analyticsService.getDashboardStats).mockResolvedValue([
        mockStats,
      ] as any);

      const result = await getScheduleAnalytics("week");

      expect(result.success).toBe(true);
      expect(result.data).toEqual({
        totalSlots: mockStats.total_slots,
        bookedSlots: mockStats.booked_slots,
        availableSlots: mockStats.total_slots - mockStats.booked_slots,
        blockedSlots: 0,
        utilizationRate: mockStats.utilization_rate,
        weeklyOverview: [],
        peakHours: [],
        insights: [],
      });
    });

    it("should get schedule analytics for specific doctor", async () => {
      vi.mocked(analyticsService.getDashboardStats).mockResolvedValue([
        mockStats,
      ] as any);

      const result = await getScheduleAnalytics("week", "doctor-456");

      expect(result.success).toBe(true);
      expect(analyticsService.getDashboardStats).toHaveBeenCalledWith(
        "doctor-456"
      );
    });

    it("should return error if no analytics available", async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        doctor: mockDoctor,
        session: mockSession,
      } as any);

      vi.mocked(analyticsService.getDashboardStats).mockResolvedValue([]);

      const result = await getScheduleAnalytics("week");

      expect(result.success).toBe(false);
      expect(result.error).toBe("No schedule analytics available");
    });
  });

  describe("getPatientAnalytics", () => {
    it("should get patient analytics for current doctor", async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        doctor: mockDoctor,
        session: mockSession,
      } as any);

      const appointments = [mockAppointment];
      vi.mocked(analyticsService.getPatientAnalytics).mockResolvedValue(
        appointments as any
      );

      const result = await getPatientAnalytics();

      expect(result.success).toBe(true);
      expect(result.data).toEqual(appointments);
      expect(analyticsService.getPatientAnalytics).toHaveBeenCalledWith(
        "doctor-123",
        "month"
      );
    });

    it("should get patient analytics for specific doctor and time range", async () => {
      vi.mocked(analyticsService.getPatientAnalytics).mockResolvedValue([]);

      const result = await getPatientAnalytics("doctor-456", "quarter");

      expect(result.success).toBe(true);
      expect(analyticsService.getPatientAnalytics).toHaveBeenCalledWith(
        "doctor-456",
        "quarter"
      );
    });

    it("should return error if validation fails", async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        error: "No autorizado",
      } as any);

      const result = await getPatientAnalytics();

      expect(result.success).toBe(false);
      expect(result.error).toBe("No autorizado");
    });
  });

  describe("getRevenueAnalytics", () => {
    it("should get revenue analytics for current doctor", async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        doctor: mockDoctor,
        session: mockSession,
      } as any);

      const revenueData = {
        completedAppointments: [mockAppointment],
        previousMonthAppointments: 10,
      };

      vi.mocked(analyticsService.getRevenueAnalytics).mockResolvedValue(
        revenueData as any
      );

      const result = await getRevenueAnalytics();

      expect(result.success).toBe(true);
      expect(result.data).toEqual(revenueData);
      expect(analyticsService.getRevenueAnalytics).toHaveBeenCalledWith(
        "doctor-123",
        "month"
      );
    });

    it("should get revenue analytics for specific doctor and time range", async () => {
      const revenueData = {
        completedAppointments: [],
        previousMonthAppointments: 5,
      };

      vi.mocked(analyticsService.getRevenueAnalytics).mockResolvedValue(
        revenueData as any
      );

      const result = await getRevenueAnalytics("doctor-456", "year");

      expect(result.success).toBe(true);
      expect(analyticsService.getRevenueAnalytics).toHaveBeenCalledWith(
        "doctor-456",
        "year"
      );
    });

    it("should return error if validation fails", async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        error: "No autorizado",
      } as any);

      const result = await getRevenueAnalytics();

      expect(result.success).toBe(false);
      expect(result.error).toBe("No autorizado");
    });
  });
});
