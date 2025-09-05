"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const [specialty, setSpecialty] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();

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

    // Navigate to search page with parameters
    const searchUrl = `/search${
      params.toString() ? `?${params.toString()}` : ""
    }`;
    router.push(searchUrl);
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Encuentra al profesional de salud
            <span className="block text-blue-200">ideal para ti</span>
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Conectamos pacientes con los mejores profesionales de la salud.
            Agenda tu cita de forma rápida y segura.
          </p>

          {/* Enhanced Search Form */}
          <div className="max-w-4xl mx-auto">
            <form
              onSubmit={handleSearch}
              className="bg-white rounded-2xl shadow-2xl p-6 md:p-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Especialidad o síntoma
                  </label>
                  <input
                    type="text"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    placeholder="Ej: Cardiología, dolor de cabeza..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ciudad o ubicación
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Ej: La Paz, Santa Cruz..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg cursor-pointer"
                  >
                    🔍 Buscar Profesionales
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Quick Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-blue-200">Profesionales</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">15+</div>
              <div className="text-blue-200">Especialidades</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">10k+</div>
              <div className="text-blue-200">Consultas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">4.8⭐</div>
              <div className="text-blue-200">Calificación</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
