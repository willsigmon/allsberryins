import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
  const defaultRule = {
    allow: "/",
    disallow: ["/team-attribution", "/api"],
  };

  // Crawlers we explicitly do not want training on or scraping the site.
  // ByteDance/TikTok's Bytespider is widely blocked across the web.
  const disallowedCrawlers = ["Bytespider"];

  // AI search + retrieval crawlers we want answering questions about the agency.
  // Each is the documented identifier from the respective provider (separate
  // from their general training crawlers where applicable).
  const allowedAiCrawlers = [
    // OpenAI
    "OAI-SearchBot",
    "GPTBot",
    "ChatGPT-User",
    // Anthropic
    "anthropic-ai",
    "ClaudeBot",
    "Claude-Web",
    "Claude-User",
    "Claude-SearchBot",
    // Perplexity
    "PerplexityBot",
    "Perplexity-User",
    // Google (AI-specific, separate from Googlebot)
    "Google-Extended",
    "GoogleOther",
    "Google-CloudVertexBot",
    // Apple
    "Applebot-Extended",
    // Meta
    "Meta-ExternalAgent",
    "Meta-ExternalFetcher",
    "FacebookBot",
    // Amazon
    "Amazonbot",
    // Common Crawl (feeds many open AI datasets)
    "CCBot",
    // Mistral
    "MistralAI-User",
    // Cohere
    "cohere-ai",
    "cohere-training-data-crawler",
    // You.com
    "YouBot",
    // DuckDuckGo AI
    "DuckAssistBot",
    // Diffbot (feeds many AI retrieval systems)
    "Diffbot",
    // AI2
    "AI2Bot",
    // Hugging Face
    "Timpibot",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        ...defaultRule,
      },
      {
        userAgent: "Googlebot",
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
      ...disallowedCrawlers.map((userAgent) => ({
        userAgent,
        disallow: "/",
      })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
