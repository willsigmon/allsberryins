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

export type MarketingAttribution = {
  fbclid?: string;
  gclid?: string;
  landingPage?: string;
  msclkid?: string;
  referrer?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmMedium?: string;
  utmSource?: string;
  utmTerm?: string;
};

export const defaultSiteLeadsConfig: SiteLeadsConfig = {
  labelId: "82456636",
  scriptId: "px-grabber",
  scriptSrc: "https://app.getstealthid.com/px.min.js",
};

export const siteLeadsSessionKey = "allsberry-siteleads-context";
export const marketingAttributionSessionKey = "allsberry-marketing-attribution";

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

function sanitizeText(value?: string | null, maxLength = 160) {
  if (!value) {
    return undefined;
  }

  const sanitized = value.trim();

  if (!sanitized) {
    return undefined;
  }

  return sanitized.slice(0, maxLength);
}

function sanitizeUrl(value?: string | null) {
  return sanitizeText(value, 500);
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

export function createMarketingAttribution(
  pathname: string,
  searchString = "",
  href?: string,
  referrer?: string,
): MarketingAttribution {
  const searchParams = new URLSearchParams(searchString);

  return {
    fbclid: sanitizeText(searchParams.get("fbclid")),
    gclid: sanitizeText(searchParams.get("gclid")),
    landingPage: sanitizeUrl(href ?? pathname),
    msclkid: sanitizeText(searchParams.get("msclkid")),
    referrer: sanitizeUrl(referrer),
    utmCampaign: sanitizeText(searchParams.get("utm_campaign")),
    utmContent: sanitizeText(searchParams.get("utm_content")),
    utmMedium: sanitizeText(searchParams.get("utm_medium")),
    utmSource: sanitizeText(searchParams.get("utm_source")),
    utmTerm: sanitizeText(searchParams.get("utm_term")),
  };
}

export function mergeMarketingAttribution(
  currentAttribution: MarketingAttribution,
  storedAttribution?: MarketingAttribution,
): MarketingAttribution {
  return {
    fbclid: storedAttribution?.fbclid ?? currentAttribution.fbclid,
    gclid: storedAttribution?.gclid ?? currentAttribution.gclid,
    landingPage: storedAttribution?.landingPage ?? currentAttribution.landingPage,
    msclkid: storedAttribution?.msclkid ?? currentAttribution.msclkid,
    referrer: storedAttribution?.referrer ?? currentAttribution.referrer,
    utmCampaign: storedAttribution?.utmCampaign ?? currentAttribution.utmCampaign,
    utmContent: storedAttribution?.utmContent ?? currentAttribution.utmContent,
    utmMedium: storedAttribution?.utmMedium ?? currentAttribution.utmMedium,
    utmSource: storedAttribution?.utmSource ?? currentAttribution.utmSource,
    utmTerm: storedAttribution?.utmTerm ?? currentAttribution.utmTerm,
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

export function readSessionJsonValue<T>(sessionKey: string) {
  if (typeof window === "undefined") {
    return undefined;
  }

  try {
    const rawValue = window.sessionStorage.getItem(sessionKey);

    if (!rawValue) {
      return undefined;
    }

    return JSON.parse(rawValue) as T;
  } catch {
    return undefined;
  }
}

export function storeSessionJsonValue(sessionKey: string, value: unknown) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.sessionStorage.setItem(sessionKey, JSON.stringify(value));
  } catch {
    // Ignore storage errors in private mode or locked-down browsers.
  }
}

export function readStoredTeamTrackingContext() {
  return readSessionJsonValue<TeamTrackingContext>(siteLeadsSessionKey);
}

export function storeTeamTrackingContext(context: TeamTrackingContext) {
  storeSessionJsonValue(siteLeadsSessionKey, context);
}

export function readStoredMarketingAttribution() {
  return readSessionJsonValue<MarketingAttribution>(marketingAttributionSessionKey);
}

export function storeMarketingAttribution(attribution: MarketingAttribution) {
  storeSessionJsonValue(marketingAttributionSessionKey, attribution);
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
