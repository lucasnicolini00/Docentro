import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
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
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Algo salió mal
            </h3>
            <p className="text-red-600 text-sm">
              Ha ocurrido un error inesperado. Por favor, recarga la página.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Recargar página
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

interface LoadingCardProps {
  title?: string;
  height?: string;
}

export const LoadingCard: React.FC<LoadingCardProps> = ({
  title = "Cargando...",
  height = "h-48",
}) => (
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
    <p className="text-sm text-gray-500 mt-4">{title}</p>
  </div>
);

interface ApiErrorProps {
  error: string;
  onRetry?: () => void;
}

export const ApiError: React.FC<ApiErrorProps> = ({ error, onRetry }) => (
  <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
    <h3 className="text-lg font-semibold text-yellow-800 mb-2">
      Error al cargar datos
    </h3>
    <p className="text-yellow-700 text-sm mb-3">{error}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
      >
        Reintentar
      </button>
    )}
  </div>
);

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
}) => (
  <div className="p-8 text-center bg-gray-50 rounded-lg border border-gray-200">
    <div className="mx-auto w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-4">
      <span className="text-gray-400 text-xl">📊</span>
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
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
