"use client";

import { useEffect } from "react";

import { trackConversion } from "@/lib/conversion-events";
import { getTapEvent } from "@/lib/tap-event";

export function ConversionEvents() {
  useEffect(() => {
    const onClick = (click: MouseEvent) => {
      if (!(click.target instanceof Element)) return;
      const element = click.target.closest<HTMLElement>("a[href], button[data-analytics-event]");
      if (!element) return;

      const event = element.dataset.analyticsEvent === "Quote Tap"
        ? "Quote Tap"
        : getTapEvent(element.getAttribute("href") ?? "", window.location.origin);
      if (!event) return;

      // Only source-controlled labels, never URL queries, link text, or form values.
      const location = element.closest<HTMLElement>("[data-analytics-location]")?.dataset.analyticsLocation
        ?? (element.closest("header") ? "header"
          : element.closest("footer") ? "footer"
            : "page-content");
      trackConversion(event, location);
    };

    document.addEventListener("click", onClick, { capture: true, passive: true });
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
