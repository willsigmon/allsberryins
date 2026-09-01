import { describe, expect, it } from "vitest";

import { getAgentQrDestination } from "@/lib/agent-qr";
import { primaryProducerSlug } from "@/lib/site-data";

describe("getAgentQrDestination", () => {
  it("sends the primary producer QR to the main landing page", () => {
    const destination = getAgentQrDestination(primaryProducerSlug);
    expect(destination.isMainLandingPage).toBe(true);
    expect(destination.href).toBe("/");
  });

  it("keeps other agent QRs on tracked profile URLs", () => {
    const destination = getAgentQrDestination("erin");
    expect(destination.isMainLandingPage).toBe(false);
    expect(destination.href).toContain("/agents/erin");
    expect(destination.href).toContain("entry=qr-profile");
  });
});
