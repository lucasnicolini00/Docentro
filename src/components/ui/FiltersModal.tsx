"use client";
import { useTranslations } from "next-intl";

import { useState, useEffect } from "react";
import { X, Filter } from "lucide-react";

interface FiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterState) => void;
  currentFilters: FilterState;
}

export interface FilterState {
  specialties: string[];
  priceRanges: string[];
  availability: string[];
  rating: number | null;
}

export default function FiltersModal({
  isOpen,
  onClose,
  onApplyFilters,
  currentFilters,
}: FiltersModalProps) {
  const [filters, setFilters] = useState<FilterState>(currentFilters);
  const t = useTranslations("filtersModal");

  // Update local state when currentFilters change
  useEffect(() => {
    setFilters(currentFilters);
  }, [currentFilters]);

  // Close modal with Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      specialties: checked
        ? [...prev.specialties, specialty]
        : prev.specialties.filter((s) => s !== specialty),
    }));
  };

  const handlePriceRangeChange = (range: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      priceRanges: checked
        ? [...prev.priceRanges, range]
        : prev.priceRanges.filter((r) => r !== range),
    }));
  };

  const handleAvailabilityChange = (availability: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      availability: checked
        ? [...prev.availability, availability]
        : prev.availability.filter((a) => a !== availability),
    }));
  };

  const handleRatingChange = (rating: number) => {
    setFilters((prev) => ({
      ...prev,
      rating: prev.rating === rating ? null : rating,
    }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleClear = () => {
    const clearedFilters: FilterState = {
      specialties: [],
      priceRanges: [],
      availability: [],
      rating: null,
    };
    setFilters(clearedFilters);
    onApplyFilters(clearedFilters);
    onClose();
  };

  const hasFilters =
    filters.specialties.length > 0 ||
    filters.priceRanges.length > 0 ||
    filters.availability.length > 0 ||
    filters.rating !== null;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm bg-opacity-25 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Filter className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                {t("advancedFilters")}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 max-h-96 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Specialties */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {t("specialtiesLabel")}
                </h3>
                <div className="space-y-3">
                  {t.raw("specialtiesList").map((specialty: string) => (
                    <label key={specialty} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.specialties.includes(specialty)}
                        onChange={(e) =>
                          handleSpecialtyChange(specialty, e.target.checked)
                        }
                        className="rounded border-gray-300 text-blue-600 mr-3 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{specialty}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {t("priceRangeLabel")}
                </h3>
                <div className="space-y-3">
                  {t.raw("priceRangesList").map((range: string) => (
                    <label key={range} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.priceRanges.includes(range)}
                        onChange={(e) =>
                          handlePriceRangeChange(range, e.target.checked)
                        }
                        className="rounded border-gray-300 text-blue-600 mr-3 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{range}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {t("availabilityLabel")}
                </h3>
                <div className="space-y-3">
                  {t.raw("availabilityList").map((availability: string) => (
                    <label key={availability} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.availability.includes(availability)}
                        onChange={(e) =>
                          handleAvailabilityChange(
                            availability,
                            e.target.checked
                          )
                        }
                        className="rounded border-gray-300 text-blue-600 mr-3 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">
                        {availability}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {t("minRatingLabel")}
                </h3>
                <div className="space-y-3">
                  {[5, 4, 3, 2].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="rating"
                        checked={filters.rating === rating}
                        onChange={() => handleRatingChange(rating)}
                        className="border-gray-300 text-blue-600 mr-3 focus:ring-blue-500"
                      />
                      <div className="flex items-center">
                        {[...Array(rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400 text-sm">
                            ★
                          </span>
                        ))}
                        {[...Array(5 - rating)].map((_, i) => (
                          <span key={i} className="text-gray-300 text-sm">
                            ★
                          </span>
                        ))}
                        <span className="text-sm text-gray-700 ml-2">
                          {t("andMore")}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
            <div className="text-sm text-gray-600">
              {hasFilters && (
                <span>
                  {filters.specialties.length +
                    filters.priceRanges.length +
                    filters.availability.length +
                    (filters.rating ? 1 : 0)}{" "}
                  {t("appliedFilters")}
                </span>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleClear}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                {t("clearButton")}
              </button>
              <button
                onClick={handleApply}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                {t("applyFiltersButton")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
