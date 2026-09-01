import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { reviewQuoteKeys, reviewQuoteSources, sourcesMatchReviewRecords } from "./review-sources.ts";

describe("review source labels", () => {
  it("keeps four sourced quotes and no invented rating", () => {
    assert.equal(reviewQuoteKeys.length, 4);
    assert.equal(reviewQuoteSources.classicCars, "Yelp");
    assert.equal(reviewQuoteSources.homeowner, "Google");
  });

  it("matches site-data review order when records are passed in", () => {
    const records = [
      { source: "Yelp" },
      { source: "Google" },
      { source: "Google" },
      { source: "Yelp" },
    ];
    assert.equal(sourcesMatchReviewRecords(records), true);
    assert.equal(sourcesMatchReviewRecords([{ source: "5 stars" }]), false);
  });
});
