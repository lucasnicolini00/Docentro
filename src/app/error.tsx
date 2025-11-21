"use client";

// Root-level (non-locale) error boundary. Keep translation-dependent UI out to avoid NextIntl context errors.
// We intentionally provide a minimal fallback and direct users to the default locale.
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-red-50 to-white">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-24 w-24 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-12 h-12 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Algo salió mal {/* Spanish default */}
          </h1>
          <p className="text-gray-600 text-sm">
            Se produjo un error inesperado. Estamos redirigiéndote a la versión
            localizada…
          </p>
        </div>
        {process.env.NODE_ENV === "development" && (
          <pre className="text-xs text-red-700 bg-red-50 border border-red-200 rounded p-3 overflow-x-auto text-left">
            {error.message}
            {error.digest && `\nError ID: ${error.digest}`}
          </pre>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="px-5 py-2 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700 transition-colors"
          >
            Reintentar
          </button>
          <button
            onClick={() => router.replace("/es")}
            className="px-5 py-2 rounded-lg bg-gray-200 text-gray-800 text-sm hover:bg-gray-300 transition-colors"
          >
            Ir al inicio (ES)
          </button>
        </div>
        <p className="text-xs text-gray-400">© 2025 Docentro</p>
      </div>
    </div>
  );
}
