"use client";

import { useTransition } from "react";
import { X } from "lucide-react";
import { createBulkSchedules } from "@/lib/actions/schedules";
import { SCHEDULE_TEMPLATES, Clinic } from "./types";

interface ScheduleTemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  clinics: Clinic[];
  onSchedulesCreated: () => void;
}

export default function ScheduleTemplatesModal({
  isOpen,
  onClose,
  clinics,
  onSchedulesCreated,
}: ScheduleTemplatesModalProps) {
  const [isPending, startTransition] = useTransition();

  const handleApplyTemplate = async (
    template: (typeof SCHEDULE_TEMPLATES)[number],
    clinicId: string
  ) => {
    startTransition(async () => {
      const result = await createBulkSchedules(clinicId, [
        ...template.schedules,
      ]);
      if (result.success) {
        onSchedulesCreated();
        onClose();
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Plantillas de Horarios
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          <div className="space-y-6">
            {SCHEDULE_TEMPLATES.map((template, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">
                  {template.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {template.description}
                </p>
                <div className="space-y-3">
                  {clinics.map((clinic) => (
                    <div
                      key={clinic.id}
                      className="flex items-center justify-between bg-white p-3 rounded border"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {clinic.name}
                        </p>
                        {clinic.address && (
                          <p className="text-sm text-gray-500">
                            {clinic.address}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => handleApplyTemplate(template, clinic.id)}
                        disabled={isPending}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
                      >
                        {isPending ? "..." : "Aplicar"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
