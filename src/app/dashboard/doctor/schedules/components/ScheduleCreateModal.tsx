"use client";

import { useState } from "react";
import { X, Clock, Calendar, Building2, Loader2 } from "lucide-react";
import { DAY_NAMES, Clinic } from "./types";

interface ScheduleCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  clinics: Clinic[];
  onSubmit: (formData: FormData) => void;
  isPending: boolean;
}

export default function ScheduleCreateModal({
  isOpen,
  onClose,
  clinics,
  onSubmit,
  isPending,
}: ScheduleCreateModalProps) {
  const [selectedClinic, setSelectedClinic] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [slotDuration, setSlotDuration] = useState(30);

  // Generate time options (every 15 minutes)
  const generateTimeOptions = (): { value: string; label: string }[] => {
    const options: { value: string; label: string }[] = [];
    for (let hour = 6; hour <= 23; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const timeValue = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        const displayTime = new Date(
          `2000-01-01T${timeValue}`
        ).toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        options.push({ value: timeValue, label: displayTime });
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  const handleDayToggle = (dayKey: string) => {
    if (isPending) return;

    setSelectedDays((prev) => {
      if (prev.includes(dayKey)) {
        // Remove day if already selected
        return prev.filter((day) => day !== dayKey);
      } else {
        // Add day if not selected
        return [...prev, dayKey];
      }
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validation
    if (
      !selectedClinic ||
      selectedDays.length === 0 ||
      !startTime ||
      !endTime
    ) {
      alert("Por favor complete todos los campos requeridos");
      return;
    }

    if (startTime >= endTime) {
      alert("La hora de inicio debe ser anterior a la hora de fin");
      return;
    }

    // Create FormData with multiple days
    const formData = new FormData();
    formData.append("clinicId", selectedClinic);
    formData.append("selectedDays", JSON.stringify(selectedDays));
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    formData.append("slotDuration", slotDuration.toString());

    onSubmit(formData);

    // Reset form on success
    setSelectedClinic("");
    setSelectedDays([]);
    setStartTime("");
    setEndTime("");
    setSlotDuration(30);
  };

  const handleClose = () => {
    if (!isPending) {
      setSelectedClinic("");
      setSelectedDays([]);
      setStartTime("");
      setEndTime("");
      setSlotDuration(30);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={handleClose}
        />

        {/* Modal */}
        <div className="relative inline-block align-bottom bg-white rounded-2xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Crear Nuevo Horario
                </h3>
                <p className="text-sm text-gray-500">
                  Configura tu disponibilidad semanal
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              disabled={isPending}
              className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Clinic Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Building2 className="inline w-4 h-4 mr-1" />
                Clínica
              </label>
              <select
                value={selectedClinic}
                onChange={(e) => setSelectedClinic(e.target.value)}
                required
                disabled={isPending}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white disabled:bg-gray-50"
              >
                <option value="">Selecciona una clínica</option>
                {clinics.map((clinic) => (
                  <option key={clinic.id} value={clinic.id}>
                    {clinic.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Day Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <Calendar className="inline w-4 h-4 mr-1" />
                Días de la Semana
                <span className="text-xs text-gray-500 ml-2">
                  (Puedes seleccionar múltiples días)
                </span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(DAY_NAMES).map(([key, value]) => (
                  <label
                    key={key}
                    className={`relative flex items-center justify-center px-3 py-2 text-sm font-medium rounded-lg border cursor-pointer transition-all ${
                      selectedDays.includes(key)
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    } ${isPending ? "cursor-not-allowed opacity-50" : ""}`}
                  >
                    <input
                      type="checkbox"
                      name="dayOfWeek"
                      value={key}
                      checked={selectedDays.includes(key)}
                      onChange={() => handleDayToggle(key)}
                      disabled={isPending}
                      className="sr-only"
                    />
                    {value}
                    {selectedDays.includes(key) && (
                      <span className="ml-1 text-xs">✓</span>
                    )}
                  </label>
                ))}
              </div>
              {selectedDays.length > 0 && (
                <div className="mt-2 text-sm text-gray-600">
                  Seleccionados:{" "}
                  {selectedDays
                    .map((day) => DAY_NAMES[day as keyof typeof DAY_NAMES])
                    .join(", ")}
                </div>
              )}
            </div>

            {/* Time Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="inline w-4 h-4 mr-1" />
                  Hora de Inicio
                </label>
                <select
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                  disabled={isPending}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white disabled:bg-gray-50"
                >
                  <option value="">Seleccionar</option>
                  {timeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="inline w-4 h-4 mr-1" />
                  Hora de Fin
                </label>
                <select
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                  disabled={isPending}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white disabled:bg-gray-50"
                >
                  <option value="">Seleccionar</option>
                  {timeOptions
                    .filter((option) => !startTime || option.value > startTime)
                    .map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* Slot Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duración por Cita
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[15, 30, 45, 60].map((duration) => (
                  <label
                    key={duration}
                    className={`relative flex items-center justify-center px-3 py-2 text-sm font-medium rounded-lg border cursor-pointer transition-all ${
                      slotDuration === duration
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    } ${isPending ? "cursor-not-allowed opacity-50" : ""}`}
                  >
                    <input
                      type="radio"
                      name="slotDuration"
                      value={duration}
                      checked={slotDuration === duration}
                      onChange={(e) => setSlotDuration(Number(e.target.value))}
                      disabled={isPending}
                      className="sr-only"
                    />
                    {duration}min
                  </label>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                disabled={isPending}
                className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="flex-1 flex items-center justify-center px-4 py-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creando...
                  </>
                ) : (
                  "Crear Horario"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
