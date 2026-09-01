import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { heroZipForQuote, parseHeroZip } from "./hero-zip.ts";

describe("parseHeroZip", () => {
  it("treats a blank ZIP as optional", () => {
    assert.deepEqual(parseHeroZip(""), { kind: "empty" });
    assert.deepEqual(parseHeroZip("   "), { kind: "empty" });
  });

  it("accepts a sourced 5-digit ZIP", () => {
    assert.deepEqual(parseHeroZip("92878"), { kind: "valid", zip: "92878" });
  });

  it("does not invent a ZIP from leftover digits or letters", () => {
    assert.deepEqual(parseHeroZip("928"), { kind: "invalid" });
    assert.deepEqual(parseHeroZip("abcde"), { kind: "invalid" });
    assert.deepEqual(parseHeroZip("92878-1234"), { kind: "invalid" });
  });
});

describe("heroZipForQuote", () => {
  it("passes only a valid ZIP to the quote URL", () => {
    assert.equal(heroZipForQuote({ kind: "valid", zip: "92878" }), "92878");
    assert.equal(heroZipForQuote({ kind: "empty" }), undefined);
    assert.equal(heroZipForQuote({ kind: "invalid" }), undefined);
  });
});
