import { describe, expect, it } from "vitest";

import {
  commercialProducts,
  getAgentBySlug,
  getProductBySlug,
  isHomepageCommercialProduct,
  isHomepagePersonalProduct,
  personalProducts,
  primaryProducerSlug,
  products,
} from "@/lib/site-data";

describe("homepage product catalogs", () => {
  it("derives personal cards from category and keeps Other off the grid", () => {
    expect(personalProducts.every(isHomepagePersonalProduct)).toBe(true);
    expect(personalProducts.some((product) => product.slug === "other")).toBe(false);
    expect(personalProducts.map((product) => product.slug)).toEqual(
      products.filter(isHomepagePersonalProduct).map((product) => product.slug),
    );
  });

  it("includes Business with the other commercial lines", () => {
    expect(commercialProducts[0]?.slug).toBe("business");
    expect(commercialProducts.every(isHomepageCommercialProduct)).toBe(true);
    expect(commercialProducts.map((product) => product.slug).sort()).toEqual(
      products.filter(isHomepageCommercialProduct).map((product) => product.slug).sort(),
    );
  });
});

describe("site lookups", () => {
  it("resolves known agents and products without inventing extras", () => {
    expect(getAgentBySlug(primaryProducerSlug)?.slug).toBe("brahm");
    expect(getAgentBySlug("missing")).toBeUndefined();
    expect(getProductBySlug("home")?.name).toBe("Home Insurance");
  });
});
