import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
  const defaultRule = {
    allow: "/",
    disallow: ["/team-attribution"],
  };

  const allowedAiCrawlers = [
    "OAI-SearchBot",
    "GPTBot",
    "ChatGPT-User",
    "anthropic-ai",
    "ClaudeBot",
    "Claude-Web",
    "PerplexityBot",
    "Google-Extended",
    "GoogleOther",
    "CCBot",
    "Applebot-Extended",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        ...defaultRule,
      },
      {
        userAgent: "bingbot",
        ...defaultRule,
      },
      ...allowedAiCrawlers.map((userAgent) => ({
        userAgent,
        ...defaultRule,
      })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
