import { useTranslations } from "next-intl";

interface WeeklyOverviewItem {
  day: string;
  booked: number;
  available: number;
  blocked: number;
}

interface WeeklyOverviewChartProps {
  data: WeeklyOverviewItem[];
}

export default function WeeklyOverviewChart({
  data,
}: WeeklyOverviewChartProps) {
  const t = useTranslations("dashboard_doctor");
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {t("weeklyOverviewTitle")}
      </h3>
      <div className="space-y-3">
        {data.map((day, index) => {
          const total = day.booked + day.available + day.blocked;
          return (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-12 text-sm font-medium text-gray-600">
                {day.day}
              </div>
              <div className="flex-1 flex space-x-1">
                <div
                  className="bg-green-500 h-4 rounded"
                  style={{
                    width: `${total > 0 ? (day.booked / total) * 100 : 0}%`,
                  }}
                  title={`${t("occupiedLabel")}: ${day.booked}`}
                ></div>
                <div
                  className="bg-blue-500 h-4 rounded"
                  style={{
                    width: `${total > 0 ? (day.available / total) * 100 : 0}%`,
                  }}
                  title={`${t("availableLabel")}: ${day.available}`}
                ></div>
                <div
                  className="bg-gray-400 h-4 rounded"
                  style={{
                    width: `${total > 0 ? (day.blocked / total) * 100 : 0}%`,
                  }}
                  title={`${t("blockedLabel")}: ${day.blocked}`}
                ></div>
              </div>
              <div className="text-sm text-gray-600 w-20 text-right">
                {total} slots
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex items-center space-x-4 text-xs">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span>{t("occupiedLabel")}</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span>{t("availableLabel")}</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-gray-400 rounded"></div>
          <span>{t("blockedLabel")}</span>
        </div>
      </div>
    </div>
  );
}
