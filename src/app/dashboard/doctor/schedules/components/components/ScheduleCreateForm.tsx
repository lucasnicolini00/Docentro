"use client";

import { useState } from "react";
import { DAY_NAMES, Clinic } from "./types";

interface ScheduleCreateFormProps {
  clinics: Clinic[];
  onSubmit: (formData: FormData) => void;
  isPending: boolean;
}

export default function ScheduleCreateForm({
  clinics,
  onSubmit,
  isPending,
}: ScheduleCreateFormProps) {
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
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
          <button
            onClick={() => setIsCreating(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Crear Nuevo Horario
          </button>
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
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
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-2 rounded-lg transition-colors"
          >
            {isPending ? "Creando..." : "Crear Horario"}
          </button>
        </div>
      </form>
    </div>
  );
}
