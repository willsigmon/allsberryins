import type { Agent } from "@/lib/site-data";
import { agents } from "@/lib/site-data";

export type SiteLeadsConfig = {
  labelId: string;
  scriptId: string;
  scriptSrc: string;
};

export type TeamTrackingContext = {
  agentSlug?: Agent["slug"];
  audience?: string;
  entryPoint?: string;
  href?: string;
  pageSlug?: string;
  pageType?: string;
  pathname?: string;
  product?: string;
};

export const defaultSiteLeadsConfig: SiteLeadsConfig = {
  labelId: "82456636",
  scriptId: "px-grabber",
  scriptSrc: "https://app.getstealthid.com/px.min.js",
};

export const siteLeadsSessionKey = "allsberry-siteleads-context";

const knownAgentSlugs = new Set(agents.map((agent) => agent.slug));

function sanitizeToken(value?: string | null) {
  if (!value) {
    return undefined;
  }

  const sanitized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return sanitized || undefined;
}

export function normalizeAgentSlug(value?: string | null) {
  const token = sanitizeToken(value);

  if (!token || !knownAgentSlugs.has(token as Agent["slug"])) {
    return undefined;
  }

  return token as Agent["slug"];
}

export function inferPageType(pathname: string) {
  if (pathname === "/") {
    return "home";
  }

  if (pathname.startsWith("/agents/")) {
    return "agent";
  }

  if (pathname.startsWith("/quote")) {
    return "quote";
  }

  if (pathname.startsWith("/evidence-of-insurance")) {
    return "evidence";
  }

  if (pathname.startsWith("/about")) {
    return "about";
  }

  if (pathname.startsWith("/contact")) {
    return "contact";
  }

  if (pathname.startsWith("/blog")) {
    return "blog";
  }

  return "site";
}

export function inferPageSlug(pathname: string) {
  if (pathname === "/") {
    return "home";
  }

  return sanitizeToken(pathname.replace(/^\/+/, "").replace(/\//g, "-"));
}

export function createTeamTrackingContext(
  pathname: string,
  searchString = "",
  href?: string,
): TeamTrackingContext {
  const searchParams = new URLSearchParams(searchString);
  const pathSegments = pathname.split("/").filter(Boolean);
  const pathAgentSlug = pathSegments[0] === "agents" ? normalizeAgentSlug(pathSegments[1]) : undefined;

  return {
    agentSlug: normalizeAgentSlug(searchParams.get("agent")) ?? pathAgentSlug,
    audience: sanitizeToken(searchParams.get("audience")),
    entryPoint: sanitizeToken(searchParams.get("entry")),
    href,
    pageSlug: inferPageSlug(pathname),
    pageType: inferPageType(pathname),
    pathname,
    product: sanitizeToken(searchParams.get("product")),
  };
}

export function mergeTeamTrackingContext(
  currentContext: TeamTrackingContext,
  storedContext?: TeamTrackingContext,
): TeamTrackingContext {
  return {
    agentSlug: currentContext.agentSlug ?? storedContext?.agentSlug,
    audience: currentContext.audience,
    entryPoint: currentContext.entryPoint ?? storedContext?.entryPoint,
    href: currentContext.href,
    pageSlug: currentContext.pageSlug,
    pageType: currentContext.pageType,
    pathname: currentContext.pathname,
    product: currentContext.product,
  };
}

export function buildSiteLeadsLabel(labelId: string, context: TeamTrackingContext) {
  const parts = [
    labelId,
    context.href,
    context.pageType ? `page=${context.pageType}` : undefined,
    context.pageSlug ? `slug=${context.pageSlug}` : undefined,
    context.agentSlug ? `agent=${context.agentSlug}` : undefined,
    context.entryPoint ? `entry=${context.entryPoint}` : undefined,
    context.product ? `product=${context.product}` : undefined,
    context.audience ? `audience=${context.audience}` : undefined,
    context.pathname ? `path=${context.pathname}` : undefined,
  ].filter(Boolean);

  return parts.join("|");
}

export function buildTrackedHref(
  pathname: string,
  params: Record<string, string | undefined>,
) {
  const url = new URL(pathname, "https://allsberryagency.com");

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value);
    }
  });

  return `${url.pathname}${url.search}${url.hash}`;
}

export function extractSiteLeadsConfig(rawEmbedCode: string) {
  const labelId =
    rawEmbedCode.match(/label\s*:\s*["']([^"'|]+)\|/i)?.[1]?.trim() ??
    defaultSiteLeadsConfig.labelId;
  const scriptSrc =
    rawEmbedCode.match(/src\s*=\s*["']([^"']+)["']/i)?.[1]?.trim() ??
    defaultSiteLeadsConfig.scriptSrc;
  const scriptId =
    rawEmbedCode.match(/\(\s*document\s*,\s*["']script["']\s*,\s*["']([^"']+)["']/i)?.[1]?.trim() ??
    defaultSiteLeadsConfig.scriptId;

  return {
    labelId,
    scriptId,
    scriptSrc,
  };
}
