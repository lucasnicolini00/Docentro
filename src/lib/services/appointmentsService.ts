import prisma from "@/lib/prisma";
import { AppointmentStatus, AppointmentType } from "@prisma/client";

export const appointmentsService = {
  async getPatient(email: string) {
    return prisma.patient.findFirst({
      where: { user: { email } },
    });
  },

  async getPatientAppointments(
    patientId: string,
    page: number = 1,
    limit: number = 10
  ) {
    const skip = (page - 1) * limit;
    const [appointments, total] = await Promise.all([
      prisma.appointment.findMany({
        where: { patientId },
        include: {
          doctor: {
            include: { user: true },
          },
          clinic: true,
          pricing: true,
          timeSlot: true,
        },
        orderBy: { datetime: "asc" },
        skip,
        take: limit,
      }),
      prisma.appointment.count({ where: { patientId } }),
    ]);

    return { appointments, total, totalPages: Math.ceil(total / limit) };
  },

  async getDoctor(email: string) {
    return prisma.doctor.findFirst({
      where: { user: { email } },
    });
  },

  async getDoctorAppointments(
    doctorId: string,
    page: number = 1,
    limit: number = 10
  ) {
    const skip = (page - 1) * limit;
    const [appointments, total] = await Promise.all([
      prisma.appointment.findMany({
        where: { doctorId },
        include: {
          patient: {
            include: { user: true },
          },
          clinic: true,
          pricing: true,
          timeSlot: true,
        },
        orderBy: { datetime: "asc" },
        skip,
        take: limit,
      }),
      prisma.appointment.count({ where: { doctorId } }),
    ]);

    return { appointments, total, totalPages: Math.ceil(total / limit) };
  },

  async getDoctorAppointmentsForCalendar(
    doctorId: string,
    startDate: Date,
    endDate: Date,
    status?: AppointmentStatus[]
  ) {
    const whereClause: any = {
      doctorId,
      datetime: {
        gte: startDate,
        lte: endDate,
      },
    };

    if (status) {
      whereClause.status = {
        in: status,
      };
    }

    return prisma.appointment.findMany({
      where: whereClause,
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
            city: true,
          },
        },
        pricing: {
          select: {
            id: true,
            title: true,
            price: true,
            currency: true,
          },
        },
        doctor: {
          select: {
            id: true,
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: {
        datetime: "asc",
      },
    });
  },

  async getPatientAppointmentsForCalendar(
    patientId: string,
    startDate: Date,
    endDate: Date,
    status?: AppointmentStatus[]
  ) {
    const whereClause: any = {
      patientId,
      timeSlot: {
        startTime: {
          gte: startDate,
          lte: endDate,
        },
      },
    };

    if (status) {
      whereClause.status = {
        in: status,
      };
    }

    return prisma.appointment.findMany({
      where: whereClause,
      include: {
        timeSlot: {
          select: {
            id: true,
            startTime: true,
            endTime: true,
            schedule: {
              select: {
                doctor: {
                  select: {
                    name: true,
                    surname: true,
                  },
                },
                clinic: {
                  select: {
                    name: true,
                    address: true,
                  },
                },
              },
            },
          },
        },
        pricing: {
          select: {
            title: true,
            price: true,
          },
        },
      },
      orderBy: {
        timeSlot: {
          startTime: "asc",
        },
      },
    });
  },

  async getTimeSlotWithRelations(timeSlotId: string) {
    return prisma.timeSlot.findUnique({
      where: { id: timeSlotId },
      include: {
        schedule: {
          include: {
            doctor: true,
            clinic: true,
          },
        },
      },
    });
  },

  async createAppointmentWithTimeSlot(data: {
    doctorId: string;
    patientId: string;
    clinicId: string;
    timeSlotId: string;
    pricingId: string | null;
    datetime: Date;
    durationMinutes: number;
    type: AppointmentType;
    status: AppointmentStatus;
    notes: string | null;
  }) {
    return prisma.$transaction(async (tx) => {
      await tx.timeSlot.update({
        where: { id: data.timeSlotId },
        data: { isBooked: true },
      });

      const appointment = await tx.appointment.create({
        data,
        include: {
          doctor: {
            include: {
              user: true,
              specialities: {
                include: {
                  speciality: true,
                },
              },
            },
          },
          clinic: true,
          pricing: true,
          timeSlot: true,
        },
      });

      return appointment;
    });
  },

  async checkConflictingAppointment(
    doctorId: string,
    datetime: Date
  ) {
    return prisma.appointment.findFirst({
      where: {
        doctorId,
        datetime,
        status: {
          not: AppointmentStatus.CANCELED,
        },
      },
    });
  },

  async createAppointment(data: {
    doctorId: string;
    patientId: string;
    clinicId: string;
    pricingId: string | null;
    datetime: Date;
    durationMinutes: number;
    type: AppointmentType;
    status: AppointmentStatus;
    notes: string | null;
  }) {
    return prisma.appointment.create({
      data,
      include: {
        doctor: {
          include: {
            user: true,
            specialities: {
              include: {
                speciality: true,
              },
            },
          },
        },
        clinic: true,
        pricing: true,
      },
    });
  },

  async getDoctorAppointmentsForAvailability(
    doctorId: string,
    startOfDay: Date,
    endOfDay: Date
  ) {
    return prisma.appointment.findMany({
      where: {
        doctorId,
        datetime: {
          gte: startOfDay,
          lte: endOfDay,
        },
        status: {
          not: AppointmentStatus.CANCELED,
        },
      },
      select: {
        datetime: true,
        durationMinutes: true,
      },
    });
  },

  async getDoctorWithRelations(doctorId: string) {
    return prisma.doctor.findUnique({
      where: { id: doctorId },
      include: {
        user: true,
        specialities: {
          include: {
            speciality: true,
          },
        },
        clinics: {
          include: {
            clinic: true,
          },
        },
        pricings: {
          where: {
            isActive: true,
          },
          include: {
            clinic: true,
          },
        },
      },
    });
  },

  async getAppointmentForStatusUpdate(appointmentId: string, doctorId: string) {
    return prisma.appointment.findFirst({
      where: {
        id: appointmentId,
        doctorId,
      },
    });
  },

  async updateAppointmentStatus(appointmentId: string, status: AppointmentStatus) {
    return prisma.appointment.update({
      where: { id: appointmentId },
      data: { status },
      include: {
        patient: {
          include: {
            user: true,
          },
        },
        clinic: true,
      },
    });
  },

  async getAppointmentForCancellation(appointmentId: string) {
    return prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: {
        patient: {
          include: {
            user: true,
          },
        },
        doctor: {
          include: {
            user: true,
          },
        },
      },
    });
  },

  async cancelAppointment(appointmentId: string) {
    return prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        status: AppointmentStatus.CANCELED,
        updatedAt: new Date(),
      },
    });
  },
};
