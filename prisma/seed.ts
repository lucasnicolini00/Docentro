import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Clean existing data (in reverse order of dependencies)
  await prisma.opinion.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.pricing.deleteMany();
  await prisma.doctorClinic.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.doctorSpeciality.deleteMany();
  await prisma.clinic.deleteMany();
  await prisma.speciality.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.patient.deleteMany();

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
        address: null,
        country: "Argentina",
        city: null,
        neighborhood: null,
        latitude: null,
        longitude: null,
        isVirtual: true,
      },
    }),
  ]);

  console.log("✅ Created clinics");

  // Create doctors
  const doctors = await Promise.all([
    prisma.doctor.create({
      data: {
        userId: "user_doc_1",
        name: "Dr. Carlos",
        surname: "Rodriguez",
        email: "carlos.rodriguez@example.com",
        phone: "+54 11 1234-5678",
        picaddress: null,
      },
    }),
    prisma.doctor.create({
      data: {
        userId: "user_doc_2",
        name: "Dra. Ana",
        surname: "Martinez",
        email: "ana.martinez@example.com",
        phone: "+54 11 2345-6789",
        picaddress: null,
      },
    }),
    prisma.doctor.create({
      data: {
        userId: "user_doc_3",
        name: "Dr. Luis",
        surname: "Gonzalez",
        email: "luis.gonzalez@example.com",
        phone: "+54 11 3456-7890",
        picaddress: null,
      },
    }),
  ]);

  console.log("✅ Created doctors");

  // Create patients
  const patients = await Promise.all([
    prisma.patient.create({
      data: {
        userId: "user_pat_1",
        name: "María",
        surname: "López",
        email: "maria.lopez@example.com",
        phone: "+54 11 4567-8901",
        birthdate: new Date("1985-03-15"),
        gender: "Femenino",
      },
    }),
    prisma.patient.create({
      data: {
        userId: "user_pat_2",
        name: "Juan",
        surname: "Pérez",
        email: "juan.perez@example.com",
        phone: "+54 11 5678-9012",
        birthdate: new Date("1990-07-22"),
        gender: "Masculino",
      },
    }),
  ]);

  console.log("✅ Created patients");

  // Link doctors with specialities
  await Promise.all([
    prisma.doctorSpeciality.create({
      data: {
        doctorId: doctors[0].id,
        specialityId: specialities[0].id, // Cardiología
      },
    }),
    prisma.doctorSpeciality.create({
      data: {
        doctorId: doctors[1].id,
        specialityId: specialities[1].id, // Dermatología
      },
    }),
    prisma.doctorSpeciality.create({
      data: {
        doctorId: doctors[2].id,
        specialityId: specialities[2].id, // Pediatría
      },
    }),
  ]);

  console.log("✅ Linked doctors with specialities");

  // Link doctors with clinics
  await Promise.all([
    prisma.doctorClinic.create({
      data: {
        doctorId: doctors[0].id,
        clinicId: clinics[0].id,
      },
    }),
    prisma.doctorClinic.create({
      data: {
        doctorId: doctors[1].id,
        clinicId: clinics[1].id,
      },
    }),
    prisma.doctorClinic.create({
      data: {
        doctorId: doctors[2].id,
        clinicId: clinics[2].id,
      },
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
        price: 15000,
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
        price: 12000,
        currency: "ARS",
        durationMinutes: 30,
        description: "Evaluación completa de la piel",
        isActive: true,
      },
    }),
  ]);

  console.log("✅ Created pricing");

  // Create appointments
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 7);

  await Promise.all([
    prisma.appointment.create({
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
    }),
  ]);

  console.log("✅ Created appointments");

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
