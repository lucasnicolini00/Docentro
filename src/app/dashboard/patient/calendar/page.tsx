import { requirePatient } from "@/lib/auth-guards";
import { getPatientDashboard } from "@/lib/actions/patients";
import PatientCalendar from "./components/PatientCalendar";
import ActionButton from "./components/ActionButton";
import Link from "next/link";

export default async function PatientCalendarPage() {
  // Ensure user is authenticated as a patient
  await requirePatient();

  // Get patient dashboard data with real appointments
  const result = await getPatientDashboard();

  if (!result.success || !result.data) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Error al cargar el calendario
        </h1>
        <p className="text-gray-600">{result.error}</p>
      </div>
    );
  }

  const { upcomingAppointments, pastAppointments } = result.data;

  // Calculate appointment statistics
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // All appointments for statistics
  const allAppointments = [...upcomingAppointments, ...pastAppointments];

  // Appointments this month
  const thisMonthAppointments = allAppointments.filter((apt) => {
    const aptDate = new Date(apt.datetime);
    return (
      aptDate.getMonth() === currentMonth &&
      aptDate.getFullYear() === currentYear
    );
  });

  // Count by status
  const appointmentStats = {
    thisMonth: thisMonthAppointments.length,
    upcoming: upcomingAppointments.length,
    completed: allAppointments.filter((apt) => apt.status === "COMPLETED")
      .length,
    canceled: allAppointments.filter((apt) => apt.status === "CANCELED").length,
  };

  // Transform appointments to calendar format
  const calendarAppointments = allAppointments.map((appointment) => ({
    id: appointment.id,
    title: `Dr. ${appointment.doctor.user.firstName} ${
      appointment.doctor.user.lastName
    } - ${
      appointment.doctor.specialities?.[0]?.speciality?.name ||
      "Consulta General"
    }`,
    start: appointment.datetime.toISOString(),
    end: new Date(
      appointment.datetime.getTime() +
        (appointment.durationMinutes || 30) * 60000
    ).toISOString(),
    extendedProps: {
      status: appointment.status,
      doctorName: `${appointment.doctor.user.firstName} ${appointment.doctor.user.lastName}`,
      specialty:
        appointment.doctor.specialities?.[0]?.speciality?.name ||
        "Consulta General",
      clinicName: appointment.clinic?.name || "Clínica no especificada",
      clinicAddress: appointment.clinic?.address || "",
      notes: appointment.notes || "",
      type: appointment.type || "IN_PERSON",
      appointmentId: appointment.id,
    },
  }));

  return (
    <>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Mis Citas Médicas
            </h1>
            <p className="text-gray-600 mt-2">
              Revisa y gestiona todas tus citas médicas programadas
            </p>
          </div>
          <div className="flex space-x-3">
            <Link
              href="/search"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              + Nueva Cita
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar takes most space */}
        <div className="lg:col-span-3">
          <PatientCalendar
            initialAppointments={calendarAppointments}
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
              <ActionButton
                href="/search"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium block text-center"
              >
                🔍 Buscar Doctores
              </ActionButton>

              <ActionButton
                href="/dashboard/patient/appointments"
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium block text-center"
              >
                📅 Ver Mis Citas
              </ActionButton>

              <ActionButton
                href="/dashboard/patient/prescriptions"
                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium block text-center"
                isComingSoon={true}
              >
                📋 Mis Recetas
              </ActionButton>

              <ActionButton
                href="/dashboard/patient/medical-history"
                className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium block text-center"
                isComingSoon={true}
              >
                📄 Historial Médico
              </ActionButton>
            </div>
          </div>

          {/* Appointment Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Resumen de Citas
              </h3>
              <Link
                href="/dashboard/patient/appointments"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Ver todas →
              </Link>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-sm text-gray-600">Este mes:</span>
                <span className="font-medium text-lg">
                  {appointmentStats.thisMonth}
                </span>
              </div>

              <Link
                href="/dashboard/patient/appointments?filter=upcoming"
                className="flex justify-between items-center p-2 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
              >
                <span className="text-sm text-gray-600">Próximas:</span>
                <span className="font-medium text-lg text-blue-600">
                  {appointmentStats.upcoming}
                </span>
              </Link>

              <div className="flex justify-between items-center p-2 rounded-lg hover:bg-green-50 transition-colors">
                <span className="text-sm text-gray-600">Completadas:</span>
                <span className="font-medium text-lg text-green-600">
                  {appointmentStats.completed}
                </span>
              </div>

              <div className="flex justify-between items-center p-2 rounded-lg hover:bg-red-50 transition-colors">
                <span className="text-sm text-gray-600">Canceladas:</span>
                <span className="font-medium text-lg text-red-600">
                  {appointmentStats.canceled}
                </span>
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
    </>
  );
}
