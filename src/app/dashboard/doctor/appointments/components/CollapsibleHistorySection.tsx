"use client";

import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import DoctorAppointmentList from "./DoctorAppointmentList";
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

interface CollapsibleHistorySectionProps {
  historicalAppointments: Appointment[];
}

export default function CollapsibleHistorySection({
  historicalAppointments,
}: CollapsibleHistorySectionProps) {
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);

  if (historicalAppointments.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <button
        onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}
        className="w-full p-6 border-b border-gray-200 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 text-left">
              Historial de Citas
            </h3>
            <p className="text-sm text-gray-600 mt-1 text-left">
              {historicalAppointments.length} citas anteriores
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {isHistoryExpanded ? "Ocultar" : "Ver historial"}
          </div>
          {isHistoryExpanded ? (
            <ChevronUpIcon className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDownIcon className="h-5 w-5 text-gray-400" />
          )}
        </div>
      </button>

      {isHistoryExpanded && (
        <div className="p-6">
          {/* Simple list of all historical appointments */}
          <DoctorAppointmentList
            appointments={historicalAppointments}
            title=""
            showState={false}
          />
        </div>
      )}
    </div>
  );
}
