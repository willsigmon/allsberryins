import { describe, expect, it } from "vitest";

import { allowRequest, clientIpFromForwardedFor } from "@/lib/request-rate-limit";

describe("clientIpFromForwardedFor", () => {
  it("uses the first forwarded hop", () => {
    expect(clientIpFromForwardedFor("203.0.113.10, 10.0.0.1")).toBe("203.0.113.10");
    expect(clientIpFromForwardedFor(null)).toBe("unknown");
    expect(clientIpFromForwardedFor("   ")).toBe("unknown");
  });
});

describe("allowRequest", () => {
  it("allows traffic inside the window and blocks after the limit", () => {
    const store = new Map<string, { count: number; resetAt: number }>();
    const now = 1_000;

    expect(allowRequest({ store, key: "a", limit: 2, windowMs: 60_000, now })).toBe(true);
    expect(allowRequest({ store, key: "a", limit: 2, windowMs: 60_000, now: now + 10 })).toBe(true);
    expect(allowRequest({ store, key: "a", limit: 2, windowMs: 60_000, now: now + 20 })).toBe(false);
    expect(allowRequest({ store, key: "b", limit: 2, windowMs: 60_000, now })).toBe(true);
    expect(allowRequest({ store, key: "a", limit: 2, windowMs: 60_000, now: now + 60_001 })).toBe(true);
  });
});
