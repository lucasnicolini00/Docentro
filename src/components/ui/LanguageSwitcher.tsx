"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Globe } from "lucide-react";
type Variant = "compact" | "full";

const locales = [
  { code: "es", label: "Español" },
  { code: "en", label: "English" },
];

interface Props {
  variant?: Variant;
}

export default function LanguageSwitcher({ variant = "compact" }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const t = useTranslations("common");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const setLocale = (code: string) => {
    const segments = pathname.split("/").filter(Boolean);

    // Replace the first segment if it's a locale
    if (["es", "en"].includes(segments[0])) {
      segments[0] = code;
    } else {
      segments.unshift(code);
    }

    const newPath = "/" + segments.join("/");

    const query = searchParams.toString();
    const target = query ? `${newPath}?${query}` : newPath;

    setOpen(false);
    router.push(target);
  };

  const current = locales.find((l) => l.code === currentLocale) ?? locales[0];

  if (variant === "full") {
    return (
      <div className="w-full" ref={ref}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("language")}
        </label>
        <div className="relative">
          <button
            type="button"
            className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-haspopup="listbox"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              {current.label}
            </span>
            <span className="text-xs text-gray-500">
              {current.code.toUpperCase()}
            </span>
          </button>
          {open && (
            <ul
              role="listbox"
              className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
            >
              {locales.map((l) => (
                <li
                  key={l.code}
                  role="option"
                  aria-selected={l.code === currentLocale}
                >
                  <button
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-blue-50 ${
                      l.code === currentLocale ? "bg-gray-50" : ""
                    }`}
                    onClick={() => setLocale(l.code)}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }

  // Compact button for header
  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-label={t("language")}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-blue-300 shadow-sm"
        onClick={() => setOpen((v) => !v)}
      >
        <Globe className="w-4 h-4" />
        <span className="hidden md:inline text-sm">
          {current.code.toUpperCase()}
        </span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          {locales.map((l) => (
            <button
              key={l.code}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-blue-50 ${
                l.code === currentLocale ? "bg-gray-50" : ""
              }`}
              onClick={() => setLocale(l.code)}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
