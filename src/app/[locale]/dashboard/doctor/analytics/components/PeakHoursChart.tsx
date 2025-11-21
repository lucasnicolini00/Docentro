interface PeakHour {
  hour: number;
  count: number;
}

interface PeakHoursChartProps {
  data: PeakHour[];
}

import { useTranslations } from "next-intl";

export default function PeakHoursChart({ data }: PeakHoursChartProps) {
  const t = useTranslations("dashboard_doctor");
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {t("peakHoursTitle")}
      </h3>
      <div className="space-y-3">
        {data.map((hour, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-sm font-medium text-blue-600">
                  #{index + 1}
                </span>
              </div>
              <span className="font-medium">{hour.hour}:00</span>
            </div>
            <div className="text-sm text-gray-600">
              {hour.count} {t("appointmentsSuffix")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
