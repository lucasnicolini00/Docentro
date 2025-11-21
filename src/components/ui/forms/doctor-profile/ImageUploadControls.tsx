"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { uploadDoctorProfileImage } from "@/lib/actions";
import { useTranslations } from "next-intl";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export default function ImageUploadControls({
  onUploadSuccess,
  onUploadStart,
  onUploadEnd,
}: {
  onUploadSuccess?: () => void;
  onUploadStart?: () => void;
  onUploadEnd?: () => void;
}) {
  const t = useTranslations("forms");
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [selectedValid, setSelectedValid] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) {
      setSelectedName(null);
      setSelectedValid(false);
      return;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error(t("imageUploadTypeError"));
      e.currentTarget.value = "";
      setSelectedName(null);
      setSelectedValid(false);
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error(t("imageUploadSizeError"));
      e.currentTarget.value = "";
      setSelectedName(null);
      setSelectedValid(false);
      return;
    }

    setSelectedName(file.name);
    setSelectedValid(true);
  };

  const handleUpload = async () => {
    const file = inputRef.current?.files?.[0];
    if (!file) {
      toast.error(t("imageUploadSelectError"));
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      onUploadStart?.();
      setUploading(true);
      const res = await uploadDoctorProfileImage(formData);
      if (res?.success) {
        onUploadSuccess?.();
        router.refresh();
      } else {
        toast.error(res?.error || t("imageUploadError"));
      }
    } catch {
      toast.error(t("imageUploadError"));
    } finally {
      setUploading(false);
      onUploadEnd?.();
      if (inputRef.current) inputRef.current.value = "";
      setSelectedName(null);
      setSelectedValid(false);
    }
  };

  return (
    <div className="flex items-center">
      <input
        ref={inputRef}
        type="file"
        name="file"
        accept={ALLOWED_TYPES.join(",")}
        onChange={handleFileChange}
        className="sr-only"
        aria-hidden
      />

      <div className="flex items-center space-x-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center px-3 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium hover:bg-gray-50"
        >
          {t("imageUploadSelect")}
        </button>

        {selectedName && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">{selectedName}</span>
            <button
              type="button"
              onClick={() => {
                if (inputRef.current) inputRef.current.value = "";
                setSelectedName(null);
                setSelectedValid(false);
              }}
              className="text-sm text-red-600 hover:underline"
            >
              {t("imageUploadRemove")}
            </button>
          </div>
        )}

        {selectedValid && (
          <button
            type="button"
            onClick={handleUpload}
            disabled={uploading}
            className={`ml-3 px-3 py-2 rounded-md text-sm text-white ${
              uploading ? "bg-gray-400" : "bg-blue-600"
            }`}
          >
            {uploading ? t("imageUploadLoading") : t("imageUploadUpload")}
          </button>
        )}
      </div>
    </div>
  );
}
