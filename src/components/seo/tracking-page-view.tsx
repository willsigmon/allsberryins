"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import type { SiteLeadsConfig, TeamTrackingContext } from "@/lib/tracking";
import {
  buildSiteLeadsLabel,
  createTeamTrackingContext,
  mergeTeamTrackingContext,
  siteLeadsSessionKey,
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

function readStoredTrackingContext() {
  try {
    const rawValue = window.sessionStorage.getItem(siteLeadsSessionKey);

    if (!rawValue) {
      return undefined;
    }

    return JSON.parse(rawValue) as TeamTrackingContext;
  } catch {
    return undefined;
  }
}

function storeTrackingContext(context: TeamTrackingContext) {
  try {
    window.sessionStorage.setItem(siteLeadsSessionKey, JSON.stringify(context));
  } catch {
    // Ignore storage errors in private mode or locked-down browsers.
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
    const trackingContext = mergeTeamTrackingContext(currentContext, readStoredTrackingContext());
    const label = buildSiteLeadsLabel(config.labelId, trackingContext);

    storeTrackingContext(trackingContext);

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
