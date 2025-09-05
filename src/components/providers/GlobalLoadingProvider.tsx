"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface GlobalLoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const GlobalLoadingContext = createContext<GlobalLoadingContextType>({
  isLoading: false,
  setIsLoading: () => {},
});

export const useGlobalLoading = () => useContext(GlobalLoadingContext);

interface GlobalLoadingProviderProps {
  children: ReactNode;
}

export default function GlobalLoadingProvider({
  children,
}: GlobalLoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <GlobalLoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {/* More visible loading bar */}
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-4 bg-blue-500 z-50 shadow-lg">
          <div className="text-white text-xs text-center">Loading...</div>
        </div>
      )}
      {children}
    </GlobalLoadingContext.Provider>
  );
}
