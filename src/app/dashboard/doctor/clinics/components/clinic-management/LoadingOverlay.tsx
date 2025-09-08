import { LoadingSpinner } from "@/components/ui/feedback";

interface LoadingOverlayProps {
  isPending: boolean;
}

export default function LoadingOverlay({ isPending }: LoadingOverlayProps) {
  if (!isPending) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 flex items-center space-x-3">
        <LoadingSpinner size="md" />
        <span className="text-gray-700">Procesando...</span>
      </div>
    </div>
  );
}
