import { describe, expect, it } from "vitest";

import { products } from "@/lib/site-data";
import {
  defaultQuoteProductByInsuranceType,
  getQuoteInsuranceTypeForProduct,
  isQuoteProductForInsuranceType,
  quoteInsuranceTypes,
  quoteProductOptionsByInsuranceType,
} from "@/lib/quote-routing";

describe("quote routing", () => {
  it("maps every selectable product to one insurance type", () => {
    for (const product of products) {
      const insuranceType = getQuoteInsuranceTypeForProduct(product.slug);
      expect(quoteInsuranceTypes).toContain(insuranceType);
      expect(isQuoteProductForInsuranceType(product.slug, insuranceType)).toBe(true);
    }
  });

  it("keeps defaults inside the matching option lists", () => {
    for (const insuranceType of quoteInsuranceTypes) {
      const defaultProduct = defaultQuoteProductByInsuranceType[insuranceType];
      expect(quoteProductOptionsByInsuranceType[insuranceType]).toContain(defaultProduct);
    }
  });

  it("rejects coverage that does not match the selected type", () => {
    expect(isQuoteProductForInsuranceType("home", "commercial")).toBe(false);
    expect(isQuoteProductForInsuranceType("business", "personal")).toBe(false);
    expect(isQuoteProductForInsuranceType("life", "personal")).toBe(false);
    expect(isQuoteProductForInsuranceType("workers-comp", "commercial")).toBe(true);
  });
});
