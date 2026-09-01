export type EvidenceAgentRecord = {
  firstName: string;
  name: string;
  slug: string;
};

export type EvidenceAgentResult =
  | { kind: "none" }
  | { kind: "known"; firstName: string; name: string; slug: string }
  | { kind: "unknown" };

function sanitizeAgentToken(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function resolveEvidenceAgent(
  raw: string | undefined,
  roster: readonly EvidenceAgentRecord[],
): EvidenceAgentResult {
  if (!raw || !raw.trim()) {
    return { kind: "none" };
  }

  const token = sanitizeAgentToken(raw);
  if (!token) {
    return { kind: "unknown" };
  }

  const agent = roster.find((item) => item.slug === token);
  if (!agent) {
    return { kind: "unknown" };
  }

  return {
    kind: "known",
    firstName: agent.firstName,
    name: agent.name,
    slug: agent.slug,
  };
}

export function evidenceAgentNoticeKind(
  result: EvidenceAgentResult,
): "unknown" | undefined {
  switch (result.kind) {
    case "unknown":
      return "unknown";
    case "none":
    case "known":
      return undefined;
    default: {
      const _exhaustive: never = result;
      return _exhaustive;
    }
  }
}
