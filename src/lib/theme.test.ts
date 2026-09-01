import { describe, expect, it } from "vitest";

import {
  defaultTextScale,
  defaultThemeMode,
  resolveThemeFromSolarTimes,
  sanitizeTextScale,
  sanitizeThemeMode,
} from "@/lib/theme";

describe("theme helpers", () => {
  it("falls back to defaults for unknown values", () => {
    expect(sanitizeThemeMode("dark")).toBe("dark");
    expect(sanitizeThemeMode("nope")).toBe(defaultThemeMode);
    expect(sanitizeTextScale("lg")).toBe("lg");
    expect(sanitizeTextScale("huge")).toBe(defaultTextScale);
  });

  it("uses sunset as the dark-mode boundary", () => {
    expect(resolveThemeFromSolarTimes(1_800, 600, 1_800)).toBe("dark");
    expect(resolveThemeFromSolarTimes(1_200, 600, 1_800)).toBe("light");
    expect(resolveThemeFromSolarTimes(500, 600, 1_800)).toBe("dark");
  });
});
