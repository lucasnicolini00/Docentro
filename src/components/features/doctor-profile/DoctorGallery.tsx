"use client";

import { useState } from "react";
import ImageGalleryModal from "@/components/ui/ImageGalleryModal";

interface DoctorGalleryProps {
  images: Array<{ id: string; url: string; filename?: string | null }>;
  title: string;
}

export default function DoctorGallery({ images, title }: DoctorGalleryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <button
              key={image.id || `gallery-${index}`}
              onClick={() => handleImageClick(index)}
              className="aspect-square rounded-lg overflow-hidden bg-gray-100 relative cursor-pointer group border border-gray-200"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.url}
                alt={image.filename || `Imagen ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-200 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm font-medium bg-black/50 px-3 py-1 rounded">
                  Ver imagen
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <ImageGalleryModal
        images={images}
        initialIndex={selectedImageIndex}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
