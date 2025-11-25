import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const imagesService = {
  async createImage(data: Prisma.ImageUncheckedCreateInput) {
    return prisma.image.create({
      data,
    });
  },

  async getImage(imageId: string) {
    return prisma.image.findUnique({
      where: { id: imageId },
      include: { profileForDoctor: true },
    });
  },

  async deleteImage(imageId: string) {
    return prisma.image.delete({
      where: { id: imageId },
    });
  },

  async countDoctorImages(doctorId: string) {
    return prisma.image.count({
      where: { doctorId },
    });
  },

  async createDoctorProfileImage(
    doctorId: string,
    imageData: Omit<Prisma.ImageUncheckedCreateInput, "doctorId">
  ) {
    return prisma.$transaction(async (tx) => {
      const image = await tx.image.create({
        data: {
          ...imageData,
          doctorId,
        },
      });

      await tx.doctor.update({
        where: { id: doctorId },
        data: { profileImageId: image.id },
      });

      return image;
    });
  },

  async deleteDoctorProfileImage(doctorId: string, imageId: string) {
    return prisma.$transaction(async (tx) => {
      await tx.doctor.update({
        where: { id: doctorId },
        data: { profileImageId: null },
      });

      await tx.image.delete({
        where: { id: imageId },
      });
    });
  },

  async getUserWithProfileImages(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      include: {
        profileImage: true,
        doctor: {
          include: {
            profileImage: true,
          },
        },
        patient: true,
      },
    });
  },
};
