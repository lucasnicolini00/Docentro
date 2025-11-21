"use client";

import { ExperienceEditorProps } from "@/components/features/doctor-experience/types";
import { ImagesGallery } from "@/components/features/doctor-experience/ImagesGallery";
import { ImageUploadControls } from "@/components/features/doctor-experience/ImageUploadControls";
import { ExperienceForm } from "@/components/features/doctor-experience/ExperienceForm";
import { DeleteImageModal } from "@/components/features/doctor-experience/DeleteImageModal";
import { useTranslations } from "next-intl";
import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { uploadDoctorImages, removeDoctorImage } from "@/lib/actions";

export default function ExperienceEditor({
  initialValue = "",
  saveAction,
  existingImages = [],
}: ExperienceEditorProps) {
  const t = useTranslations("dashboard_doctor");
  const [value, setValue] = useState(initialValue);
  const [isPending, startTransition] = useTransition();
  const [validationError, setValidationError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const [galleryImages, setGalleryImages] = useState(existingImages);
  const MAX_IMAGES = 10;

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<string | null>(null);
  const [deletingImage, setDeletingImage] = useState(false);

  useEffect(() => {
    setGalleryImages(existingImages);
  }, [existingImages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const minLen = 10;
    const maxLen = 5000;
    if (value.trim().length < minLen) {
      setValidationError(t("descriptionMinError", { min: minLen }));
      return;
    }
    if (value.length > maxLen) {
      setValidationError(t("descriptionMaxError", { max: maxLen }));
      return;
    }
    setValidationError(null);
    setSubmitting(true);
    const fd = new FormData();
    fd.set("description", value);
    try {
      const res = await saveAction(fd);
      if (res?.success) {
        toast.success(t("saveAction") + " ✔");
        startTransition(() => {
          try {
            router.refresh();
          } catch {}
        });
      } else {
        toast.error(res?.error || t("updateErrorGeneric"));
      }
    } catch {
      toast.error(t("updateErrorGeneric"));
    } finally {
      setSubmitting(false);
    }
  };

  const onUploadImages = async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    try {
      const res = await uploadDoctorImages(formData);
      if (res?.success) {
        if (res.data && Array.isArray(res.data)) {
          const newImages = res.data.map((img: any) => ({
            id: img.id,
            url: img.url,
          }));
          setGalleryImages((prev) => [...newImages, ...prev]);
        }
        toast.success(t("imagesUploadedSuccess", { count: files.length }));
        try {
          router.refresh();
        } catch {}
      } else {
        toast.error(res?.error || t("imagesUploadError"));
      }
    } catch {
      toast.error(t("imagesUploadError"));
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
        setGalleryImages((prev) =>
          prev.filter((img) => img.id !== imageToDelete)
        );
        toast.success(t("imageDeleteSuccess"));
        try {
          router.refresh();
        } catch {}
      } else {
        toast.error(res?.error || t("imageDeleteError"));
      }
    } catch {
      toast.error(t("imageDeleteError"));
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
      <ImagesGallery
        images={galleryImages}
        max={MAX_IMAGES}
        onDelete={handleDeleteImage}
        deleteLabel={t("deleteImageModalTitle")}
        galleryTitle={t("imagesGalleryTitle")}
      />
      <ImageUploadControls
        currentCount={galleryImages.length}
        max={MAX_IMAGES}
        selectImagesButton={t("selectImagesButton")}
        uploadingImagesLabel={t("uploadingImagesLabel")}
        uploadImagesButton={t("uploadImagesButton")}
        imagesCounterLabel={t("imagesCounterLabel")}
        maxImagesError={({ max }) => t("maxImagesError", { max })}
        selectFilesError={({ fallback }) => t("selectFilesError", { fallback })}
        onUpload={onUploadImages}
      />
      <ExperienceForm
        value={value}
        onChange={setValue}
        submitting={submitting}
        isPending={isPending}
        saveActionLabel={t("saveAction")}
        saveProcessingLabel={t("saveProcessing")}
        validationError={validationError}
        onSubmit={handleSubmit}
      />
      <DeleteImageModal
        isOpen={deleteModalOpen}
        onCancel={cancelDeleteImage}
        onConfirm={confirmDeleteImage}
        processing={deletingImage}
        title={t("deleteImageModalTitle")}
        message={t("deleteImageModalMessage")}
        cancelAction={t("cancelAction")}
        deleteAction={t("deleteImageAction")}
        deleteProcessing={t("deleteImageProcessing")}
      />
    </>
  );
}
