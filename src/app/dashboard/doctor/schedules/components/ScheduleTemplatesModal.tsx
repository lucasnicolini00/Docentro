"use client";

import { useTransition, useState } from "react";
import {
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
  Clock,
  Calendar,
  MapPin,
  Sparkles,
} from "lucide-react";
import { createBulkSchedules } from "@/lib/actions/schedules";
import { SCHEDULE_TEMPLATES, Clinic, DAY_NAMES } from "./types";

interface ScheduleTemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  clinics: Clinic[];
  onSchedulesUpdated?: () => void;
}

export default function ScheduleTemplatesModal({
  isOpen,
  onClose,
  clinics,
  onSchedulesUpdated,
}: ScheduleTemplatesModalProps) {
  const [isPending, startTransition] = useTransition();
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [selectedClinic, setSelectedClinic] = useState<string>("");
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [loadingState, setLoadingState] = useState<{
    isLoading: boolean;
    message: string;
    step: number;
    totalSteps: number;
  }>({
    isLoading: false,
    message: "",
    step: 0,
    totalSteps: 3,
  });
  const [confirmationDialog, setConfirmationDialog] = useState<{
    isOpen: boolean;
    template: (typeof SCHEDULE_TEMPLATES)[number] | null;
    clinicId: string;
    existingDays: string[];
  }>({
    isOpen: false,
    template: null,
    clinicId: "",
    existingDays: [],
  });

  // Helper function to format time
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const handleApplyTemplate = (templateIndex: number, clinicId: string) => {
    setSelectedTemplate(templateIndex);
    setSelectedClinic(clinicId);

    const template = SCHEDULE_TEMPLATES[templateIndex];
    handleApplyTemplateAction(template, clinicId);
  };

  const handleApplyTemplateAction = (
    template: (typeof SCHEDULE_TEMPLATES)[number],
    clinicId: string,
    event?: React.MouseEvent<HTMLButtonElement>,
    replaceExisting = false
  ) => {
    // Prevent default form submission behavior
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    setFeedback(null);

    startTransition(async () => {
      try {
        // Step 1: Initialize loading
        setLoadingState({
          isLoading: true,
          message: replaceExisting
            ? "Preparando reemplazo de horarios..."
            : "Preparando creación de horarios...",
          step: 1,
          totalSteps: replaceExisting ? 4 : 3,
        });

        // Small delay to show the first message
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Step 2: If replacing, show deletion message
        if (replaceExisting) {
          setLoadingState((prev) => ({
            ...prev,
            message: "Eliminando horarios existentes...",
            step: 2,
          }));
          await new Promise((resolve) => setTimeout(resolve, 300));
        }

        // Step 3: Show creation message
        setLoadingState((prev) => ({
          ...prev,
          message: "Creando nuevos horarios...",
          step: replaceExisting ? 3 : 2,
        }));

        const result = await createBulkSchedules(
          clinicId,
          [...template.schedules],
          replaceExisting
        );

        // Step 4: Finalizing
        setLoadingState((prev) => ({
          ...prev,
          message: "Finalizando configuración...",
          step: replaceExisting ? 4 : 3,
        }));

        await new Promise((resolve) => setTimeout(resolve, 300));

        if (result.success) {
          // Reset loading state
          setLoadingState({
            isLoading: false,
            message: "",
            step: 0,
            totalSteps: 3,
          });

          setFeedback({
            type: "success",
            message: `Plantilla "${template.name}" aplicada exitosamente`,
          });

          // Call the callback to refresh schedules
          if (onSchedulesUpdated) {
            onSchedulesUpdated();
          }

          // Clear feedback after a few seconds, but keep modal open
          setTimeout(() => {
            setFeedback(null);
          }, 3000);
        } else if (result.data?.requiresConfirmation) {
          // Reset loading state for confirmation dialog
          setLoadingState({
            isLoading: false,
            message: "",
            step: 0,
            totalSteps: 3,
          });

          // Show confirmation dialog
          setConfirmationDialog({
            isOpen: true,
            template,
            clinicId,
            existingDays: result.data.existingDays,
          });
        } else {
          // Reset loading state on error
          setLoadingState({
            isLoading: false,
            message: "",
            step: 0,
            totalSteps: 3,
          });

          setFeedback({
            type: "error",
            message: result.error || "Error al aplicar la plantilla",
          });
        }
      } catch (error) {
        // Reset loading state on exception
        setLoadingState({
          isLoading: false,
          message: "",
          step: 0,
          totalSteps: 3,
        });

        console.error("Error in handleApplyTemplate:", error);
        setFeedback({
          type: "error",
          message: "Error inesperado al aplicar la plantilla",
        });
      }
    });
  };

  const handleConfirmReplace = () => {
    if (confirmationDialog.template && confirmationDialog.clinicId) {
      setConfirmationDialog({
        isOpen: false,
        template: null,
        clinicId: "",
        existingDays: [],
      });
      handleApplyTemplateAction(
        confirmationDialog.template,
        confirmationDialog.clinicId,
        undefined,
        true
      );
    }
  };

  const handleCancelReplace = () => {
    setConfirmationDialog({
      isOpen: false,
      template: null,
      clinicId: "",
      existingDays: [],
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">
                Plantillas de Horarios
              </h2>
              <p className="text-sm text-blue-100">
                Aplica horarios predefinidos a tus clínicas de forma rápida
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-blue-100 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1 min-h-0 scroll-smooth">
          {/* Feedback Message */}
          {feedback && (
            <div
              className={`mb-6 p-4 rounded-lg flex items-start space-x-3 ${
                feedback.type === "success"
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              {feedback.type === "success" ? (
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              )}
              <p
                className={`text-sm ${
                  feedback.type === "success"
                    ? "text-green-800"
                    : "text-red-800"
                }`}
              >
                {feedback.message}
              </p>
            </div>
          )}

          {/* Progress Indicator */}
          {loadingState.isLoading && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                <div className="flex-1">
                  <p className="font-medium text-blue-900">
                    {loadingState.message}
                  </p>
                  <div className="mt-2">
                    <div className="bg-blue-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                        style={{
                          width: `${
                            (loadingState.step / loadingState.totalSteps) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <p className="text-xs text-blue-700 mt-1">
                      Paso {loadingState.step} de {loadingState.totalSteps}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {SCHEDULE_TEMPLATES.map((template, templateIndex) => (
              <div
                key={templateIndex}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200 hover:shadow-md transition-all"
              >
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {template.name}
                    </h3>
                    <div className="flex items-center space-x-1 text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
                      <Calendar className="w-3 h-3" />
                      <span>{template.schedules.length} días</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {template.description}
                  </p>

                  {/* Template Schedule Preview */}
                  <div className="bg-white rounded-lg p-3 mb-4">
                    <h4 className="text-xs font-medium text-gray-700 mb-2 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      Vista previa del horario
                    </h4>
                    <div className="space-y-1">
                      {template.schedules.slice(0, 3).map((schedule, idx) => (
                        <div key={idx} className="flex justify-between text-xs">
                          <span className="text-gray-600">
                            {
                              DAY_NAMES[
                                schedule.dayOfWeek as keyof typeof DAY_NAMES
                              ]
                            }
                          </span>
                          <span className="text-gray-800 font-medium">
                            {formatTime(schedule.startTime)} -{" "}
                            {formatTime(schedule.endTime)}
                          </span>
                        </div>
                      ))}
                      {template.schedules.length > 3 && (
                        <div className="text-xs text-gray-500 italic">
                          +{template.schedules.length - 3} días más...
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Clinics */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    Aplicar a clínica:
                  </h4>
                  {clinics.map((clinic) => (
                    <div
                      key={clinic.id}
                      className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">
                          {clinic.name}
                        </p>
                        {clinic.address && (
                          <p className="text-xs text-gray-500 mt-1">
                            {clinic.address}
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleApplyTemplate(templateIndex, clinic.id)
                        }
                        disabled={isPending || loadingState.isLoading}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50 flex items-center space-x-2 min-w-[100px] justify-center transition-colors"
                      >
                        {(isPending || loadingState.isLoading) &&
                        selectedTemplate === templateIndex &&
                        selectedClinic === clinic.id ? (
                          <>
                            <Loader2 className="w-3 h-3 animate-spin" />
                            <span>Aplicando...</span>
                          </>
                        ) : (
                          <span>Aplicar</span>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            Cerrar
          </button>
        </div>

        {/* Confirmation Dialog */}
        {confirmationDialog.isOpen && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Horarios Existentes
              </h3>
              <p className="text-gray-600 mb-4">
                Ya existen horarios para algunos días en esta clínica. ¿Deseas
                reemplazarlos con la nueva plantilla?
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleCancelReplace}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmReplace}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                >
                  Reemplazar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
