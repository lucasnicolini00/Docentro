/**
 * Shared helper utilities for generating dynamic time slots from schedule templates
 * Used by schedulesService to avoid code duplication
 */

const DAY_MAPPING = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
] as const;

export interface ScheduleTemplate {
  id: string;
  dayOfWeek: string;
  timeSlots: Array<{
    id: string;
    startTime: string;
    endTime: string;
    isBlocked: boolean;
  }>;
  clinic: {
    name: string;
    address: string | null;
  };
  doctor?: {
    user: {
      firstName: string;
      lastName: string;
    };
  };
}

export interface AppointmentRecord {
  datetime: Date;
  durationMinutes: number;
  id: string;
  status: string;
  clinicId?: string;
  patient?: {
    user: {
      firstName: string;
      lastName: string;
    };
  };
}

export interface GeneratedSlot {
  id: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  isBlocked: boolean;
  schedule: {
    dayOfWeek: string;
    clinic: {
      name: string;
      address: string | null;
    };
    doctor?: {
      user: {
        firstName: string;
        lastName: string;
      };
    };
  };
  appointment?: {
    id: string;
    status: string;
    patient?: {
      user: {
        firstName: string;
        lastName: string;
      };
    };
  } | null;
}

/**
 * Creates appointment lookup maps for O(1) access
 */
export function createAppointmentMaps(appointments: AppointmentRecord[]) {
  // Map for calendar view (timestamp only)
  const appointmentMap = new Map<number, AppointmentRecord>();

  // Map for clinic-specific view (timestamp_clinicId)
  const appointmentByClinicMap = new Map<string, AppointmentRecord>();

  for (const apt of appointments) {
    appointmentMap.set(apt.datetime.getTime(), apt);
    if (apt.clinicId) {
      const key = `${apt.datetime.getTime()}_${apt.clinicId}`;
      appointmentByClinicMap.set(key, apt);
    }
  }

  return { appointmentMap, appointmentByClinicMap };
}

/**
 * Groups schedules by day of week for efficient lookups
 */
export function groupSchedulesByDay<T extends { dayOfWeek: string }>(
  schedules: T[]
): Map<string, T[]> {
  const schedulesByDay = new Map<string, T[]>();

  for (const schedule of schedules) {
    const existing = schedulesByDay.get(schedule.dayOfWeek) || [];
    existing.push(schedule);
    schedulesByDay.set(schedule.dayOfWeek, existing);
  }

  return schedulesByDay;
}

/**
 * Generates time slot instances from schedule templates for a date range
 * @param schedules - Schedule templates with time slot definitions
 * @param appointments - Existing appointments to mark slots as booked
 * @param startDate - Start of date range
 * @param endDate - End of date range
 * @param includeClinicId - Whether to use clinic-specific appointment matching
 * @returns Array of generated time slot instances
 */
export function generateTimeSlotsForDateRange(
  schedules: ScheduleTemplate[],
  appointments: AppointmentRecord[],
  startDate: Date,
  endDate: Date,
  includeClinicId = false
): GeneratedSlot[] {
  const resultSlots: GeneratedSlot[] = [];

  // Create lookup maps for O(1) performance
  const { appointmentMap, appointmentByClinicMap } =
    createAppointmentMaps(appointments);
  const schedulesByDay = groupSchedulesByDay(schedules);

  // Iterate through each day in the range
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dayOfWeek = DAY_MAPPING[currentDate.getDay()];
    const daySchedules = schedulesByDay.get(dayOfWeek) || [];

    for (const schedule of daySchedules) {
      // For each template slot in the schedule
      for (const templateSlot of schedule.timeSlots) {
        // Construct the actual datetime for this slot instance
        const [hours, minutes] = templateSlot.startTime.split(":").map(Number);
        const slotDateTime = new Date(currentDate);
        slotDateTime.setHours(hours, minutes, 0, 0);

        // Calculate end time (default 30 min if not specified)
        const [endHours, endMinutes] = templateSlot.endTime
          .split(":")
          .map(Number);
        const slotEndTime = new Date(currentDate);
        slotEndTime.setHours(endHours, endMinutes, 0, 0);

        // O(1) lookup for appointment
        let appointment: AppointmentRecord | undefined;
        if (includeClinicId && "clinicId" in schedule) {
          const scheduleWithClinic = schedule as typeof schedule & { clinicId: string };
          const appointmentKey = `${slotDateTime.getTime()}_${scheduleWithClinic.clinicId}`;
          appointment = appointmentByClinicMap.get(appointmentKey);
        } else {
          appointment = appointmentMap.get(slotDateTime.getTime());
        }

        resultSlots.push({
          id: `${templateSlot.id}-${slotDateTime.toISOString()}`,
          startTime: slotDateTime.toISOString(),
          endTime: slotEndTime.toISOString(),
          isBooked: !!appointment,
          isBlocked: templateSlot.isBlocked,
          schedule: {
            dayOfWeek: schedule.dayOfWeek,
            clinic: schedule.clinic,
            doctor: schedule.doctor,
          },
          appointment: appointment
            ? {
                id: appointment.id,
                status: appointment.status,
                patient: appointment.patient,
              }
            : null,
        });
      }
    }

    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return resultSlots;
}

/**
 * Utility to parse time string to minutes since midnight
 */
export function parseTime(timeString: string): number {
  const [hours, minutes] = timeString.split(":").map(Number);
  return hours * 60 + minutes;
}

/**
 * Utility to format minutes since midnight back to time string
 */
export function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
}
