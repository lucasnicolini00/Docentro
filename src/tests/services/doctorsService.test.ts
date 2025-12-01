import { describe, it, expect, vi, beforeEach } from "vitest";
import { mockDeep, mockReset, type DeepMockProxy } from "vitest-mock-extended";
import type { PrismaClient } from "@prisma/client";
import { doctorsService } from "@/lib/services/doctorsService";
import prisma from "@/lib/prisma";
import {
  mockDoctor,
  mockSpeciality,
  mockExperience,
  mockImage,
} from "../utils/mocks";

vi.mock("@/lib/prisma", () => ({
  default: mockDeep<PrismaClient>(),
}));

const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

describe("doctorsService", () => {
  beforeEach(() => {
    mockReset(prismaMock);
  });

  describe("getDoctorIdFromUserId", () => {
    it("should return doctor id for valid user id", async () => {
      prismaMock.doctor.findUnique.mockResolvedValue({
        id: "doctor-123",
      } as any);

      const result = await doctorsService.getDoctorIdFromUserId("user-123");

      expect(result).toBe("doctor-123");
      expect(prismaMock.doctor.findUnique).toHaveBeenCalledWith({
        where: { userId: "user-123" },
        select: { id: true },
      });
    });

    it("should throw error if doctor not found", async () => {
      prismaMock.doctor.findUnique.mockResolvedValue(null);

      await expect(
        doctorsService.getDoctorIdFromUserId("invalid-user")
      ).rejects.toThrow("Doctor not found");
    });
  });

  describe("updateDoctorProfile", () => {
    it("should update doctor profile in transaction", async () => {
      const updateData = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "+1234567890",
        doctorName: "Dr. John",
        doctorSurname: "Doe",
        doctorEmail: "dr.john@example.com",
        doctorPhone: "+1234567890",
        specialityIds: ["spec-1", "spec-2"],
        experiences: [
          {
            title: "Cardiologist",
            company: "Hospital A",
            location: "New York",
            startDate: "2020-01-01",
            endDate: null,
            description: "Working as cardiologist",
          },
        ],
      };

      prismaMock.$transaction.mockImplementation(async (callback: any) => {
        return callback({
          user: {
            update: vi.fn().mockResolvedValue({ id: "user-123" }),
          },
          doctor: {
            findUnique: vi
              .fn()
              .mockResolvedValue({ id: "doctor-123", userId: "user-123" }),
            update: vi.fn().mockResolvedValue({ id: "doctor-123" }),
          },
          doctorSpeciality: {
            deleteMany: vi.fn(),
            createMany: vi.fn(),
          },
          experience: {
            deleteMany: vi.fn(),
            createMany: vi.fn(),
          },
        });
      });

      await doctorsService.updateDoctorProfile(
        "user-123",
        "doctor-123",
        updateData
      );

      expect(prismaMock.$transaction).toHaveBeenCalled();
    });

    it("should handle empty specialities", async () => {
      const updateData = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "+1234567890",
        doctorName: "Dr. John",
        doctorSurname: "Doe",
        doctorEmail: "dr.john@example.com",
        doctorPhone: "+1234567890",
        specialityIds: [],
        experiences: [],
      };

      prismaMock.$transaction.mockImplementation(async (callback: any) => {
        return callback({
          user: {
            update: vi.fn().mockResolvedValue({ id: "user-123" }),
          },
          doctor: {
            findUnique: vi
              .fn()
              .mockResolvedValue({ id: "doctor-123", userId: "user-123" }),
            update: vi.fn().mockResolvedValue({ id: "doctor-123" }),
          },
          doctorSpeciality: {
            deleteMany: vi.fn(),
            createMany: vi.fn(),
          },
          experience: {
            deleteMany: vi.fn(),
            createMany: vi.fn(),
          },
        });
      });

      await doctorsService.updateDoctorProfile(
        "user-123",
        "doctor-123",
        updateData
      );

      expect(prismaMock.$transaction).toHaveBeenCalled();
    });
  });

  describe("getAllSpecialities", () => {
    it("should return all specialities ordered by name", async () => {
      const specialities = [mockSpeciality];

      prismaMock.speciality.findMany.mockResolvedValue(specialities as any);

      const result = await doctorsService.getAllSpecialities();

      expect(result).toEqual(specialities);
      expect(prismaMock.speciality.findMany).toHaveBeenCalledWith({
        where: { deletedAt: null },
        orderBy: { name: "asc" },
      });
    });
  });

  describe("getDoctorProfile", () => {
    it("should return doctor profile with relations", async () => {
      const doctorProfile = {
        ...mockDoctor,
        specialities: [],
        experiences: [],
        profileImage: null,
        images: [],
      };

      prismaMock.doctor.findUnique.mockResolvedValue(doctorProfile as any);

      const result = await doctorsService.getDoctorProfile("user-123");

      expect(result).toEqual(doctorProfile);
      expect(prismaMock.doctor.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { userId: "user-123" },
        })
      );
    });
  });

  describe("getDoctorImages", () => {
    it("should return doctor images excluding profile image", async () => {
      const images = [mockImage];

      prismaMock.image.findMany.mockResolvedValue(images as any);

      const result = await doctorsService.getDoctorImages("doctor-123");

      expect(result).toEqual(images);
      expect(prismaMock.image.findMany).toHaveBeenCalledWith({
        where: {
          doctorId: "doctor-123",
          profileForDoctor: null,
        },
        orderBy: { createdAt: "desc" },
        select: { id: true, createdAt: true },
      });
    });
  });

  describe("getDoctorDashboard", () => {
    it("should return doctor dashboard data", async () => {
      const dashboardData = {
        ...mockDoctor,
        appointments: [],
        specialities: [],
      };

      prismaMock.doctor.findUnique.mockResolvedValue(dashboardData as any);

      const result = await doctorsService.getDoctorDashboard("doctor-123");

      expect(result).toEqual(dashboardData);
      expect(prismaMock.doctor.findUnique).toHaveBeenCalledWith({
        where: { id: "doctor-123" },
        include: expect.objectContaining({
          appointments: expect.any(Object),
          specialities: expect.any(Object),
        }),
      });
    });
  });

  describe("getDoctorPublicProfile", () => {
    it("should return public doctor profile", async () => {
      const publicProfile = {
        ...mockDoctor,
        specialities: [],
        clinics: [],
        experiences: [],
      };

      prismaMock.doctor.findUnique.mockResolvedValue(publicProfile as any);

      const result = await doctorsService.getDoctorPublicProfile("doctor-123");

      expect(result).toEqual(publicProfile);
      expect(prismaMock.doctor.findUnique).toHaveBeenCalledWith({
        where: { id: "doctor-123" },
        include: expect.objectContaining({
          user: expect.any(Object),
          specialities: expect.any(Object),
          clinics: expect.any(Object),
          experiences: expect.any(Object),
        }),
      });
    });
  });

  describe("getProfileExperience", () => {
    it("should return profile experience", async () => {
      const profileExp = {
        ...mockExperience,
        title: "Perfil profesional",
        experienceType: "OTHER",
      };

      prismaMock.experience.findFirst.mockResolvedValue(profileExp as any);

      const result = await doctorsService.getProfileExperience("doctor-123");

      expect(result).toEqual(profileExp);
      expect(prismaMock.experience.findFirst).toHaveBeenCalledWith({
        where: {
          doctorId: "doctor-123",
          title: "Perfil profesional",
          experienceType: "OTHER",
        },
      });
    });

    it("should return null if no profile experience exists", async () => {
      prismaMock.experience.findFirst.mockResolvedValue(null);

      const result = await doctorsService.getProfileExperience("doctor-123");

      expect(result).toBeNull();
    });
  });

  describe("updateProfileExperience", () => {
    it("should update profile experience description", async () => {
      const updated = { ...mockExperience, description: "Updated description" };

      prismaMock.experience.update.mockResolvedValue(updated as any);

      const result = await doctorsService.updateProfileExperience(
        "exp-123",
        "Updated description"
      );

      expect(result).toEqual(updated);
      expect(prismaMock.experience.update).toHaveBeenCalledWith({
        where: { id: "exp-123" },
        data: { description: "Updated description" },
      });
    });
  });

  describe("createProfileExperience", () => {
    it("should create new profile experience", async () => {
      const newExp = {
        ...mockExperience,
        title: "Perfil profesional",
        experienceType: "OTHER",
      };

      prismaMock.experience.create.mockResolvedValue(newExp as any);

      const result = await doctorsService.createProfileExperience(
        "doctor-123",
        "Bio description"
      );

      expect(result).toEqual(newExp);
      expect(prismaMock.experience.create).toHaveBeenCalledWith({
        data: {
          doctorId: "doctor-123",
          experienceType: "OTHER",
          title: "Perfil profesional",
          institution: null,
          startDate: null,
          endDate: null,
          description: "Bio description",
        },
      });
    });
  });
});
