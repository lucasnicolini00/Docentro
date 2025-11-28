import { useTranslations } from "next-intl";
interface RevenueByClinicProps {
  data: Record<string, number>;
}

export default function RevenueByClinicChart({ data }: RevenueByClinicProps) {
  const maxRevenue = data ? Math.max(...Object.values(data)) : 0;
  const t = useTranslations("dashboard_doctor");

  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {t("revenueByClinicTitle")}
        </h3>
        <p className="text-gray-500 text-sm">{t("noData")}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {t("revenueByClinicTitle")}
      </h3>
      <div className="space-y-3">
        {Object.entries(data).map(([clinic, revenue]) => (
          <div key={clinic} className="flex items-center justify-between">
            <span className="text-sm font-medium truncate flex-1 mr-4">
              {clinic}
            </span>
            <div className="flex items-center space-x-2">
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{
                    width: `${
                      maxRevenue > 0 ? (revenue / maxRevenue) * 100 : 0
                    }%`,
                  }}
                ></div>
              </div>
              <span className="text-sm text-gray-600 w-20 text-right">
                ${revenue.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
