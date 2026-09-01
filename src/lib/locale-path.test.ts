import { describe, expect, it } from "vitest";

import { isAppLocale, stripLocalePrefix } from "@/lib/locale-path";

describe("stripLocalePrefix", () => {
  it("leaves English as-needed paths unchanged", () => {
    expect(stripLocalePrefix("/")).toBe("/");
    expect(stripLocalePrefix("/quote")).toBe("/quote");
    expect(stripLocalePrefix("/agents/erin")).toBe("/agents/erin");
  });

  it("strips Spanish and explicit English prefixes", () => {
    expect(stripLocalePrefix("/es")).toBe("/");
    expect(stripLocalePrefix("/es/")).toBe("/");
    expect(stripLocalePrefix("/es/quote")).toBe("/quote");
    expect(stripLocalePrefix("/en/agents/erin")).toBe("/agents/erin");
    expect(stripLocalePrefix("es/evidence-of-insurance")).toBe("/evidence-of-insurance");
  });

  it("does not treat page slugs as locales", () => {
    expect(stripLocalePrefix("/evidence-of-insurance")).toBe("/evidence-of-insurance");
    expect(stripLocalePrefix("/blog/why-bundle-your-policies")).toBe("/blog/why-bundle-your-policies");
  });
});

describe("isAppLocale", () => {
  it("accepts configured locales only", () => {
    expect(isAppLocale("en")).toBe(true);
    expect(isAppLocale("es")).toBe(true);
    expect(isAppLocale("fr")).toBe(false);
    expect(isAppLocale("quote")).toBe(false);
  });
});
