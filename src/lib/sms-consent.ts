import { agency } from "@/lib/site-data";

export const smsConsentFieldNames = {
  marketingTextOptIn: "marketingTextOptIn",
} as const;

export const smsConsentDisclosureVersion = "2026-08-31-v2";

export function normalizeSmsConsent(value: boolean | undefined): boolean {
  return value === true;
}

export const smsConsentCheckboxLabels = {
  marketing: `By checking this box, you agree to receive insurance quotes, policy review reminders, renewal follow-ups, appointment reminders, customer care, billing or account-related inquiries, documentation requests, and marketing messages related to insurance products and services, including home and auto insurance bundle quote opportunities, from ${agency.name}. You can reply STOP to opt out at any time. Reply HELP to ${agency.phone}. Messages and data rates may apply. Message frequency will vary.`,
} as const;

export const legalPagePaths = {
  privacy: "/privacy",
  terms: "/terms",
} as const;
