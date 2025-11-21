export const SUPPORTED_LOCALES = ["es", "en"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

// Detect from a standard Request (used by middleware)
export function detectPreferredLocaleFromRequest(
  req: Request
): SupportedLocale {
  // 1. Cookie override
  try {
    const cookieHeader = req.headers.get("cookie") || "";
    const localeCookie = /(?:^|;\s*)NEXT_LOCALE=([^;]+)/i.exec(
      cookieHeader
    )?.[1];
    if (localeCookie && SUPPORTED_LOCALES.includes(localeCookie as any)) {
      return localeCookie as SupportedLocale;
    }
  } catch {}

  // 2. Accept-Language negotiation
  const accept = req.headers.get("accept-language");
  if (accept) {
    const parsed = accept
      .split(",")
      .map((p) => p.split(";")[0].trim().toLowerCase())
      .filter(Boolean);
    const found = parsed.find((lang) => {
      if (lang === "es" || lang.startsWith("es-")) return true;
      if (lang === "en" || lang.startsWith("en-")) return true;
      return false;
    });
    if (found) {
      if (found.startsWith("es")) return "es";
      if (found.startsWith("en")) return "en";
    }
  }

  // 3. Fallback
  return "es";
}

// Detect from cookie value + Accept-Language string (used by server components)
export function detectPreferredLocaleFromStrings(
  localeCookieValue?: string | null,
  acceptHeader?: string | null
): SupportedLocale {
  if (
    localeCookieValue &&
    SUPPORTED_LOCALES.includes(localeCookieValue as any)
  ) {
    return localeCookieValue as SupportedLocale;
  }

  const accept = acceptHeader;
  if (accept) {
    const parsed = accept
      .split(",")
      .map((p) => p.split(";")[0].trim().toLowerCase())
      .filter(Boolean);
    const found = parsed.find((lang) => {
      if (lang === "es" || lang.startsWith("es-")) return true;
      if (lang === "en" || lang.startsWith("en-")) return true;
      return false;
    });
    if (found) {
      if (found.startsWith("es")) return "es";
      if (found.startsWith("en")) return "en";
    }
  }

  return "es";
}
