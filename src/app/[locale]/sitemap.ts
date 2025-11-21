import type { MetadataRoute } from "next";
import prisma from "@/lib/prisma";

// Combine both locales in a single sitemap; include dynamic doctor pages
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://docentro.com";
  const locales = ["es", "en"] as const;
  const entries: MetadataRoute.Sitemap = [];

  // Static routes per locale
  for (const locale of locales) {
    const prefix = `${base}/${locale}`;
    entries.push(
      {
        url: `${prefix}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
      {
        url: `${prefix}/search`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      },
      {
        url: `${prefix}/login`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      },
      {
        url: `${prefix}/register`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      },
      {
        url: `${prefix}/unauthorized`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.2,
      }
    );
  }

  // Dynamic doctor public profiles (limit to reasonable count for sitemap)
  try {
    const doctors = await prisma.doctor.findMany({
      select: { id: true },
      take: 5000,
    });
    for (const doc of doctors) {
      for (const locale of locales) {
        entries.push({
          url: `${base}/${locale}/doctor/${doc.id}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.6,
        });
      }
    }
  } catch (e) {
    console.warn("Sitemap: failed to fetch doctors for dynamic URLs", e);
  }

  return entries;
}
