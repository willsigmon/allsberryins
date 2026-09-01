export type ReviewQueryLeftover =
  | { kind: "unknown-agent"; raw: string }
  | { kind: "known-agent"; name: string }
  | { kind: "unknown-source"; raw: string }
  | { kind: "yelp-source" }
  | { kind: "unknown-intent"; raw: string }
  | { kind: "feedback-intent" };

function leftoverToken(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function resolveReviewQueryLeftovers(input: {
  rawAgent?: string;
  knownAgentName?: string;
  rawSource?: string;
  rawIntent?: string;
}): ReviewQueryLeftover[] {
  const leftovers: ReviewQueryLeftover[] = [];
  const rawAgent = input.rawAgent?.trim();
  const rawSource = input.rawSource?.trim();
  const rawIntent = input.rawIntent?.trim();

  if (rawAgent) {
    if (input.knownAgentName) {
      leftovers.push({ kind: "known-agent", name: input.knownAgentName });
    } else {
      leftovers.push({ kind: "unknown-agent", raw: rawAgent });
    }
  }

  if (rawSource) {
    const source = leftoverToken(rawSource);
    if (source === "google") {
      // This page already opens the sourced Google listing.
    } else if (source === "yelp") {
      leftovers.push({ kind: "yelp-source" });
    } else {
      leftovers.push({ kind: "unknown-source", raw: rawSource });
    }
  }

  if (rawIntent) {
    const intent = leftoverToken(rawIntent);
    if (intent === "review") {
      // This page is already the public Google review.
    } else if (intent === "feedback") {
      leftovers.push({ kind: "feedback-intent" });
    } else {
      leftovers.push({ kind: "unknown-intent", raw: rawIntent });
    }
  }

  return leftovers;
}
