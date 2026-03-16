import { clsx, type ClassValue } from "clsx";

const productionSiteUrl = "https://allsberryagency.com";

function sanitizeSiteUrl(value: string | undefined): string | null {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  try {
    return new URL(withScheme).toString();
  } catch {
    return null;
  }
}

function getSiteUrl() {
  const explicit = sanitizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL)
    ?? sanitizeSiteUrl(process.env.NEXT_PUBLIC_APP_URL)
    ?? sanitizeSiteUrl(process.env.NEXT_PUBLIC_BASE_URL)
    ?? sanitizeSiteUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL)
    ?? sanitizeSiteUrl(process.env.VERCEL_URL)
    ?? sanitizeSiteUrl(process.env.NEXT_PUBLIC_VERCEL_URL);

  if (explicit) {
    return explicit.replace(/\/$/, "");
  }

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  // Preview-safe default; avoids pretending the production custom domain is live locally.
  return "https://allsberryagency.vercel.app";
}

export const siteUrl = getSiteUrl();
export const siteHost = new URL(siteUrl).host;
export const shouldIndexSite = siteHost === new URL(productionSiteUrl).host;

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}
