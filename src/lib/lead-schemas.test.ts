import { describe, expect, it } from "vitest";

import { agency } from "@/lib/site-data";
import {
  agentContactSchema,
  chatRequestSchema,
  countPhoneDigits,
  evidenceRequestSchema,
  leadsApiSchema,
  quoteFormSchema,
} from "@/lib/lead-schemas";

const validPersonalQuote = {
  insuranceType: "personal" as const,
  products: ["home"] as const,
  firstName: "Ada",
  lastName: "Lopez",
  phone: agency.phone,
  email: "ada@example.com",
  zipCode: "92878",
  referralSource: "Online Search" as const,
};

describe("countPhoneDigits", () => {
  it("counts digits in formatted office numbers", () => {
    expect(countPhoneDigits(agency.phone)).toBeGreaterThanOrEqual(10);
    expect(countPhoneDigits("----------")).toBe(0);
  });
});

describe("quoteFormSchema", () => {
  it("accepts a personal quote with the office phone format", () => {
    const parsed = quoteFormSchema.safeParse(validPersonalQuote);
    expect(parsed.success).toBe(true);
  });

  it("rejects punctuation-only phones that used to pass the length regex", () => {
    const parsed = quoteFormSchema.safeParse({
      ...validPersonalQuote,
      phone: "----------",
    });
    expect(parsed.success).toBe(false);
  });

  it("allows visitors to omit a phone number unless they opt in to texts", () => {
    const quoteWithoutPhone: Record<string, unknown> = { ...validPersonalQuote };
    delete quoteWithoutPhone.phone;

    expect(quoteFormSchema.safeParse({ ...validPersonalQuote, phone: "" }).success).toBe(true);
    expect(quoteFormSchema.safeParse(quoteWithoutPhone).success).toBe(true);
    expect(
      leadsApiSchema.safeParse({ type: "quote-request", ...quoteWithoutPhone }).success,
    ).toBe(true);
    expect(
      quoteFormSchema.safeParse({
        ...validPersonalQuote,
        phone: "",
        marketingTextOptIn: true,
      }).success,
    ).toBe(false);
  });

  it("requires a business name on commercial quotes", () => {
    const parsed = quoteFormSchema.safeParse({
      ...validPersonalQuote,
      insuranceType: "commercial",
      products: ["business"],
      employees: "1-5",
      businessName: "",
    });
    expect(parsed.success).toBe(false);
    if (!parsed.success) {
      expect(parsed.error.issues.some((issue) => issue.path.includes("businessName"))).toBe(true);
    }
  });

  it("requires employees for business and workers-comp products", () => {
    const parsed = quoteFormSchema.safeParse({
      ...validPersonalQuote,
      insuranceType: "commercial",
      products: ["workers-comp"],
      businessName: "Example Shop",
    });
    expect(parsed.success).toBe(false);
    if (!parsed.success) {
      expect(parsed.error.issues.some((issue) => issue.path.includes("employees"))).toBe(true);
    }
  });

  it("rejects products that do not match the insurance type", () => {
    const parsed = quoteFormSchema.safeParse({
      ...validPersonalQuote,
      insuranceType: "life",
      products: ["home"],
    });
    expect(parsed.success).toBe(false);
  });
});

describe("leadsApiSchema", () => {
  it("accepts a commercial quote-request payload", () => {
    const parsed = leadsApiSchema.safeParse({
      type: "quote-request",
      ...validPersonalQuote,
      insuranceType: "commercial",
      products: ["business"],
      employees: "1-5",
      businessName: "Example Shop",
    });
    expect(parsed.success).toBe(true);
  });

  it("accepts agent-contact and evidence-request payloads", () => {
    expect(
      agentContactSchema.safeParse({
        name: "Ada Lopez",
        phone: agency.phone,
        email: "ada@example.com",
        helpTopic: "Home Insurance",
      }).success,
    ).toBe(true);

    expect(
      evidenceRequestSchema.safeParse({
        name: "Ada Lopez",
        companyOrAgency: "Example Lender",
        phone: agency.phone,
        email: "ada@example.com",
        zipCode: "92878",
        requestType: "Proof of Insurance",
        requestedFor: "Ada Lopez",
      }).success,
    ).toBe(true);
  });

  it("allows blank phones on agent-contact and evidence-request forms", () => {
    expect(
      agentContactSchema.safeParse({
        name: "Ada Lopez",
        phone: "",
        email: "ada@example.com",
        helpTopic: "Home Insurance",
      }).success,
    ).toBe(true);

    expect(
      evidenceRequestSchema.safeParse({
        name: "Ada Lopez",
        companyOrAgency: "Example Lender",
        phone: "",
        email: "ada@example.com",
        zipCode: "92878",
        requestType: "Proof of Insurance",
        requestedFor: "Ada Lopez",
      }).success,
    ).toBe(true);
  });
});

describe("chatRequestSchema", () => {
  it("requires a non-empty message", () => {
    expect(chatRequestSchema.safeParse({ message: "   " }).success).toBe(false);
    expect(chatRequestSchema.safeParse({ message: "Hello" }).success).toBe(true);
  });
});
