"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import type { FormEvent } from "react";
import { uploadDoctorImages } from "@/lib/actions";
import { useRef } from "react";

import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

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
  const MAX_IMAGES = 10;

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

  const handleImagesUpload = async () => {
    const input = fileInputRef.current;
    if (!input || !input.files) {
      toast.error("Seleccione archivos");
      return;
    }

    const formData = new FormData();
    for (const f of Array.from(input.files)) {
      formData.append("files", f);
    }
    // client-side count validation
    const newFiles = formData.getAll("files") as any[];
    const total = (existingImages?.length || 0) + newFiles.length;
    if (total > MAX_IMAGES) {
      toast.error(`No puedes subir más de ${MAX_IMAGES} imágenes en total.`);
      return;
    }

    setUploadingImages(true);
    try {
      const res = await uploadDoctorImages(formData);
      if (res?.success) {
        toast.success("Imágenes subidas");
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
      if (input) input.value = ""; // clear
    }
  };

  return (
    <>
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
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-600">
              Imágenes: {existingImages?.length || 0} / {MAX_IMAGES}
            </div>
            <div className="flex items-center">
              <input
                ref={fileInputRef}
                type="file"
                name="files"
                multiple
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="mr-2"
              />
              <button
                type="button"
                onClick={handleImagesUpload}
                disabled={uploadingImages}
                className="bg-gray-700 text-white px-3 py-2 rounded-md disabled:opacity-50"
              >
                {uploadingImages ? "Subiendo..." : "Subir imágenes"}
              </button>
            </div>

            <button
              type="submit"
              disabled={submitting || isPending}
              className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
            >
              {submitting || isPending ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
