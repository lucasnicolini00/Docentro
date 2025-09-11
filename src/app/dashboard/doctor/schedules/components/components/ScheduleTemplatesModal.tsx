"use client";

import { useTransition, useState } from "react";
import { X, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { createBulkSchedules } from "@/lib/actions/schedules";
import { SCHEDULE_TEMPLATES, Clinic } from "./types";

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

  const handleApplyTemplate = (
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

    console.log("Applying template:", template.name, "to clinic:", clinicId);
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
        await new Promise(resolve => setTimeout(resolve, 500));

        // Step 2: If replacing, show deletion message
        if (replaceExisting) {
          setLoadingState(prev => ({
            ...prev,
            message: "Eliminando horarios existentes...",
            step: 2,
          }));
          await new Promise(resolve => setTimeout(resolve, 300));
        }

        // Step 3: Show creation message
        setLoadingState(prev => ({
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
        setLoadingState(prev => ({
          ...prev,
          message: "Finalizando configuración...",
          step: replaceExisting ? 4 : 3,
        }));

        await new Promise(resolve => setTimeout(resolve, 300));

        console.log("Template result:", result);

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
      handleApplyTemplate(
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
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
          <h2 className="text-xl font-semibold text-gray-900">
            Plantillas de Horarios
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1 min-h-0 scroll-smooth">
          {/* Feedback Message */}
          {feedback && (
            <div
              className={`mb-4 p-3 rounded-lg flex items-center space-x-2 ${
                feedback.type === "success"
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {feedback.type === "success" ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              <span className="text-sm font-medium">{feedback.message}</span>
            </div>
          )}

          {/* Progress Indicator */}
          {loadingState.isLoading && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                <div className="flex-1">
                  <p className="font-medium text-blue-900">{loadingState.message}</p>
                  <div className="mt-2">
                    <div className="bg-blue-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${(loadingState.step / loadingState.totalSteps) * 100}%` }}
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
                        type="button"
                        onClick={(e) =>
                          handleApplyTemplate(template, clinic.id, e)
                        }
                        disabled={isPending || loadingState.isLoading}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-3 py-1 rounded text-sm disabled:opacity-50 flex items-center space-x-1 min-w-[120px] justify-center"
                      >
                        {(isPending || loadingState.isLoading) ? (
                          <>
                            <Loader2 className="w-3 h-3 animate-spin" />
                            <span className="text-xs">
                              {loadingState.message || "Cargando..."}
                            </span>
                          </>
                        ) : (
                          "Aplicar"
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
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
