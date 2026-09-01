import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { describeQuoteEntryNotice, resolveQuoteEntryNotices } from "./quote-entry.ts";

const catalogs = {
  agentSlugs: ["erin", "brahm"],
  carrierNames: ["Farmers", "The Hartford"],
  productSlugs: ["home", "auto", "business"],
} as const;

describe("resolveQuoteEntryNotices", () => {
  it("returns no notices for a known product and no leftover params", () => {
    assert.deepEqual(
      resolveQuoteEntryNotices({ product: "home" }, catalogs),
      [],
    );
  });

  it("flags an unknown product without inventing a coverage type", () => {
    assert.deepEqual(resolveQuoteEntryNotices({ product: "spaceship" }, catalogs), [
      { kind: "unknown-product" },
    ]);
  });

  it("names a listed carrier from the leftover ?carrier= slug", () => {
    assert.deepEqual(
      resolveQuoteEntryNotices({ carrier: "the-hartford" }, catalogs),
      [{ kind: "known-carrier", carrierName: "The Hartford" }],
    );
  });

  it("flags an unknown carrier slug instead of inventing an appointment", () => {
    assert.deepEqual(resolveQuoteEntryNotices({ carrier: "made-up-mutual" }, catalogs), [
      { kind: "unknown-carrier" },
    ]);
  });

  it("flags an unknown agent slug", () => {
    assert.deepEqual(resolveQuoteEntryNotices({ agent: "nobody" }, catalogs), [
      { kind: "unknown-agent" },
    ]);
  });

  it("ignores blank leftover params", () => {
    assert.deepEqual(
      resolveQuoteEntryNotices({ product: "  ", carrier: "", agent: undefined }, catalogs),
      [],
    );
  });

  it("can return more than one leftover notice", () => {
    const notices = resolveQuoteEntryNotices(
      { product: "spaceship", carrier: "farmers", agent: "nobody" },
      catalogs,
    );
    assert.deepEqual(
      notices.map((notice) => describeQuoteEntryNotice(notice)),
      ["unknown-product", "known-carrier:Farmers", "unknown-agent"],
    );
  });
});
