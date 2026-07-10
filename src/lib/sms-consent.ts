import { agency } from "@/lib/site-data";

export const smsConsentFieldNames = {
  marketingTextOptIn: "marketingTextOptIn",
  nonMarketingTextOptIn: "nonMarketingTextOptIn",
} as const;

export const smsConsentDisclosureVersion = "2026-07-10";

export function normalizeSmsConsent(value: boolean | undefined): boolean {
  return value === true;
}

export const smsConsentCheckboxLabels = {
  marketing:
    "Yes, I would like to receive marketing text messages",
  nonMarketing:
    "Yes, I would like to receive non-marketing text messages",
} as const;

export const legalPagePaths = {
  privacy: "/privacy",
  terms: "/terms",
} as const;

/** TCPA / Ricochet auto-dialer disclosure — agency name substituted for template placeholder. */
export const smsConsentDisclosureIntro = `By providing your phone number and selecting an optional checkbox below, you electronically sign and authorize ${agency.name} to send the corresponding SMS/text messages to the number provided, including by using an automatic telephone dialing system or other automated technology. Messages may concern insurance quotes, policy reviews, renewals, appointments, customer care, and insurance products or services. You authorize marketing texts only if you select the marketing text message option. Message frequency may vary. Standard message and data rates may apply. Reply STOP to opt out or HELP for help. We will not share or sell mobile information with third parties for promotional or marketing purposes. Your consent to receive texts is not a condition of purchase. For more information, please review our`;
