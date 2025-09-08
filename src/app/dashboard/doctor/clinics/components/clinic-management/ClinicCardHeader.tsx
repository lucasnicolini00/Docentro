import {
  Building2,
  MapPin,
  Edit,
  Trash2,
  Globe,
  Eye,
  EyeOff,
} from "lucide-react";
import { Clinic } from "./types";

interface ClinicCardHeaderProps {
  clinic: Clinic;
  isExpanded: boolean;
  onToggleExpanded: (clinicId: string) => void;
  onEdit: (clinic: Clinic) => void;
  onDelete: (clinicId: string) => void;
  isPending: boolean;
}

export default function ClinicCardHeader({
  clinic,
  isExpanded,
  onToggleExpanded,
  onEdit,
  onDelete,
  isPending,
}: ClinicCardHeaderProps) {
  return (
    <div className="p-6 border-b border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div
            className={`p-3 rounded-lg ${
              clinic.isVirtual ? "bg-purple-100" : "bg-blue-100"
            }`}
          >
            {clinic.isVirtual ? (
              <Globe
                className={`w-6 h-6 ${
                  clinic.isVirtual ? "text-purple-600" : "text-blue-600"
                }`}
              />
            ) : (
              <Building2 className="w-6 h-6 text-blue-600" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {clinic.name}
            </h3>
            <div className="flex items-center text-gray-600 mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">
                {clinic.isVirtual
                  ? "Consulta Virtual"
                  : `${clinic.address}${clinic.city ? `, ${clinic.city}` : ""}`}
              </span>
            </div>
            {clinic._count && (
              <div className="text-sm text-gray-500 mt-1">
                {clinic._count.appointments} citas registradas
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">
            {clinic.pricings.length}{" "}
            {clinic.pricings.length === 1 ? "tarifa" : "tarifas"}
          </span>
          <button
            onClick={() => onToggleExpanded(clinic.id)}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            {isExpanded ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={() => onEdit(clinic)}
            disabled={isPending}
            className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 disabled:opacity-50"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(clinic.id)}
            disabled={isPending}
            className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 disabled:opacity-50"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
