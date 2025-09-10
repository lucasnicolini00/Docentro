"use client";

import { useState } from "react";
import { X, Globe, Building2 } from "lucide-react";

interface ClinicFormProps {
  isOpen: boolean;
  onClose: () => void;
  clinic?: {
    id?: string;
    name: string;
    address: string;
    isVirtual: boolean;
    country?: string;
    city?: string;
    neighborhood?: string;
  };
  onSubmit: (clinicData: any) => void;
}

export default function ClinicForm({
  isOpen,
  onClose,
  clinic,
  onSubmit,
}: ClinicFormProps) {
  const [formData, setFormData] = useState({
    name: clinic?.name || "",
    address: clinic?.address || "",
    isVirtual: clinic?.isVirtual || false,
    country: clinic?.country || "",
    city: clinic?.city || "",
    neighborhood: clinic?.neighborhood || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {clinic?.id ? "Editar Clínica" : "Nueva Clínica"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6"
          autoComplete="off"
        >
          {/* Clinic Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Tipo de Clínica
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, isVirtual: false }))
                }
                className={`p-4 border-2 rounded-lg transition-colors ${
                  !formData.isVirtual
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Building2 className="w-8 h-8 mx-auto mb-2" />
                <p className="font-medium">Presencial</p>
                <p className="text-sm text-gray-500">Clínica física</p>
              </button>

              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, isVirtual: true }))
                }
                className={`p-4 border-2 rounded-lg transition-colors ${
                  formData.isVirtual
                    ? "border-purple-500 bg-purple-50 text-purple-700"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Globe className="w-8 h-8 mx-auto mb-2" />
                <p className="font-medium">Virtual</p>
                <p className="text-sm text-gray-500">Teleconsulta</p>
              </button>
            </div>
          </div>

          {/* Clinic Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nombre de la Clínica *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              autoComplete="off"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej: Clínica Central, Consultas Online"
            />
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {formData.isVirtual ? "Descripción" : "Dirección"} *
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              autoComplete="off"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={
                formData.isVirtual
                  ? "Ej: Consultas por videollamada"
                  : "Ej: Av. Principal 123, Santiago Centro"
              }
            />
          </div>

          {/* Location Details (only for physical clinics) */}
          {!formData.isVirtual && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  País
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  autoComplete="off"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Bolivia"
                />
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Ciudad
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  autoComplete="off"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Santa Cruz"
                />
              </div>

              <div>
                <label
                  htmlFor="neighborhood"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Barrio/Comuna
                </label>
                <input
                  type="text"
                  id="neighborhood"
                  name="neighborhood"
                  value={formData.neighborhood}
                  onChange={handleInputChange}
                  autoComplete="off"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="La Palmas"
                />
              </div>
            </div>
          )}

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
              {clinic?.id ? "Actualizar" : "Crear"} Clínica
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
