/**
 * JSON-LD leftovers: do not invent a price catalog or nationwide availability.
 * Visitor-facing hours timezone is leftover PR #38; this slice does not change hours.
 */

export const sourcedAreaServed = [
  "Corona",
  "Inland Empire",
  "Southern California",
  "Riverside County",
  "Orange County",
  "Los Angeles County",
  "San Bernardino County",
] as const;

export type SourcedAreaServed = (typeof sourcedAreaServed)[number];

const inventedNationalAreas = new Set(["US", "USA", "United States", "United States of America"]);

export function omitsInventedPriceRange(schema: object): boolean {
  return !Object.hasOwn(schema, "priceRange");
}

export function isSourcedAreaServed(value: unknown): value is SourcedAreaServed | readonly SourcedAreaServed[] {
  if (typeof value === "string") {
    return (sourcedAreaServed as readonly string[]).includes(value);
  }
  if (!Array.isArray(value) || value.length === 0) {
    return false;
  }
  return value.every((item) => (sourcedAreaServed as readonly string[]).includes(item));
}

export function contactPointOmitsInventedNationalAvailability(schema: {
  contactPoint?: { areaServed?: unknown } | Array<{ areaServed?: unknown }>;
}): boolean {
  const points = Array.isArray(schema.contactPoint)
    ? schema.contactPoint
    : schema.contactPoint
      ? [schema.contactPoint]
      : [];

  if (points.length === 0) {
    return false;
  }

  return points.every((point) => {
    const area = point.areaServed;
    if (typeof area === "string" && inventedNationalAreas.has(area)) {
      return false;
    }
    return isSourcedAreaServed(area);
  });
}
