import type { MetadataRoute } from "next";

import { getSeoPagePath, seoPages } from "@/lib/seo-content";
import { agents, blogPosts, carrierPartners } from "@/lib/site-data";
import { absoluteUrl, slugify } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUpdatedAt = "2026-04-16T00:00:00.000Z";
  const staticRoutes = ["", "/about", "/contact", "/quote", "/evidence-of-insurance", "/blog", "/resources", "/carriers"];

  return [
    ...staticRoutes.map((path) => ({
      url: absoluteUrl(path),
      lastModified: new Date(siteUpdatedAt),
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : path === "/evidence-of-insurance" || path === "/quote" ? 0.9 : 0.8,
    })),
    ...carrierPartners.map((carrier) => ({
      url: absoluteUrl(`/carriers/${slugify(carrier.name)}`),
      lastModified: new Date(siteUpdatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
    ...agents.map((agent) => ({
      url: absoluteUrl(`/agents/${agent.slug}`),
      lastModified: new Date(siteUpdatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...blogPosts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.64,
    })),
    ...seoPages.map((page) => ({
      url: absoluteUrl(getSeoPagePath(page.slug)),
      lastModified: new Date(page.lastReviewed),
      changeFrequency: page.pageType === "pillar" ? ("weekly" as const) : ("monthly" as const),
      priority: page.pageType === "location" ? 0.92 : page.pageType === "pillar" ? 0.88 : 0.84,
    })),
  ];
}
