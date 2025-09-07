import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { PatientCalendar } from "@/components/features/calendar";

export default async function PatientCalendarPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "PATIENT") {
    redirect("/unauthorized");
  }

  // Example patient appointments (in real app, fetch from database)
  const sampleAppointments = [
    {
      id: "1",
      title: "Dr. Ana García - Cardiología",
      start: "2024-12-20T10:00:00",
      end: "2024-12-20T10:30:00",
      extendedProps: {
        status: "CONFIRMED",
        doctorName: "Ana García",
        specialty: "Cardiología",
        clinicName: "Clínica del Corazón",
        clinicAddress: "Av. Providencia 123, Santiago",
        notes: "Traer exámenes anteriores",
        type: "IN_PERSON",
      },
    },
    {
      id: "2",
      title: "Dr. Carlos Mendez - Dermatología",
      start: "2024-12-22T14:30:00",
      end: "2024-12-22T15:00:00",
      extendedProps: {
        status: "PENDING",
        doctorName: "Carlos Mendez",
        specialty: "Dermatología",
        clinicName: "Centro Médico Derma",
        clinicAddress: "Las Condes 456, Santiago",
        notes: "Consulta de control",
        type: "ONLINE",
        meetingLink: "https://meet.google.com/xyz-abc-123",
      },
    },
    {
      id: "3",
      title: "Dr. María López - Pediatría",
      start: "2024-12-25T16:00:00",
      end: "2024-12-25T16:30:00",
      extendedProps: {
        status: "COMPLETED",
        doctorName: "María López",
        specialty: "Pediatría",
        clinicName: "Hospital Pediátrico",
        clinicAddress: "San Miguel 789, Santiago",
        notes: "Control de rutina - todo normal",
        type: "IN_PERSON",
      },
    },
    {
      id: "4",
      title: "Dr. Roberto Silva - Traumatología",
      start: "2024-12-28T09:00:00",
      end: "2024-12-28T09:30:00",
      extendedProps: {
        status: "CANCELED",
        doctorName: "Roberto Silva",
        specialty: "Traumatología",
        clinicName: "Clínica Traumatológica",
        clinicAddress: "Ñuñoa 321, Santiago",
        notes: "Cita cancelada por el doctor",
        type: "IN_PERSON",
      },
    },
  ];

  const handleEventClick = (clickInfo: any) => {
    // Handle appointment click - could open modal with details/actions
    const event = clickInfo.event;
    const details = event.extendedProps;

    console.log("Appointment details:", {
      doctor: details.doctorName,
      specialty: details.specialty,
      clinic: details.clinicName,
      status: details.status,
      type: details.type,
      meetingLink: details.meetingLink,
    });

    // You could open a modal here with appointment actions:
    // - View full details
    // - Cancel appointment
    // - Reschedule
    // - Join video call (for online appointments)
    // - Download appointment confirmation
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mis Citas Médicas</h1>
        <p className="text-gray-600 mt-2">
          Revisa y gestiona todas tus citas médicas programadas
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar takes most space */}
        <div className="lg:col-span-3">
          <PatientCalendar
            initialAppointments={sampleAppointments}
            onEventClick={handleEventClick}
            showUpcoming={true}
          />
        </div>

        {/* Sidebar with actions and info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Acciones
            </h3>

            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                🔍 Buscar Doctores
              </button>

              <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                📋 Mis Recetas
              </button>

              <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                📄 Historial Médico
              </button>
            </div>
          </div>

          {/* Appointment Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Resumen de Citas
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Este mes:</span>
                <span className="font-medium text-lg">4</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Próximas:</span>
                <span className="font-medium text-lg text-blue-600">2</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Completadas:</span>
                <span className="font-medium text-lg text-green-600">1</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Canceladas:</span>
                <span className="font-medium text-lg text-red-600">1</span>
              </div>
            </div>
          </div>

          {/* Health Tips */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              💡 Consejos de Salud
            </h3>

            <div className="space-y-3 text-sm text-blue-800">
              <p>
                <strong>Antes de tu cita:</strong> Prepara una lista de síntomas
                y preguntas.
              </p>

              <p>
                <strong>Documentos:</strong> Lleva tu carnet, exámenes
                anteriores y lista de medicamentos.
              </p>

              <p>
                <strong>Puntualidad:</strong> Llega 15 minutos antes de tu cita.
              </p>

              <p>
                <strong>Citas virtuales:</strong> Asegúrate de tener buena
                conexión a internet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
