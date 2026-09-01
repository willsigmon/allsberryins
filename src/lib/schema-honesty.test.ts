import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  contactPointOmitsInventedNationalAvailability,
  omitsInventedPriceRange,
  sourcedAreaServed,
} from "./schema-honesty.ts";

describe("schema leftover honesty", () => {
  it("rejects an invented $$ price catalog", () => {
    assert.equal(omitsInventedPriceRange({ priceRange: "$$" }), false);
    assert.equal(omitsInventedPriceRange({ name: "Allsberry Insurance Agency" }), true);
  });

  it("rejects a leftover US contact-point catalog", () => {
    assert.equal(
      contactPointOmitsInventedNationalAvailability({
        contactPoint: { areaServed: "US" },
      }),
      false,
    );
    assert.equal(
      contactPointOmitsInventedNationalAvailability({
        contactPoint: [{ areaServed: [...sourcedAreaServed] }],
      }),
      true,
    );
    assert.equal(
      contactPointOmitsInventedNationalAvailability({
        contactPoint: { areaServed: "Southern California" },
      }),
      true,
    );
  });

  it("keeps the sourced Southern California list and does not invent a US catalog", () => {
    assert.ok(sourcedAreaServed.includes("Southern California"));
    assert.ok(sourcedAreaServed.includes("Corona"));
    assert.equal(
      (sourcedAreaServed as readonly string[]).includes("US"),
      false,
    );
  });
});
