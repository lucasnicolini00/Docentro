"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Filter } from "lucide-react";
import LoadingButton from "@/components/ui/buttons/LoadingButton";
import { AutocompleteInput } from "@/components/ui/forms";
import { FiltersModal, type FilterState } from "@/components/ui";
import { getAllSpecialities, getAllCities } from "@/lib/actions/search";

interface SearchFiltersProps {
  initialSpecialty?: string;
  initialLocation?: string;
}

export default function SearchFilters({
  initialSpecialty = "",
  initialLocation = "",
}: SearchFiltersProps) {
  const [specialty, setSpecialty] = useState(initialSpecialty);
  const [location, setLocation] = useState(initialLocation);
  const [isSearching, setIsSearching] = useState(false);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState<FilterState>({
    specialties: [],
    priceRanges: [],
    availability: [],
    rating: null,
  });
  const router = useRouter();

  // Fetch specialties and cities for autocomplete
  useEffect(() => {
    async function fetchAutocompleteData() {
      try {
        const [specialtiesResult, citiesResult] = await Promise.all([
          getAllSpecialities(),
          getAllCities(),
        ]);

        if (specialtiesResult.success) {
          setSpecialties(
            specialtiesResult.data.map((spec: { name: string }) => spec.name)
          );
        }

        if (citiesResult.success) {
          setCities(citiesResult.data);
        }
      } catch (error) {
        console.error("Error fetching autocomplete data:", error);
      }
    }

    fetchAutocompleteData();
  }, []);

  // Update state when URL parameters change
  useEffect(() => {
    setSpecialty(initialSpecialty);
    setLocation(initialLocation);
  }, [initialSpecialty, initialLocation]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);

    // Build URL with parameters
    const params = new URLSearchParams();
    if (specialty.trim()) {
      params.append("specialty", specialty.trim());
    }
    if (location.trim()) {
      params.append("location", location.trim());
    }

    // Navigate to search page with new parameters
    const searchUrl = `/search${
      params.toString() ? `?${params.toString()}` : ""
    }`;

    // Small delay to show loading state
    await new Promise((resolve) => setTimeout(resolve, 500));
    router.push(searchUrl);
    setIsSearching(false);
  };

  const clearFilters = () => {
    setSpecialty("");
    setLocation("");
    setAdvancedFilters({
      specialties: [],
      priceRanges: [],
      availability: [],
      rating: null,
    });
    router.push("/search");
  };

  const handleApplyAdvancedFilters = (filters: FilterState) => {
    setAdvancedFilters(filters);
    // Here you could extend the search to include advanced filters
    // For now, we'll just store them in state
  };

  const hasFilters = specialty.trim() || location.trim();
  const hasAdvancedFilters =
    advancedFilters.specialties.length > 0 ||
    advancedFilters.priceRanges.length > 0 ||
    advancedFilters.availability.length > 0 ||
    advancedFilters.rating !== null;

  return (
    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
      <AutocompleteInput
        value={specialty}
        onChange={setSpecialty}
        options={specialties}
        placeholder="Buscar por especialidad..."
        icon="🔍"
        className="w-full sm:w-64"
      />
      <AutocompleteInput
        value={location}
        onChange={setLocation}
        options={cities}
        placeholder="Ubicación..."
        icon="📍"
        className="w-full sm:w-48"
      />
      <div className="flex gap-2">
        <LoadingButton
          type="submit"
          isLoading={isSearching}
          loadingText="Buscando..."
          variant="primary"
          size="md"
        >
          Filtrar
        </LoadingButton>

        {/* More Filters Button */}
        <button
          type="button"
          onClick={() => setIsFiltersModalOpen(true)}
          className={`relative flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors font-medium ${
            hasAdvancedFilters
              ? "border-blue-600 text-blue-600 bg-blue-50 hover:bg-blue-100"
              : "border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          <Filter className="w-4 h-4" />
          Más Filtros
          {hasAdvancedFilters && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-blue-600 text-white rounded-full text-xs flex items-center justify-center">
              {advancedFilters.specialties.length +
                advancedFilters.priceRanges.length +
                advancedFilters.availability.length +
                (advancedFilters.rating ? 1 : 0)}
            </span>
          )}
        </button>

        {(hasFilters || hasAdvancedFilters) && (
          <button
            type="button"
            onClick={clearFilters}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors font-medium cursor-pointer"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Filters Modal */}
      <FiltersModal
        isOpen={isFiltersModalOpen}
        onClose={() => setIsFiltersModalOpen(false)}
        onApplyFilters={handleApplyAdvancedFilters}
        currentFilters={advancedFilters}
      />
    </form>
  );
}
