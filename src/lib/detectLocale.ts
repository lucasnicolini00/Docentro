export const SUPPORTED_LOCALES = ["es", "en"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

/**
 * Parse Accept-Language header to find supported locale
 */
function parseAcceptLanguage(header: string): SupportedLocale | null {
  const langs = header
    .split(",")
    .map((p) => p.split(";")[0].trim().toLowerCase())
    .filter(Boolean);

  for (const lang of langs) {
    if (lang === "es" || lang.startsWith("es-")) return "es";
    if (lang === "en" || lang.startsWith("en-")) return "en";
  }
  return null;
}

/**
 * Unified locale detection function
 * Works with cookie string and Accept-Language header
 */
export function detectLocale(
  cookie?: string | null,
  acceptHeader?: string | null
): SupportedLocale {
  // 1. Cookie override
  if (cookie && SUPPORTED_LOCALES.includes(cookie as SupportedLocale)) {
    return cookie as SupportedLocale;
  }

  // 2. Accept-Language negotiation
  if (acceptHeader) {
    const detected = parseAcceptLanguage(acceptHeader);
    if (detected) return detected;
  }

  // 3. Fallback
  return "es";
}

/**
 * Detect locale from Next.js Request object (used by middleware)
 */
export function detectPreferredLocaleFromRequest(
  req: Request
): SupportedLocale {
  const cookieHeader = req.headers.get("cookie") || "";
  const cookie = /(?:^|;\s*)NEXT_LOCALE=([^;]+)/i.exec(cookieHeader)?.[1];
  const accept = req.headers.get("accept-language");

  return detectLocale(cookie, accept);
}
