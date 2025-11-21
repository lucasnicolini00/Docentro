"use client";
import { ImagesGalleryProps } from "./types";

export function ImagesGallery({
  images,
  max,
  onDelete,
  deleteLabel,
  galleryTitle,
}: ImagesGalleryProps) {
  if (images.length === 0) return null;
  return (
    <div className="mb-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          {galleryTitle} ({images.length} / {max})
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="relative group aspect-square rounded-lg overflow-hidden"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.url}
                alt={deleteLabel}
                className="w-full h-full object-contain rounded-lg border border-gray-200"
              />
              <button
                onClick={() => onDelete(image.id)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                title={deleteLabel}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
