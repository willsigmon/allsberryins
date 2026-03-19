import { heroProductSlugs, type ProductSlug } from "@/lib/site-data";

export const heroProductPreferenceStorageKey = "allsberry-hero-product-usage";
export const heroProductPreferenceCookieKey = "allsberry-hero-product-default";

const heroProductSlugSet = new Set<ProductSlug>(heroProductSlugs);

export function resolveHeroProductPreference(value?: string | null): ProductSlug | undefined {
  if (!value) {
    return undefined;
  }

  return heroProductSlugSet.has(value as ProductSlug) ? (value as ProductSlug) : undefined;
}

export function getMostUsedHeroProduct(
  usage: Partial<Record<ProductSlug, number>>,
): ProductSlug {
  return heroProductSlugs.reduce<ProductSlug>((currentBest, productSlug) => {
    const currentCount = usage[currentBest] ?? 0;
    const nextCount = usage[productSlug] ?? 0;

    return nextCount > currentCount ? productSlug : currentBest;
  }, heroProductSlugs[0] ?? "home");
}

export function buildHeroProductPreferenceCookie(productSlug: ProductSlug) {
  return `${heroProductPreferenceCookieKey}=${productSlug}; Path=/; Max-Age=31536000; SameSite=Lax`;
}
