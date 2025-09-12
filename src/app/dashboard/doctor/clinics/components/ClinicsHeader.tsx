import { Plus } from "lucide-react";
import { ClinicsHeaderProps } from "./types";

export default function ClinicsHeader({
  onAddClinic,
  isPending,
}: ClinicsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Gestión de Clínicas y Precios
        </h1>
        <p className="text-gray-600 mt-1">
          Administra tus ubicaciones de consulta y tarifas de atención
        </p>
      </div>
      <button
        onClick={onAddClinic}
        disabled={isPending}
        className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        <Plus className="w-5 h-5" />
        <span>Nueva Clínica</span>
      </button>
    </div>
  );
}
