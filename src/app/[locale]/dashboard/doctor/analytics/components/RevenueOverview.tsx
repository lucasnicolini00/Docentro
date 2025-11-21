import { TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("dashboard_doctor");
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {t("revenueOverviewTitle")}
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">{t("totalRevenueLabel")}:</span>
          <span className="text-2xl font-bold text-green-600">
            ${totalRevenue.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">{t("averageValueLabel")}:</span>
          <span className="text-lg font-semibold">
            ${Math.round(averageValue).toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">{t("totalAppointmentsLabel")}:</span>
          <span className="text-lg font-semibold">{totalAppointments}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">{t("growthLabel")}:</span>
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
