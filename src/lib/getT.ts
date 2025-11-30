import { getTranslations as nextGetTranslations, getLocale } from "next-intl/server";


export async function getT(namespace: string) {
  const detectedLocale = await getLocale();
  return await nextGetTranslations({ locale: detectedLocale, namespace });
}
