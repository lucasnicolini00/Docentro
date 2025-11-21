"use client";

import Link from "next/link";
import { Calendar } from "lucide-react";
import { Activity } from "./types";
import { getIconComponent, getIconColorClasses } from "./utils";
import { useLocalePath } from "@/hooks";

interface RecentActivityProps {
  activities: Activity[];
  loading: boolean;
}

export default function RecentActivity({
  activities,
  loading,
}: RecentActivityProps) {
  const localePath = useLocalePath();
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Actividad Reciente
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="w-9 h-9 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-3 w-1/4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Actividad Reciente
        </h3>
      </div>
      <div className="p-6">
        {activities.length > 0 ? (
          <div className="space-y-4">
            {activities.map((activity) => {
              const IconComponent = getIconComponent(activity.icon);
              const iconColorClass = getIconColorClasses(activity.iconColor);

              return (
                <div key={activity.id} className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${iconColorClass}`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.title}
                    </p>
                    <p className="text-xs text-gray-500">{activity.timeAgo}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p>No hay actividad reciente</p>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-gray-200">
          <Link
            href={localePath("/dashboard/doctor/activity")}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Ver toda la actividad →
          </Link>
        </div>
      </div>
    </div>
  );
}
