"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateAppointmentStatus } from "@/lib/actions/appointments";
import { AppointmentStatus, AppointmentType } from "@prisma/client";
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  User,
  CheckCircle,
  XCircle,
  MessageSquare,
  X,
  Loader2,
} from "lucide-react";

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
  showState?: boolean;
}

export default function DoctorAppointmentList({
  appointments,
  title,
  showState = true,
}: DoctorAppointmentListProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState<"confirm" | "cancel" | null>(
    null
  );

  const openModal = (
    appointment: Appointment,
    action: "confirm" | "cancel"
  ) => {
    setSelectedAppointment(appointment);
    setActionType(action);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
    setActionType(null);
  };

  const handleStatusUpdate = async () => {
    if (!selectedAppointment || !actionType) return;

    const newStatus =
      actionType === "confirm"
        ? AppointmentStatus.CONFIRMED
        : AppointmentStatus.CANCELED;

    setProcessingId(selectedAppointment.id);
    startTransition(async () => {
      try {
        const result = await updateAppointmentStatus(
          selectedAppointment.id,
          newStatus
        );
        if (result.success) {
          // Notify patient via server action
          // const { date: formattedDate, time: formattedTime } = formatDateTime(
          //   selectedAppointment.datetime
          // );

          // Fire-and-forget server action to send the email. Log failures.
          // sendAppointmentStatusUpdateEmail(selectedAppointment.patient.email, {
          //   patientName: `${selectedAppointment.patient.name} ${selectedAppointment.patient.surname}`,
          //   doctorName: user?.name || "",
          //   clinicName: selectedAppointment.clinic.name,
          //   date: formattedDate,
          //   time: formattedTime,
          //   notes: selectedAppointment.notes || undefined,
          //   status:
          //     newStatus === AppointmentStatus.CONFIRMED
          //       ? "CONFIRMED"
          //       : "CANCELED",
          // }).catch((emailErr) => {
          //   console.error(
          //     "Error sending patient notification email:",
          //     emailErr
          //   );
          // });

          closeModal();
          router.refresh();
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
            <div
              key={appointment.id}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start gap-4">
                {/* Patient Avatar */}
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-white" />
                </div>

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                  {/* Patient Info Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">
                        {appointment.patient.name} {appointment.patient.surname}
                      </h4>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {appointment.patient.email}
                        </div>
                        {appointment.patient.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {appointment.patient.phone}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Status Badge */}
                    {showState && (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          appointment.status
                        )}`}
                      >
                        {getStatusText(appointment.status)}
                      </span>
                    )}
                  </div>

                  {/* Appointment Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Fecha
                        </span>
                      </div>
                      <p className="font-medium text-gray-900 capitalize text-sm">
                        {date}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Hora
                        </span>
                      </div>
                      <p className="font-medium text-gray-900 text-sm">
                        {time}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Clínica
                        </span>
                      </div>
                      <p className="font-medium text-gray-900 text-sm">
                        {appointment.clinic.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {getTypeText(appointment.type)}
                      </p>
                    </div>
                  </div>

                  {/* Notes */}
                  {appointment.notes && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="w-4 h-4 text-gray-500" />
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Notas del paciente
                        </span>
                      </div>
                      <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                        <p className="text-sm text-gray-900">
                          {appointment.notes}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  {canManage && (
                    <div className="flex gap-3 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => openModal(appointment, "confirm")}
                        disabled={processingId === appointment.id || isPending}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                      >
                        <CheckCircle className="w-4 h-4" />
                        {processingId === appointment.id
                          ? "Procesando..."
                          : "Confirmar Cita"}
                      </button>
                      <button
                        onClick={() => openModal(appointment, "cancel")}
                        disabled={processingId === appointment.id || isPending}
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                      >
                        <XCircle className="w-4 h-4" />
                        {processingId === appointment.id
                          ? "Procesando..."
                          : "Cancelar Cita"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    actionType === "confirm" ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  {actionType === "confirm" ? (
                    <CheckCircle className={`w-5 h-5 text-green-600`} />
                  ) : (
                    <XCircle className={`w-5 h-5 text-red-600`} />
                  )}
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  {actionType === "confirm"
                    ? "Confirmar Cita"
                    : "Cancelar Cita"}
                </h2>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  {actionType === "confirm"
                    ? "¿Estás seguro de que deseas confirmar esta cita? El paciente será notificado."
                    : "¿Estás seguro de que deseas cancelar esta cita? El paciente será notificado de la cancelación."}
                </p>

                {/* Appointment Details */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {selectedAppointment.patient.name}{" "}
                        {selectedAppointment.patient.surname}
                      </h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-gray-500">Fecha:</span>
                          <p className="font-medium text-gray-900">
                            {formatDateTime(selectedAppointment.datetime).date}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">Hora:</span>
                          <p className="font-medium text-gray-900">
                            {formatDateTime(selectedAppointment.datetime).time}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">Clínica:</span>
                          <p className="font-medium text-gray-900">
                            {selectedAppointment.clinic.name}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">Tipo:</span>
                          <p className="font-medium text-gray-900">
                            {getTypeText(selectedAppointment.type)}
                          </p>
                        </div>
                      </div>
                      {selectedAppointment.notes && (
                        <div className="mt-3">
                          <span className="text-gray-500 text-sm">Notas:</span>
                          <p className="text-sm text-gray-900 bg-white p-2 rounded border mt-1">
                            {selectedAppointment.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex gap-3">
                <button
                  onClick={closeModal}
                  disabled={processingId !== null}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleStatusUpdate}
                  disabled={processingId !== null}
                  className={`flex-1 px-4 py-2 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                    actionType === "confirm"
                      ? "bg-green-600 hover:bg-green-700 disabled:bg-gray-300"
                      : "bg-red-600 hover:bg-red-700 disabled:bg-gray-300"
                  } disabled:cursor-not-allowed`}
                >
                  {processingId !== null && (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  )}
                  {processingId !== null
                    ? "Procesando..."
                    : actionType === "confirm"
                      ? "Confirmar Cita"
                      : "Cancelar Cita"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
