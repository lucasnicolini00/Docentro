import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "increase" | "decrease" | "neutral";
  icon: React.ComponentType<any>;
  loading?: boolean;
}

export default function StatCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  loading: cardLoading,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <div className="text-2xl font-bold text-gray-900">
            {cardLoading ? (
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
            ) : (
              value
            )}
          </div>
          {change && (
            <div
              className={`flex items-center mt-2 text-sm ${
                changeType === "increase"
                  ? "text-green-600"
                  : changeType === "decrease"
                  ? "text-red-600"
                  : "text-gray-600"
              }`}
            >
              {changeType === "increase" ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : changeType === "decrease" ? (
                <TrendingDown className="h-4 w-4 mr-1" />
              ) : (
                <Minus className="h-4 w-4 mr-1" />
              )}
              {change}
            </div>
          )}
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <Icon className="h-6 w-6 text-gray-600" />
        </div>
      </div>
    </div>
  );
}
