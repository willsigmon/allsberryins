import { routing, type AppLocale } from "@/i18n/routing";

export function isAppLocale(value: string): value is AppLocale {
  return (routing.locales as readonly string[]).includes(value);
}

/**
 * next/navigation pathnames include the locale prefix on `/es/...`
 * (and sometimes `/en/...`). Tracking and quote helpers should see
 * the unprefixed route so Spanish pages keep the same page type and
 * agent slug as English.
 */
export function stripLocalePrefix(pathname: string): string {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (normalized === "/") {
    return "/";
  }

  const segments = normalized.split("/").filter(Boolean);
  const first = segments[0];

  if (!first || !isAppLocale(first)) {
    return normalized.replace(/\/+$/, "") || "/";
  }

  const rest = segments.slice(1);
  return rest.length === 0 ? "/" : `/${rest.join("/")}`;
}
