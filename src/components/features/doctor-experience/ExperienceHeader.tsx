"use client";
import Link from "next/link";
import { ExperienceHeaderProps } from "./types";
import { useLocalePath } from "@/hooks";

export function ExperienceHeader({
  title,
  intro,
  backLabel,
}: ExperienceHeaderProps) {
  const localePath = useLocalePath();
  return (
    <div className="mb-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
              <p className="text-gray-600 text-sm mt-1">{intro}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Link
              href={localePath("/dashboard/doctor/profile")}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 border border-gray-200 rounded-lg shadow-sm text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              {backLabel}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
