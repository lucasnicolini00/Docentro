/* eslint-disable @next/next/no-img-element */
"use client";

import { getDoctorPublicProfile, getDoctorImagesById } from "@/lib/actions";
import ClientMarkdownPreview from "@/components/ui/ClientMarkdownPreview";
import { MapPin, Calendar, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

interface DoctorPageProps {
  params: Promise<{ id: string }>;
}

export default function DoctorPage({ params }: DoctorPageProps) {
  const [doctor, setDoctor] = useState<any>(null);
  const [doctorImages, setDoctorImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { id } = await params;

        // Fetch doctor profile
        const profileResult = await getDoctorPublicProfile(id);
        if (!profileResult.success || !profileResult.data) {
          setError("Doctor no encontrado");
          setLoading(false);
          return;
        }

        setDoctor(profileResult.data);

        // Fetch gallery images
        const imagesResult = await getDoctorImagesById(id);
        const images = imagesResult.success ? imagesResult.data || [] : [];
        setDoctorImages(images);

        setLoading(false);
      } catch {
        setError("Error al cargar la información del doctor");
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % doctorImages.length);
  }, [doctorImages.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + doctorImages.length) % doctorImages.length
    );
  }, [doctorImages.length]);

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!modalOpen) return;

      switch (event.key) {
        case "Escape":
          closeModal();
          break;
        case "ArrowLeft":
          prevImage();
          break;
        case "ArrowRight":
          nextImage();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen, nextImage, prevImage]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 py-6">
          <div className="animate-pulse space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6 h-32"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6 h-64"></div>
                <div className="bg-white rounded-lg shadow-sm p-6 h-96"></div>
              </div>
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6 h-48"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 py-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {error || "Doctor no encontrado"}
            </h1>
            <p className="text-gray-600">
              Lo sentimos, no pudimos encontrar la información solicitada.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Back Button */}
            {/* <div className="mb-6">
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg shadow-sm text-sm font-medium hover:bg-gray-50 transition-colors"
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
                Volver
              </button>
            </div> */}

            {/* Gallery Section  */}
            {doctorImages.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Galería
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {doctorImages.slice(0, 3).map((image: any, index: number) => (
                    <div
                      key={image.id}
                      className="aspect-square relative rounded-lg overflow-hidden cursor-pointer group border border-gray-200"
                      onClick={() => openModal(index)}
                    >
                      <img
                        src={image.url}
                        alt="Doctor gallery image"
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  ))}
                </div>
                {doctorImages.length > 3 && (
                  <div className="text-center mt-4">
                    <button
                      onClick={() => openModal(3)}
                      className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors"
                    >
                      Ver más ({doctorImages.length - 3} imágenes)
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* About Section - Full height */}
            {doctor.description && (
              <div className="bg-white rounded-lg shadow-sm p-6 min-h-screen">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Sobre mí
                </h2>
                <div className="prose prose-sm max-w-none">
                  <ClientMarkdownPreview
                    source={doctor.description}
                    className="prose prose-sm max-w-none"
                  />
                </div>
              </div>
            )}

            {/* Experience Section */}
            {doctor.experiences && doctor.experiences.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Experiencia Profesional
                </h2>
                <div className="space-y-4">
                  {doctor.experiences.map((exp: any) => (
                    <div
                      key={exp.id}
                      className="border-l-4 border-blue-500 pl-4"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium text-gray-900">
                          {exp.startDate ? exp.startDate.getFullYear() : "N/A"}{" "}
                          -{" "}
                          {exp.endDate ? exp.endDate.getFullYear() : "Presente"}
                        </span>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1">
                        {exp.position}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {exp.institution}
                      </p>
                      {exp.description && (
                        <div className="prose prose-xs max-w-none">
                          <ClientMarkdownPreview
                            source={exp.description}
                            className="prose prose-xs max-w-none"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Información Rápida
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Especialidad
                  </p>
                  <p className="text-sm text-gray-900">
                    {doctor.specialities
                      .map((s: any) => s.speciality.name)
                      .join(", ")}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Idiomas</p>
                  <p className="text-sm text-gray-900">Español, Inglés</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Horarios</p>
                  <p className="text-sm text-gray-900">
                    Lun - Vie: 8:00 - 18:00
                  </p>
                </div>
              </div>
            </div>

            {/* Clinics List */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Ubicaciones
              </h3>
              <div className="space-y-3">
                {doctor.clinics.map((clinicLink: any) => (
                  <div
                    key={clinicLink.clinic.id}
                    className="flex items-start gap-3"
                  >
                    <MapPin className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        {clinicLink.clinic.name}
                      </p>
                      <p className="text-gray-600 text-xs">
                        {clinicLink.clinic.address}
                      </p>
                      {clinicLink.clinic.city && (
                        <p className="text-gray-600 text-xs">
                          {clinicLink.clinic.city}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {modalOpen && doctorImages.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative max-w-4xl max-h-full p-4">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-7 right-7 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-opacity-75 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Main image */}
            <div className="relative">
              <img
                src={doctorImages[currentImageIndex].url}
                alt="Doctor gallery image"
                width={800}
                height={600}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />

              {/* Navigation buttons */}
              {doctorImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Image counter */}
            {doctorImages.length > 1 && (
              <div className="text-center mt-4 text-white">
                <span className="text-sm">
                  {currentImageIndex + 1} de {doctorImages.length}
                </span>
              </div>
            )}

            {/* Thumbnail navigation */}
            {doctorImages.length > 1 && (
              <div className="flex justify-center mt-4 space-x-2 overflow-x-auto">
                {doctorImages.map((image: any, index: number) => (
                  <button
                    key={image.id}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex
                        ? "border-blue-500"
                        : "border-gray-600 hover:border-gray-400"
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`Thumbnail ${index + 1}`}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
