import { getTranslations as nextGetTranslations, getLocale } from "next-intl/server";

/**
 * Helper to obtain a translation function for server components.
 * Usage:
 *   const t = await getT('namespace');
 *   t('key');
 *
 * Automatically detects locale from the request context.
 * You can optionally pass a locale to override.
 */
export async function getT(namespace: string, locale?: string) {
  if (locale) {
    return await nextGetTranslations({ locale, namespace });
  }
  // Automatically detect locale from request context
  const detectedLocale = await getLocale();
  return await nextGetTranslations({ locale: detectedLocale, namespace });
}

export type Translator = ReturnType<typeof nextGetTranslations>;

export default getT;
