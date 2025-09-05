"use client";

import { useState } from "react";
import { X, DollarSign, Clock } from "lucide-react";

interface PricingFormProps {
  isOpen: boolean;
  onClose: () => void;
  pricing?: {
    id?: string;
    title: string;
    price: number;
    currency: string;
    durationMinutes: number;
    description: string;
    isActive: boolean;
  };
  clinics: Array<{
    id: string;
    name: string;
    isVirtual: boolean;
  }>;
  selectedClinicId?: string;
  onSubmit: (pricingData: any) => void;
}

export default function PricingForm({
  isOpen,
  onClose,
  pricing,
  clinics,
  selectedClinicId,
  onSubmit,
}: PricingFormProps) {
  const [formData, setFormData] = useState({
    title: pricing?.title || "",
    price: pricing?.price || 0,
    currency: pricing?.currency || "CLP",
    durationMinutes: pricing?.durationMinutes || 30,
    description: pricing?.description || "",
    isActive: pricing?.isActive ?? true,
    clinicId: selectedClinicId || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  const commonServices = [
    {
      title: "Consulta General",
      duration: 30,
      description: "Consulta médica general",
    },
    { title: "Control", duration: 20, description: "Control de seguimiento" },
    {
      title: "Primera Consulta",
      duration: 45,
      description: "Primera consulta con evaluación completa",
    },
    {
      title: "Teleconsulta",
      duration: 30,
      description: "Consulta por videollamada",
    },
    {
      title: "Consulta de Urgencia",
      duration: 30,
      description: "Atención médica urgente",
    },
  ];

  const currencies = [
    { code: "CLP", name: "Peso Chileno", symbol: "$" },
    { code: "USD", name: "Dólar Estadounidense", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {pricing?.id ? "Editar Tarifa" : "Nueva Tarifa"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Clinic Selection */}
          <div>
            <label
              htmlFor="clinicId"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Clínica *
            </label>
            <select
              id="clinicId"
              name="clinicId"
              value={formData.clinicId}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Seleccionar clínica</option>
              {clinics.map((clinic) => (
                <option key={clinic.id} value={clinic.id}>
                  {clinic.name}{" "}
                  {clinic.isVirtual ? "(Virtual)" : "(Presencial)"}
                </option>
              ))}
            </select>
          </div>

          {/* Service Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nombre del Servicio *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej: Consulta General"
            />

            {/* Quick Service Options */}
            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-1">Servicios comunes:</p>
              <div className="flex flex-wrap gap-1">
                {commonServices.map((service) => (
                  <button
                    key={service.title}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        title: service.title,
                        description: service.description,
                        durationMinutes: service.duration,
                      }))
                    }
                    className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-600 transition-colors"
                  >
                    {service.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Price and Currency */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Precio *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="100"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="50000"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="currency"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Moneda
              </label>
              <select
                id="currency"
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Duration */}
          <div>
            <label
              htmlFor="durationMinutes"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Duración (minutos) *
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                id="durationMinutes"
                name="durationMinutes"
                value={formData.durationMinutes}
                onChange={handleInputChange}
                required
                min="5"
                step="5"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="30"
              />
            </div>
            <div className="mt-1 flex space-x-2">
              {[15, 20, 30, 45, 60].map((duration) => (
                <button
                  key={duration}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      durationMinutes: duration,
                    }))
                  }
                  className={`text-xs px-2 py-1 rounded transition-colors ${
                    formData.durationMinutes === duration
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                  }`}
                >
                  {duration}min
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Descripción detallada del servicio..."
            />
          </div>

          {/* Active Status */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="isActive"
              className="ml-2 block text-sm text-gray-900"
            >
              Servicio activo (visible para pacientes)
            </label>
          </div>

          {/* Price Preview */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              Vista Previa:
            </h4>
            <div className="text-lg font-semibold text-gray-900">
              {formData.title || "Nombre del servicio"}
            </div>
            <div className="text-2xl font-bold text-green-600">
              ${formData.price.toLocaleString()} {formData.currency}
            </div>
            <div className="text-sm text-gray-600">
              Duración: {formData.durationMinutes} minutos
            </div>
            {formData.description && (
              <div className="text-sm text-gray-600 mt-1">
                {formData.description}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {pricing?.id ? "Actualizar" : "Crear"} Tarifa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
