import { ButtonHTMLAttributes, ReactNode } from "react";

interface PulseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isProcessing?: boolean;
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: "sm" | "md" | "lg";
}

export default function PulseButton({
  isProcessing = false,
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled,
  ...props
}: PulseButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed";

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

  const pulseClasses = isProcessing
    ? "animate-pulse ring-4 ring-opacity-30"
    : "";
  const ringColor = {
    primary: "ring-blue-300",
    secondary: "ring-gray-300",
    danger: "ring-red-300",
    success: "ring-green-300",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${
        sizeClasses[size]
      } ${pulseClasses} ${isProcessing ? ringColor[variant] : ""} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
