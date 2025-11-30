import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { withErrorHandling } from "./errorHandler";

export const imagesService = {
  async createImage(data: Prisma.ImageUncheckedCreateInput) {
    return withErrorHandling(
      () => prisma.image.create({ data }),
      { service: "imagesService", method: "createImage", params: { doctorId: data.doctorId } }
    );
  },

  async getImage(imageId: string) {
    return withErrorHandling(
      () => prisma.image.findUnique({
        where: { id: imageId },
        select: {
          id: true,
          url: true,
          filename: true,
          mime: true,
          size: true,
          doctorId: true,
          userId: true,
          createdAt: true,
          updatedAt: true,
          profileForDoctor: {
            select: {
              id: true,
              name: true,
              surname: true,
            },
          },
        },
      }),
      { service: "imagesService", method: "getImage", params: { imageId } }
    );
  },

  async deleteImage(imageId: string) {
    return withErrorHandling(
      () => prisma.image.delete({ where: { id: imageId } }),
      { service: "imagesService", method: "deleteImage", params: { imageId } }
    );
  },

  async countDoctorImages(doctorId: string) {
    return withErrorHandling(
      () => prisma.image.count({ where: { doctorId } }),
      { service: "imagesService", method: "countDoctorImages", params: { doctorId } }
    );
  },

  async createDoctorProfileImage(
    doctorId: string,
    imageData: Omit<Prisma.ImageUncheckedCreateInput, "doctorId">
  ) {
    return withErrorHandling(
      () => prisma.$transaction(async (tx) => {
        const image = await tx.image.create({
          data: { ...imageData, doctorId },
        });

        await tx.doctor.update({
          where: { id: doctorId },
          data: { profileImageId: image.id },
        });

        return image;
      }),
      { service: "imagesService", method: "createDoctorProfileImage", params: { doctorId } }
    );
  },

  async deleteDoctorProfileImage(doctorId: string, imageId: string) {
    return withErrorHandling(
      () => prisma.$transaction(async (tx) => {
        await tx.doctor.update({
          where: { id: doctorId },
          data: { profileImageId: null },
        });

        await tx.image.delete({
          where: { id: imageId },
        });
      }),
      { service: "imagesService", method: "deleteDoctorProfileImage", params: { doctorId, imageId } }
    );
  },

  async getUserWithProfileImages(userId: string) {
    return withErrorHandling(
      () => prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          profileImageId: true,
          profileImage: {
            select: {
              id: true,
              url: true,
            },
          },
          doctor: {
            select: {
              id: true,
              name: true,
              surname: true,
              profileImageId: true,
              profileImage: {
                select: {
                  id: true,
                  url: true,
                },
              },
            },
          },
          patient: {
            select: {
              id: true,
              name: true,
              surname: true,
            },
          },
        },
      }),
      { service: "imagesService", method: "getUserWithProfileImages", params: { userId } }
    );
  },

  async getBatchImages(imageIds: string[]) {
    return withErrorHandling(
      () => prisma.image.findMany({
        where: { id: { in: imageIds } },
        select: { id: true, url: true },
      }),
      { service: "imagesService", method: "getBatchImages", params: { count: imageIds.length } }
    );
  },
};
