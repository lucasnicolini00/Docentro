import { PrismaClient, Prisma, $Enums } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Clean existing data in correct order (respecting foreign key constraints)
  await prisma.opinion.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.timeSlot.deleteMany();
  await prisma.schedule.deleteMany();
  await prisma.pricing.deleteMany();
  await prisma.doctorClinic.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.doctorSpeciality.deleteMany();
  await prisma.clinic.deleteMany();
  await prisma.speciality.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.user.deleteMany();

  console.log("🧹 Cleaned existing data");

  // Create specialities
  const specialities = await Promise.all([
    prisma.speciality.create({
      data: {
        name: "Cardiología",
        description: "Especialista en el sistema cardiovascular",
      },
    }),
    prisma.speciality.create({
      data: {
        name: "Dermatología",
        description: "Especialista en enfermedades de la piel",
      },
    }),
    prisma.speciality.create({
      data: {
        name: "Pediatría",
        description: "Especialista en medicina infantil",
      },
    }),
    prisma.speciality.create({
      data: {
        name: "Neurología",
        description: "Especialista en el sistema nervioso",
      },
    }),
    prisma.speciality.create({
      data: {
        name: "Ginecología",
        description: "Especialista en salud femenina",
      },
    }),
  ]);

  console.log("✅ Created specialities");

  // Create users
  const hashedPassword = await bcrypt.hash("password123", 12);

  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: "carlos.rodriguez@example.com",
        password: hashedPassword,
        firstName: "Carlos",
        lastName: "Rodriguez",
        phone: "+54 11 1234-5678",
        role: $Enums.UserRole.DOCTOR,
      },
    }),
    prisma.user.create({
      data: {
        email: "ana.martinez@example.com",
        password: hashedPassword,
        firstName: "Ana",
        lastName: "Martinez",
        phone: "+54 11 2345-6789",
        role: $Enums.UserRole.DOCTOR,
      },
    }),
    prisma.user.create({
      data: {
        email: "luis.garcia@example.com",
        password: hashedPassword,
        firstName: "Luis",
        lastName: "Garcia",
        phone: "+54 11 3456-7890",
        role: $Enums.UserRole.DOCTOR,
      },
    }),
    prisma.user.create({
      data: {
        email: "maria.lopez@example.com",
        password: hashedPassword,
        firstName: "Maria",
        lastName: "Lopez",
        phone: "+54 11 4567-8901",
        role: $Enums.UserRole.DOCTOR,
      },
    }),
    prisma.user.create({
      data: {
        email: "juan.perez@example.com",
        password: hashedPassword,
        firstName: "Juan",
        lastName: "Perez",
        phone: "+54 11 5678-9012",
        role: $Enums.UserRole.PATIENT,
      },
    }),
    prisma.user.create({
      data: {
        email: "laura.fernandez@example.com",
        password: hashedPassword,
        firstName: "Laura",
        lastName: "Fernandez",
        phone: "+54 11 6789-0123",
        role: $Enums.UserRole.PATIENT,
      },
    }),
  ]);

  console.log("✅ Created users");

  // Create clinics
  const clinics = await Promise.all([
    prisma.clinic.create({
      data: {
        name: "Clínica Central",
        address: "Av. Principal 123",
        country: "Argentina",
        city: "Buenos Aires",
        neighborhood: "Palermo",
        latitude: -34.5755,
        longitude: -58.4038,
        isVirtual: false,
      },
    }),
    prisma.clinic.create({
      data: {
        name: "Hospital San Miguel",
        address: "Calle Salud 456",
        country: "Argentina",
        city: "Buenos Aires",
        neighborhood: "Belgrano",
        latitude: -34.5631,
        longitude: -58.4566,
        isVirtual: false,
      },
    }),
    prisma.clinic.create({
      data: {
        name: "Consultas Online",
        country: "Argentina",
        isVirtual: true,
      },
    }),
  ]);

  console.log("✅ Created clinics");

  // Create doctors
  const doctors = await Promise.all([
    prisma.doctor.create({
      data: {
        userId: users[0].id,
        name: "Carlos",
        surname: "Rodriguez",
        email: "carlos.rodriguez@example.com",
        phone: "+54 11 1234-5678",
        picaddress: null,
      },
    }),
    prisma.doctor.create({
      data: {
        userId: users[1].id,
        name: "Ana",
        surname: "Martinez",
        email: "ana.martinez@example.com",
        phone: "+54 11 2345-6789",
        picaddress: null,
      },
    }),
    prisma.doctor.create({
      data: {
        userId: users[2].id,
        name: "Luis",
        surname: "Garcia",
        email: "luis.garcia@example.com",
        phone: "+54 11 3456-7890",
        picaddress: null,
      },
    }),
    prisma.doctor.create({
      data: {
        userId: users[3].id,
        name: "Maria",
        surname: "Lopez",
        email: "maria.lopez@example.com",
        phone: "+54 11 4567-8901",
        picaddress: null,
      },
    }),
  ]);

  console.log("✅ Created doctors");

  // Create patients
  const patients = await Promise.all([
    prisma.patient.create({
      data: {
        userId: users[4].id,
        name: "Juan",
        surname: "Perez",
        email: "juan.perez@example.com",
        phone: "+54 11 5678-9012",
        birthdate: new Date("1985-03-15"),
        gender: "Masculino",
      },
    }),
    prisma.patient.create({
      data: {
        userId: users[5].id,
        name: "Laura",
        surname: "Fernandez",
        email: "laura.fernandez@example.com",
        phone: "+54 11 6789-0123",
        birthdate: new Date("1990-07-22"),
        gender: "Femenino",
      },
    }),
  ]);

  console.log("✅ Created patients");

  // Link doctors with specialities
  await Promise.all([
    prisma.doctorSpeciality.create({
      data: { doctorId: doctors[0].id, specialityId: specialities[0].id },
    }),
    prisma.doctorSpeciality.create({
      data: { doctorId: doctors[1].id, specialityId: specialities[1].id },
    }),
    prisma.doctorSpeciality.create({
      data: { doctorId: doctors[2].id, specialityId: specialities[2].id },
    }),
  ]);

  console.log("✅ Linked doctors with specialities");

  // Link doctors with clinics
  await Promise.all([
    prisma.doctorClinic.create({
      data: { doctorId: doctors[0].id, clinicId: clinics[0].id },
    }),
    prisma.doctorClinic.create({
      data: { doctorId: doctors[1].id, clinicId: clinics[1].id },
    }),
    prisma.doctorClinic.create({
      data: { doctorId: doctors[2].id, clinicId: clinics[2].id },
    }),
  ]);

  console.log("✅ Linked doctors with clinics");

  // Create experiences
  await Promise.all([
    prisma.experience.create({
      data: {
        doctorId: doctors[0].id,
        experienceType: "EDUCATION",
        title: "Medicina - Universidad de Buenos Aires",
        institution: "UBA",
        startDate: new Date("2000-03-01"),
        endDate: new Date("2006-12-15"),
        description: "Título de grado en Medicina",
      },
    }),
    prisma.experience.create({
      data: {
        doctorId: doctors[0].id,
        experienceType: "CERTIFICATION",
        title: "Especialización en Cardiología",
        institution: "Hospital Italiano",
        startDate: new Date("2007-01-01"),
        endDate: new Date("2010-12-31"),
        description: "Residencia completa en Cardiología",
      },
    }),
  ]);

  console.log("✅ Created experiences");

  // Create pricing
  const pricings = await Promise.all([
    prisma.pricing.create({
      data: {
        doctorId: doctors[0].id,
        clinicId: clinics[0].id,
        title: "Consulta Cardiológica",
        price: new Prisma.Decimal("15000"),
        currency: "ARS",
        durationMinutes: 45,
        description: "Consulta completa con electrocardiograma",
        isActive: true,
      },
    }),
    prisma.pricing.create({
      data: {
        doctorId: doctors[1].id,
        clinicId: clinics[1].id,
        title: "Consulta Dermatológica",
        price: new Prisma.Decimal("12000"),
        currency: "ARS",
        durationMinutes: 30,
        description: "Evaluación completa de la piel",
        isActive: true,
      },
    }),
  ]);

  console.log("✅ Created pricing");

  // Create appointment
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 7);

  await prisma.appointment.create({
    data: {
      doctorId: doctors[0].id,
      patientId: patients[0].id,
      clinicId: clinics[0].id,
      pricingId: pricings[0].id,
      datetime: futureDate,
      durationMinutes: 45,
      type: "IN_PERSON",
      status: "CONFIRMED",
      notes: "Consulta de control",
    },
  });

  console.log("✅ Created appointment");

  // Create opinions
  await Promise.all([
    prisma.opinion.create({
      data: {
        doctorId: doctors[0].id,
        patientId: patients[0].id,
        rating: 5,
        title: "Excelente profesional",
        description: "Muy atento y profesional. Explicó todo claramente.",
        anonymized: false,
      },
    }),
    prisma.opinion.create({
      data: {
        doctorId: doctors[1].id,
        patientId: patients[1].id,
        rating: 4,
        title: "Muy buena atención",
        description: "Resolvió mi problema de manera efectiva.",
        anonymized: true,
      },
    }),
  ]);

  console.log("✅ Created opinions");

  console.log("🎉 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
