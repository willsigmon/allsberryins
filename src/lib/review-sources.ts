export const reviewQuoteKeys = [
  "classicCars",
  "homeowner",
  "restaurant",
  "auto",
] as const;

export type ReviewQuoteKey = (typeof reviewQuoteKeys)[number];

/** Source labels already stored on `reviews` in site-data — not ratings. */
export const reviewQuoteSources = {
  classicCars: "Yelp",
  homeowner: "Google",
  restaurant: "Google",
  auto: "Yelp",
} as const satisfies Record<ReviewQuoteKey, "Google" | "Yelp">;

export function sourcesMatchReviewRecords(
  records: ReadonlyArray<{ source: string }>,
): boolean {
  if (records.length !== reviewQuoteKeys.length) {
    return false;
  }

  return reviewQuoteKeys.every(
    (key, index) => records[index]?.source === reviewQuoteSources[key],
  );
}
