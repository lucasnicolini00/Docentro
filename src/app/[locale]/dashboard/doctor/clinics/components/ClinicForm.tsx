"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { X, Globe, Building2, Loader2 } from "lucide-react";
import { ClinicFormProps } from "./types";
import { LocationPicker } from "@/components/ui";
import toast from "react-hot-toast";

export default function ClinicForm({
  isOpen,
  onClose,
  clinic,
  onSubmit,
}: ClinicFormProps) {
  const t = useTranslations("dashboard_doctor");
  const [formData, setFormData] = useState({
    name: clinic?.name || "",
    address: clinic?.address || "",
    isVirtual: clinic?.isVirtual || false,
    country: clinic?.country || "",
    city: clinic?.city || "",
    neighborhood: clinic?.neighborhood || "",
    latitude: clinic?.latitude || null,
    longitude: clinic?.longitude || null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      toast.success(
        clinic?.id ? t("clinicUpdateSuccess") : t("clinicCreateSuccess")
      );
      onClose();
    } catch (error) {
      console.error("Error submitting clinic:", error);
      toast.error(t("clinicSaveError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name === "clinicName"
        ? "name"
        : name === "clinicCountry"
          ? "country"
          : name === "clinicCity"
            ? "city"
            : name === "clinicNeighborhood"
              ? "neighborhood"
              : name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleLocationSelect = (location: {
    lat: number;
    lng: number;
    address?: string;
    country?: string;
    city?: string;
    neighborhood?: string;
  }) => {
    setFormData((prev) => ({
      ...prev,
      latitude: location.lat,
      longitude: location.lng,
      // Update address and location fields from geocoding
      ...(location.address && { address: location.address }),
      ...(location.country && { country: location.country }),
      ...(location.city && { city: location.city }),
      ...(location.neighborhood && { neighborhood: location.neighborhood }),
    }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name === "clinicAddress" ? "address" : name]: value,
      // Clear coordinates and location fields when address is manually changed
      // The LocationPicker will geocode the new address and fill these automatically
      ...(name === "clinicAddress" && {
        latitude: null,
        longitude: null,
        country: "",
        city: "",
        neighborhood: "",
      }),
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-3">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {clinic?.id ? t("clinicFormEditTitle") : t("clinicFormNewTitle")}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6"
          autoComplete="off"
          data-form-type="clinic"
        >
          {/* Hidden inputs to confuse Chrome's address detection */}
          <input
            type="hidden"
            name="fake-password"
            autoComplete="new-password"
          />
          <input type="hidden" name="fake-username" autoComplete="username" />
          {/* Clinic Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {t("clinicTypeLabel")}
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, isVirtual: false }))
                }
                className={`p-4 border-2 rounded-lg transition-colors ${
                  !formData.isVirtual
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Building2 className="w-8 h-8 mx-auto mb-2" />
                <p className="font-medium">{t("clinicTypeInPersonLabel")}</p>
                <p className="text-sm text-gray-500">
                  {t("clinicTypeInPersonHint")}
                </p>
              </button>

              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, isVirtual: true }))
                }
                className={`p-4 border-2 rounded-lg transition-colors ${
                  formData.isVirtual
                    ? "border-purple-500 bg-purple-50 text-purple-700"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Globe className="w-8 h-8 mx-auto mb-2" />
                <p className="font-medium">{t("clinicTypeVirtualLabel")}</p>
                <p className="text-sm text-gray-500">
                  {t("clinicTypeVirtualHint")}
                </p>
              </button>
            </div>
          </div>

          {/* Clinic Name */}
          <div>
            <label
              htmlFor="clinic-name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t("clinicNameLabel")}
            </label>
            <input
              type="text"
              id="clinic-name"
              name="clinicName"
              value={formData.name}
              onChange={handleInputChange}
              autoComplete="new-password"
              data-lpignore="true"
              data-form-type="other"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={t("clinicNamePlaceholder")}
            />
          </div>
          {!formData.isVirtual && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                {t("clinicAutoCompleteHint")}
              </p>
            </div>
          )}

          {/* Address */}
          <div>
            <label
              htmlFor="clinic-address"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {formData.isVirtual
                ? t("clinicDescriptionLabel")
                : t("clinicAddressLabel")}{" "}
              *
            </label>
            <input
              type="text"
              id="clinic-address"
              name="clinicAddress"
              value={formData.address}
              onChange={handleAddressChange}
              autoComplete="new-password"
              data-lpignore="true"
              data-form-type="other"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={
                formData.isVirtual
                  ? t("clinicDescriptionPlaceholder")
                  : t("clinicAddressPlaceholder")
              }
            />
          </div>

          {/* Location Details (only for physical clinics) */}
          {!formData.isVirtual && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="clinic-country"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {t("countryLabel")}
                  </label>
                  <input
                    type="text"
                    id="clinic-country"
                    name="clinicCountry"
                    value={formData.country}
                    onChange={handleInputChange}
                    autoComplete="new-password"
                    data-lpignore="true"
                    data-form-type="other"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={t("countryPlaceholder")}
                  />
                </div>

                <div>
                  <label
                    htmlFor="clinic-city"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {t("cityLabel")}
                  </label>
                  <input
                    type="text"
                    id="clinic-city"
                    name="clinicCity"
                    value={formData.city}
                    onChange={handleInputChange}
                    autoComplete="new-password"
                    data-lpignore="true"
                    data-form-type="other"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={t("cityPlaceholder")}
                  />
                </div>

                <div>
                  <label
                    htmlFor="clinic-neighborhood"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {t("neighborhoodLabel")}
                  </label>
                  <input
                    type="text"
                    id="clinic-neighborhood"
                    name="clinicNeighborhood"
                    value={formData.neighborhood}
                    onChange={handleInputChange}
                    autoComplete="new-password"
                    data-lpignore="true"
                    data-form-type="other"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={t("neighborhoodPlaceholder")}
                  />
                </div>
              </div>
            </>
          )}

          {/* Location Picker - Only for physical clinics */}
          {!formData.isVirtual && (
            <div className="mt-6">
              <LocationPicker
                onLocationSelect={handleLocationSelect}
                initialLocation={
                  formData.latitude && formData.longitude
                    ? { lat: formData.latitude, lng: formData.longitude }
                    : undefined
                }
                address={formData.address}
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t("cancelAction")}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {isSubmitting
                ? clinic?.id
                  ? t("updatingClinicProcessing")
                  : t("creatingClinicProcessing")
                : clinic?.id
                  ? t("updateClinicAction")
                  : t("createClinicAction")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
