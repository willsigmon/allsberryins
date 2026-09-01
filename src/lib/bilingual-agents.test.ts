import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { bilingualAgentFirstNames } from "./bilingual-agents.ts";

describe("bilingualAgentFirstNames", () => {
  it("lists only rostered Spanish speakers and does not invent a headcount", () => {
    assert.equal(
      bilingualAgentFirstNames([
        { firstName: "Erin", languages: ["English"] },
        { firstName: "Alex", languages: ["English", "Spanish"] },
        { firstName: "Vanessa", languages: ["English", "Spanish"] },
      ]),
      "Alex, Vanessa",
    );
  });

  it("returns an empty leftover when no Spanish speakers are listed", () => {
    assert.equal(bilingualAgentFirstNames([{ firstName: "Brahm" }]), "");
  });
});
