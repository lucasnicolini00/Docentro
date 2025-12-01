import { describe, it, expect, vi, beforeEach } from "vitest";
import { mockDeep, mockReset, type DeepMockProxy } from "vitest-mock-extended";
import type { PrismaClient } from "@prisma/client";
import { patientsService } from "@/lib/services/patientsService";
import prisma from "@/lib/prisma";
import { mockPatient } from "../utils/mocks";

vi.mock("@/lib/prisma", () => ({
  default: mockDeep<PrismaClient>(),
}));

const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

describe("patientsService", () => {
  beforeEach(() => {
    mockReset(prismaMock);
  });

  describe("updatePatientProfile", () => {
    it("should update patient profile in transaction", async () => {
      const updateData = {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@example.com",
        phone: "+1234567890",
        patientName: "Jane",
        patientSurname: "Smith",
        patientEmail: "jane.patient@example.com",
        patientPhone: "+0987654321",
        birthdate: "1990-01-01",
        gender: "female",
      };

      prismaMock.$transaction.mockImplementation(async (callback: any) => {
        return callback({
          user: {
            update: vi.fn().mockResolvedValue({
              id: "user-123",
              firstName: "Jane",
              lastName: "Smith",
            }),
          },
          patient: {
            update: vi.fn().mockResolvedValue({
              id: "patient-123",
              name: "Jane",
              surname: "Smith",
            }),
          },
        });
      });

      const result = await patientsService.updatePatientProfile(
        "user-123",
        "patient-123",
        updateData
      );

      expect(result.updatedUser).toBeDefined();
      expect(result.updatedPatient).toBeDefined();
      expect(prismaMock.$transaction).toHaveBeenCalled();
    });

    it("should handle null optional fields", async () => {
      const updateData = {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@example.com",
        phone: "",
        patientName: "Jane",
        patientSurname: "Smith",
        patientEmail: "jane.patient@example.com",
        patientPhone: "",
        birthdate: "",
        gender: "",
      };

      prismaMock.$transaction.mockImplementation(async (callback: any) => {
        return callback({
          user: {
            update: vi.fn().mockResolvedValue({ id: "user-123" }),
          },
          patient: {
            update: vi.fn().mockResolvedValue({ id: "patient-123" }),
          },
        });
      });

      await patientsService.updatePatientProfile(
        "user-123",
        "patient-123",
        updateData
      );

      expect(prismaMock.$transaction).toHaveBeenCalled();
    });
  });

  describe("getPatientDashboard", () => {
    it("should get patient dashboard with appointments", async () => {
      const dashboardData = {
        ...mockPatient,
        appointments: [
          {
            id: "appt-1",
            datetime: new Date("2025-12-01"),
            doctor: {
              id: "doctor-123",
              user: {
                firstName: "John",
                lastName: "Doe",
              },
            },
            clinic: {
              id: "clinic-123",
              name: "Test Clinic",
            },
          },
        ],
      };

      prismaMock.patient.findUnique.mockResolvedValue(dashboardData as any);

      const result = await patientsService.getPatientDashboard("patient-123");

      expect(result).toEqual(dashboardData);
      expect(prismaMock.patient.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: "patient-123" },
        })
      );
    });

    it("should return null if patient not found", async () => {
      prismaMock.patient.findUnique.mockResolvedValue(null);

      const result = await patientsService.getPatientDashboard("invalid-id");

      expect(result).toBeNull();
    });
  });
});
