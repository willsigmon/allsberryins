import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { nextAddressLookupStatus } from "./address-lookup.ts";

describe("nextAddressLookupStatus", () => {
  it("shows results when predictions exist", () => {
    assert.equal(nextAddressLookupStatus({ ok: true, predictionCount: 2 }), "results");
  });

  it("shows an empty state for zero results", () => {
    assert.equal(nextAddressLookupStatus({ ok: true, predictionCount: 0 }), "empty");
  });

  it("shows unavailable when the lookup request fails", () => {
    assert.equal(nextAddressLookupStatus({ ok: false, predictionCount: 3 }), "unavailable");
  });
});
