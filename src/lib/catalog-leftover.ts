const weakLeftoverTokens = new Set([
  "a",
  "an",
  "and",
  "ca",
  "for",
  "in",
  "near",
  "not",
  "of",
  "on",
  "or",
  "the",
  "to",
]);

export function leftoverToken(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function firstQueryValue(
  value: string | string[] | undefined,
): string | undefined {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed || undefined;
  }

  if (Array.isArray(value) && typeof value[0] === "string") {
    const trimmed = value[0].trim();
    return trimmed || undefined;
  }

  return undefined;
}

function leftoverParts(value: string): string[] {
  return leftoverToken(value)
    .split("-")
    .filter((part) => part.length >= 3 && !weakLeftoverTokens.has(part));
}

function tokensCoverQuery(haystack: readonly string[], query: string): boolean {
  const querySlug = leftoverToken(query);
  if (!querySlug) {
    return false;
  }

  if (haystack.some((item) => leftoverToken(item) === querySlug)) {
    return true;
  }

  const haystackParts = new Set(haystack.flatMap((item) => leftoverParts(item)));
  const queryParts = leftoverParts(query);
  return queryParts.length > 0 && queryParts.every((part) => haystackParts.has(part));
}

function findUniqueMatch<T>(
  items: readonly T[],
  matches: (item: T) => boolean,
): T | undefined {
  const hits = items.filter(matches);
  return hits.length === 1 ? hits[0] : undefined;
}

export type CatalogPerson = {
  firstName: string;
  name: string;
  slug: string;
};

export type AboutRosterLeftover = { kind: "unknown-agent"; raw: string };

export type AboutRosterResult = {
  emptyRoster: boolean;
  highlightedSlug?: string;
  leftovers: AboutRosterLeftover[];
};

function findRosterPerson(roster: readonly CatalogPerson[], raw: string) {
  const querySlug = leftoverToken(raw);
  if (!querySlug) {
    return undefined;
  }

  return findUniqueMatch(roster, (person) => {
    const haystack = [person.slug, person.firstName, person.name];
    return tokensCoverQuery(haystack, raw);
  });
}

export function resolveAboutRosterLeftover(input: {
  rawAgent?: string;
  rawMember?: string;
  roster: readonly CatalogPerson[];
}): AboutRosterResult {
  const requested = input.rawAgent?.trim() || input.rawMember?.trim();
  const match = requested ? findRosterPerson(input.roster, requested) : undefined;

  return {
    emptyRoster: input.roster.length === 0,
    highlightedSlug: match?.slug,
    leftovers:
      requested && !match ? [{ kind: "unknown-agent", raw: requested }] : [],
  };
}

export type CarrierRecord = {
  name: string;
  slug: string;
};

export type CarrierCatalogLeftover =
  | { kind: "unknown-carrier"; raw: string }
  | { kind: "carrier-line"; raw: string };

export type CarrierCatalogResult = {
  emptyCatalog: boolean;
  emptyFilter: boolean;
  leftovers: CarrierCatalogLeftover[];
  visibleSlugs: string[];
};

function findCarrier(carriers: readonly CarrierRecord[], raw: string) {
  const querySlug = leftoverToken(raw);
  if (!querySlug || weakLeftoverTokens.has(querySlug)) {
    return undefined;
  }

  return findUniqueMatch(carriers, (carrier) => {
    if (carrier.slug === querySlug || leftoverToken(carrier.name) === querySlug) {
      return true;
    }

    return leftoverToken(carrier.name).split("-").includes(querySlug);
  });
}

export function resolveCarrierCatalogLeftover(input: {
  carriers: readonly CarrierRecord[];
  rawCarrier?: string;
  rawLine?: string;
  rawName?: string;
}): CarrierCatalogResult {
  const leftovers: CarrierCatalogLeftover[] = [];
  const allSlugs = input.carriers.map((carrier) => carrier.slug);
  const requested = input.rawName?.trim() || input.rawCarrier?.trim();
  const match = requested ? findCarrier(input.carriers, requested) : undefined;

  if (requested && !match) {
    leftovers.push({ kind: "unknown-carrier", raw: requested });
  }

  const rawLine = input.rawLine?.trim();
  if (rawLine) {
    leftovers.push({ kind: "carrier-line", raw: rawLine });
  }

  const visibleSlugs = match ? [match.slug] : allSlugs;

  return {
    emptyCatalog: input.carriers.length === 0,
    emptyFilter: Boolean(match) && visibleSlugs.length === 0,
    leftovers,
    visibleSlugs,
  };
}

export type SeoGuidePage = {
  keywords: readonly string[];
  pageType: "pillar" | "supporting" | "location";
  sectionTitles: readonly string[];
  slug: string;
  title: string;
};

export type SeoGuideLeftover =
  | { kind: "unknown-topic"; raw: string }
  | { kind: "unknown-city"; raw: string }
  | { kind: "guide-zip"; raw: string };

export type CatalogLeftover =
  | AboutRosterLeftover
  | CarrierCatalogLeftover
  | SeoGuideLeftover;

export type CatalogLeftoverCopyKey =
  | "unknownAgent"
  | "unknownCarrier"
  | "carrierLine"
  | "unknownTopic"
  | "unknownCity"
  | "guideZip";

export function catalogLeftoverCopy(leftover: CatalogLeftover): {
  key: CatalogLeftoverCopyKey;
  requested: string;
} {
  switch (leftover.kind) {
    case "unknown-agent":
      return { key: "unknownAgent", requested: leftover.raw };
    case "unknown-carrier":
      return { key: "unknownCarrier", requested: leftover.raw };
    case "carrier-line":
      return { key: "carrierLine", requested: leftover.raw };
    case "unknown-topic":
      return { key: "unknownTopic", requested: leftover.raw };
    case "unknown-city":
      return { key: "unknownCity", requested: leftover.raw };
    case "guide-zip":
      return { key: "guideZip", requested: leftover.raw };
    default: {
      const _exhaustive: never = leftover;
      return _exhaustive;
    }
  }
}

function guideCoversTopic(page: SeoGuidePage, rawTopic: string) {
  return tokensCoverQuery(
    [page.slug, page.title, ...page.keywords, ...page.sectionTitles],
    rawTopic,
  );
}

function guideCoversCity(page: SeoGuidePage, rawCity: string) {
  if (page.pageType !== "location") {
    return false;
  }

  return tokensCoverQuery([page.slug, page.title, ...page.keywords], rawCity);
}

export function resolveSeoGuideLeftover(input: {
  page: SeoGuidePage;
  rawCity?: string;
  rawTopic?: string;
  rawZip?: string;
}): SeoGuideLeftover[] {
  const leftovers: SeoGuideLeftover[] = [];
  const rawTopic = input.rawTopic?.trim();
  const rawCity = input.rawCity?.trim();
  const rawZip = input.rawZip?.trim();

  if (rawTopic && !guideCoversTopic(input.page, rawTopic)) {
    leftovers.push({ kind: "unknown-topic", raw: rawTopic });
  }

  if (rawCity && !guideCoversCity(input.page, rawCity)) {
    leftovers.push({ kind: "unknown-city", raw: rawCity });
  }

  if (rawZip) {
    leftovers.push({ kind: "guide-zip", raw: rawZip });
  }

  return leftovers;
}
