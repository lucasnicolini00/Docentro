import Link from "next/link";
import { Calendar, Clock, BarChart3, Settings } from "lucide-react";
import { QuickAction } from "./types";

const quickActionsData: QuickAction[] = [
  {
    id: "new-schedule",
    label: "Gestionar Horarios",
    href: "/dashboard/doctor/schedules",
    icon: Calendar,
    color: "bg-blue-500 hover:bg-blue-600",
    description: "Configurar disponibilidad y horarios",
  },
  {
    id: "view-appointments",
    label: "Ver Citas",
    href: "/dashboard/doctor/appointments",
    icon: Clock,
    color: "bg-green-500 hover:bg-green-600",
    description: "Revisar citas programadas",
  },

  {
    id: "view-analytics",
    label: "Analíticas",
    href: "/dashboard/doctor/analytics",
    icon: BarChart3,
    color: "bg-orange-500 hover:bg-orange-600",
    description: "Ver reportes y estadísticas",
  },
  {
    id: "settings",
    label: "Configuración",
    href: "/dashboard/doctor/profile",
    icon: Settings,
    color: "bg-gray-500 hover:bg-gray-600",
    description: "Ajustar preferencias del perfil",
  },
];

export default function QuickActions() {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Acciones Rápidas
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActionsData.map((action) => (
          <Link
            key={action.id}
            href={action.href}
            className="group bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div
                className={`p-3 rounded-lg ${action.color} transition-colors`}
              >
                <action.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {action.label}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {action.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
