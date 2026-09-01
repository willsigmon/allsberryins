import { describe, expect, it } from "vitest";

import {
  buildHeroProductPreferenceCookie,
  getMostUsedHeroProduct,
  heroProductPreferenceCookieKey,
  resolveHeroProductPreference,
} from "@/lib/hero-product-preferences";

describe("hero product preferences", () => {
  it("accepts only hero products", () => {
    expect(resolveHeroProductPreference("home")).toBe("home");
    expect(resolveHeroProductPreference("workers-comp")).toBeUndefined();
    expect(resolveHeroProductPreference("")).toBeUndefined();
  });

  it("returns the most used hero product and keeps the first on ties", () => {
    expect(getMostUsedHeroProduct({ auto: 3, home: 1 })).toBe("auto");
    expect(getMostUsedHeroProduct({})).toBe("home");
  });

  it("builds a path-scoped preference cookie", () => {
    expect(buildHeroProductPreferenceCookie("life")).toContain(`${heroProductPreferenceCookieKey}=life`);
    expect(buildHeroProductPreferenceCookie("life")).toContain("SameSite=Lax");
  });
});
