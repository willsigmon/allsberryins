function slugifyLeftover(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export type HomeLeftoverCatalogs = {
  agents: ReadonlyArray<{ slug: string; name: string }>;
  heroProductSlugs: readonly string[];
  products: ReadonlyArray<{ slug: string; name: string }>;
};

export type HomeLeftover =
  | { kind: "unknown-agent" }
  | { kind: "known-agent"; agentSlug: string; agentName: string }
  | { kind: "unknown-product" }
  | { kind: "known-product"; productSlug: string; productName: string }
  | { kind: "known-hero-product"; productSlug: string; productName: string };

function firstQueryValue(value: string | string[] | undefined) {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value) && typeof value[0] === "string") {
    return value[0];
  }

  return undefined;
}

function leftoverToken(value: string | string[] | undefined) {
  const raw = firstQueryValue(value);
  if (raw === undefined || raw.trim() === "") {
    return undefined;
  }

  return slugifyLeftover(raw);
}

export function readHomeLeftovers(
  search: Record<string, string | string[] | undefined>,
  catalogs: HomeLeftoverCatalogs,
): HomeLeftover[] {
  const leftovers: HomeLeftover[] = [];

  if (firstQueryValue(search.agent)?.trim()) {
    const agentToken = leftoverToken(search.agent);
    const agent = agentToken
      ? catalogs.agents.find((candidate) => candidate.slug === agentToken)
      : undefined;
    leftovers.push(
      agent
        ? { kind: "known-agent", agentSlug: agent.slug, agentName: agent.name }
        : { kind: "unknown-agent" },
    );
  }

  if (firstQueryValue(search.product)?.trim()) {
    const productToken = leftoverToken(search.product);
    const product = productToken
      ? catalogs.products.find((candidate) => candidate.slug === productToken)
      : undefined;

    if (!product || product.slug === "other") {
      leftovers.push({ kind: "unknown-product" });
    } else if (catalogs.heroProductSlugs.includes(product.slug)) {
      leftovers.push({
        kind: "known-hero-product",
        productSlug: product.slug,
        productName: product.name,
      });
    } else {
      leftovers.push({
        kind: "known-product",
        productSlug: product.slug,
        productName: product.name,
      });
    }
  }

  return leftovers;
}

export function homeLeftoverHeroProduct(leftovers: readonly HomeLeftover[]): string | undefined {
  const match = leftovers.find((item) => item.kind === "known-hero-product");
  return match?.kind === "known-hero-product" ? match.productSlug : undefined;
}
