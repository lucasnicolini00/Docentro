"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import LoadingButton from "../buttons/LoadingButton";
import Link from "next/link";
import { updateDoctorProfile } from "@/lib/actions";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  Calendar,
  Building,
  FileText,
  Plus,
  Trash2,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Stethoscope,
} from "lucide-react";
import toast from "react-hot-toast";

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
  const [isAddingExperience, setIsAddingExperience] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

  const [selectedSpecialities, setSelectedSpecialities] = useState<string[]>(
    doctor.specialities.map((ds) => ds.specialityId)
  );

  const [experiences, setExperiences] = useState(
    doctor.experiences.map((exp) => ({
      id: exp.id,
      title: exp.title,
      institution: exp.institution || "",
      startDate: exp.startDate ? exp.startDate.toISOString().split("T")[0] : "",
      endDate: exp.endDate ? exp.endDate.toISOString().split("T")[0] : "",
      description: exp.description || "",
      isNew: false,
    }))
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

  const addExperience = async () => {
    setIsAddingExperience(true);
    // Simulate a small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 300));

    setExperiences((prev) => [
      ...prev,
      {
        id: `new-${Date.now()}`,
        title: "",
        institution: "",
        startDate: "",
        endDate: "",
        description: "",
        isNew: true,
      },
    ]);
    setIsAddingExperience(false);
    toast.success("📝 Nueva experiencia agregada");
  };

  const removeExperience = (id: string) => {
    setExperiences((prev) => prev.filter((exp) => exp.id !== id));
    toast.success("🗑️ Experiencia eliminada");
  };

  const updateExperience = (id: string, field: string, value: string) => {
    setExperiences((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };

  const handleSubmit = async (formDataSubmit: FormData) => {
    setError("");
    setSuccessMessage("");

    // Add specialities and experiences to FormData
    formDataSubmit.append("specialities", selectedSpecialities.join(","));
    formDataSubmit.append(
      "experiences",
      JSON.stringify(experiences.filter((exp) => exp.institution && exp.title))
    );

    startTransition(async () => {
      try {
        const result = await updateDoctorProfile(formDataSubmit);

        if (!result.success) {
          setError(result.error || "Error al actualizar el perfil");
          toast.error("❌ Error al guardar el perfil");
          return;
        }

        setSuccessMessage("Perfil actualizado exitosamente");
        toast.success("✅ Perfil actualizado exitosamente");
        setTimeout(() => {
          router.push("/dashboard/doctor");
        }, 2000);
      } catch {
        setError("Error al actualizar el perfil");
        toast.error("❌ Error al actualizar el perfil");
      }
    });
  };

  return (
    <div className="space-y-8">
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

      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center space-x-3">
          <div className="p-2 bg-green-100 rounded-full">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-medium text-green-800">Éxito</h3>
            <p className="text-green-700 text-sm">{successMessage}</p>
          </div>
        </div>
      )}

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

        {/* Experience - Enhanced */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-100 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-100 to-amber-100 px-8 py-6 border-b border-orange-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-orange-600 rounded-xl">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-orange-900">
                    Experiencia Profesional
                  </h2>
                  <p className="text-orange-700 text-sm">
                    Agrega tu historial profesional ({experiences.length}{" "}
                    experiencias)
                  </p>
                </div>
              </div>
              <LoadingButton
                type="button"
                onClick={addExperience}
                isLoading={isAddingExperience}
                loadingText="Agregando..."
                variant="primary"
                size="md"
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl flex items-center space-x-2 font-medium transition-all duration-200"
              >
                <Plus className="w-5 h-5" />
                <span>Agregar Experiencia</span>
              </LoadingButton>
            </div>
          </div>
          <div className="p-8">
            <div className="space-y-6">
              {experiences.map((experience, index) => (
                <div
                  key={experience.id}
                  className="bg-white border-2 border-orange-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Building className="w-5 h-5 text-orange-600" />
                      </div>
                      <h3 className="text-lg font-bold text-orange-900">
                        Experiencia {index + 1}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeExperience(experience.id)}
                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 flex items-center space-x-2"
                    >
                      <Trash2 className="w-5 h-5" />
                      <span className="text-sm font-medium">Eliminar</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                        <Building className="w-4 h-4 text-orange-600" />
                        <span>Institución</span>
                      </label>
                      <input
                        type="text"
                        value={experience.institution}
                        onChange={(e) =>
                          updateExperience(
                            experience.id,
                            "institution",
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                        placeholder="Hospital, Clínica, Centro Médico..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                        <Briefcase className="w-4 h-4 text-orange-600" />
                        <span>Título/Cargo</span>
                      </label>
                      <input
                        type="text"
                        value={experience.title}
                        onChange={(e) =>
                          updateExperience(
                            experience.id,
                            "title",
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                        placeholder="Médico General, Especialista..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                        <Calendar className="w-4 h-4 text-orange-600" />
                        <span>Fecha de inicio</span>
                      </label>
                      <input
                        type="date"
                        value={experience.startDate}
                        onChange={(e) =>
                          updateExperience(
                            experience.id,
                            "startDate",
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                        <Calendar className="w-4 h-4 text-orange-600" />
                        <span>Fecha de fin (opcional)</span>
                      </label>
                      <input
                        type="date"
                        value={experience.endDate}
                        onChange={(e) =>
                          updateExperience(
                            experience.id,
                            "endDate",
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                        <FileText className="w-4 h-4 text-orange-600" />
                        <span>Descripción (opcional)</span>
                      </label>
                      <textarea
                        value={experience.description}
                        onChange={(e) =>
                          updateExperience(
                            experience.id,
                            "description",
                            e.target.value
                          )
                        }
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                        placeholder="Describe tus responsabilidades y logros..."
                      />
                    </div>
                  </div>
                </div>
              ))}
              {experiences.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-orange-200">
                  <div className="p-4 bg-orange-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Briefcase className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No hay experiencias agregadas
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Agrega tu primera experiencia profesional para mejorar tu
                    perfil
                  </p>
                  <button
                    type="button"
                    onClick={addExperience}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl flex items-center space-x-2 font-medium transition-all duration-200 mx-auto"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Agregar Primera Experiencia</span>
                  </button>
                </div>
              )}
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
    </div>
  );
}
