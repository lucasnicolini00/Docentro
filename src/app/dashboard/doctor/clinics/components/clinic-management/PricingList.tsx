import {
  Plus,
  DollarSign,
  Clock,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Pricing } from "./types";
import { formatPrice } from "./utils";

interface PricingListProps {
  pricings: Pricing[];
  clinicId: string;
  onAddPricing: (clinicId: string) => void;
  onEditPricing: (pricing: Pricing, clinicId: string) => void;
  onDeletePricing: (pricingId: string, clinicId: string) => void;
  onTogglePricingStatus: (pricingId: string, clinicId: string) => void;
  isPending: boolean;
}

export default function PricingList({
  pricings,
  clinicId,
  onAddPricing,
  onEditPricing,
  onDeletePricing,
  onTogglePricingStatus,
  isPending,
}: PricingListProps) {
  return (
    <div className="p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-medium text-gray-900">
          Tarifas de Atención
        </h4>
        <button
          onClick={() => onAddPricing(clinicId)}
          disabled={isPending}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Tarifa</span>
        </button>
      </div>

      {pricings.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg border border-gray-200">
          <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">No hay tarifas configuradas</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pricings.map((pricing) => (
            <div
              key={pricing.id}
              className="bg-white rounded-lg border border-gray-200 p-4"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h5 className="font-medium text-gray-900">{pricing.title}</h5>
                  <p className="text-2xl font-bold text-blue-600 mt-1">
                    {formatPrice(pricing.price, pricing.currency)}
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => onTogglePricingStatus(pricing.id, clinicId)}
                    disabled={isPending}
                    className={`p-1 rounded ${
                      pricing.isActive
                        ? "text-green-600 hover:bg-green-50"
                        : "text-gray-400 hover:bg-gray-50"
                    }`}
                  >
                    {pricing.isActive ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <AlertCircle className="w-5 h-5" />
                    )}
                  </button>
                  <button
                    onClick={() => onEditPricing(pricing, clinicId)}
                    disabled={isPending}
                    className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded disabled:opacity-50"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeletePricing(pricing.id, clinicId)}
                    disabled={isPending}
                    className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{pricing.durationMinutes} minutos</span>
                </div>
                {pricing.description && (
                  <p className="text-gray-500">{pricing.description}</p>
                )}
                <div className="flex items-center">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      pricing.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {pricing.isActive ? "Activa" : "Inactiva"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
