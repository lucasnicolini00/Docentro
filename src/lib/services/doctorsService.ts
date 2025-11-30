import prisma from "@/lib/prisma";
import { withErrorHandling } from "./errorHandler";

export const doctorsService = {
  async getDoctorIdFromUserId(userId: string): Promise<string> {
    return withErrorHandling(
      async () => {
        const doctor = await prisma.doctor.findUnique({
          where: { userId },
          select: { id: true },
        });
        if (!doctor) throw new Error("Doctor not found");
        return doctor.id;
      },
      {
        service: "doctorsService",
        method: "getDoctorIdFromUserId",
        params: { userId },
      }
    );
  },

  async updateDoctorProfile(
    userId: string,
    doctorId: string,
    data: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      doctorName: string;
      doctorSurname: string;
      doctorEmail: string;
      doctorPhone: string;
      specialityIds: string[];
      experiences: any[];
    }
  ) {
    return withErrorHandling(
      () =>
        prisma.$transaction(async (tx) => {
          const updatedUser = await tx.user.update({
            where: { id: userId },
            data: {
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              phone: data.phone || null,
            },
          });

          const updatedDoctor = await tx.doctor.update({
            where: { id: doctorId },
            data: {
              name: data.doctorName,
              surname: data.doctorSurname,
              email: data.doctorEmail,
              phone: data.doctorPhone || null,
            },
          });

          if (data.specialityIds.length > 0) {
            await tx.doctorSpeciality.deleteMany({
              where: { doctorId: doctorId },
            });

            await tx.doctorSpeciality.createMany({
              data: data.specialityIds.map((specialityId) => ({
                doctorId: doctorId,
                specialityId,
              })),
            });
          }

          if (data.experiences.length > 0) {
            await tx.experience.deleteMany({
              where: { doctorId: doctorId, deletedAt: null },
            });

            await tx.experience.createMany({
              data: data.experiences.map((exp: any) => ({
                doctorId: doctorId,
                title: exp.title,
                company: exp.company,
                location: exp.location || null,
                startDate: exp.startDate ? new Date(exp.startDate) : new Date(),
                endDate: exp.endDate ? new Date(exp.endDate) : null,
                description: exp.description || null,
              })),
            });
          }

          return { updatedUser, updatedDoctor };
        }),
      {
        service: "doctorsService",
        method: "updateDoctorProfile",
        params: { userId, doctorId },
      }
    );
  },

  async getAllSpecialities() {
    return withErrorHandling(
      () => prisma.speciality.findMany({ 
        where: { deletedAt: null },
        orderBy: { name: "asc" } 
      }),
      { service: "doctorsService", method: "getAllSpecialities" }
    );
  },

  async getDoctorProfile(userId: string) {
    return withErrorHandling(
      () =>
        prisma.doctor.findUnique({
          where: { userId },
          select: {
            id: true,
            name: true,
            surname: true,
            email: true,
            phone: true,
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
              },
            },
            specialities: {
              include: {
                speciality: {
                  select: { id: true, name: true },
                },
              },
            },
            experiences: {
              orderBy: { startDate: "desc" },
              take: 10,
            },
            profileImage: {
              select: { id: true, url: true, createdAt: true },
            },
            images: {
              orderBy: { createdAt: "desc" },
              take: 6,
              select: { id: true, url: true, createdAt: true },
            },
          },
        }),
      {
        service: "doctorsService",
        method: "getDoctorProfile",
        params: { userId },
      }
    );
  },

  async getDoctorImages(doctorId: string) {
    return withErrorHandling(
      () =>
        prisma.image.findMany({
          where: {
            doctorId: doctorId,
            profileForDoctor: null,
          },
          orderBy: { createdAt: "desc" },
          select: { id: true, createdAt: true },
        }),
      {
        service: "doctorsService",
        method: "getDoctorImages",
        params: { doctorId },
      }
    );
  },

  async getDoctorDashboard(doctorId: string) {
    return withErrorHandling(
      () =>
        prisma.doctor.findUnique({
          where: { id: doctorId },
          include: {
            appointments: {
              take: 20, // Reduced from 100 for better performance
              include: {
                patient: {
                  select: {
                    id: true,
                    name: true,
                    surname: true,
                    email: true,
                    phone: true,
                  },
                },
                clinic: {
                  select: {
                    id: true,
                    name: true,
                    address: true,
                  },
                },
              },
              orderBy: {
                datetime: "desc",
              },
            },
            specialities: {
              include: {
                speciality: true,
              },
            },
          },
        }),
      {
        service: "doctorsService",
        method: "getDoctorDashboard",
        params: { doctorId },
      }
    );
  },

  async getDoctorPublicProfile(id: string) {
    return withErrorHandling(
      () =>
        prisma.doctor.findUnique({
          where: { id },
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
            specialities: {
              include: {
                speciality: true,
              },
            },
            clinics: {
              include: {
                clinic: {
                  select: {
                    id: true,
                    name: true,
                    address: true,
                    city: true,
                    neighborhood: true,
                    latitude: true,
                    longitude: true,
                    isVirtual: true,
                  },
                },
              },
            },
            experiences: {
              orderBy: {
                startDate: "desc",
              },
            },
            pricings: {
              select: {
                id: true,
                clinicId: true,
                price: true,
              },
            },
            images: {
              select: {
                id: true,
                url: true,
                filename: true,
              },
              orderBy: {
                createdAt: "desc",
              },
            },
          },
        }),
      {
        service: "doctorsService",
        method: "getDoctorPublicProfile",
        params: { id },
      }
    );
  },

  async getProfileExperience(doctorId: string) {
    return withErrorHandling(
      () =>
        prisma.experience.findFirst({
          where: {
            doctorId: doctorId,
            title: "Perfil profesional",
            experienceType: "OTHER",
          },
        }),
      {
        service: "doctorsService",
        method: "getProfileExperience",
        params: { doctorId },
      }
    );
  },

  async updateProfileExperience(id: string, description: string) {
    return withErrorHandling(
      () =>
        prisma.experience.update({
          where: { id },
          data: { description },
        }),
      {
        service: "doctorsService",
        method: "updateProfileExperience",
        params: { id },
      }
    );
  },

  async createProfileExperience(doctorId: string, description: string) {
    return withErrorHandling(
      () =>
        prisma.experience.create({
          data: {
            doctorId: doctorId,
            experienceType: "OTHER",
            title: "Perfil profesional",
            institution: null,
            startDate: null,
            endDate: null,
            description,
          },
        }),
      {
        service: "doctorsService",
        method: "createProfileExperience",
        params: { doctorId },
      }
    );
  },
};
