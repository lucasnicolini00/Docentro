"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import type { FormEvent } from "react";

import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

interface Props {
  initialValue?: string;
  saveAction: (formData: FormData) => Promise<any>;
}

export default function ExperienceEditor({
  initialValue = "",
  saveAction,
}: Props) {
  const [value, setValue] = useState(initialValue);
  const [isPending, startTransition] = useTransition();
  // message state replaced by toast notifications
  const [validationError, setValidationError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

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
          <button
            type="submit"
            disabled={submitting || isPending}
            className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
          >
            {submitting || isPending ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </>
  );
}
