import { describe, expect, it } from "vitest";

import { agency } from "@/lib/site-data";
import {
  legalPagePaths,
  normalizeSmsConsent,
  smsConsentCheckboxLabels,
  smsConsentDisclosureVersion,
} from "@/lib/sms-consent";

describe("normalizeSmsConsent", () => {
  it("treats only explicit true as opt-in", () => {
    expect(normalizeSmsConsent(true)).toBe(true);
    expect(normalizeSmsConsent(false)).toBe(false);
    expect(normalizeSmsConsent(undefined)).toBe(false);
  });
});

describe("SMS consent leftovers", () => {
  it("keeps the final August 31 disclosure version and TCR opt-out language", () => {
    expect(smsConsentDisclosureVersion).toBe("2026-08-31-v2");
    expect(smsConsentCheckboxLabels.marketing).toContain(agency.name);
    expect(smsConsentCheckboxLabels.marketing).toContain("STOP");
    expect(smsConsentCheckboxLabels.marketing).toContain("HELP");
    expect(smsConsentCheckboxLabels.marketing).toContain("Messages and data rates may apply");
    expect(smsConsentCheckboxLabels.marketing).toContain("Message frequency will vary");
    expect(legalPagePaths.privacy).toBe("/privacy");
    expect(legalPagePaths.terms).toBe("/terms");
  });
});
