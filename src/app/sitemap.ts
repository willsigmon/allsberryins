import type { MetadataRoute } from "next";

import { agents, blogPosts } from "@/lib/site-data";
import { absoluteUrl, shouldIndexSite } from "@/lib/utils";

const siteUpdatedAt = new Date("2026-03-16");

export default function sitemap(): MetadataRoute.Sitemap {
  if (!shouldIndexSite) {
    return [];
  }

  const staticRoutes = ["", "/about", "/contact", "/quote", "/blog"] as const;

  return [
    ...staticRoutes.map((path) => ({
      url: absoluteUrl(path),
      lastModified: siteUpdatedAt,
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : 0.8,
    })),
    ...agents.map((agent) => ({
      url: absoluteUrl(`/agents/${agent.slug}`),
      lastModified: siteUpdatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...blogPosts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.64,
    })),
  ];
}
