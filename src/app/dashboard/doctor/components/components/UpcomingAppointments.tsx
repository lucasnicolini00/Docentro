import Link from "next/link";
import { Clock } from "lucide-react";
import { UpcomingAppointment } from "./types";

interface UpcomingAppointmentsProps {
  appointments: UpcomingAppointment[];
  loading: boolean;
}

export default function UpcomingAppointments({
  appointments,
  loading,
}: UpcomingAppointmentsProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Próximas Citas
            </h3>
            <Link
              href="/dashboard/doctor/appointments"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Ver todas
            </Link>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-3 w-1/3 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="text-right">
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-3 w-12 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Próximas Citas
          </h3>
          <Link
            href="/dashboard/doctor/appointments"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Ver todas
          </Link>
        </div>
      </div>
      <div className="p-6">
        {appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {appointment.patientName}
                  </p>
                  <p className="text-sm text-gray-500">{appointment.type}</p>
                  {appointment.status === "PENDING" && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mt-1">
                      Pendiente
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {appointment.time}
                  </p>
                  <p className="text-xs text-gray-500">{appointment.date}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p>No hay citas próximas</p>
            <p className="text-sm mt-1">
              Las citas aparecerán aquí cuando sean agendadas
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
