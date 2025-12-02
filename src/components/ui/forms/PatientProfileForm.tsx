"use client";

import { useState, useTransition, useEffect } from "react";
import LoadingButton from "../buttons/LoadingButton";
import Link from "next/link";
import { updatePatientProfile } from "@/lib/actions";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { useLocalePath } from "@/hooks";
import type { PatientWithUser } from "@/lib/types";

// Extended patient type for profile form
type Patient = PatientWithUser;

interface PatientProfileFormProps {
  patient: Patient;
}

export default function PatientProfileForm({
  patient,
}: PatientProfileFormProps) {
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("forms");
  const localePath = useLocalePath();

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
          toast.error(result.error || t("patientProfileErrorUpdate"));
          return;
        }

        toast.success(t("patientProfileSuccessUpdate"));
      } catch {
        toast.error(t("patientProfileErrorUpdate"));
      }
    });
  };

  return (
    <form action={handleSubmit}>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-8">
        {/* Personal Information */}
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {t("patientProfilePersonalInfoTitle")}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {t("patientProfilePersonalInfoDesc")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("patientProfileName")}
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
                {t("patientProfileSurname")}
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
                {t("patientProfileEmail")}
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
                {t("patientProfilePhone")}
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

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* Medical Information */}
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {t("patientProfileMedicalInfoTitle")}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {t("patientProfileMedicalInfoDesc")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("patientProfileBirthdate")}
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
                {t("patientProfileGender")}
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">{t("patientProfileGenderSelect")}</option>
                <option value="masculino">
                  {t("patientProfileGenderMale")}
                </option>
                <option value="femenino">
                  {t("patientProfileGenderFemale")}
                </option>
                <option value="otro">{t("patientProfileGenderOther")}</option>
                <option value="prefiero_no_decir">
                  {t("patientProfileGenderNoSay")}
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Link
            href={localePath("/dashboard/patient")}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {t("patientProfileCancel")}
          </Link>
          <LoadingButton
            type="submit"
            isLoading={isPending}
            loadingText={t("patientProfileSaving")}
            variant="success"
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl flex items-center space-x-2 font-medium shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <span>{t("patientProfileSave")}</span>
          </LoadingButton>
        </div>
      </div>
    </form>
  );
}
