"use client";

import { useEffect, useState } from "react";
import ImageUploadControls from "./ImageUploadControls";
import { getImageUrl, removeDoctorProfileImage } from "@/lib/actions";
import toast from "react-hot-toast";
import { User } from "lucide-react";
import { useTranslations } from "next-intl";
import LoadingSpinner from "@/components/ui/feedback/LoadingSpinner";

export default function AvatarSection({
  doctor,
  name,
}: {
  doctor: any;
  name: string;
}) {
  const t = useTranslations("forms");
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
    <div className="flex items-center mb-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-100">
      <div className="flex-none relative w-20 h-20">
        {/* Placeholder icon shown underneath while image loads */}
        {!previewUrl && (
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center border-2 border-blue-200 shadow-sm">
            <User className="w-6 h-6 text-blue-400" />
          </div>
        )}

        {previewUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewUrl}
            alt={t("avatarSectionTitle")}
            onLoad={() => setImgLoaded(true)}
            className={`absolute inset-0 m-0  rounded-full object-cover border-2 border-blue-200 w-20 h-20 transition-opacity duration-200 shadow-md ${
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
          <div className="text-gray-900 font-semibold text-lg">{name}</div>
          <div className="text-sm text-blue-700 font-medium mt-1">
            {t("avatarSectionSubtitle")}
          </div>
          <div className="text-xs text-blue-600 mt-1 flex items-center">
            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            {t("avatarSectionTitle")}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-end">
        <div className="flex items-center space-x-3">
          <ImageUploadControls
            onUploadStart={() => setLoading(true)}
            onUploadEnd={() => setLoading(false)}
            onUploadSuccess={() => {
              toast.success(t("avatarSectionUpload"));
            }}
          />

          {doctor?.profileImage?.url && (
            <button
              type="button"
              onClick={async () => {
                try {
                  toast.dismiss();
                  toast.promise(removeDoctorProfileImage(), {
                    loading: t("avatarSectionLoading"),
                    success: t("avatarSectionRemove"),
                    error: t("avatarSectionError"),
                  });
                } catch {
                  toast.error(t("avatarSectionError"));
                }
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              {t("avatarSectionRemove")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
