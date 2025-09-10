import { TrendingUp } from "lucide-react";

interface RevenueOverviewProps {
  totalRevenue: number;
  averageValue: number;
  totalAppointments: number;
  growthRate: number;
}

export default function RevenueOverview({
  totalRevenue,
  averageValue,
  totalAppointments,
  growthRate,
}: RevenueOverviewProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Resumen de Ingresos
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Ingresos Totales:</span>
          <span className="text-2xl font-bold text-green-600">
            ${totalRevenue.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Valor Promedio:</span>
          <span className="text-lg font-semibold">
            ${Math.round(averageValue).toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Total Citas:</span>
          <span className="text-lg font-semibold">{totalAppointments}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Crecimiento:</span>
          <span
            className={`text-lg font-semibold flex items-center ${
              growthRate >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            <TrendingUp className="h-4 w-4 mr-1" />
            {growthRate}%
          </span>
        </div>
      </div>
    </div>
  );
}
