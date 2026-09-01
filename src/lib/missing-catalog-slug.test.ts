import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  classifyMissingCatalogPath,
  createMissingCatalogMetadata,
  describeMissingCatalogKind,
  missingCatalogListPath,
  missingCatalogOgCopy,
} from "./missing-catalog-slug.ts";

describe("missing catalog slug leftover", () => {
  it("does not treat a directory index as a missing person or partner", () => {
    assert.equal(classifyMissingCatalogPath("/agents"), null);
    assert.equal(classifyMissingCatalogPath("/carriers"), null);
    assert.equal(classifyMissingCatalogPath("/blog"), null);
    assert.equal(classifyMissingCatalogPath("/es/agents"), null);
  });

  it("classifies leftover agent, carrier, and article slugs", () => {
    assert.equal(classifyMissingCatalogPath("/agents/julie"), "agent");
    assert.equal(classifyMissingCatalogPath("/es/agents/nobody"), "agent");
    assert.equal(classifyMissingCatalogPath("/carriers/state-farm"), "carrier");
    assert.equal(classifyMissingCatalogPath("/blog/not-a-post"), "article");
    assert.equal(classifyMissingCatalogPath("/quote"), null);
  });

  it("does not invent a leftover agent name or index the missing URL", () => {
    const metadata = createMissingCatalogMetadata("agent");
    const robots = metadata.robots;

    assert.equal(metadata.alternates?.canonical, missingCatalogListPath.agent);
    assert.notEqual(metadata.alternates?.canonical, "/agents/julie");
    assert.doesNotMatch(String(metadata.description), /julie/i);
    assert.equal(typeof robots === "object" && robots && "index" in robots && robots.index, false);
  });

  it("points leftover carrier and article metadata at the sourced lists", () => {
    assert.equal(createMissingCatalogMetadata("carrier").alternates?.canonical, "/carriers");
    assert.equal(createMissingCatalogMetadata("article").alternates?.canonical, "/blog");
  });

  it("does not invent a Carrier partner name or 20+ count on leftover OG copy", () => {
    const copy = missingCatalogOgCopy("carrier");

    assert.doesNotMatch(copy.heading, /carrier partner/i);
    assert.doesNotMatch(`${copy.body} ${copy.cta}`, /20\+/);
    assert.match(copy.body, /carriers page/i);
  });

  it("describes leftover kinds exhaustively", () => {
    assert.equal(describeMissingCatalogKind("agent"), "agent");
    assert.equal(describeMissingCatalogKind("carrier"), "carrier");
    assert.equal(describeMissingCatalogKind("article"), "article");
    assert.equal(describeMissingCatalogKind(null), "none");
  });
});
