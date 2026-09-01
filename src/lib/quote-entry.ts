export type QuoteEntryNoticeKind =
  | "unknown-product"
  | "known-carrier"
  | "unknown-carrier"
  | "unknown-agent";

export type QuoteEntryNotice =
  | { kind: "unknown-product" }
  | { kind: "known-carrier"; carrierName: string }
  | { kind: "unknown-carrier" }
  | { kind: "unknown-agent" };

export type QuoteEntryCatalogs = {
  agentSlugs: readonly string[];
  carrierNames: readonly string[];
  productSlugs: readonly string[];
};

export type QuoteEntryInput = {
  agent?: string;
  carrier?: string;
  product?: string;
};

function normalizeToken(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function slugifyName(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Quote links from carrier cards and old campaigns can carry product, carrier,
 * or agent params that the form used to swallow. Return honest notices only —
 * never invent a product, appointment, or agent from a leftover slug.
 */
export function resolveQuoteEntryNotices(
  input: QuoteEntryInput,
  catalogs: QuoteEntryCatalogs,
): QuoteEntryNotice[] {
  const notices: QuoteEntryNotice[] = [];
  const product = normalizeToken(input.product);
  const carrier = normalizeToken(input.carrier);
  const agent = normalizeToken(input.agent);

  if (product && !catalogs.productSlugs.includes(product)) {
    notices.push({ kind: "unknown-product" });
  }

  if (carrier) {
    const match = catalogs.carrierNames.find(
      (name) => slugifyName(name) === slugifyName(carrier),
    );
    if (match) {
      notices.push({ kind: "known-carrier", carrierName: match });
    } else {
      notices.push({ kind: "unknown-carrier" });
    }
  }

  if (agent) {
    const agentSlug = slugifyName(agent);
    const knownAgent = catalogs.agentSlugs.some(
      (slug) => slugifyName(slug) === agentSlug,
    );
    if (!knownAgent) {
      notices.push({ kind: "unknown-agent" });
    }
  }

  return notices;
}

export function describeQuoteEntryNotice(notice: QuoteEntryNotice): string {
  switch (notice.kind) {
    case "unknown-product":
      return "unknown-product";
    case "known-carrier":
      return `known-carrier:${notice.carrierName}`;
    case "unknown-carrier":
      return "unknown-carrier";
    case "unknown-agent":
      return "unknown-agent";
    default: {
      const exhaustive: never = notice;
      return exhaustive;
    }
  }
}
