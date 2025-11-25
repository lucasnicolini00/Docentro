import prisma from "@/lib/prisma";

export const doctorsService = {
  async getDoctorIdFromUserId(userId: string): Promise<string> {
    const doctor = await prisma.doctor.findUnique({
      where: { userId },
      select: { id: true },
    });
    if (!doctor) throw new Error("Doctor not found");
    return doctor.id;
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
    return prisma.$transaction(async (tx) => {
      // Update user data
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone || null,
        },
      });

      // Update doctor data
      const updatedDoctor = await tx.doctor.update({
        where: { id: doctorId },
        data: {
          name: data.doctorName,
          surname: data.doctorSurname,
          email: data.doctorEmail,
          phone: data.doctorPhone || null,
        },
      });

      // Update specialities
      if (data.specialityIds.length > 0) {
        // Remove existing specialities
        await tx.doctorSpeciality.deleteMany({
          where: { doctorId: doctorId },
        });

        // Add new specialities
        await tx.doctorSpeciality.createMany({
          data: data.specialityIds.map((specialityId) => ({
            doctorId: doctorId,
            specialityId,
          })),
        });
      }

      // Update experiences
      if (data.experiences.length > 0) {
        // Remove existing experiences
        await tx.experience.deleteMany({
          where: { doctorId: doctorId },
        });

        // Add new experiences
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
    });
  },

  async getAllSpecialities() {
    return prisma.speciality.findMany({
      orderBy: { name: "asc" },
    });
  },

  async getDoctorProfile(userId: string) {
    return prisma.doctor.findUnique({
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
        // Limit experiences to recent ones to avoid loading large histories
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
    });
  },

  async getDoctorImages(doctorId: string) {
    return prisma.image.findMany({
      where: {
        doctorId: doctorId,
        profileForDoctor: null, // Exclude profile images from gallery
      },
      orderBy: { createdAt: "desc" },
      select: { id: true, createdAt: true },
    });
  },

  async getDoctorDashboard(doctorId: string) {
    return prisma.doctor.findUnique({
      where: { id: doctorId },
      include: {
        appointments: {
          take: 100, // Limit to 100 most recent appointments for performance
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
    });
  },

  async getDoctorPublicProfile(id: string) {
    return prisma.doctor.findUnique({
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
      },
    });
  },

  async getProfileExperience(doctorId: string) {
    return prisma.experience.findFirst({
      where: {
        doctorId: doctorId,
        title: "Perfil profesional",
        experienceType: "OTHER",
      },
    });
  },

  async updateProfileExperience(id: string, description: string) {
    return prisma.experience.update({
      where: { id },
      data: { description },
    });
  },

  async createProfileExperience(doctorId: string, description: string) {
    return prisma.experience.create({
      data: {
        doctorId: doctorId,
        experienceType: "OTHER",
        title: "Perfil profesional",
        institution: null,
        startDate: null,
        endDate: null,
        description,
      },
    });
  },
};
