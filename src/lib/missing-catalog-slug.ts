import type { Metadata } from "next";

/** Keep in sync with `src/i18n/routing.ts` so Node tests do not load next-intl. */
const localePrefixes = new Set(["en", "es"]);

export const missingCatalogKinds = ["agent", "carrier", "article"] as const;

export type MissingCatalogKind = (typeof missingCatalogKinds)[number];

export const missingCatalogListPath = {
  agent: "/about",
  carrier: "/carriers",
  article: "/blog",
} as const satisfies Record<MissingCatalogKind, string>;

export function classifyMissingCatalogPath(pathname: string): MissingCatalogKind | null {
  const segments = pathname.split("/").filter(Boolean);
  const start = segments[0] && localePrefixes.has(segments[0]) ? 1 : 0;
  const rest = segments.slice(start);
  const [section, slug] = rest;

  if (!slug) {
    return null;
  }

  switch (section) {
    case "agents":
      return "agent";
    case "carriers":
      return "carrier";
    case "blog":
      return "article";
    default:
      return null;
  }
}

export function describeMissingCatalogKind(kind: MissingCatalogKind | null): string {
  switch (kind) {
    case "agent":
      return "agent";
    case "carrier":
      return "carrier";
    case "article":
      return "article";
    case null:
      return "none";
    default: {
      const exhaustive: never = kind;
      return exhaustive;
    }
  }
}

const missingCatalogCopy = {
  agent: {
    title: "This agent page is not listed",
    description:
      "That address is not a current Allsberry agent page. We only list people from the team on this site.",
  },
  carrier: {
    title: "This carrier page is not listed",
    description:
      "That address is not a listed carrier partner page. We only list partners from the carriers page.",
  },
  article: {
    title: "This article is not published",
    description:
      "That address is not a published article. We do not invent posts for leftover links.",
  },
} as const satisfies Record<MissingCatalogKind, { title: string; description: string }>;

export function createMissingCatalogMetadata(kind: MissingCatalogKind): Metadata {
  const copy = missingCatalogCopy[kind];
  const listPath = missingCatalogListPath[kind];

  return {
    title: { absolute: copy.title },
    description: copy.description,
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
    alternates: {
      canonical: listPath,
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: listPath,
    },
    twitter: {
      title: copy.title,
      description: copy.description,
    },
  };
}

export function missingCatalogOgCopy(kind: Extract<MissingCatalogKind, "carrier">) {
  switch (kind) {
    case "carrier":
      return {
        eyebrow: "Not listed",
        heading: "This carrier page is not listed",
        body: "We only show partners from the carriers page. This leftover link is not an appointment.",
        cta: "See listed carriers",
      };
    default: {
      const exhaustive: never = kind;
      return exhaustive;
    }
  }
}
