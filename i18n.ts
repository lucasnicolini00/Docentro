import { getRequestConfig } from "next-intl/server";
import { getMessages } from "./src/app/messages";
import { MESSAGE_NAMESPACES } from "./src/app/messages";

export default getRequestConfig(async ({ locale }) => {
  const l = locale ?? "es";
  const messages = await getMessages(l, MESSAGE_NAMESPACES);
  return { locale: l, messages };
});
