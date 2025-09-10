import { Navbar } from "@/components/ui/navigation";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-16 align-middle">
        <div className="text-center">
          {/* Medical-themed loading animation */}
          <div className="relative mb-8">
            <div className="h-16 w-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl animate-pulse">🩺</span>
            </div>
          </div>

          {/* Loading text */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">Cargando...</h2>
            <p className="text-gray-600">Por favor espera un momento</p>
          </div>

          {/* Additional loading indicators */}
          <div className="mt-8 space-y-3">
            <div className="flex space-x-2 justify-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
