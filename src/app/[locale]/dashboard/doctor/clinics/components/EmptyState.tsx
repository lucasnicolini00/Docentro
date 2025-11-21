import { Building2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface EmptyStateProps {
  onAddClinic: () => void;
}

export default function EmptyState({ onAddClinic }: EmptyStateProps) {
  const t = useTranslations("dashboard_doctor");
  return (
    <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
      <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {t("noClinicsTitle")}
      </h3>
      <p className="text-gray-600 mb-6">{t("noClinicsSubtitle")}</p>
      <button
        onClick={onAddClinic}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        {t("addFirstClinic")}
      </button>
    </div>
  );
}
