import { getTranslations as nextGetTranslations } from "next-intl/server";

/**
 * Helper to obtain a translation function for server components.
 * Usage:
 *   const t = await getT('namespace');
 *   t('key');
 *
 * This centralizes the import so server pages can use a shorter import path.
 */
export async function getT(namespace: string, locale?: string) {
  if (locale) {
    return await nextGetTranslations({ locale, namespace });
  }
  return await nextGetTranslations(namespace);
}

export type Translator = ReturnType<typeof nextGetTranslations>;

export default getT;
