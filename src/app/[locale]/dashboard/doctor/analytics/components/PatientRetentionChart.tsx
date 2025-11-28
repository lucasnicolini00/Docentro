import { useTranslations } from "next-intl";
interface PatientRetentionProps {
  retentionRate: number;
  returningPatients: number;
  newPatients: number;
}

export default function PatientRetentionChart({
  retentionRate,
  returningPatients,
  newPatients,
}: PatientRetentionProps) {
  const circumference = 251.3; // 2 * Math.PI * 40
  const strokeDasharray = `${
    (retentionRate / 100) * circumference
  } ${circumference}`;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {useTranslations("dashboard_doctor")("patientRetentionTitle")}
      </h3>
      <div className="text-center">
        <div className="relative inline-flex items-center justify-center w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#3b82f6"
              strokeWidth="8"
              fill="none"
              strokeDasharray={strokeDasharray}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-900">
              {retentionRate}%
            </span>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">
              {returningPatients}
            </div>
            <div className="text-sm text-gray-600">
              {useTranslations("dashboard_doctor")("returningPatientsLabel")}
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {newPatients}
            </div>
            <div className="text-sm text-gray-600">
              {useTranslations("dashboard_doctor")("newPatientsLabel")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
