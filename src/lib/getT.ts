import { getTranslations, getLocale } from "next-intl/server";

export async function getT(namespace: string) {
  const locale = await getLocale();
  return await getTranslations({ namespace, locale });
}
