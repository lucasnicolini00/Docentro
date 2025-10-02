import { useEffect } from "react";
import { X } from "lucide-react";

import { ReactNode } from "react";

interface SimpleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content?: string;
  children?: ReactNode;
}

export default function SimpleModal({
  isOpen,
  onClose,
  title,
  content,
  children,
}: SimpleModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded hover:bg-gray-100"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <div className="text-gray-700 whitespace-pre-line">
          {children ? children : content}
        </div>
      </div>
    </div>
  );
}
