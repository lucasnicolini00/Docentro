import LoadingSpinner from "./LoadingSpinner";

interface PageLoadingProps {
  message?: string;
  className?: string;
}

export default function PageLoading({
  message = "Cargando...",
  className = "",
}: PageLoadingProps) {
  return (
    <div
      className={`min-h-screen bg-gray-50 flex items-center justify-center ${className}`}
    >
      <div className="text-center">
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <p className="text-gray-600 text-lg">{message}</p>
      </div>
    </div>
  );
}
