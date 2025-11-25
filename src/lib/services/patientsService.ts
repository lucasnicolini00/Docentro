import prisma from "@/lib/prisma";
import { withErrorHandling } from "./errorHandler";

export const patientsService = {
  async updatePatientProfile(
    userId: string,
    patientId: string,
    data: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      patientName: string;
      patientSurname: string;
      patientEmail: string;
      patientPhone: string;
      birthdate: string;
      gender: string;
    }
  ) {
    return withErrorHandling(
      () => prisma.$transaction(async (tx) => {
        const updatedUser = await tx.user.update({
          where: { id: userId },
          data: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone || null,
          },
        });

        const updatedPatient = await tx.patient.update({
          where: { id: patientId },
          data: {
            name: data.patientName,
            surname: data.patientSurname,
            email: data.patientEmail,
            phone: data.patientPhone || null,
            birthdate: data.birthdate ? new Date(data.birthdate) : null,
            gender: data.gender || null,
          },
        });

        return { updatedUser, updatedPatient };
      }),
      { service: "patientsService", method: "updatePatientProfile", params: { userId, patientId } }
    );
  },

  async getPatientDashboard(patientId: string) {
    return withErrorHandling(
      () => prisma.patient.findUnique({
        where: { id: patientId },
        include: {
          appointments: {
            include: {
              doctor: {
                include: {
                  user: {
                    select: {
                      firstName: true,
                      lastName: true,
                    },
                  },
                },
              },
              clinic: true,
            },
            orderBy: {
              datetime: "desc",
            },
          },
        },
      }),
      { service: "patientsService", method: "getPatientDashboard", params: { patientId } }
    );
  },
};
