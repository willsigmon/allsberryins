import { agency } from "@/lib/site-data";

export const smsConsentFieldNames = {
  marketingTextOptIn: "marketingTextOptIn",
  nonMarketingTextOptIn: "nonMarketingTextOptIn",
} as const;

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
export const smsConsentDisclosureIntro = `By providing your phone number and checking this box, you agree to receive SMS/text messages from ${agency.name} regarding insurance quotes, policy review reminders, renewal follow-ups, appointment reminders, customer care, and marketing messages related to insurance products and services, including home and auto bundle quote opportunities. You are opting into marketing texts if you select the marketing text message option. Message frequency may vary. Standard message and data rates may apply. Reply STOP to opt out. Reply HELP for help. We will not share or sell mobile information with third parties for promotional or marketing purposes. Consent is not a condition of purchase. For more information, please review our`;
