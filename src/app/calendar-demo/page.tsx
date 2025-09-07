import { CalendarBookingWithData } from "@/components/features/calendar";

export default function CalendarDemo() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Demostración del Sistema de Reservas
          </h1>
          <p className="mt-2 text-gray-600">
            Selecciona un horario disponible y confirma tu cita con el Dr.
            García
          </p>
        </div>

        <CalendarBookingWithData
          doctorId="doctor-1"
          clinicId="clinic-1"
          doctorName="García"
          specialty="Medicina General"
        />
      </div>
    </div>
  );
}
