import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
  const defaultRule = {
    allow: "/",
    disallow: ["/team-attribution"],
  };

  return {
    rules: [
      {
        userAgent: "*",
        ...defaultRule,
      },
      {
        userAgent: "OAI-SearchBot",
        ...defaultRule,
      },
      {
        userAgent: "bingbot",
        ...defaultRule,
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
