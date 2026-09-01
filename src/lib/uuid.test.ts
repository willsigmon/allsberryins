import { describe, expect, it } from "vitest";

import { safeUUID } from "@/lib/uuid";

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

describe("safeUUID", () => {
  it("uses the runtime crypto UUID when available", () => {
    const value = safeUUID();
    expect(value).toMatch(uuidPattern);
    expect(safeUUID()).not.toBe(value);
  });
});
