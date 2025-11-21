"use client";

import React from "react";
import { useTranslations } from "next-intl";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  labels?: {
    errorTitle: string;
    errorMessage: string;
    reload: string;
  };
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    const getLabel = (key: keyof NonNullable<ErrorBoundaryProps["labels"]>) => {
      if (this.props.labels && this.props.labels[key])
        return this.props.labels[key];
      // Fallback Spanish literals to avoid hooks in class component
      const fallbacks = {
        errorTitle: "Algo salió mal",
        errorMessage:
          "Ha ocurrido un error inesperado. Por favor, recarga la página.",
        reload: "Recargar página",
      } as const;
      return fallbacks[key];
    };
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              {getLabel("errorTitle")}
            </h3>
            <p className="text-red-600 text-sm">{getLabel("errorMessage")}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              {getLabel("reload")}
            </button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}

// Optional wrapper with next-intl support (no breaking changes)
export function IntlErrorBoundary({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const t = useTranslations("feedback");
  return (
    <ErrorBoundary
      fallback={fallback}
      labels={{
        errorTitle: t("errorBoundaryTitle"),
        errorMessage: t("errorBoundaryMessage"),
        reload: t("reload"),
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

interface LoadingCardProps {
  title?: string;
  height?: string;
}

export const LoadingCard: React.FC<LoadingCardProps> = ({
  title,
  height = "h-48",
}) => {
  const t = useTranslations("feedback");
  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${height}`}
    >
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          <div className="h-3 bg-gray-200 rounded w-4/6"></div>
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-4">{title || t("apiLoading")}</p>
    </div>
  );
};

interface ApiErrorProps {
  error: string;
  onRetry?: () => void;
}

export const ApiError: React.FC<ApiErrorProps> = ({ error, onRetry }) => {
  const t = useTranslations("feedback");
  return (
    <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
      <h3 className="text-lg font-semibold text-yellow-800 mb-2">
        {t("apiErrorTitle")}
      </h3>
      <p className="text-yellow-700 text-sm mb-3">
        {error || t("apiErrorMessage")}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
        >
          {t("retry")}
        </button>
      )}
    </div>
  );
};

interface NoDataProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const NoData: React.FC<NoDataProps> = ({
  title,
  description,
  actionLabel,
  onAction,
}) => {
  const t = useTranslations("feedback");
  return (
    <div className="p-8 text-center bg-gray-50 rounded-lg border border-gray-200">
      <div className="mx-auto w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-4">
        <span className="text-gray-400 text-xl">📊</span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title || t("apiEmpty")}
      </h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
