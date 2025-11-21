import { useTranslations } from "next-intl";

interface AgeGroupsChartProps {
  data: Record<string, number>;
}

export default function AgeGroupsChart({ data }: AgeGroupsChartProps) {
  const t = useTranslations("dashboard_doctor");
  const maxCount = Math.max(...Object.values(data));

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {t("ageDistributionTitle")}
      </h3>
      <div className="space-y-3">
        {Object.entries(data).map(([group, count]) => (
          <div key={group} className="flex items-center justify-between">
            <span className="text-sm font-medium">
              {group} {t("yearsSuffix")}
            </span>
            <div className="flex items-center space-x-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{
                    width: `${maxCount > 0 ? (count / maxCount) * 100 : 0}%`,
                  }}
                ></div>
              </div>
              <span className="text-sm text-gray-600 w-8 text-right">
                {count}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
