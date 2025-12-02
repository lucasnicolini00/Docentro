import { getRequestConfig } from "next-intl/server";
import { getMessages } from "./src/app/messages";
import { MESSAGE_NAMESPACES } from "./src/app/messages";
import { notFound } from "next/navigation";

const locales = ["es", "en"] as const;

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale as any)) notFound();

  const messages = await getMessages(locale, MESSAGE_NAMESPACES);
  return {
    locale,
    messages,
  };
});
