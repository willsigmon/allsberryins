import type { NextRequest } from "next/server";

import { allowRequest, clientIpFromForwardedFor } from "@/lib/request-rate-limit";

const placesRateLimitStore = new Map<string, { count: number; resetAt: number }>();
const placesRateLimit = 60;
const placesRateWindowMs = 60_000;

export function allowPlacesRequest(request: NextRequest): boolean {
  return allowRequest({
    store: placesRateLimitStore,
    key: clientIpFromForwardedFor(request.headers.get("x-forwarded-for")),
    limit: placesRateLimit,
    windowMs: placesRateWindowMs,
  });
}
