import { Target } from "lucide-react";

interface InsightsProps {
  insights: string[];
}

export default function InsightsPanel({ insights }: InsightsProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Insights y Recomendaciones
      </h3>
      <div className="space-y-3">
        {insights.map((insight, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Target className="h-3 w-3 text-blue-600" />
            </div>
            <p className="text-sm text-gray-700">{insight}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
