import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { homeLeftoverHeroProduct, readHomeLeftovers } from "./home-leftover.ts";

const catalogs = {
  agents: [
    { slug: "erin", name: "Erin Allsberry" },
    { slug: "brahm", name: "Brahm Shank" },
  ],
  heroProductSlugs: ["home", "auto", "business"],
  products: [
    { slug: "home", name: "Home Insurance" },
    { slug: "business", name: "Business Insurance" },
    { slug: "workers-comp", name: "Workers Compensation" },
    { slug: "other", name: "Other Coverage" },
  ],
} as const;

describe("homepage leftover query honesty", () => {
  it("does not invent leftovers from an empty homepage URL", () => {
    assert.deepEqual(readHomeLeftovers({}, catalogs), []);
  });

  it("does not treat leftover ZIP or ad tracking as a homepage catalog", () => {
    assert.deepEqual(
      readHomeLeftovers(
        {
          zip: "92878",
          entry: "hero-zip-home",
          utm_source: "google",
          gclid: "abc",
        },
        catalogs,
      ),
      [],
    );
  });

  it("does not invent a teammate for an unknown leftover agent", () => {
    const leftovers = readHomeLeftovers({ agent: "nobody" }, catalogs);

    assert.deepEqual(leftovers, [{ kind: "unknown-agent" }]);
    assert.equal(homeLeftoverHeroProduct(leftovers), undefined);
  });

  it("keeps a leftover Allsberry surname leftover instead of inventing the first match", () => {
    assert.deepEqual(readHomeLeftovers({ agent: "allsberry" }, catalogs), [{ kind: "unknown-agent" }]);
  });

  it("names a sourced leftover agent without treating the homepage as their inbox", () => {
    assert.deepEqual(readHomeLeftovers({ agent: "Erin" }, catalogs), [
      { kind: "known-agent", agentSlug: "erin", agentName: "Erin Allsberry" },
    ]);
  });

  it("does not invent a coverage line for an unknown leftover product", () => {
    assert.deepEqual(readHomeLeftovers({ product: "spaceship" }, catalogs), [{ kind: "unknown-product" }]);
  });

  it("does not invent an Other homepage catalog from leftover product=other", () => {
    assert.deepEqual(readHomeLeftovers({ product: "other" }, catalogs), [{ kind: "unknown-product" }]);
  });

  it("uses a leftover hero product without inventing a quote form", () => {
    const leftovers = readHomeLeftovers({ product: "Business" }, catalogs);

    assert.deepEqual(leftovers, [
      {
        kind: "known-hero-product",
        productSlug: "business",
        productName: "Business Insurance",
      },
    ]);
    assert.equal(homeLeftoverHeroProduct(leftovers), "business");
  });

  it("does not invent a homepage hero chip for a leftover non-hero product", () => {
    const leftovers = readHomeLeftovers({ product: "workers-comp" }, catalogs);

    assert.deepEqual(leftovers, [
      {
        kind: "known-product",
        productSlug: "workers-comp",
        productName: "Workers Compensation",
      },
    ]);
    assert.equal(homeLeftoverHeroProduct(leftovers), undefined);
  });
});
