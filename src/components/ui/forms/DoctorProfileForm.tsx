"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingButton from "../buttons/LoadingButton";
import Link from "next/link";
import {
  updateDoctorProfile,
  uploadDoctorProfileImage,
  removeDoctorProfileImage,
  getImageUrl,
} from "@/lib/actions";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Stethoscope,
} from "lucide-react";
import toast from "react-hot-toast";

// Allowed file types and max size (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

// UploadForm component placed in module scope to avoid inline function definitions in JSX
function UploadForm({ onUploadSuccess }: { onUploadSuccess?: () => void }) {
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
      toast.error("Tipo de archivo no permitido");
      e.currentTarget.value = "";
      setSelectedName(null);
      setSelectedValid(false);
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("El archivo supera el tamaño máximo de 5MB");
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
      toast.error("Seleccione un archivo");
      return;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Tipo de archivo no permitido");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("El archivo supera el tamaño máximo de 5MB");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const res = await uploadDoctorProfileImage(formData);
      if (res?.success) {
        onUploadSuccess?.();
        router.refresh();
      } else {
        toast.error(res?.error || "Error subiendo imagen");
      }
    } catch (err) {
      toast.error("Error subiendo imagen");
      console.log(err);
    } finally {
      setUploading(false);
      // clear selection after attempt
      if (inputRef.current) inputRef.current.value = "";
      setSelectedName(null);
      setSelectedValid(false);
    }
  };

  return (
    <div className="flex items-center">
      {/* Hidden native file input; triggered by the custom select button */}
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
          Seleccionar imagen
        </button>

        {/* Show filename and Clear action when a file is selected */}
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
              Borrar
            </button>
          </div>
        )}

        {/* Only show the upload button when a valid file is selected */}
        {selectedValid && (
          <button
            type="button"
            onClick={handleUpload}
            disabled={uploading}
            className={`ml-3 px-3 py-2 rounded-md text-sm text-white ${
              uploading ? "bg-gray-400" : "bg-blue-600"
            }`}
          >
            {uploading ? "Subiendo..." : "Subir"}
          </button>
        )}
      </div>
    </div>
  );
}

interface Doctor {
  id: string;
  name: string;
  surname: string;
  email: string | null;
  phone: string | null;
  user: {
    firstName: string;
    lastName: string;
    email: string | null;
    phone: string | null;
  };
  specialities: Array<{
    specialityId: string;
    speciality: {
      id: string;
      name: string;
      description: string | null;
    };
  }>;
  experiences: Array<{
    id: string;
    title: string;
    institution: string | null;
    startDate: Date | null;
    endDate: Date | null;
    description: string | null;
  }>;
}

interface Speciality {
  id: string;
  name: string;
  description: string | null;
}

interface DoctorProfileFormProps {
  doctor: Doctor;
  allSpecialities: Speciality[];
}

export default function DoctorProfileForm({
  doctor,
  allSpecialities,
}: DoctorProfileFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    firstName: doctor.user.firstName,
    lastName: doctor.user.lastName,
    email: doctor.user.email || "",
    phone: doctor.user.phone || "",
    doctorName: doctor.name,
    doctorSurname: doctor.surname,
    doctorEmail: doctor.email || "",
    doctorPhone: doctor.phone || "",
  });

  // Preview URL for avatar (public URL or signed read URL)
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    (doctor as any).profileImage?.url || null
  );

  const profileImageId = (doctor as any).profileImage?.id as string | undefined;
  const profileImageUrl = (doctor as any).profileImage?.url as
    | string
    | undefined;

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      const imgRow = (doctor as any).profileImage;
      if (!imgRow?.id && !imgRow?.url) {
        if (mounted) setPreviewUrl(null);
        return;
      }

      if (imgRow?.id) {
        try {
          const res = await getImageUrl(imgRow.id as string);
          if (res?.success && mounted) {
            setPreviewUrl(res.data as string);
            return;
          }
        } catch (e) {
          console.log("getImageUrl error", e);
        }
      }

      if (imgRow?.url && mounted) setPreviewUrl(imgRow.url as string);
    };

    load();
    return () => {
      mounted = false;
    };
  }, [profileImageId, profileImageUrl, doctor]);

  const [selectedSpecialities, setSelectedSpecialities] = useState<string[]>(
    doctor.specialities.map((ds) => ds.specialityId)
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSpecialityToggle = (specialityId: string) => {
    setSelectedSpecialities((prev) => {
      if (prev.includes(specialityId)) {
        return prev.filter((id) => id !== specialityId);
      } else {
        return [...prev, specialityId];
      }
    });
  };

  const handleSubmit = async (formDataSubmit: FormData) => {
    setError("");

    // Add specialities and experiences to FormData
    formDataSubmit.append("specialities", selectedSpecialities.join(","));

    startTransition(async () => {
      try {
        const result = await updateDoctorProfile(formDataSubmit);

        if (!result.success) {
          setError(result.error || "Error al actualizar el perfil");
          toast.error("❌ Error al guardar el perfil");
          return;
        }

        toast.success("✅ Perfil actualizado exitosamente");
      } catch (err) {
        console.log(err);
        setError("Error al actualizar el perfil");
        toast.error("❌ Error al guardar el perfil");
      }
    });
  };

  return (
    <>
      {/* Enhanced Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
          <div className="p-2 bg-red-100 rounded-full">
            <AlertCircle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h3 className="font-medium text-red-800">Error</h3>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      )}
      {/* Profile image + upload controls */}
      <div className="flex items-center mb-6 border border-gray-200 rounded-xl p-4">
        {/* Avatar on the left */}
        <div className="flex-none">
          {previewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={previewUrl}
              alt="Foto de perfil"
              className="w-20 h-20 rounded-full object-cover border border-gray-200"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
              <User className="w-6 h-6 text-gray-400" />
            </div>
          )}
        </div>

        {/* Middle info block and controls on the right */}
        <div className="mx-6 flex-1">
          <div className="flex flex-col">
            <div className="text-gray-900 font-medium">
              {formData.doctorName} {formData.doctorSurname}
            </div>
            <div className="text-sm text-gray-500">Médico • Perfil público</div>
            <div className="text-xs text-gray-400 mt-1">
              Esta foto aparecerá en tu perfil público
            </div>
          </div>
        </div>

        {/* Controls on the right, take remaining space and right-align */}
        <div className="flex-1 flex items-center justify-end">
          <div className="flex items-center space-x-3">
            <UploadForm
              onUploadSuccess={() => {
                toast.success("Imagen subida");
                router.refresh();
              }}
            />

            {(doctor as any).profileImage?.url && (
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
                    setTimeout(() => router.refresh(), 800);
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

      <form action={handleSubmit} className="space-y-8">
        {/* Personal Information - Enhanced */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-100 to-indigo-100 px-8 py-6 border-b border-blue-200">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-600 rounded-xl">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-blue-900">
                  Información Personal
                </h2>
                <p className="text-blue-700 text-sm">
                  Datos personales de tu cuenta
                </p>
              </div>
            </div>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <User className="w-4 h-4 text-blue-600" />
                  <span>Nombre</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <User className="w-4 h-4 text-blue-600" />
                  <span>Apellido</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span>Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span>Teléfono</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Professional Information - Enhanced */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-100 to-teal-100 px-8 py-6 border-b border-emerald-200">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-emerald-600 rounded-xl">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-emerald-900">
                  Información Profesional
                </h2>
                <p className="text-emerald-700 text-sm">
                  Datos profesionales como médico
                </p>
              </div>
            </div>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <Stethoscope className="w-4 h-4 text-emerald-600" />
                  <span>Nombre Profesional</span>
                </label>
                <input
                  type="text"
                  name="doctorName"
                  value={formData.doctorName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <Stethoscope className="w-4 h-4 text-emerald-600" />
                  <span>Apellido Profesional</span>
                </label>
                <input
                  type="text"
                  name="doctorSurname"
                  value={formData.doctorSurname}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <Mail className="w-4 h-4 text-emerald-600" />
                  <span>Email Profesional</span>
                </label>
                <input
                  type="email"
                  name="doctorEmail"
                  value={formData.doctorEmail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-white"
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>Teléfono Profesional</span>
                </label>
                <input
                  type="tel"
                  name="doctorPhone"
                  value={formData.doctorPhone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Specialties - Enhanced */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 px-8 py-6 border-b border-purple-200">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-600 rounded-xl">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-purple-900">
                  Especialidades Médicas
                </h2>
                <p className="text-purple-700 text-sm">
                  Selecciona tus especialidades profesionales (
                  {selectedSpecialities.length} seleccionadas)
                </p>
              </div>
            </div>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allSpecialities.map((speciality) => (
                <label
                  key={speciality.id}
                  className={`group relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    selectedSpecialities.includes(speciality.id)
                      ? "border-purple-500 bg-purple-50 shadow-lg scale-105"
                      : "border-gray-200 hover:border-purple-300 hover:bg-purple-25 hover:shadow-md"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedSpecialities.includes(speciality.id)}
                    onChange={() => handleSpecialityToggle(speciality.id)}
                    className="sr-only"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg ${
                          selectedSpecialities.includes(speciality.id)
                            ? "bg-purple-100"
                            : "bg-gray-100 group-hover:bg-purple-100"
                        }`}
                      >
                        <Stethoscope
                          className={`w-4 h-4 ${
                            selectedSpecialities.includes(speciality.id)
                              ? "text-purple-600"
                              : "text-gray-400 group-hover:text-purple-600"
                          }`}
                        />
                      </div>
                      <div>
                        <div
                          className={`font-medium ${
                            selectedSpecialities.includes(speciality.id)
                              ? "text-purple-900"
                              : "text-gray-900"
                          }`}
                        >
                          {speciality.name}
                        </div>
                        {speciality.description && (
                          <div className="text-sm text-gray-500 mt-1">
                            {speciality.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {selectedSpecialities.includes(speciality.id) && (
                    <div className="absolute top-3 right-3">
                      <div className="p-1 bg-purple-600 rounded-full">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Submit Section */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-200 p-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Save className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  ¿Listo para guardar?
                </h3>
                <p className="text-sm text-gray-600">
                  Los cambios se aplicarán inmediatamente
                </p>
              </div>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/dashboard/doctor"
                className="group flex items-center space-x-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                <span>Cancelar</span>
              </Link>
              <LoadingButton
                type="submit"
                isLoading={isPending}
                loadingText="Guardando cambios..."
                variant="primary"
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl flex items-center space-x-2 font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Save className="w-5 h-5" />
                <span>Guardar Cambios</span>
              </LoadingButton>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
