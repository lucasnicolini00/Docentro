/**
 * Common relation types and query result shapes
 * These types represent frequently used data structures with relations included
 */

import type {
  User,
  Doctor,
  Patient,
  Clinic,
  Speciality,
  Image,
  Pricing,
  Opinion,
  Appointment,
  Experience,
  Schedule,
  TimeSlot,
  DayOfWeek,
  AppointmentStatus,
  AppointmentType,
} from "./prisma";

// ======================
// USER RELATIONS
// ======================

/**
 * User with profile image
 */
export interface UserWithImage extends User {
  profileImage: Image | null;
}

/**
 * User with patient data
 */
export interface UserWithPatient extends User {
  patient: Patient | null;
}

/**
 * User with doctor data
 */
export interface UserWithDoctor extends User {
  doctor: Doctor | null;
}

/**
 * Full user profile with all relations
 */
export interface FullUserProfile extends User {
  profileImage: Image | null;
  patient: Patient | null;
  doctor: DoctorWithRelations | null;
}

// ======================
// DOCTOR RELATIONS
// ======================

/**
 * Doctor with user info (most common query)
 */
export interface DoctorWithUser extends Doctor {
  user: Pick<User, "id" | "firstName" | "lastName" | "email" | "phone">;
}

/**
 * Doctor with specialties
 */
export interface DoctorWithSpecialities extends Doctor {
  specialities: {
    speciality: Speciality;
  }[];
}

/**
 * Doctor with clinics
 */
export interface DoctorWithClinics extends Doctor {
  clinics: {
    clinic: Clinic;
  }[];
}

/**
 * Doctor with pricing
 */
export interface DoctorWithPricing extends Doctor {
  pricings: Pricing[];
}

/**
 * Doctor with opinions/ratings
 */
export interface DoctorWithOpinions extends Doctor {
  opinions: Opinion[];
}

/**
 * Doctor with profile image
 */
export interface DoctorWithImage extends Doctor {
  profileImage: Image | null;
}

/**
 * Full doctor profile with all relations
 */
export interface DoctorWithRelations extends Doctor {
  user: Pick<User, "id" | "firstName" | "lastName" | "email" | "phone">;
  profileImage: Image | null;
  images: Image[];
  specialities: {
    speciality: Speciality;
  }[];
  experiences: Experience[];
  pricings: Pricing[];
  clinics: {
    clinic: Clinic;
  }[];
  opinions: Opinion[];
}

// ======================
// PATIENT RELATIONS
// ======================

/**
 * Patient with user info
 */
export interface PatientWithUser extends Patient {
  user: Pick<User, "id" | "firstName" | "lastName" | "email" | "phone">;
}

/**
 * Patient with appointments
 */
export interface PatientWithAppointments extends Patient {
  appointments: Appointment[];
}

/**
 * Full patient profile
 */
export interface FullPatientProfile extends Patient {
  user: UserWithImage;
  appointments: AppointmentWithRelations[];
}

// ======================
// APPOINTMENT RELATIONS
// ======================

/**
 * Appointment with basic relations
 */
export interface AppointmentWithRelations extends Appointment {
  doctor: DoctorWithUser;
  patient: PatientWithUser;
  clinic: Clinic;
  pricing: Pricing | null;
  timeSlot: TimeSlot | null;
}

/**
 * Appointment for doctor dashboard
 */
export interface DoctorAppointment extends Appointment {
  patient: {
    user: Pick<User, "firstName" | "lastName" | "phone" | "email">;
  };
  clinic: Pick<Clinic, "id" | "name" | "address" | "city">;
  pricing: Pick<Pricing, "title" | "price" | "currency"> | null;
}

/**
 * Appointment for patient dashboard
 */
export interface PatientAppointment extends Appointment {
  doctor: {
    user: Pick<User, "firstName" | "lastName">;
    specialities: {
      speciality: Pick<Speciality, "name">;
    }[];
    profileImage: Pick<Image, "url"> | null;
  };
  clinic: Pick<Clinic, "name" | "address" | "city" | "isVirtual">;
  pricing: Pick<Pricing, "title" | "price" | "currency"> | null;
}

// ======================
// SCHEDULE & TIMESLOT RELATIONS
// ======================

/**
 * Schedule with clinic info
 */
export interface ScheduleWithClinic extends Schedule {
  clinic: Pick<Clinic, "id" | "name" | "city" | "isVirtual">;
}

/**
 * Schedule with time slots
 */
export interface ScheduleWithSlots extends Schedule {
  timeSlots: TimeSlot[];
}

/**
 * Full schedule with all relations
 */
export interface FullSchedule extends Schedule {
  clinic: Clinic;
  timeSlots: TimeSlot[];
}

/**
 * Available time slot for booking
 */
export interface AvailableTimeSlot {
  id: string;
  datetime: string; // ISO string
  time: string; // HH:mm format
  clinicId: string;
  clinicName: string;
  isVirtual: boolean;
}

// ======================
// CLINIC RELATIONS
// ======================

/**
 * Clinic with doctors
 */
export interface ClinicWithDoctors extends Clinic {
  doctorLinks: {
    doctor: DoctorWithUser;
  }[];
}

/**
 * Clinic with schedules
 */
export interface ClinicWithSchedules extends Clinic {
  schedules: Schedule[];
}

// ======================
// DASHBOARD DATA TYPES
// ======================

/**
 * Doctor dashboard statistics
 */
export interface DoctorDashboardStats {
  totalAppointments: number;
  pendingAppointments: number;
  confirmedAppointments: number;
  completedAppointments: number;
  canceledAppointments: number;
  totalPatients: number;
  averageRating: number;
  totalReviews: number;
  utilizationRate: number;
  revenue: {
    total: number;
    currency: string;
  };
}

/**
 * Patient dashboard statistics
 */
export interface PatientDashboardStats {
  totalAppointments: number;
  upcomingAppointments: number;
  completedAppointments: number;
  canceledAppointments: number;
  favoriteDoctors: string[];
}

/**
 * Upcoming appointment summary
 */
export interface UpcomingAppointment {
  id: string;
  datetime: string;
  doctorName: string;
  patientName: string;
  speciality: string;
  clinicName: string;
  status: AppointmentStatus;
  type: AppointmentType;
}

// ======================
// FORM INPUT TYPES
// ======================

/**
 * Create/update doctor profile
 */
export interface DoctorProfileInput {
  picaddress?: string;
  emailNotifications?: boolean;
  pushNotifications?: boolean;
  isPublic?: boolean;
  allowOnlineConsultations?: boolean;
  autoBookingEnabled?: boolean;
  remindersEnabled?: boolean;
  consultationPrice?: number;
}

/**
 * Create/update patient profile
 */
export interface PatientProfileInput {
  birthdate?: Date;
  gender?: string;
}

/**
 * Create appointment
 */
export interface CreateAppointmentInput {
  doctorId: string;
  patientId: string;
  clinicId: string;
  pricingId?: string;
  timeSlotId?: string;
  datetime: Date;
  durationMinutes: number;
  type: AppointmentType;
  notes?: string;
}

/**
 * Update appointment
 */
export interface UpdateAppointmentInput {
  datetime?: Date;
  status?: AppointmentStatus;
  notes?: string;
}

/**
 * Create schedule
 */
export interface CreateScheduleInput {
  doctorId: string;
  clinicId: string;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  isActive?: boolean;
}

/**
 * Create pricing
 */
export interface CreatePricingInput {
  doctorId: string;
  clinicId: string;
  title: string;
  price: number;
  currency?: string;
  durationMinutes?: number;
  description?: string;
  isActive?: boolean;
}

// ======================
// PAGINATION TYPES
// ======================

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export type PaginatedAppointments = PaginatedResult<AppointmentWithRelations>;
export type PaginatedDoctors = PaginatedResult<DoctorWithRelations>;
export type PaginatedPatients = PaginatedResult<PatientWithUser>;

// ======================
// FILTER TYPES
// ======================

export interface AppointmentFilters {
  status?: AppointmentStatus;
  type?: AppointmentType;
  startDate?: Date;
  endDate?: Date;
  doctorId?: string;
  patientId?: string;
  clinicId?: string;
}

export interface DoctorSearchFilters {
  speciality?: string;
  city?: string;
  name?: string;
  isPublic?: boolean;
  allowOnlineConsultations?: boolean;
  minRating?: number;
  maxPrice?: number;
}
