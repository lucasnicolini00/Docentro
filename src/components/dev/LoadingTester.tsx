"use client";

import { useGlobalLoading } from "../providers/GlobalLoadingProvider";

export default function LoadingTester() {
  const { isLoading, setIsLoading } = useGlobalLoading();

  const handleTest = () => {
    console.log("Setting loading to true");
    setIsLoading(true);
    setTimeout(() => {
      console.log("Setting loading to false");
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={handleTest}
        className="bg-red-500 text-white px-4 py-2 rounded shadow-lg"
      >
        Test Loading ({isLoading ? "ON" : "OFF"})
      </button>
    </div>
  );
}
