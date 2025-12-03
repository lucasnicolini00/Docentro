import { getRequestConfig } from "next-intl/server";
import { getMessages } from "./src/app/messages";
import { MESSAGE_NAMESPACES } from "./src/app/messages";
import { routing } from "./src/i18n/routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // Wait for the locale from the request (set by middleware or setRequestLocale)
  let locale = await requestLocale;

  // Ensure it's a valid locale, otherwise use default
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  const messages = await getMessages(locale, MESSAGE_NAMESPACES);
  return {
    locale,
    messages,
  };
});
