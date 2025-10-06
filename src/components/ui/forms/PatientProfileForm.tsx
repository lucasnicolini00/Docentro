"use client";

import { useState, useTransition, useEffect } from "react";
import LoadingButton from "../buttons/LoadingButton";
import Link from "next/link";
import { updatePatientProfile } from "@/lib/actions";
import toast from "react-hot-toast";

interface Patient {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string | null;
  birthdate: Date | null;
  gender: string | null;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
  };
}

interface PatientProfileFormProps {
  patient: Patient;
}

export default function PatientProfileForm({
  patient,
}: PatientProfileFormProps) {
  const [isPending, startTransition] = useTransition();

  // Form state for controlled inputs
  const [formData, setFormData] = useState({
    firstName: patient.user.firstName,
    lastName: patient.user.lastName,
    email: patient.user.email,
    phone: patient.user.phone || "",
    birthdate: patient.birthdate
      ? patient.birthdate.toISOString().split("T")[0]
      : "",
    gender: patient.gender || "",
  });

  // Sync state with props when patient data changes (e.g., after revalidatePath)
  useEffect(() => {
    setFormData({
      firstName: patient.user.firstName,
      lastName: patient.user.lastName,
      email: patient.user.email,
      phone: patient.user.phone || "",
      birthdate: patient.birthdate
        ? patient.birthdate.toISOString().split("T")[0]
        : "",
      gender: patient.gender || "",
    });
  }, [patient]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (formDataSubmit: FormData) => {
    // Add patient-specific fields to FormData (using same values as user fields for basic info)
    formDataSubmit.append("patientName", formData.firstName);
    formDataSubmit.append("patientSurname", formData.lastName);
    formDataSubmit.append("patientEmail", formData.email);
    formDataSubmit.append("patientPhone", formData.phone);

    startTransition(async () => {
      try {
        const result = await updatePatientProfile(formDataSubmit);

        if (!result.success) {
          toast.error(result.error || "Error al actualizar el perfil");
          return;
        }

        toast.success("Perfil actualizado exitosamente");
      } catch {
        toast.error("Error al actualizar el perfil");
      }
    });
  };

  return (
    <form action={handleSubmit} className="space-y-8">
      {/* Personal Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            Información Personal
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Información básica de contacto
          </p>
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
                placeholder="+591 70123456"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Medical Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            Información Médica
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Información adicional para mejorar la atención médica
          </p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Género
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Seleccionar género</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Otro</option>
                <option value="prefiero_no_decir">Prefiero no decir</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end space-x-4">
        <Link
          href="/dashboard/patient"
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </Link>
        <LoadingButton
          type="submit"
          isLoading={isPending}
          loadingText="Guardando..."
          variant="success"
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl flex items-center space-x-2 font-medium shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <span>Guardar Cambios</span>
        </LoadingButton>
      </div>
    </form>
  );
}
