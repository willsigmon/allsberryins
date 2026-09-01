import { describe, expect, it } from "vitest";

import { absoluteUrl, slugify } from "@/lib/utils";

describe("slugify", () => {
  it("normalizes labels into URL tokens", () => {
    expect(slugify("  Home Insurance  ")).toBe("home-insurance");
    expect(slugify("Workers Comp")).toBe("workers-comp");
  });
});

describe("absoluteUrl", () => {
  it("builds site-relative URLs", () => {
    expect(absoluteUrl("/quote")).toMatch(/\/quote$/);
    expect(absoluteUrl()).toMatch(/^https?:\/\//);
  });
});
