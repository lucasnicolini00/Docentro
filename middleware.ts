import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;

    // Protect doctor routes
    if (req.nextUrl.pathname.startsWith("/dashboard/doctor")) {
      if (token?.role !== "DOCTOR") {
        return Response.redirect(new URL("/unauthorized", req.url));
      }
    }

    // Protect patient routes
    if (req.nextUrl.pathname.startsWith("/dashboard/patient")) {
      if (token?.role !== "PATIENT") {
        return Response.redirect(new URL("/unauthorized", req.url));
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/api/protected/:path*"],
};
