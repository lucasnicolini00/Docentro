"use client";

import { useState, useTransition } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import LoadingButton from "@/components/ui/buttons/LoadingButton";
import { useLocalePath } from "@/hooks";
import { registerAction } from "@/lib/actions/auth";

export default function RegisterPage() {
  const locale = useLocale();
  const t = useTranslations("register");
  const localePath = useLocalePath();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "patient",
    phone: "",
    acceptTerms: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError(t("passwordsMismatch"));
      return;
    }
    if (!formData.acceptTerms) {
      setError(t("acceptTermsRequired"));
      return;
    }

    startTransition(async () => {
      try {
        const fd = new FormData();
        fd.set("firstName", formData.firstName);
        fd.set("lastName", formData.lastName);
        fd.set("email", formData.email);
        fd.set("password", formData.password);
        fd.set("phone", formData.phone);
        fd.set("userType", formData.userType);

        const result = await registerAction(fd);
        if (!result.success) {
          setError(result.error || t("createAccountError"));
        }
        // On success, registerAction will redirect to /login?message=registered
      } catch {
        setError(t("createAccountRetry"));
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100">
            <Link
              href={localePath("/")}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent hover:from-blue-700 hover:to-blue-900 transition-all"
            >
              🩺
            </Link>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t("title")}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t("subtitle")}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Hidden locale field for server action redirect */}
          <input type="hidden" name="locale" value={locale} />
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("userType")}
              </label>
              <select
                name="userType"
                value={formData.userType}
                onChange={handleInputChange}
                className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
              >
                <option value="patient">{t("patient")}</option>
                <option value="doctor">{t("doctor")}</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t("firstName")}
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder={t("firstNamePlaceholder")}
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t("lastName")}
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder={t("lastNamePlaceholder")}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t("email")}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder={t("emailPlaceholder")}
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t("phone")}
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder={t("phonePlaceholder")}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t("password")}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t("confirmPassword")}
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>
            <div className="flex items-center">
              <input
                id="acceptTerms"
                name="acceptTerms"
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
              />
              <label
                htmlFor="acceptTerms"
                className="ml-2 block text-sm text-gray-700"
              >
                {t("termsPrefix")}{" "}
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  {t("termsLinkText")}
                </a>{" "}
                {t("andConnector")}{" "}
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  {t("privacyLinkText")}
                </a>
              </label>
            </div>
            <div>
              <LoadingButton
                type="submit"
                isLoading={isPending}
                loadingText={t("loadingText")}
                variant="primary"
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105"
              >
                {t("registerButton")}
              </LoadingButton>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">{t("loginLink")}</p>
            </div>
          </div>
        </form>
        <div className="text-center">
          <Link
            href={localePath("/")}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            {t("backHomeLink")}
          </Link>
        </div>
      </div>
    </div>
  );
}
