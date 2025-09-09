import { DayOfWeek } from "@prisma/client";

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  isBlocked: boolean;
}

export interface Schedule {
  id: string;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  isActive: boolean;
  clinic: {
    id: string;
    name: string;
    address: string | null;
  };
  timeSlots: TimeSlot[];
}

export interface Clinic {
  id: string;
  name: string;
  address: string | null;
}

export interface ScheduleManagementProps {
  initialSchedules: Schedule[];
  clinics: Clinic[];
}

export const DAY_NAMES = {
  MONDAY: "Lunes",
  TUESDAY: "Martes",
  WEDNESDAY: "Miércoles",
  THURSDAY: "Jueves",
  FRIDAY: "Viernes",
  SATURDAY: "Sábado",
  SUNDAY: "Domingo",
} as const;

export const DAY_ORDER = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
] as const;

export const SCHEDULE_TEMPLATES = [
  {
    name: "Horario Comercial (Lun-Vie)",
    description: "Lunes a Viernes, 8:00 AM a 6:00 PM",
    schedules: [
      { dayOfWeek: "MONDAY", startTime: "08:00", endTime: "18:00" },
      { dayOfWeek: "TUESDAY", startTime: "08:00", endTime: "18:00" },
      { dayOfWeek: "WEDNESDAY", startTime: "08:00", endTime: "18:00" },
      { dayOfWeek: "THURSDAY", startTime: "08:00", endTime: "18:00" },
      { dayOfWeek: "FRIDAY", startTime: "08:00", endTime: "18:00" },
    ],
  },
  {
    name: "Horario Extendido",
    description: "Lunes a Sábado, 7:00 AM a 8:00 PM",
    schedules: [
      { dayOfWeek: "MONDAY", startTime: "07:00", endTime: "20:00" },
      { dayOfWeek: "TUESDAY", startTime: "07:00", endTime: "20:00" },
      { dayOfWeek: "WEDNESDAY", startTime: "07:00", endTime: "20:00" },
      { dayOfWeek: "THURSDAY", startTime: "07:00", endTime: "20:00" },
      { dayOfWeek: "FRIDAY", startTime: "07:00", endTime: "20:00" },
      { dayOfWeek: "SATURDAY", startTime: "08:00", endTime: "16:00" },
    ],
  },
  {
    name: "Medio Turno Mañana",
    description: "Lunes a Viernes, 8:00 AM a 12:00 PM",
    schedules: [
      { dayOfWeek: "MONDAY", startTime: "08:00", endTime: "12:00" },
      { dayOfWeek: "TUESDAY", startTime: "08:00", endTime: "12:00" },
      { dayOfWeek: "WEDNESDAY", startTime: "08:00", endTime: "12:00" },
      { dayOfWeek: "THURSDAY", startTime: "08:00", endTime: "12:00" },
      { dayOfWeek: "FRIDAY", startTime: "08:00", endTime: "12:00" },
    ],
  },
  {
    name: "Medio Turno Tarde",
    description: "Lunes a Viernes, 2:00 PM a 6:00 PM",
    schedules: [
      { dayOfWeek: "MONDAY", startTime: "14:00", endTime: "18:00" },
      { dayOfWeek: "TUESDAY", startTime: "14:00", endTime: "18:00" },
      { dayOfWeek: "WEDNESDAY", startTime: "14:00", endTime: "18:00" },
      { dayOfWeek: "THURSDAY", startTime: "14:00", endTime: "18:00" },
      { dayOfWeek: "FRIDAY", startTime: "14:00", endTime: "18:00" },
    ],
  },
] as const;
