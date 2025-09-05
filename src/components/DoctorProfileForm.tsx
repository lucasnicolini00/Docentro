"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingButton from "./LoadingButton";
import Link from "next/link";

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
  const [isLoading, setIsLoading] = useState(false);
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
  };

  const removeExperience = (id: string) => {
    setExperiences((prev) => prev.filter((exp) => exp.id !== id));
  };

  const updateExperience = (id: string, field: string, value: string) => {
    setExperiences((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/doctor/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          specialities: selectedSpecialities,
          experiences: experiences.filter(
            (exp) => exp.institution && exp.title
          ),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Error al actualizar el perfil");
      }

      setSuccessMessage("Perfil actualizado exitosamente");
      setTimeout(() => {
        router.push("/dashboard/doctor");
      }, 2000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al actualizar el perfil"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {successMessage}
        </div>
      )}

      {/* Personal Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            Información Personal
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Apellido
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Professional Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            Información Profesional
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre Profesional
              </label>
              <input
                type="text"
                name="doctorName"
                value={formData.doctorName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Apellido Profesional
              </label>
              <input
                type="text"
                name="doctorSurname"
                value={formData.doctorSurname}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Profesional
              </label>
              <input
                type="email"
                name="doctorEmail"
                value={formData.doctorEmail}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono Profesional
              </label>
              <input
                type="tel"
                name="doctorPhone"
                value={formData.doctorPhone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Specialties */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            Especialidades
          </h2>
          <p className="text-sm text-gray-500">
            Selecciona tus especialidades médicas
          </p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allSpecialities.map((speciality) => (
              <label
                key={speciality.id}
                className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedSpecialities.includes(speciality.id)
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedSpecialities.includes(speciality.id)}
                  onChange={() => handleSpecialityToggle(speciality.id)}
                  className="sr-only"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">
                    {speciality.name}
                  </div>
                  {speciality.description && (
                    <div className="text-sm text-gray-500">
                      {speciality.description}
                    </div>
                  )}
                </div>
                {selectedSpecialities.includes(speciality.id) && (
                  <div className="text-blue-500">✓</div>
                )}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Experience */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Experiencia</h2>
            <p className="text-sm text-gray-500">
              Agrega tu experiencia profesional
            </p>
          </div>
          <LoadingButton
            type="button"
            onClick={addExperience}
            isLoading={isAddingExperience}
            loadingText="Agregando..."
            variant="primary"
            size="md"
          >
            + Agregar
          </LoadingButton>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {experiences.map((experience, index) => (
              <div
                key={experience.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-medium text-gray-900">
                    Experiencia {index + 1}
                  </h3>
                  <button
                    type="button"
                    onClick={() => removeExperience(experience.id)}
                    className="text-red-600 hover:text-red-700 transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Institución
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Título/Cargo
                    </label>
                    <input
                      type="text"
                      value={experience.title}
                      onChange={(e) =>
                        updateExperience(experience.id, "title", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha de inicio
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha de fin (opcional)
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descripción (opcional)
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            ))}
            {experiences.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No hay experiencias agregadas. Haz clic en &quot;Agregar&quot;
                para añadir una.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end space-x-4">
        <Link
          href="/dashboard/doctor"
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </Link>
        <LoadingButton
          type="submit"
          isLoading={isLoading}
          loadingText="Guardando..."
          variant="primary"
          size="lg"
        >
          Guardar Cambios
        </LoadingButton>
      </div>
    </form>
  );
}
