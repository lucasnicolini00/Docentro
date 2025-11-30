"use client";
import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import LoadingButton from "@/components/ui/buttons/LoadingButton";
import { useLocalePath } from "@/hooks";

export default function LoginPage() {
  const t = useTranslations("login");
  const locale = useLocale();
  const localePath = useLocalePath();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const message = searchParams.get("message");
    if (message === "registered") {
      toast.success(t("toastRegisteredSuccess"));
    }
  }, [searchParams, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email,
        password,
        rememberMe: rememberMe.toString(),
        redirect: false,
      });

      if (result?.error) {
        toast.error(t("toastInvalidCredentials"));
        setIsLoading(false);
      } else if (result?.ok) {
        toast.success(t("toastLoginSuccess") || "Login successful!");
        // Redirect based on user role - NextAuth session will be available
        // For now, redirect to home and let middleware handle role-based routing
        router.push(localePath("/"));
        router.refresh();
      }
    } catch {
      toast.error(t("toastSignInError"));
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-18 w-18 flex items-center justify-center rounded-full bg-blue-300">
            <Link
              href={localePath("/")}
              className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent cursor-pointer hover:from-blue-700 hover:to-blue-900 transition-all"
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
          <input type="hidden" name="locale" value={locale || "es"} />
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder={t("emailPlaceholder")}
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
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder={t("passwordPlaceholder")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  {t("rememberMe")}
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
                >
                  {t("forgotPassword")}
                </a>
              </div>
            </div>
            <div>
              <LoadingButton
                type="submit"
                isLoading={isLoading}
                loadingText={t("loadingText")}
                variant="primary"
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105"
              >
                {t("loginButton")}
              </LoadingButton>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">{t("registerLink")}</p>
            </div>
          </div>
        </form>
        <div className="text-center">
          <Link
            href={localePath("/")}
            className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            {t("backHomeLink")}
          </Link>
        </div>
      </div>
    </div>
  );
}
