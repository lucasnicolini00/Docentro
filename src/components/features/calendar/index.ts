// Calendar Components
export { default as DoctorCalendar } from "./DoctorCalendar";
export { default as PatientCalendar } from "./PatientCalendar";
export { default as CalendarBooking } from "./CalendarBooking";
export { default as CalendarBookingWithData } from "./CalendarBookingWithData";

// Calendar Types
export interface CalendarAppointment {
  id: string;
  title: string;
  start: string;
  end: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  extendedProps: {
    status: string;
    patientName?: string;
    doctorName?: string;
    specialty?: string;
    clinicName: string;
    clinicAddress?: string;
    notes?: string;
    phone?: string;
    type: string;
    meetingLink?: string;
  };
}

export interface AvailableTimeSlot {
  id: string;
  start: string;
  end: string;
  available: boolean;
  blocked?: boolean;
}

// Calendar Utils
export const formatCalendarDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

export const formatDisplayTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatDisplayDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const getAppointmentStatusColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return {
        bg: "#fef3c7",
        border: "#f59e0b",
        text: "#92400e",
        label: "Pendiente",
      };
    case "CONFIRMED":
      return {
        bg: "#d1fae5",
        border: "#10b981",
        text: "#065f46",
        label: "Confirmada",
      };
    case "COMPLETED":
      return {
        bg: "#dbeafe",
        border: "#3b82f6",
        text: "#1e3a8a",
        label: "Completada",
      };
    case "CANCELED":
      return {
        bg: "#fee2e2",
        border: "#ef4444",
        text: "#991b1b",
        label: "Cancelada",
      };
    default:
      return {
        bg: "#f3f4f6",
        border: "#6b7280",
        text: "#374151",
        label: status,
      };
  }
};

export const transformAppointmentToCalendarEvent = (appointment: any): CalendarAppointment => {
  return {
    id: appointment.id,
    title: appointment.patient?.name 
      ? `${appointment.patient.name} ${appointment.patient.surname}`
      : appointment.timeSlot?.schedule?.doctor?.name 
      ? `Dr. ${appointment.timeSlot.schedule.doctor.name} ${appointment.timeSlot.schedule.doctor.surname}`
      : "Cita",
    start: appointment.timeSlot.startTime,
    end: appointment.timeSlot.endTime,
    extendedProps: {
      status: appointment.status,
      patientName: appointment.patient?.name 
        ? `${appointment.patient.name} ${appointment.patient.surname}`
        : undefined,
      doctorName: appointment.timeSlot?.schedule?.doctor?.name 
        ? `${appointment.timeSlot.schedule.doctor.name} ${appointment.timeSlot.schedule.doctor.surname}`
        : undefined,
      specialty: undefined, // Need to add specialty relation
      clinicName: appointment.timeSlot?.schedule?.clinic?.name || "Clínica",
      clinicAddress: appointment.timeSlot?.schedule?.clinic?.address || undefined,
      notes: appointment.notes || undefined,
      phone: appointment.patient?.phone || undefined,
      type: appointment.type,
      meetingLink: appointment.meetingLink || undefined,
    },
  };
};

export const generateTimeSlotEvents = (timeSlots: any[]): AvailableTimeSlot[] => {
  return timeSlots.map((slot) => ({
    id: slot.id,
    start: slot.startTime,
    end: slot.endTime,
    available: !slot.isBooked && !slot.isBlocked && !slot.appointment,
    blocked: slot.isBlocked,
  }));
};
