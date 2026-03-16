import type { MetadataRoute } from "next";

import { shouldIndexSite, siteUrl } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteUrl;

  return {
    rules: shouldIndexSite
      ? {
          userAgent: "*",
          allow: "/",
        }
      : {
          userAgent: "*",
          disallow: "/",
        },
    sitemap: shouldIndexSite ? `${baseUrl}/sitemap.xml` : undefined,
    host: shouldIndexSite ? baseUrl : undefined,
  };
}
