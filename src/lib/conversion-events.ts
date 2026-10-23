"use client";

import { track } from "@vercel/analytics";

import type { TapEvent } from "./tap-event";

export function trackConversion(event: TapEvent | "Form Submit", location: string) {
  try {
    track(event, { location });
  } catch {
    // Analytics is optional: failure must not break navigation or a successful lead.
  }
}
