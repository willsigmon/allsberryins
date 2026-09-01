import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

function flattenKeys(value: unknown, prefix = ""): string[] {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return prefix ? [prefix] : [];
  }

  return Object.entries(value as Record<string, unknown>).flatMap(([key, child]) =>
    flattenKeys(child, prefix ? `${prefix}.${key}` : key),
  );
}

describe("forms i18n leftovers", () => {
  const messagesDir = join(dirname(fileURLToPath(import.meta.url)), "../../messages");
  const en = JSON.parse(readFileSync(join(messagesDir, "en.json"), "utf8")) as {
    forms: Record<string, unknown>;
  };
  const es = JSON.parse(readFileSync(join(messagesDir, "es.json"), "utf8")) as {
    forms: Record<string, unknown>;
  };

  it("keeps English and Spanish form keys in parity", () => {
    assert.deepEqual(flattenKeys(en.forms).sort(), flattenKeys(es.forms).sort());
  });

  it("does not invent a leftover ZIP or recipient in English copy", () => {
    const leftoverZip = en.forms.leftoverZip;
    const leftoverAudience = en.forms.leftoverAudience;
    assert.equal(typeof leftoverZip, "string");
    assert.equal(typeof leftoverAudience, "string");
    assert.match(String(leftoverZip), /do not invent a ZIP/i);
    assert.match(String(leftoverAudience), /do not invent a recipient/i);
  });
});
