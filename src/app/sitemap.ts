import type { MetadataRoute } from "next";

import { agents, blogPosts } from "@/lib/site-data";
import { absoluteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/contact", "/quote", "/blog"];

  return [
    ...staticRoutes.map((path) => ({
      url: absoluteUrl(path),
      lastModified: new Date(),
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : 0.8,
    })),
    ...agents.map((agent) => ({
      url: absoluteUrl(`/agents/${agent.slug}`),
      lastModified: new Date(),
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
