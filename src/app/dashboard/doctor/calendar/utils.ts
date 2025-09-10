// Local calendar utilities for doctor calendar
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
    clinicName: string;
    notes?: string;
    phone?: string;
    type: string;
  };
}

export function transformAppointmentToCalendarEvent(
  appointment: any
): CalendarAppointment {
  const startDate = new Date(appointment.dateTime);
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour

  return {
    id: appointment.id,
    title: `${appointment.patient?.firstName} ${appointment.patient?.lastName}`,
    start: startDate.toISOString(),
    end: endDate.toISOString(),
    backgroundColor: appointment.status === "CONFIRMED" ? "#10b981" : "#f59e0b",
    borderColor: appointment.status === "CONFIRMED" ? "#10b981" : "#f59e0b",
    textColor: "#ffffff",
    extendedProps: {
      status: appointment.status,
      patientName: `${appointment.patient?.firstName} ${appointment.patient?.lastName}`,
      clinicName: appointment.clinic?.name || "Clínica",
      notes: appointment.notes || "",
      phone: appointment.patient?.phone || "",
      type: appointment.type || "appointment",
    },
  };
}
