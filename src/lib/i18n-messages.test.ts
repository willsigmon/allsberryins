import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

function flattenKeys(value: unknown, prefix = ""): string[] {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return Object.entries(value as Record<string, unknown>).flatMap(([key, child]) =>
      flattenKeys(child, prefix ? `${prefix}.${key}` : key),
    );
  }

  return prefix ? [prefix] : [];
}

describe("i18n message catalogs", () => {
  it("keeps English and Spanish keys aligned", () => {
    const messagesDir = path.resolve(process.cwd(), "messages");
    const english = JSON.parse(readFileSync(path.join(messagesDir, "en.json"), "utf8")) as unknown;
    const spanish = JSON.parse(readFileSync(path.join(messagesDir, "es.json"), "utf8")) as unknown;

    expect(flattenKeys(spanish).sort()).toEqual(flattenKeys(english).sort());
  });
});
