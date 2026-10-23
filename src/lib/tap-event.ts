export type TapEvent = "Call Tap" | "Text Tap" | "Email Tap" | "Quote Tap" | "Book Tap";

/** Classify destinations without including their contents in event data. */
export function getTapEvent(href: string, origin: string): TapEvent | undefined {
  let url: URL;
  try {
    url = new URL(href, origin);
  } catch {
    return undefined;
  }

  if (url.protocol === "tel:") return "Call Tap";
  if (url.protocol === "sms:") return "Text Tap";
  if (url.protocol === "mailto:") return "Email Tap";
  if (url.protocol !== "https:" && url.protocol !== "http:") return undefined;
  if (url.hostname === "calendly.com" || url.hostname.endsWith(".calendly.com")) {
    return "Book Tap";
  }
  if (url.origin === origin && /^\/(?:en\/|es\/)?quote\/?$/.test(url.pathname)) {
    return "Quote Tap";
  }
  return undefined;
}
