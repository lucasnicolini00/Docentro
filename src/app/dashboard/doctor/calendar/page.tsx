import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  DoctorCalendar,
  transformAppointmentToCalendarEvent,
} from "@/components/features/calendar";
import { getDoctorAppointments } from "@/lib/actions/appointments";
import prisma from "@/lib/prisma";

export default async function DoctorCalendarPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "DOCTOR") {
    redirect("/unauthorized");
  }

  // Get the doctor from the database
  const doctor = await prisma.doctor.findUnique({
    where: { userId: session.user.id },
  });

  if (!doctor) {
    redirect("/dashboard/doctor");
  }

  // Get appointments for the next 3 months
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 3);

  const appointments = await getDoctorAppointments(doctor.id, {
    startDate: new Date(),
    endDate,
  });

  // Transform appointments to calendar events
  const calendarEvents = appointments.map(transformAppointmentToCalendarEvent);

  const handleDateSelect = (selectInfo: any) => {
    // Handle creating new appointment/blocking time
    console.log("Date selected:", selectInfo);
    // You could open a modal here to create a new appointment
  };

  const handleEventClick = (clickInfo: any) => {
    // Handle appointment click - could open modal with details
    console.log("Event clicked:", clickInfo);
    // You could open a modal here to view/edit appointment details
  };

  const handleEventDrop = (dropInfo: any) => {
    // Handle appointment rescheduling
    console.log("Event moved:", dropInfo);
    // You could call an API here to update the appointment time
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mi Calendario</h1>
        <p className="text-gray-600 mt-2">
          Gestiona tus citas y horarios disponibles
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar takes most space */}
        <div className="lg:col-span-3">
          <DoctorCalendar
            initialAppointments={calendarEvents}
            onDateSelect={handleDateSelect}
            onEventClick={handleEventClick}
            onEventDrop={handleEventDrop}
            editable={true}
          />
        </div>

        {/* Sidebar with quick actions */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Acciones Rápidas
            </h3>

            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                + Nueva Cita
              </button>

              <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                Bloquear Horario
              </button>

              <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                Ver Horarios
              </button>
            </div>

            <hr className="my-6" />

            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Estadísticas del Día
              </h4>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total citas:</span>
                  <span className="font-medium">8</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Confirmadas:</span>
                  <span className="font-medium text-green-600">6</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Pendientes:</span>
                  <span className="font-medium text-yellow-600">2</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Horarios libres:</span>
                  <span className="font-medium text-blue-600">4</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
