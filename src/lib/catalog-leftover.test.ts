import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  firstQueryValue,
  leftoverToken,
  resolveAboutRosterLeftover,
  resolveCarrierCatalogLeftover,
  resolveSeoGuideLeftover,
} from "./catalog-leftover.ts";

const roster = [
  { slug: "erin", firstName: "Erin", name: "Erin Allsberry" },
  { slug: "brahm", firstName: "Brahm", name: "Brahm Shank" },
] as const;

const carriers = [
  { name: "Farmers", slug: "farmers" },
  { name: "The Hartford", slug: "the-hartford" },
  { name: "Liberty Mutual", slug: "liberty-mutual" },
] as const;

const coronaGuide = {
  keywords: ["insurance agent corona ca", "local insurance agent near me"],
  pageType: "location" as const,
  sectionTitles: ["A Corona office, not a call center"],
  slug: "insurance-agency-corona-ca",
  title: "Insurance Agency in Corona, CA",
};

const homeGuide = {
  keywords: ["homeowners insurance california", "wildfire insurance california"],
  pageType: "pillar" as const,
  sectionTitles: ["What changes the price of home insurance in California"],
  slug: "california-home-insurance",
  title: "California Home Insurance",
};

describe("leftoverToken", () => {
  it("slugifies leftover query text", () => {
    assert.equal(leftoverToken(" The Hartford "), "the-hartford");
  });
});

describe("firstQueryValue", () => {
  it("reads a trimmed string and ignores blanks", () => {
    assert.equal(firstQueryValue("  erin  "), "erin");
    assert.equal(firstQueryValue("   "), undefined);
    assert.equal(firstQueryValue(["Farmers", "ignored"]), "Farmers");
    assert.equal(firstQueryValue(undefined), undefined);
  });
});

describe("resolveAboutRosterLeftover", () => {
  it("stays quiet when no teammate query is present", () => {
    const result = resolveAboutRosterLeftover({ roster });
    assert.deepEqual(result.leftovers, []);
    assert.equal(result.highlightedSlug, undefined);
    assert.equal(result.emptyRoster, false);
  });

  it("highlights a sourced teammate and does not invent a leftover", () => {
    const result = resolveAboutRosterLeftover({
      rawAgent: "Erin",
      roster,
    });
    assert.deepEqual(result.leftovers, []);
    assert.equal(result.highlightedSlug, "erin");
  });

  it("treats member as an agent alias", () => {
    const result = resolveAboutRosterLeftover({
      rawMember: "brahm-shank",
      roster,
    });
    assert.equal(result.highlightedSlug, "brahm");
  });

  it("prefers agent over member when both are present", () => {
    const result = resolveAboutRosterLeftover({
      rawAgent: "erin",
      rawMember: "nobody",
      roster,
    });
    assert.equal(result.highlightedSlug, "erin");
    assert.deepEqual(result.leftovers, []);
  });

  it("keeps the roster and flags an unknown leftover teammate", () => {
    const result = resolveAboutRosterLeftover({
      rawAgent: "nobody",
      roster,
    });
    assert.deepEqual(result.leftovers, [{ kind: "unknown-agent", raw: "nobody" }]);
    assert.equal(result.highlightedSlug, undefined);
  });

  it("does not invent a roster when the catalog is empty", () => {
    const result = resolveAboutRosterLeftover({ roster: [] });
    assert.equal(result.emptyRoster, true);
  });

  it("does not highlight the first teammate for a shared leftover surname", () => {
    const familyRoster = [
      { slug: "erin", firstName: "Erin", name: "Erin Allsberry" },
      { slug: "dakota", firstName: "Dakota", name: "Dakota Allsberry" },
      { slug: "jason", firstName: "Jason", name: "Jason Allsberry" },
    ] as const;
    const result = resolveAboutRosterLeftover({
      rawAgent: "allsberry",
      roster: familyRoster,
    });
    assert.equal(result.highlightedSlug, undefined);
    assert.deepEqual(result.leftovers, [{ kind: "unknown-agent", raw: "allsberry" }]);
  });
});

describe("resolveCarrierCatalogLeftover", () => {
  it("lists every sourced partner when no leftover query is present", () => {
    const result = resolveCarrierCatalogLeftover({ carriers });
    assert.deepEqual(result.leftovers, []);
    assert.deepEqual(result.visibleSlugs, ["farmers", "the-hartford", "liberty-mutual"]);
    assert.equal(result.emptyCatalog, false);
    assert.equal(result.emptyFilter, false);
  });

  it("filters to a sourced carrier from name or carrier", () => {
    const byName = resolveCarrierCatalogLeftover({
      carriers,
      rawName: "hartford",
    });
    assert.deepEqual(byName.leftovers, []);
    assert.deepEqual(byName.visibleSlugs, ["the-hartford"]);

    const byCarrier = resolveCarrierCatalogLeftover({
      carriers,
      rawCarrier: "Farmers",
    });
    assert.deepEqual(byCarrier.visibleSlugs, ["farmers"]);
  });

  it("does not invent a carrier for an unknown leftover name", () => {
    const result = resolveCarrierCatalogLeftover({
      carriers,
      rawName: "spaceship",
    });
    assert.deepEqual(result.leftovers, [{ kind: "unknown-carrier", raw: "spaceship" }]);
    assert.deepEqual(result.visibleSlugs, ["farmers", "the-hartford", "liberty-mutual"]);
  });

  it("does not invent a personal or commercial line on this catalog", () => {
    const result = resolveCarrierCatalogLeftover({
      carriers,
      rawLine: "personal",
    });
    assert.deepEqual(result.leftovers, [{ kind: "carrier-line", raw: "personal" }]);
    assert.deepEqual(result.visibleSlugs, ["farmers", "the-hartford", "liberty-mutual"]);
  });

  it("does not invent a catalog when no partners are listed", () => {
    const result = resolveCarrierCatalogLeftover({ carriers: [] });
    assert.equal(result.emptyCatalog, true);
    assert.deepEqual(result.visibleSlugs, []);
  });

  it("does not treat a shared leftover token as the first sourced carrier", () => {
    const overlappingCarriers = [
      { name: "Liberty Mutual", slug: "liberty-mutual" },
      { name: "Mutual of Omaha", slug: "mutual-of-omaha" },
    ] as const;
    const result = resolveCarrierCatalogLeftover({
      carriers: overlappingCarriers,
      rawName: "mutual",
    });
    assert.deepEqual(result.leftovers, [{ kind: "unknown-carrier", raw: "mutual" }]);
    assert.deepEqual(result.visibleSlugs, ["liberty-mutual", "mutual-of-omaha"]);
  });
});

describe("resolveSeoGuideLeftover", () => {
  it("stays quiet for a topic or city the current guide already covers", () => {
    assert.deepEqual(
      resolveSeoGuideLeftover({
        page: coronaGuide,
        rawCity: "Corona",
        rawTopic: "call-center",
      }),
      [],
    );
    assert.deepEqual(
      resolveSeoGuideLeftover({
        page: homeGuide,
        rawTopic: "wildfire",
      }),
      [],
    );
  });

  it("does not invent a guide section, city page, or ZIP", () => {
    assert.deepEqual(
      resolveSeoGuideLeftover({
        page: homeGuide,
        rawCity: "spaceship",
        rawTopic: "spaceship",
        rawZip: "92878",
      }),
      [
        { kind: "unknown-topic", raw: "spaceship" },
        { kind: "unknown-city", raw: "spaceship" },
        { kind: "guide-zip", raw: "92878" },
      ],
    );
  });

  it("treats a real city on a statewide guide as leftover, not a made-up city page", () => {
    assert.deepEqual(
      resolveSeoGuideLeftover({
        page: homeGuide,
        rawCity: "Corona",
      }),
      [{ kind: "unknown-city", raw: "Corona" }],
    );
  });
});
