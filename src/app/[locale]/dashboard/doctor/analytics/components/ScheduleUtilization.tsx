interface ScheduleUtilizationProps {
  utilizationRate: number;
  bookedSlots: number;
  availableSlots: number;
  blockedSlots: number;
}

import { useTranslations } from "next-intl";

export default function ScheduleUtilization({
  utilizationRate,
  bookedSlots,
  availableSlots,
  blockedSlots,
}: ScheduleUtilizationProps) {
  const t = useTranslations("dashboard_doctor");
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {t("scheduleUtilizationTitle")}
      </h3>
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {utilizationRate}%
          </div>
          <div className="text-gray-600">{t("utilizationRateLabel")}</div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xl font-bold text-green-600">
              {bookedSlots}
            </div>
            <div className="text-xs text-gray-600">{t("occupiedLabel")}</div>
          </div>
          <div>
            <div className="text-xl font-bold text-blue-600">
              {availableSlots}
            </div>
            <div className="text-xs text-gray-600">{t("availableLabel")}</div>
          </div>
          <div>
            <div className="text-xl font-bold text-gray-600">
              {blockedSlots}
            </div>
            <div className="text-xs text-gray-600">{t("blockedLabel")}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
