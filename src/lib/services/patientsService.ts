import prisma from "@/lib/prisma";

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

      // Update patient data
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
    });
  },

  async getPatientDashboard(patientId: string) {
    const patient = await prisma.patient.findUnique({
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
    });

    return patient;
  },
};
