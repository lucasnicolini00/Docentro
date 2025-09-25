import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import DoctorCalendar from "./components/DoctorCalendar";
import { transformAppointmentToCalendarEvent } from "./utils";
import { getDoctorAppointments } from "@/lib/actions/appointments";
import prisma from "@/lib/prisma";

export default async function DoctorCalendarPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;
  const doctor = await prisma.doctor.findUnique({
    where: { userId: session.user.id },
  });
  if (!doctor) return null;

  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 3);
  const appointments = await getDoctorAppointments(doctor.id, {
    startDate: new Date(),
    endDate,
  });
  const calendarEvents = appointments.map(transformAppointmentToCalendarEvent);

  return (
    <div className="container mx-auto px-4 py-8">
      <DoctorCalendar initialAppointments={calendarEvents} editable={true} />
    </div>
  );
}
