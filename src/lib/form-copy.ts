export const usZipDigitsPattern = /^\d{5}$/;

export type QuoteLeftoverZip =
  | { kind: "none" }
  | { kind: "valid"; zip: string }
  | { kind: "invalid"; raw: string };

export type EvidenceLeftoverAudience =
  | { kind: "none" }
  | { kind: "known"; audience: string }
  | { kind: "unknown"; raw: string };

/** Sourced from `hero-help-content` journey cards. Do not invent extra labels. */
export const sourcedEvidenceAudienceList = [
  "Homeowner",
  "Home / Auto Owner",
  "Real Estate Professional",
  "Auto Client",
  "Renters Client",
  "Life Insurance Client",
  "Umbrella Coverage Client",
  "Business Owner",
] as const;

export const referralSourceLabelKeys = {
  "Real Estate Agent": "referral.realEstateAgent",
  "Online Search": "referral.onlineSearch",
  Referral: "referral.referral",
  "Social Media": "referral.socialMedia",
  Other: "referral.other",
} as const;

export const evidenceRequestTypeLabelKeys = {
  "Proof of Insurance": "evidenceType.proof",
  "Business Proof of Insurance (COI)": "evidenceType.businessCoi",
  "Update for My Bank or Lender": "evidenceType.bankLender",
  "Paperwork for Buying or Selling a Home": "evidenceType.buyingSelling",
  Other: "evidenceType.other",
} as const;

export const helpTopicLabelKeys = {
  "Home Insurance": "helpTopics.home",
  "Auto Insurance": "helpTopics.auto",
  "Business Insurance": "helpTopics.business",
  "Workers Comp": "helpTopics.workersComp",
  "Life Insurance": "helpTopics.life",
  Other: "helpTopics.other",
} as const;

export const formValidationMessageKeys = {
  "Choose personal, commercial, or life insurance.": "errors.insuranceType",
  "Select at least one coverage type.": "errors.products",
  "First name is required.": "errors.firstName",
  "Last name is required.": "errors.lastName",
  "Your name is required.": "errors.fullName",
  "Enter a valid phone number.": "errors.phoneInvalid",
  "Enter a phone number to receive texts.": "errors.phoneRequiredForTexts",
  "Enter a valid email address.": "errors.email",
  "Address must be under 200 characters.": "errors.addressLength",
  "Enter a valid 5-digit ZIP code.": "errors.zip",
  "Please tell us how you heard about us.": "errors.referral",
  "Business name must be under 200 characters.": "errors.businessNameLength",
  "Choose coverage options that match the selected insurance type.": "errors.productsMismatch",
  "Please choose the number of employees.": "errors.employees",
  "Business name is required for commercial quotes.": "errors.businessNameRequired",
  "Keep the message under 1000 characters.": "errors.messageLength",
  "Company, lender, or agency name is required.": "errors.company",
  "Select the type of request.": "errors.requestType",
  "Tell us who the proof is for.": "errors.requestedFor",
  "Select how the agent can help.": "errors.helpTopic",
} as const;

function assertNever(value: never): never {
  throw new Error(`Unhandled leftover kind: ${String(value)}`);
}

export function quoteLeftoverZip(raw: string | undefined): QuoteLeftoverZip {
  const value = raw?.trim() ?? "";
  if (!value) {
    return { kind: "none" };
  }
  if (usZipDigitsPattern.test(value)) {
    return { kind: "valid", zip: value };
  }
  return { kind: "invalid", raw: value };
}

export function sourcedEvidenceAudiences(): ReadonlySet<string> {
  return new Set(sourcedEvidenceAudienceList);
}

export function evidenceLeftoverAudience(
  raw: string | undefined,
  knownAudiences: ReadonlySet<string> = sourcedEvidenceAudiences(),
): EvidenceLeftoverAudience {
  const value = raw?.trim() ?? "";
  if (!value) {
    return { kind: "none" };
  }
  if (knownAudiences.has(value)) {
    return { kind: "known", audience: value };
  }
  return { kind: "unknown", raw: value };
}

export function leftoverAudiencePrefill(
  leftover: EvidenceLeftoverAudience,
): string {
  switch (leftover.kind) {
    case "none":
    case "known":
    case "unknown":
      return "";
    default: {
      return assertNever(leftover);
    }
  }
}

export function resolveFormValidationCopy(
  message: string | undefined,
  translate: (key: string) => string,
): string | undefined {
  if (!message) {
    return undefined;
  }

  const key = formValidationMessageKeys[message as keyof typeof formValidationMessageKeys];
  return key ? translate(key) : message;
}

export function referralSourceLabelKey(
  source: keyof typeof referralSourceLabelKeys,
): string {
  return referralSourceLabelKeys[source];
}

export function evidenceRequestTypeLabelKey(
  requestType: keyof typeof evidenceRequestTypeLabelKeys,
): string {
  return evidenceRequestTypeLabelKeys[requestType];
}

export function helpTopicLabelKey(topic: keyof typeof helpTopicLabelKeys): string {
  return helpTopicLabelKeys[topic];
}
