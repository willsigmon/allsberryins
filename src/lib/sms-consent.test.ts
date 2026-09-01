import { describe, expect, it } from "vitest";

import { agency } from "@/lib/site-data";
import {
  legalPagePaths,
  normalizeSmsConsent,
  smsConsentCheckboxLabels,
  smsConsentDisclosureIntro,
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
  it("keeps the August 31 disclosure version and TCR opt-out language", () => {
    expect(smsConsentDisclosureVersion).toBe("2026-08-31");
    expect(smsConsentDisclosureIntro).toContain(agency.name);
    expect(smsConsentDisclosureIntro).toContain("STOP");
    expect(smsConsentDisclosureIntro).toContain("HELP");
    expect(smsConsentCheckboxLabels.marketing).toContain(agency.name);
    expect(smsConsentCheckboxLabels.marketing).toContain("STOP");
    expect(legalPagePaths.privacy).toBe("/privacy");
    expect(legalPagePaths.terms).toBe("/terms");
  });
});
