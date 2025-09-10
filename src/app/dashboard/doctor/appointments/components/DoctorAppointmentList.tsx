"use client";

import { useState, useTransition } from "react";
import { updateAppointmentStatus } from "@/lib/actions/appointments";
import { AppointmentStatus, AppointmentType } from "@prisma/client";

interface Appointment {
  id: string;
  datetime: Date;
  status: AppointmentStatus;
  type: AppointmentType;
  notes: string | null;
  patient: {
    id: string;
    name: string;
    surname: string;
    email: string;
    phone: string | null;
  };
  clinic: {
    id: string;
    name: string;
    address: string | null;
  };
}

interface DoctorAppointmentListProps {
  appointments: Appointment[];
  title: string;
}

export default function DoctorAppointmentList({
  appointments,
  title,
}: DoctorAppointmentListProps) {
  const [isPending, startTransition] = useTransition();
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handleStatusUpdate = async (
    appointmentId: string,
    newStatus: AppointmentStatus
  ) => {
    const confirmMessage =
      newStatus === AppointmentStatus.CONFIRMED
        ? "¿Confirmar esta cita?"
        : "¿Cancelar esta cita?";

    if (!confirm(confirmMessage)) {
      return;
    }

    setProcessingId(appointmentId);
    startTransition(async () => {
      try {
        const result = await updateAppointmentStatus(appointmentId, newStatus);
        if (result.success) {
          window.location.reload();
        } else {
          alert(result.error || "Error al actualizar la cita");
        }
      } catch {
        alert("Error al actualizar la cita");
      } finally {
        setProcessingId(null);
      }
    });
  };

  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case AppointmentStatus.PENDING:
        return "bg-yellow-100 text-yellow-800";
      case AppointmentStatus.CONFIRMED:
        return "bg-green-100 text-green-800";
      case AppointmentStatus.CANCELED:
        return "bg-red-100 text-red-800";
      case AppointmentStatus.COMPLETED:
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: AppointmentStatus) => {
    switch (status) {
      case AppointmentStatus.PENDING:
        return "Pendiente";
      case AppointmentStatus.CONFIRMED:
        return "Confirmada";
      case AppointmentStatus.CANCELED:
        return "Cancelada";
      case AppointmentStatus.COMPLETED:
        return "Completada";
      default:
        return status;
    }
  };

  const getTypeText = (type: AppointmentType) => {
    return type === AppointmentType.ONLINE ? "Virtual" : "Presencial";
  };

  const formatDateTime = (datetime: Date) => {
    const date = new Date(datetime);
    return {
      date: date.toLocaleDateString("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  if (appointments.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-4">📅</div>
          <p className="text-gray-500">No hay citas {title.toLowerCase()}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{appointments.length} citas</p>
      </div>

      <div className="divide-y divide-gray-200">
        {appointments.map((appointment) => {
          const { date, time } = formatDateTime(appointment.datetime);
          const canManage =
            appointment.status === AppointmentStatus.PENDING &&
            new Date(appointment.datetime) > new Date();

          return (
            <div key={appointment.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Patient Info */}
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-green-600">
                        {appointment.patient.name[0]}
                        {appointment.patient.surname[0]}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {appointment.patient.name} {appointment.patient.surname}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {appointment.patient.email}
                      </p>
                      {appointment.patient.phone && (
                        <p className="text-sm text-gray-600">
                          {appointment.patient.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Appointment Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-gray-600">Fecha</p>
                      <p className="font-medium text-gray-900 capitalize">
                        {date}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Hora</p>
                      <p className="font-medium text-gray-900">{time}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Modalidad</p>
                      <p className="font-medium text-gray-900">
                        {getTypeText(appointment.type)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Clínica</p>
                      <p className="font-medium text-gray-900 text-sm">
                        {appointment.clinic.name}
                      </p>
                    </div>
                  </div>

                  {/* Notes */}
                  {appointment.notes && (
                    <div className="mb-3">
                      <p className="text-sm text-gray-600">
                        Notas del paciente
                      </p>
                      <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
                        {appointment.notes}
                      </p>
                    </div>
                  )}
                </div>

                {/* Status and Actions */}
                <div className="flex flex-col items-end space-y-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      appointment.status
                    )}`}
                  >
                    {getStatusText(appointment.status)}
                  </span>

                  {canManage && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          handleStatusUpdate(
                            appointment.id,
                            AppointmentStatus.CONFIRMED
                          )
                        }
                        disabled={processingId === appointment.id || isPending}
                        className="text-green-600 hover:text-green-800 text-sm font-medium disabled:opacity-50 bg-green-50 px-3 py-1 rounded"
                      >
                        {processingId === appointment.id ? "..." : "Confirmar"}
                      </button>
                      <button
                        onClick={() =>
                          handleStatusUpdate(
                            appointment.id,
                            AppointmentStatus.CANCELED
                          )
                        }
                        disabled={processingId === appointment.id || isPending}
                        className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50 bg-red-50 px-3 py-1 rounded"
                      >
                        {processingId === appointment.id ? "..." : "Cancelar"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
