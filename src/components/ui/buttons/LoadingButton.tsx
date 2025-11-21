"use client";
import { ButtonHTMLAttributes, ReactNode } from "react";
import LoadingSpinner from "../feedback/LoadingSpinner";
import { useTranslations } from "next-intl";

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: "sm" | "md" | "lg";
}

export default function LoadingButton({
  isLoading = false,
  loadingText,
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled,
  ...props
}: LoadingButtonProps) {
  const t = useTranslations("feedback");
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
  };

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <LoadingSpinner size={size === "lg" ? "md" : "sm"} className="mr-2" />
      )}
      {isLoading ? loadingText || t("apiLoading") : children}
    </button>
  );
}
