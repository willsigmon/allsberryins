/**
 * Client-side conversion tracking for Google Ads + GA4.
 * Safe to call whether or not gtag is loaded — no-ops without env config.
 */

type GtagFn = (
  command: "event" | "config" | "js",
  eventOrId: string | Date,
  params?: Record<string, unknown>,
) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
  }
}

export type LeadConversionType = "quote-request" | "agent-contact" | "evidence-request";

const GA4_EVENTS: Record<LeadConversionType, string> = {
  "quote-request": "generate_lead",
  "agent-contact": "contact",
  "evidence-request": "request_evidence",
};

export function fireLeadConversion(
  leadType: LeadConversionType,
  payload?: Record<string, unknown>,
) {
  if (typeof window === "undefined") return;
  const gtag = window.gtag;
  if (!gtag) return;

  // GA4 event
  gtag("event", GA4_EVENTS[leadType], {
    event_category: "lead",
    event_label: leadType,
    ...payload,
  });

  // Google Ads conversion
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const conversionLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;
  if (adsId && conversionLabel) {
    gtag("event", "conversion", {
      send_to: `${adsId}/${conversionLabel}`,
      event_callback: undefined,
    });
  }
}
