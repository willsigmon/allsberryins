import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  evidenceLeftoverAudience,
  leftoverAudiencePrefill,
  quoteLeftoverZip,
  resolveFormValidationCopy,
  sourcedEvidenceAudiences,
} from "./form-copy.ts";

describe("quoteLeftoverZip", () => {
  it("treats a missing or blank ZIP as no leftover", () => {
    assert.deepEqual(quoteLeftoverZip(undefined), { kind: "none" });
    assert.deepEqual(quoteLeftoverZip("   "), { kind: "none" });
  });

  it("keeps a sourced 5-digit ZIP", () => {
    assert.deepEqual(quoteLeftoverZip("92878"), { kind: "valid", zip: "92878" });
  });

  it("does not invent a ZIP from leftover junk", () => {
    assert.deepEqual(quoteLeftoverZip("spaceship"), {
      kind: "invalid",
      raw: "spaceship",
    });
    assert.deepEqual(quoteLeftoverZip("9287"), { kind: "invalid", raw: "9287" });
  });
});

describe("evidenceLeftoverAudience", () => {
  const known = new Set(["Homeowner", "Business Owner"]);

  it("ignores a blank leftover audience", () => {
    assert.deepEqual(evidenceLeftoverAudience("  ", known), { kind: "none" });
  });

  it("keeps a sourced hero-journey audience", () => {
    assert.deepEqual(evidenceLeftoverAudience("Homeowner", known), {
      kind: "known",
      audience: "Homeowner",
    });
  });

  it("does not invent a recipient from an unknown leftover", () => {
    const leftover = evidenceLeftoverAudience("spaceship", known);
    assert.deepEqual(leftover, { kind: "unknown", raw: "spaceship" });
    assert.equal(leftoverAudiencePrefill(leftover), "");
    assert.equal(leftoverAudiencePrefill({ kind: "known", audience: "Homeowner" }), "");
  });

  it("sources known audiences from the hero journey list", () => {
    const sourced = sourcedEvidenceAudiences();
    assert.equal(sourced.has("Homeowner"), true);
    assert.equal(sourced.has("Business Owner"), true);
    assert.equal(sourced.has("Real Estate Professional"), true);
    assert.equal(sourced.has("spaceship"), false);
  });
});

describe("resolveFormValidationCopy", () => {
  it("maps a known Zod message to a form i18n key", () => {
    assert.equal(
      resolveFormValidationCopy("Enter a valid 5-digit ZIP code.", (key) => `es:${key}`),
      "es:errors.zip",
    );
  });

  it("leaves an unknown message honest instead of inventing copy", () => {
    assert.equal(
      resolveFormValidationCopy("Carrier count is 200+", (key) => key),
      "Carrier count is 200+",
    );
  });
});
