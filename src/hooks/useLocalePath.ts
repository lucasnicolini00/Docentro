"use client";
import { useLocale } from "next-intl";

// Returns a function that prefixes a path with the current locale.
// Ensures a single leading slash and avoids double-prefixing.
export function useLocalePath() {
  const locale = useLocale();
  return (path: string) => {
    const clean = path.startsWith("/") ? path : `/${path}`;
    // If already prefixed, replace with current locale
    const segments = clean.split("/").filter(Boolean);
    if (segments.length && ["es", "en"].includes(segments[0])) {
      segments[0] = locale;
      return "/" + segments.join("/");
    }
    return `/${locale}${clean}`;
  };
}
