import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import { detectLocale } from "@/lib/detectLocale";

export default async function RootRedirect() {
  // Middleware performs redirects in most hosts, but on some preview/static
  // setups middleware is skipped — keep a small server-side fallback here.
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("NEXT_LOCALE")?.value ?? null;
  const hdrs = await headers();
  const accept = hdrs.get("accept-language") ?? null;
  const best = detectLocale(localeCookie, accept);
  redirect(`/${best}`);
}
