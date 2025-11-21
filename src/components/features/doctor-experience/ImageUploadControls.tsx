"use client";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { ImageUploadControlsProps } from "./types";

export function ImageUploadControls({
  currentCount,
  max,
  selectImagesButton,
  uploadingImagesLabel,
  uploadImagesButton,
  imagesCounterLabel,
  maxImagesError,
  selectFilesError,
  onUpload,
}: ImageUploadControlsProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.error(selectFilesError({ fallback: "Seleccione archivos" }));
      return;
    }
    const total = currentCount + selectedFiles.length;
    if (total > max) {
      toast.error(maxImagesError({ max }));
      return;
    }
    setUploading(true);
    try {
      await onUpload(selectedFiles);
      setSelectedFiles([]);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {imagesCounterLabel}: {currentCount} / {max}
          </div>
          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleFileSelect}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-gray-100 text-gray-700 px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-200"
            >
              {selectImagesButton}
            </button>
            {selectedFiles.length > 0 && (
              <div className="text-sm text-gray-600">
                {selectedFiles.length} archivo
                {selectedFiles.length !== 1 ? "s" : ""} seleccionado
                {selectedFiles.length !== 1 ? "s" : ""}
              </div>
            )}
            <button
              type="button"
              onClick={handleUpload}
              disabled={uploading || selectedFiles.length === 0}
              className="bg-blue-600 text-white px-3 py-2 rounded-md disabled:opacity-50 hover:bg-blue-700"
            >
              {uploading ? uploadingImagesLabel : uploadImagesButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
