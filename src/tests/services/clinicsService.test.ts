import { describe, it, expect, vi, beforeEach } from "vitest";
import { mockDeep, mockReset, type DeepMockProxy } from "vitest-mock-extended";
import type { PrismaClient } from "@prisma/client";
import { clinicsService } from "@/lib/services/clinicsService";
import prisma from "@/lib/prisma";
import { mockDoctor, mockClinic } from "../utils/mocks";

vi.mock("@/lib/prisma", () => ({
  default: mockDeep<PrismaClient>(),
}));

const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

describe("clinicsService", () => {
  beforeEach(() => {
    mockReset(prismaMock);
  });

  describe("getDoctorClinics", () => {
    it("should get doctor clinics with pricing", async () => {
      prismaMock.doctor.findUnique.mockResolvedValue(mockDoctor as any);

      const doctorClinics = [
        {
          doctorId: "doctor-123",
          clinicId: "clinic-123",
          clinic: {
            ...mockClinic,
            pricing: [
              {
                id: "pricing-1",
                title: "Consulta",
                price: 100,
                currency: "BOB",
                durationMinutes: 30,
                isActive: true,
                deletedAt: null,
              },
            ],
          },
        },
      ];

      prismaMock.doctorClinic.findMany.mockResolvedValue(doctorClinics as any);

      const result = await clinicsService.getDoctorClinics("user-123");

      expect(result).toEqual(doctorClinics);
      expect(prismaMock.doctor.findUnique).toHaveBeenCalledWith({
        where: { userId: "user-123" },
      });
    });

    it("should throw error if doctor not found", async () => {
      prismaMock.doctor.findUnique.mockResolvedValue(null);

      await expect(
        clinicsService.getDoctorClinics("invalid-user")
      ).rejects.toThrow("Doctor not found");
    });
  });

  describe("createClinic", () => {
    it("should create clinic and link to doctor", async () => {
      const clinicData = {
        name: "Test Clinic",
        address: "123 Main St",
        isVirtual: false,
        city: "Test City",
        country: "Test Country",
      };

      prismaMock.doctor.findUnique.mockResolvedValue(mockDoctor as any);
      prismaMock.clinic.create.mockResolvedValue(mockClinic as any);
      prismaMock.doctorClinic.create.mockResolvedValue({} as any);

      const result = await clinicsService.createClinic("user-123", clinicData);

      expect(result).toEqual(mockClinic);
      expect(prismaMock.clinic.create).toHaveBeenCalled();
      expect(prismaMock.doctorClinic.create).toHaveBeenCalled();
    });

    it("should throw error if doctor not found", async () => {
      prismaMock.doctor.findUnique.mockResolvedValue(null);

      await expect(
        clinicsService.createClinic("invalid-user", {} as any)
      ).rejects.toThrow("Doctor not found");
    });
  });

  describe("updateClinic", () => {
    it("should update clinic if doctor has access", async () => {
      const updateData = {
        name: "Updated Clinic",
        address: "456 New St",
        isVirtual: true,
      };

      prismaMock.doctor.findUnique.mockResolvedValue(mockDoctor as any);
      prismaMock.doctorClinic.findUnique.mockResolvedValue({
        doctorId: "doctor-123",
        clinicId: "clinic-123",
      } as any);
      prismaMock.clinic.update.mockResolvedValue({
        ...mockClinic,
        ...updateData,
      } as any);

      const result = await clinicsService.updateClinic(
        "user-123",
        "clinic-123",
        updateData
      );

      expect(result.name).toBe("Updated Clinic");
      expect(prismaMock.clinic.update).toHaveBeenCalled();
    });

    it("should throw error if doctor has no access", async () => {
      prismaMock.doctor.findUnique.mockResolvedValue(mockDoctor as any);
      prismaMock.doctorClinic.findUnique.mockResolvedValue(null);

      await expect(
        clinicsService.updateClinic("user-123", "clinic-123", {} as any)
      ).rejects.toThrow("No tienes acceso a esta clínica");
    });
  });

  describe("createPricing", () => {
    it("should create pricing if doctor has access to clinic", async () => {
      const pricingData = {
        clinicId: "clinic-123",
        title: "Consulta",
        price: 100,
        currency: "BOB",
        durationMinutes: 30,
        isActive: true,
      };

      prismaMock.doctor.findUnique.mockResolvedValue(mockDoctor as any);
      prismaMock.doctorClinic.findUnique.mockResolvedValue({
        doctorId: "doctor-123",
        clinicId: "clinic-123",
      } as any);
      prismaMock.pricing.create.mockResolvedValue({
        id: "pricing-1",
        ...pricingData,
        doctorId: "doctor-123",
      } as any);

      const result = await clinicsService.createPricing(
        "user-123",
        pricingData
      );

      expect(result.title).toBe("Consulta");
      expect(prismaMock.pricing.create).toHaveBeenCalled();
    });

    it("should throw error if doctor has no access to clinic", async () => {
      prismaMock.doctor.findUnique.mockResolvedValue(mockDoctor as any);
      prismaMock.doctorClinic.findUnique.mockResolvedValue(null);

      await expect(
        clinicsService.createPricing("user-123", {
          clinicId: "clinic-123",
        } as any)
      ).rejects.toThrow("No tienes acceso a esta clínica");
    });
  });

  describe("updatePricing", () => {
    it("should update pricing if doctor owns it", async () => {
      const updateData = {
        title: "Updated Pricing",
        price: 150,
        currency: "BOB",
        durationMinutes: 45,
        isActive: true,
      };

      prismaMock.doctor.findUnique.mockResolvedValue(mockDoctor as any);
      prismaMock.pricing.findUnique.mockResolvedValue({
        id: "pricing-1",
        doctorId: "doctor-123",
      } as any);
      prismaMock.pricing.update.mockResolvedValue({
        id: "pricing-1",
        ...updateData,
      } as any);

      const result = await clinicsService.updatePricing(
        "user-123",
        "pricing-1",
        updateData
      );

      expect(result.title).toBe("Updated Pricing");
      expect(prismaMock.pricing.update).toHaveBeenCalled();
    });

    it("should throw error if pricing not owned by doctor", async () => {
      prismaMock.doctor.findUnique.mockResolvedValue(mockDoctor as any);
      prismaMock.pricing.findUnique.mockResolvedValue({
        id: "pricing-1",
        doctorId: "other-doctor",
      } as any);

      await expect(
        clinicsService.updatePricing("user-123", "pricing-1", {} as any)
      ).rejects.toThrow("No tienes acceso a esta tarifa");
    });
  });

  describe("togglePricingStatus", () => {
    it("should toggle pricing status", async () => {
      prismaMock.doctor.findUnique.mockResolvedValue(mockDoctor as any);
      prismaMock.pricing.findUnique.mockResolvedValue({
        id: "pricing-1",
        doctorId: "doctor-123",
        isActive: true,
      } as any);
      prismaMock.pricing.update.mockResolvedValue({
        id: "pricing-1",
        isActive: false,
      } as any);

      const result = await clinicsService.togglePricingStatus(
        "user-123",
        "pricing-1"
      );

      expect(result.isActive).toBe(false);
      expect(prismaMock.pricing.update).toHaveBeenCalledWith({
        where: { id: "pricing-1" },
        data: { isActive: false },
      });
    });
  });

  describe("deletePricing", () => {
    it("should soft delete pricing", async () => {
      prismaMock.doctor.findUnique.mockResolvedValue(mockDoctor as any);
      prismaMock.pricing.findFirst.mockResolvedValue({
        id: "pricing-1",
        doctorId: "doctor-123",
        deletedAt: null,
      } as any);
      prismaMock.pricing.update.mockResolvedValue({
        id: "pricing-1",
        deletedAt: new Date(),
      } as any);

      const result = await clinicsService.deletePricing(
        "user-123",
        "pricing-1"
      );

      expect(result.deletedAt).toBeDefined();
      expect(prismaMock.pricing.update).toHaveBeenCalled();
    });

    it("should throw error if pricing not found", async () => {
      prismaMock.doctor.findUnique.mockResolvedValue(mockDoctor as any);
      prismaMock.pricing.findFirst.mockResolvedValue(null);

      await expect(
        clinicsService.deletePricing("user-123", "pricing-1")
      ).rejects.toThrow("Tarifa no encontrada");
    });
  });

  describe("deleteClinic", () => {
    it("should soft delete clinic if no active appointments", async () => {
      prismaMock.doctor.findUnique.mockResolvedValue(mockDoctor as any);
      prismaMock.doctorClinic.findUnique.mockResolvedValue({
        doctorId: "doctor-123",
        clinicId: "clinic-123",
      } as any);
      prismaMock.appointment.findFirst.mockResolvedValue(null);
      prismaMock.clinic.update.mockResolvedValue({
        ...mockClinic,
        deletedAt: new Date(),
      } as any);

      const result = await clinicsService.deleteClinic(
        "user-123",
        "clinic-123"
      );

      expect(result.deletedAt).toBeDefined();
      expect(prismaMock.clinic.update).toHaveBeenCalled();
    });

    it("should throw error if clinic has active appointments", async () => {
      prismaMock.doctor.findUnique.mockResolvedValue(mockDoctor as any);
      prismaMock.doctorClinic.findUnique.mockResolvedValue({
        doctorId: "doctor-123",
        clinicId: "clinic-123",
      } as any);
      prismaMock.appointment.findFirst.mockResolvedValue({
        id: "appt-1",
        status: "CONFIRMED",
      } as any);

      await expect(
        clinicsService.deleteClinic("user-123", "clinic-123")
      ).rejects.toThrow(
        "No se puede eliminar la clínica porque tiene citas pendientes o confirmadas"
      );
    });

    it("should throw error if doctor has no access", async () => {
      prismaMock.doctor.findUnique.mockResolvedValue(mockDoctor as any);
      prismaMock.doctorClinic.findUnique.mockResolvedValue(null);

      await expect(
        clinicsService.deleteClinic("user-123", "clinic-123")
      ).rejects.toThrow("No tienes acceso a esta clínica");
    });
  });
});
