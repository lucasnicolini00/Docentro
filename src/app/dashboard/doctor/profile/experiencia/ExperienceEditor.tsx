"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import type { FormEvent } from "react";
import { uploadDoctorImages, removeDoctorImage } from "@/lib/actions";
import Link from "next/link";

import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import SimpleModal from "@/components/ui/modals/SimpleModal";

interface Props {
  initialValue?: string;
  saveAction: (formData: FormData) => Promise<any>;
  existingImages?: Array<{ id: string; url: string }>;
}

export default function ExperienceEditor({
  initialValue = "",
  saveAction,
  existingImages = [],
}: Props) {
  const [value, setValue] = useState(initialValue);
  const [isPending, startTransition] = useTransition();
  // message state replaced by toast notifications
  const [validationError, setValidationError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  // Image upload state
  const [uploadingImages, setUploadingImages] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const MAX_IMAGES = 10;

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<string | null>(null);
  const [deletingImage, setDeletingImage] = useState(false);

  // Local state for images to enable immediate UI updates
  const [galleryImages, setGalleryImages] = useState(existingImages);

  // Sync local state with prop changes (e.g., after uploads)
  useEffect(() => {
    setGalleryImages(existingImages);
  }, [existingImages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // simple validation
    const minLen = 10;
    const maxLen = 5000;
    if (value.trim().length < minLen) {
      setValidationError(
        `La descripción debe tener al menos ${minLen} caracteres.`
      );
      return;
    }
    if (value.length > maxLen) {
      setValidationError(
        `La descripción no puede exceder ${maxLen} caracteres.`
      );
      return;
    }
    setValidationError(null);

    setSubmitting(true);
    const fd = new FormData();
    fd.set("description", value);
    try {
      const res = await saveAction(fd);
      if (res?.success) {
        toast.success("Experiencia guardada correctamente.");
        // mark UI updates as low priority
        startTransition(() => {
          try {
            router.refresh();
          } catch {
            // ignore refresh errors
          }
        });
      } else {
        toast.error(res?.error || "Error guardando");
      }
    } catch {
      toast.error("Error guardando");
    } finally {
      setSubmitting(false);
    }
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
  };

  const handleImagesUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.error("Seleccione archivos");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("files", file));

    // client-side count validation
    const total = (galleryImages?.length || 0) + selectedFiles.length;
    if (total > MAX_IMAGES) {
      toast.error(`No puedes subir más de ${MAX_IMAGES} imágenes en total.`);
      return;
    }

    setUploadingImages(true);
    try {
      const res = await uploadDoctorImages(formData);
      if (res?.success) {
        // Immediately update local state with new images (add to beginning to match DB ordering)
        if (res.data && Array.isArray(res.data)) {
          const newImages = res.data.map((img: any) => ({
            id: img.id,
            url: img.url,
          }));
          setGalleryImages((prev) => [...newImages, ...prev]);
        }
        toast.success("Imágenes subidas");
        setSelectedFiles([]);
        try {
          router.refresh();
        } catch {}
      } else {
        toast.error(res?.error || "Error subiendo imágenes");
      }
    } catch {
      toast.error("Error subiendo imágenes");
    } finally {
      setUploadingImages(false);
    }
  };

  const handleDeleteImage = (imageId: string) => {
    setImageToDelete(imageId);
    setDeleteModalOpen(true);
  };

  const confirmDeleteImage = async () => {
    if (!imageToDelete) return;

    setDeletingImage(true);
    try {
      const res = await removeDoctorImage(imageToDelete);
      if (res?.success) {
        // Immediately remove from local state for instant UI update
        setGalleryImages((prev) =>
          prev.filter((img) => img.id !== imageToDelete)
        );
        toast.success("Imagen eliminada correctamente");
        try {
          router.refresh();
        } catch {}
      } else {
        toast.error(res?.error || "Error eliminando imagen");
      }
    } catch {
      toast.error("Error eliminando imagen");
    } finally {
      setDeletingImage(false);
      setDeleteModalOpen(false);
      setImageToDelete(null);
    }
  };

  const cancelDeleteImage = () => {
    setDeleteModalOpen(false);
    setImageToDelete(null);
  };

  return (
    <>
      {/* Back to Profile Button */}
      <div className="mb-6">
        <Link
          href="/dashboard/doctor/profile"
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
          Volver al Perfil
        </Link>
      </div>

      <div className="mb-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  Experiencia Profesional
                </h1>
                <p className="text-gray-600 text-sm mt-1">
                  Esto es lo que va a ver la gente cuando visite tu perfil.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      {galleryImages.length > 0 && (
        <div className="mb-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Galería de Imágenes ({galleryImages.length} / {MAX_IMAGES})
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryImages.map((image) => (
                <div key={image.id} className="relative group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.url}
                    alt="Imagen de galería"
                    className=" w-full h-40 object-contain rounded-lg border border-gray-200"
                  />
                  <button
                    onClick={() => handleDeleteImage(image.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    title="Eliminar imagen"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Upload Controls */}
      <div className="mb-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Imágenes: {galleryImages?.length || 0} / {MAX_IMAGES}
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
                Seleccionar imágenes
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
                onClick={handleImagesUpload}
                disabled={uploadingImages || selectedFiles.length === 0}
                className="bg-blue-600 text-white px-3 py-2 rounded-md disabled:opacity-50 hover:bg-blue-700"
              >
                {uploadingImages ? "Subiendo..." : "Subir imágenes"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <div className="mt-2">
            <MDEditor
              value={value}
              onChange={(v) => setValue(v || "")}
              height={800}
              preview="live"
              data-color-mode="light"
            />
          </div>
        </label>
        {validationError && (
          <div className="text-sm text-red-600">{validationError}</div>
        )}
        <div className="flex items-center justify-end gap-3">
          <button
            type="submit"
            disabled={submitting || isPending}
            className="bg-green-600 text-white px-4 py-2 rounded-md disabled:opacity-50 hover:bg-green-700"
          >
            {submitting || isPending ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>

      {/* Delete Confirmation Modal */}
      <SimpleModal
        isOpen={deleteModalOpen}
        onClose={cancelDeleteImage}
        title="Eliminar imagen"
      >
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">
                ¿Estás seguro de que quieres eliminar esta imagen? Esta acción
                no se puede deshacer.
              </p>
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={cancelDeleteImage}
              disabled={deletingImage}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              onClick={confirmDeleteImage}
              disabled={deletingImage}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 disabled:opacity-50 flex items-center"
            >
              {deletingImage ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Eliminando...
                </>
              ) : (
                "Eliminar"
              )}
            </button>
          </div>
        </div>
      </SimpleModal>
    </>
  );
}
