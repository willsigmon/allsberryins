import { describe, expect, it } from "vitest";

import {
  createTeamTrackingContext,
  inferPageSlug,
  inferPageType,
  mergeTeamTrackingContext,
  normalizeAgentSlug,
} from "@/lib/tracking";

describe("inferPageType", () => {
  it("classifies English and Spanish routes the same way", () => {
    expect(inferPageType("/")).toBe("home");
    expect(inferPageType("/es")).toBe("home");
    expect(inferPageType("/quote")).toBe("quote");
    expect(inferPageType("/es/quote")).toBe("quote");
    expect(inferPageType("/agents/erin")).toBe("agent");
    expect(inferPageType("/es/agents/erin")).toBe("agent");
    expect(inferPageType("/evidence-of-insurance")).toBe("evidence");
    expect(inferPageType("/es/evidence-of-insurance")).toBe("evidence");
    expect(inferPageType("/blog/why-bundle-your-policies")).toBe("blog");
    expect(inferPageType("/es/blog/why-bundle-your-policies")).toBe("blog");
    expect(inferPageType("/privacy")).toBe("site");
  });
});

describe("inferPageSlug", () => {
  it("drops locale prefixes from slugs", () => {
    expect(inferPageSlug("/")).toBe("home");
    expect(inferPageSlug("/es")).toBe("home");
    expect(inferPageSlug("/quote")).toBe("quote");
    expect(inferPageSlug("/es/quote")).toBe("quote");
    expect(inferPageSlug("/es/agents/erin")).toBe("agents-erin");
  });
});

describe("createTeamTrackingContext", () => {
  it("reads agent slugs from localized profile paths", () => {
    const english = createTeamTrackingContext("/agents/erin", "entry=qr-profile");
    const spanish = createTeamTrackingContext("/es/agents/erin", "entry=qr-profile");

    expect(english.agentSlug).toBe("erin");
    expect(spanish.agentSlug).toBe("erin");
    expect(english.pageType).toBe("agent");
    expect(spanish.pageType).toBe("agent");
    expect(english.entryPoint).toBe("qr-profile");
    expect(spanish.entryPoint).toBe("qr-profile");
  });

  it("ignores unknown agent slugs", () => {
    expect(normalizeAgentSlug("not-an-agent")).toBeUndefined();
    expect(createTeamTrackingContext("/agents/not-an-agent").agentSlug).toBeUndefined();
  });
});

describe("mergeTeamTrackingContext", () => {
  it("keeps a stored agent when the next page has none", () => {
    const merged = mergeTeamTrackingContext(
      createTeamTrackingContext("/quote"),
      createTeamTrackingContext("/agents/brahm", "entry=qr-profile"),
    );

    expect(merged.agentSlug).toBe("brahm");
    expect(merged.entryPoint).toBe("qr-profile");
    expect(merged.pageType).toBe("quote");
  });
});
