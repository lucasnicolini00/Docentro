"use client";
import { ExperienceFormProps } from "./types";
import MDEditor from "@uiw/react-md-editor";

export function ExperienceForm({
  value,
  onChange,
  submitting,
  isPending,
  saveActionLabel,
  saveProcessingLabel,
  validationError,
  onSubmit,
}: ExperienceFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block">
        <div className="mt-2">
          <MDEditor
            value={value}
            onChange={(v) => onChange(v || "")}
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
          {submitting || isPending ? saveProcessingLabel : saveActionLabel}
        </button>
      </div>
    </form>
  );
}
