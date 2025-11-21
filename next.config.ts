import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Use next-intl plugin with the request config defined in ./i18n.ts
const withNextIntl = createNextIntlPlugin("./i18n.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // Note: App Router does not support Next.js built-in i18n routing.
  // Internationalization is handled by next-intl via the plugin above.
};

export default withNextIntl(nextConfig);
