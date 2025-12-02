/**
 * Standardized TypeScript types for all Prisma models
 * These types represent the database schema and should match prisma/schema.prisma
 * 
 * IMPORTANT: When updating the Prisma schema, update these types accordingly
 */

// ======================
// ENUMS (match Prisma exactly)
// ======================

export enum AppointmentStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELED = "CANCELED",
  COMPLETED = "COMPLETED",
}

export enum AppointmentType {
  IN_PERSON = "IN_PERSON",
  ONLINE = "ONLINE",
}

export enum ExperienceType {
  EDUCATION = "EDUCATION",
  JOB = "JOB",
  CERTIFICATION = "CERTIFICATION",
  OTHER = "OTHER",
}

export enum UserRole {
  PATIENT = "PATIENT",
  DOCTOR = "DOCTOR",
  ADMIN = "ADMIN",
}

export enum DayOfWeek {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
}

// ======================
// BASE MODEL TYPES
// ======================

/**
 * User model - Core user authentication and profile
 */
export interface User {
  id: string;
  email: string;
  password: string; // Hashed
  firstName: string;
  lastName: string;
  phone: string | null;
  role: UserRole;
  isActive: boolean;
  emailVerified: boolean;
  profileImageId: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

/**
 * Patient model - Patient-specific data
 */
export interface Patient {
  id: string;
  userId: string;
  birthdate: Date | null;
  gender: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

/**
 * Doctor model - Doctor-specific data and settings
 */
export interface Doctor {
  id: string;
  userId: string;
  picaddress: string | null;
  profileImageId: string | null;
  // Settings
  emailNotifications: boolean;
  pushNotifications: boolean;
  isPublic: boolean;
  allowOnlineConsultations: boolean;
  autoBookingEnabled: boolean;
  remindersEnabled: boolean;
  consultationPrice: number | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

/**
 * Image model - File storage metadata
 */
export interface Image {
  id: string;
  url: string;
  filename: string | null;
  mime: string | null;
  size: number | null;
  userId: string | null;
  doctorId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Speciality model - Medical specialties
 */
export interface Speciality {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

/**
 * DoctorSpeciality - Many-to-many junction table
 */
export interface DoctorSpeciality {
  doctorId: string;
  specialityId: string;
  createdAt: Date;
}

/**
 * Experience model - Doctor education and work history
 */
export interface Experience {
  id: string;
  doctorId: string;
  experienceType: ExperienceType;
  title: string;
  institution: string | null;
  startDate: Date | null;
  endDate: Date | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

/**
 * Clinic model - Physical or virtual consultation locations
 */
export interface Clinic {
  id: string;
  name: string;
  address: string | null;
  country: string | null;
  city: string | null;
  neighborhood: string | null;
  latitude: number | null;
  longitude: number | null;
  isVirtual: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

/**
 * DoctorClinic - Many-to-many junction table
 */
export interface DoctorClinic {
  doctorId: string;
  clinicId: string;
  createdAt: Date;
}

/**
 * Pricing model - Service pricing per doctor per clinic
 */
export interface Pricing {
  id: string;
  doctorId: string;
  clinicId: string;
  title: string;
  price: number; // Decimal converted to number for serialization
  currency: string;
  durationMinutes: number;
  description: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

/**
 * Schedule model - Weekly schedule template
 */
export interface Schedule {
  id: string;
  doctorId: string;
  clinicId: string;
  dayOfWeek: DayOfWeek;
  startTime: string; // Format: "HH:mm"
  endTime: string; // Format: "HH:mm"
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

/**
 * TimeSlot model - Individual bookable time slots
 */
export interface TimeSlot {
  id: string;
  scheduleId: string;
  startTime: string; // Format: "HH:mm"
  endTime: string; // Format: "HH:mm"
  isBooked: boolean;
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

/**
 * Appointment model - Booked appointments
 */
export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  clinicId: string;
  pricingId: string | null;
  timeSlotId: string | null;
  datetime: Date;
  durationMinutes: number;
  type: AppointmentType;
  status: AppointmentStatus;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

/**
 * Opinion model - Patient reviews and ratings
 */
export interface Opinion {
  id: string;
  doctorId: string;
  patientId: string;
  rating: number;
  title: string | null;
  description: string | null;
  anonymized: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

// ======================
// SERIALIZED TYPES (for client components)
// ======================

/**
 * Serialized versions have Date objects converted to ISO strings
 * Use these for data passed to client components
 */

export type SerializedUser = Omit<User, "createdAt" | "updatedAt" | "deletedAt"> & {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type SerializedDoctor = Omit<Doctor, "createdAt" | "updatedAt" | "deletedAt"> & {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type SerializedPatient = Omit<Patient, "birthdate" | "createdAt" | "updatedAt" | "deletedAt"> & {
  birthdate: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type SerializedAppointment = Omit<Appointment, "datetime" | "createdAt" | "updatedAt" | "deletedAt"> & {
  datetime: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type SerializedExperience = Omit<Experience, "startDate" | "endDate" | "createdAt" | "updatedAt" | "deletedAt"> & {
  startDate: string | null;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

// ======================
// TYPE GUARDS
// ======================

export function isDoctor(user: User & { role: UserRole }): boolean {
  return user.role === UserRole.DOCTOR;
}

export function isPatient(user: User & { role: UserRole }): boolean {
  return user.role === UserRole.PATIENT;
}

export function isAdmin(user: User & { role: UserRole }): boolean {
  return user.role === UserRole.ADMIN;
}

export function isActiveUser(user: User): boolean {
  return user.isActive && user.deletedAt === null;
}

export function isDeletedRecord<T extends { deletedAt: Date | null }>(record: T): boolean {
  return record.deletedAt !== null;
}

export function hasCoordinates(clinic: Clinic): clinic is Clinic & {
  latitude: number;
  longitude: number;
} {
  return (
    clinic.latitude !== null &&
    clinic.longitude !== null &&
    !isNaN(clinic.latitude) &&
    !isNaN(clinic.longitude)
  );
}
