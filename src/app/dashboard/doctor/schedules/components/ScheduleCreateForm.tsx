"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { DAY_NAMES, Clinic } from "./types";

interface ScheduleCreateFormProps {
  clinics: Clinic[];
  onSubmit: (formData: FormData) => void;
  isPending: boolean;
  onShowTemplates?: () => void;
}

export default function ScheduleCreateForm({
  clinics,
  onSubmit,
  isPending,
  onShowTemplates,
}: ScheduleCreateFormProps) {
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Basic validation
    const clinicId = formData.get("clinicId") as string;
    const dayOfWeek = formData.get("dayOfWeek") as string;
    const startTime = formData.get("startTime") as string;
    const endTime = formData.get("endTime") as string;

    if (!clinicId || !dayOfWeek || !startTime || !endTime) {
      alert("Por favor complete todos los campos requeridos");
      return;
    }

    // Validate time range
    if (startTime >= endTime) {
      alert("La hora de inicio debe ser anterior a la hora de fin");
      return;
    }

    onSubmit(formData);
    setIsCreating(false);
    event.currentTarget.reset();
  };

  if (!isCreating) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Gestión de Horarios
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Configura tus horarios de atención por clínica
            </p>
          </div>
          <div className="flex space-x-4">
            {onShowTemplates && (
              <button
                onClick={onShowTemplates}
                className="group relative overflow-hidden bg-white/80 backdrop-blur-sm hover:bg-blue-50 text-blue-700 px-6 py-3 rounded-2xl transition-all duration-200 border-2 border-blue-200 hover:border-blue-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-blue-100/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                <span className="relative z-10">Usar Plantillas</span>
              </button>
            )}
            <button
              onClick={() => setIsCreating(true)}
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-2xl transition-all duration-200 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <span className="relative z-10">Crear Nuevo Horario</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Crear Nuevo Horario
        </h2>
        <button
          onClick={() => setIsCreating(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          Cancelar
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Clinic Selection */}
          <div>
            <label
              htmlFor="clinicId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Clínica
            </label>
            <select
              id="clinicId"
              name="clinicId"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Seleccionar clínica</option>
              {clinics.map((clinic) => (
                <option key={clinic.id} value={clinic.id}>
                  {clinic.name}
                </option>
              ))}
            </select>
          </div>

          {/* Day of Week */}
          <div>
            <label
              htmlFor="dayOfWeek"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Día de la Semana
            </label>
            <select
              id="dayOfWeek"
              name="dayOfWeek"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Seleccionar día</option>
              {Object.entries(DAY_NAMES).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          {/* Start Time */}
          <div>
            <label
              htmlFor="startTime"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Hora de Inicio
            </label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              required
              min="06:00"
              max="23:00"
              step="900" // 15-minute intervals
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* End Time */}
          <div>
            <label
              htmlFor="endTime"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Hora de Fin
            </label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              required
              min="06:00"
              max="23:59"
              step="900" // 15-minute intervals
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Helpful Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-blue-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-800">
                <strong>Consejos:</strong>• Asegúrate de que la hora de inicio
                sea anterior a la hora de fin • Los horarios se pueden
                configurar desde las 6:00 AM hasta las 11:59 PM • No puedes
                crear horarios duplicados para el mismo día y clínica
              </p>
            </div>
          </div>
        </div>

        {/* Slot Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="slotDuration"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Duración por Cita (minutos)
            </label>
            <select
              id="slotDuration"
              name="slotDuration"
              defaultValue="30"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="15">15 minutos</option>
              <option value="30">30 minutos</option>
              <option value="45">45 minutos</option>
              <option value="60">60 minutos</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isPending}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
          >
            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>{isPending ? "Creando..." : "Crear Horario"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
