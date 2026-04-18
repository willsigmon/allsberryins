import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import { getSeoPagePath, seoPages } from "@/lib/seo-content";
import { agents, blogPosts, carrierPartners } from "@/lib/site-data";
import { absoluteUrl, slugify } from "@/lib/utils";

function localizedUrl(locale: string, path: string) {
  if (locale === routing.defaultLocale) {
    return absoluteUrl(path);
  }
  if (path === "" || path === "/") {
    return absoluteUrl(`/${locale}`);
  }
  return absoluteUrl(`/${locale}${path}`);
}

function buildAlternates(path: string) {
  return {
    languages: Object.fromEntries(
      routing.locales.map((locale) => [locale, localizedUrl(locale, path)]),
    ),
  } satisfies MetadataRoute.Sitemap[number]["alternates"];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUpdatedAt = "2026-04-18T00:00:00.000Z";
  const staticRoutes = ["", "/about", "/contact", "/quote", "/evidence-of-insurance", "/blog", "/resources", "/carriers", "/review"];

  const staticEntries = routing.locales.flatMap((locale) =>
    staticRoutes.map((path) => ({
      url: localizedUrl(locale, path),
      lastModified: new Date(siteUpdatedAt),
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : path === "/evidence-of-insurance" || path === "/quote" ? 0.9 : 0.8,
      alternates: buildAlternates(path),
    })),
  );

  const carrierEntries = routing.locales.flatMap((locale) =>
    carrierPartners.map((carrier) => ({
      url: localizedUrl(locale, `/carriers/${slugify(carrier.name)}`),
      lastModified: new Date(siteUpdatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.65,
      alternates: buildAlternates(`/carriers/${slugify(carrier.name)}`),
    })),
  );

  const agentEntries = routing.locales.flatMap((locale) =>
    agents.map((agent) => ({
      url: localizedUrl(locale, `/agents/${agent.slug}`),
      lastModified: new Date(siteUpdatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: buildAlternates(`/agents/${agent.slug}`),
    })),
  );

  const blogEntries = routing.locales.flatMap((locale) =>
    blogPosts.map((post) => ({
      url: localizedUrl(locale, `/blog/${post.slug}`),
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.64,
      alternates: buildAlternates(`/blog/${post.slug}`),
    })),
  );

  const seoEntries = routing.locales.flatMap((locale) =>
    seoPages.map((page) => ({
      url: localizedUrl(locale, getSeoPagePath(page.slug)),
      lastModified: new Date(page.lastReviewed),
      changeFrequency: page.pageType === "pillar" ? ("weekly" as const) : ("monthly" as const),
      priority: page.pageType === "location" ? 0.92 : page.pageType === "pillar" ? 0.88 : 0.84,
      alternates: buildAlternates(getSeoPagePath(page.slug)),
    })),
  );

  return [...staticEntries, ...carrierEntries, ...agentEntries, ...blogEntries, ...seoEntries];
}
