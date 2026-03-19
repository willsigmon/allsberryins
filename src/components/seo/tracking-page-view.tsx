"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import type { SiteLeadsConfig } from "@/lib/tracking";
import {
  buildSiteLeadsLabel,
  createMarketingAttribution,
  createTeamTrackingContext,
  mergeMarketingAttribution,
  mergeTeamTrackingContext,
  readStoredMarketingAttribution,
  readStoredTeamTrackingContext,
  storeMarketingAttribution,
  storeTeamTrackingContext,
} from "@/lib/tracking";

declare global {
  interface Window {
    __SITELEADS_CONFIG?: SiteLeadsConfig;
    PxGrabber?: {
      render: () => void;
      setOptions: (options: { Label: string }) => void;
    };
  }
}

export function TrackingPageView() {
  const pathname = usePathname() ?? "/";
  const searchParams = useSearchParams();
  const searchString = searchParams.toString();

  useEffect(() => {
    const config = window.__SITELEADS_CONFIG;

    if (!config?.labelId) {
      return;
    }

    const currentContext = createTeamTrackingContext(pathname, searchString, window.location.href);
    const trackingContext = mergeTeamTrackingContext(
      currentContext,
      readStoredTeamTrackingContext(),
    );
    const currentMarketingAttribution = createMarketingAttribution(
      pathname,
      searchString,
      window.location.href,
      document.referrer,
    );
    const marketingAttribution = mergeMarketingAttribution(
      currentMarketingAttribution,
      readStoredMarketingAttribution(),
    );
    const label = buildSiteLeadsLabel(config.labelId, trackingContext);

    storeTeamTrackingContext(trackingContext);
    storeMarketingAttribution(marketingAttribution);

    let cancelled = false;
    let attempts = 0;

    const applyTracking = () => {
      if (cancelled) {
        return true;
      }

      if (!window.PxGrabber?.setOptions || !window.PxGrabber?.render) {
        return false;
      }

      window.PxGrabber.setOptions({ Label: label });
      window.PxGrabber.render();
      return true;
    };

    if (applyTracking()) {
      return;
    }

    const intervalId = window.setInterval(() => {
      attempts += 1;

      if (applyTracking() || attempts >= 20) {
        window.clearInterval(intervalId);
      }
    }, 300);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, [pathname, searchString]);

  return null;
}
