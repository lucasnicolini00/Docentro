import { getTranslations } from "next-intl/server";

export async function getT(namespace: string) {
  // Pass namespace as string parameter, not object
  // This allows getTranslations to use the locale from request context set by setRequestLocale()
  return await getTranslations(namespace);
}
