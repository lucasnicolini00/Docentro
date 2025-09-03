"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  // Update state when URL parameters change
  useEffect(() => {
    setSpecialty(initialSpecialty);
    setLocation(initialLocation);
  }, [initialSpecialty, initialLocation]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

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
    router.push(searchUrl);
  };

  const clearFilters = () => {
    setSpecialty("");
    setLocation("");
    router.push("/search");
  };

  const hasFilters = specialty.trim() || location.trim();

  return (
    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
      <div className="relative">
        <input
          type="text"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          placeholder="Buscar por especialidad..."
          className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
      </div>
      <div className="relative">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Ubicación..."
          className="w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <span className="absolute right-3 top-2.5 text-gray-400">📍</span>
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-medium cursor-pointer"
        >
          Filtrar
        </button>
        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors font-medium cursor-pointer"
          >
            Limpiar
          </button>
        )}
      </div>
    </form>
  );
}
