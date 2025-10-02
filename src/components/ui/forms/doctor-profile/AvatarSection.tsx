"use client";

import { useEffect, useState } from "react";
import ImageUploadControls from "./ImageUploadControls";
import { getImageUrl, removeDoctorProfileImage } from "@/lib/actions";
import toast from "react-hot-toast";
import { User } from "lucide-react";
import LoadingSpinner from "@/components/ui/feedback/LoadingSpinner";

export default function AvatarSection({
  doctor,
  name,
}: {
  doctor: any;
  name: string;
}) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    doctor?.profileImage?.url || null
  );
  const [loading, setLoading] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      const imgRow = doctor?.profileImage;
      if (!imgRow?.id && !imgRow?.url) {
        if (mounted) setPreviewUrl(null);
        return;
      }

      if (imgRow?.id) {
        const res = await getImageUrl(imgRow.id as string);
        if (res?.success && mounted) {
          setPreviewUrl(res.data as string);
          return;
        }
      }

      if (imgRow?.url && mounted) setPreviewUrl(imgRow.url as string);
    };
    // reset imgLoaded when previewUrl will change
    if (mounted) setImgLoaded(false);

    load();
    return () => {
      mounted = false;
    };
  }, [doctor]);

  return (
    <div className="flex items-center mb-6">
      <div className="flex-none relative w-20 h-20">
        {/* Placeholder icon shown underneath while image loads */}
        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center border border-gray-200">
          <User className="w-6 h-6 text-gray-400" />
        </div>

        {previewUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewUrl}
            alt="Foto de perfil"
            onLoad={() => setImgLoaded(true)}
            className={`absolute inset-0 m-0  rounded-full object-cover border border-gray-200 w-20 h-20 transition-opacity duration-200 ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-full">
            <LoadingSpinner size="md" />
          </div>
        )}
      </div>

      <div className="mx-6 flex-1">
        <div className="flex flex-col">
          <div className="text-gray-900 font-medium">{name}</div>
          <div className="text-sm text-gray-500">Médico • Perfil público</div>
          <div className="text-xs text-gray-400 mt-1">
            Esta foto aparecerá en tu perfil público
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-end">
        <div className="flex items-center space-x-3">
          <ImageUploadControls
            onUploadStart={() => setLoading(true)}
            onUploadEnd={() => setLoading(false)}
            onUploadSuccess={() => {
              toast.success("Imagen subida");
            }}
          />

          {doctor?.profileImage?.url && (
            <button
              type="button"
              onClick={async () => {
                try {
                  toast.dismiss();
                  toast.promise(removeDoctorProfileImage(), {
                    loading: "Eliminando...",
                    success: "Imagen eliminada",
                    error: "Error eliminando imagen",
                  });
                } catch {
                  toast.error("Error eliminando imagen");
                }
              }}
              className="bg-red-600 text-white px-3 py-2 rounded-md text-sm"
            >
              Eliminar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
