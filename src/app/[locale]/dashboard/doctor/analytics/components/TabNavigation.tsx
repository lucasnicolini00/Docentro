import { BarChart3, Clock, Users, DollarSign } from "lucide-react";
import { useTranslations } from "next-intl";

type TabType = "overview" | "patients" | "revenue" | "schedule";

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function TabNavigation({
  activeTab,
  onTabChange,
}: TabNavigationProps) {
  const t = useTranslations("dashboard_doctor");
  const tabs = [
    { id: "overview" as const, label: t("overviewTabLabel"), icon: BarChart3 },
    { id: "schedule" as const, label: t("scheduleTabLabel"), icon: Clock },
    { id: "patients" as const, label: t("patientsTabLabel"), icon: Users },
    { id: "revenue" as const, label: t("revenueTabLabel"), icon: DollarSign },
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === tab.id
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <tab.icon className="h-4 w-4 mr-2" />
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
