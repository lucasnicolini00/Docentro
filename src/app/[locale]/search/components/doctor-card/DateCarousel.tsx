import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { DayInfo } from "./types";

interface DateCarouselProps {
  visibleDays: DayInfo[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
  onNavigate: (direction: "prev" | "next") => void;
  canGoPrev: boolean;
  canGoNext: boolean;
}

export function DateCarousel({
  visibleDays,
  selectedDate,
  onSelectDate,
  onNavigate,
  canGoPrev,
  canGoNext,
}: DateCarouselProps) {
  const t = useTranslations("search");

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">
          {t("availableDatesLabel")}
        </span>
        <div className="flex gap-1">
          <button
            onClick={() => onNavigate("prev")}
            disabled={!canGoPrev}
            className={`p-1 rounded ${
              canGoPrev
                ? "text-blue-600 hover:bg-blue-50"
                : "text-gray-300 cursor-not-allowed"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigate("next")}
            disabled={!canGoNext}
            className={`p-1 rounded ${
              canGoNext
                ? "text-blue-600 hover:bg-blue-50"
                : "text-gray-300 cursor-not-allowed"
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {visibleDays.map((day) => (
          <button
            key={day.date}
            onClick={() => onSelectDate(day.date)}
            disabled={day.isLoading || day.hasAvailableSlots === false}
            className={`p-2 rounded-lg border text-center transition-all relative ${
              selectedDate === day.date
                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                : day.hasAvailableSlots === false
                  ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                  : day.hasAvailableSlots === true
                    ? "bg-white text-gray-700 border-green-200 hover:border-green-400 hover:bg-green-50"
                    : "bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
            }`}
          >
            <div className="text-xs font-medium">{day.dayName}</div>
            <div className="text-sm font-bold">{day.dayNumber}</div>
            <div className="text-xs font-medium">{day.monthName}</div>

            {/* Availability indicator */}
            {day.isLoading ? (
              <div className="absolute top-1 right-1">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
              </div>
            ) : day.hasAvailableSlots === true ? (
              <div className="absolute top-1 right-1">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
              </div>
            ) : day.hasAvailableSlots === false ? (
              <div className="absolute top-1 right-1">
                <div className="w-2 h-2 rounded-full bg-red-400"></div>
              </div>
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
}
