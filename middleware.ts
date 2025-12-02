import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import {
  SUPPORTED_LOCALES,
  SupportedLocale,
  detectPreferredLocaleFromRequest,
} from "@/lib/detectLocale";

// Create next-intl middleware
const intlMiddleware = createMiddleware(routing);

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const url = req.nextUrl;
    const pathname = url.pathname;

    // Root path locale redirect ("/" -> "/{best-locale}")
    if (pathname === "/") {
      const best = detectPreferredLocaleFromRequest(req);
      return NextResponse.redirect(new URL(`/${best}`, req.url));
    }

    const segments = pathname.split("/").filter(Boolean);
    const maybeLocale = segments[0];
    const hasLocale =
      maybeLocale && SUPPORTED_LOCALES.includes(maybeLocale as SupportedLocale);

    // If no locale prefix, redirect to default locale
    if (!hasLocale && segments.length > 0) {
      const best = detectPreferredLocaleFromRequest(req);
      return NextResponse.redirect(new URL(`/${best}${pathname}`, req.url));
    }

    const rest = hasLocale ? "/" + segments.slice(1).join("/") : pathname;

    // Protect doctor routes
    if (rest.startsWith("/dashboard/doctor")) {
      if (token?.role !== "DOCTOR") {
        const locale = (
          hasLocale ? maybeLocale : detectPreferredLocaleFromRequest(req)
        ) as SupportedLocale;
        return NextResponse.redirect(
          new URL(`/${locale}/unauthorized`, req.url)
        );
      }
    }

    // Protect patient routes
    if (rest.startsWith("/dashboard/patient")) {
      if (token?.role !== "PATIENT") {
        const locale = (
          hasLocale ? maybeLocale : detectPreferredLocaleFromRequest(req)
        ) as SupportedLocale;
        return NextResponse.redirect(
          new URL(`/${locale}/unauthorized`, req.url)
        );
      }
    }

    // Apply next-intl middleware for locale handling
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to public routes
        const pathname = req.nextUrl.pathname;
        const segments = pathname.split("/").filter(Boolean);
        const maybeLocale = segments[0];
        const hasLocale =
          maybeLocale &&
          SUPPORTED_LOCALES.includes(maybeLocale as SupportedLocale);
        const rest = hasLocale ? "/" + segments.slice(1).join("/") : pathname;

        // Public routes that don't require authentication
        const publicRoutes = ["/login", "/register", "/search", "/doctor"];
        const isPublicRoute = publicRoutes.some((route) =>
          rest.startsWith(route)
        );

        if (isPublicRoute) {
          return true;
        }

        // Protected routes require token
        return !!token;
      },
    },
    pages: {
      signIn: "/login", // Will be prefixed with locale by middleware
    },
  }
);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
