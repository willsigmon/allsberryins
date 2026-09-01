import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { evidenceAgentNoticeKind, resolveEvidenceAgent } from "./evidence-entry.ts";

const roster = [
  { slug: "erin", firstName: "Erin", name: "Erin Allsberry" },
  { slug: "brahm", firstName: "Brahm", name: "Brahm Shank" },
] as const;

describe("resolveEvidenceAgent", () => {
  it("returns none when no agent query is present", () => {
    assert.deepEqual(resolveEvidenceAgent(undefined, roster), { kind: "none" });
    assert.deepEqual(resolveEvidenceAgent("  ", roster), { kind: "none" });
  });

  it("returns a sourced agent without inventing a coverage type", () => {
    assert.deepEqual(resolveEvidenceAgent("Erin", roster), {
      kind: "known",
      firstName: "Erin",
      name: "Erin Allsberry",
      slug: "erin",
    });
  });

  it("flags an unknown agent leftover", () => {
    assert.deepEqual(resolveEvidenceAgent("nobody", roster), { kind: "unknown" });
    assert.equal(evidenceAgentNoticeKind({ kind: "unknown" }), "unknown");
    assert.equal(evidenceAgentNoticeKind({ kind: "none" }), undefined);
  });
});
