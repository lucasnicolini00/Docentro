import { Plus, Building2 } from "lucide-react";
import { ClinicsHeaderProps } from "./types";

export default function ClinicsHeader({
  onAddClinic,
  isPending,
}: ClinicsHeaderProps) {
  return (
    <div className="mb-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Gestión de Clínicas y Precios
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                Administra tus ubicaciones de consulta y tarifas de atención
              </p>
            </div>
          </div>
          <button
            onClick={onAddClinic}
            disabled={isPending}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Clínica</span>
          </button>
        </div>
      </div>
    </div>
  );
}
