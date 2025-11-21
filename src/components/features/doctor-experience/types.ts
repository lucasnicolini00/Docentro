import type { FormEvent } from "react";

export interface GalleryImage {
  id: string;
  url: string;
}

export interface ExperienceEditorProps {
  initialValue?: string;
  saveAction: (formData: FormData) => Promise<any>;
  existingImages?: GalleryImage[];
}

export interface ExperienceHeaderProps {
  title: string;
  intro: string;
  backLabel: string;
}

export interface ImagesGalleryProps {
  images: GalleryImage[];
  max: number;
  onDelete: (id: string) => void;
  deleteLabel: string;
  galleryTitle: string;
}

export interface ImageUploadControlsProps {
  currentCount: number;
  max: number;
  selectImagesButton: string;
  uploadingImagesLabel: string;
  uploadImagesButton: string;
  imagesCounterLabel: string;
  maxImagesError: (opts: { max: number }) => string;
  selectFilesError: (opts: { fallback: string }) => string;
  onUpload: (files: File[]) => Promise<void>;
}

export interface ExperienceFormProps {
  value: string;
  onChange: (val: string) => void;
  submitting: boolean;
  isPending: boolean;
  saveActionLabel: string;
  saveProcessingLabel: string;
  validationError?: string | null;
  onSubmit: (e: FormEvent) => void;
}

export interface DeleteImageModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  processing: boolean;
  title: string;
  message: string;
  cancelAction: string;
  deleteAction: string;
  deleteProcessing: string;
}
