// Client Care form spam defense (Option A): per-IP rate limit + Cloudflare
// Turnstile server verification. Enforced whenever TURNSTILE_SECRET_KEY is set
// (fails closed); inert until then so the PR can ship before keys exist.
const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
export const TURNSTILE_ACTION = "contact";
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
// In-process only: resets on cold start, per instance. Blunts bursts.
const hits = new Map<string, number[]>();

export function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return fwd || request.headers.get("x-real-ip") || "unknown";
}

export function isRateLimited(key: string, now = Date.now()): boolean {
  for (const [k, stamps] of Array.from(hits.entries())) {
    if (stamps.every((t: number) => now - t >= RATE_LIMIT_WINDOW_MS)) hits.delete(k);
  }
  const recent = (hits.get(key) ?? []).filter((t: number) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > RATE_LIMIT_MAX;
}

type SiteverifyResponse = { success?: boolean; hostname?: string; action?: string };

export async function verifyTurnstile(secret: string, token: string, ip: string, productionHosts: string[]): Promise<boolean> {
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token });
  if (ip !== "unknown") body.set("remoteip", ip);
  let result: SiteverifyResponse;
  try {
    const res = await fetch(SITEVERIFY_URL, { method: "POST", body, signal: AbortSignal.timeout(8000) });
    if (!res.ok) return false;
    result = (await res.json()) as SiteverifyResponse;
  } catch (err) {
    console.error("[forms] turnstile siteverify failed", err);
    return false;
  }
  if (result.success !== true) return false;
  if (result.action && result.action !== TURNSTILE_ACTION) return false;
  if (process.env.VERCEL_ENV === "production") {
    const allowed = [...productionHosts, process.env.VERCEL_URL, process.env.VERCEL_BRANCH_URL].filter(Boolean);
    return Boolean(result.hostname && allowed.includes(result.hostname));
  }
  return true;
}

/**
 * Rate limit + Turnstile. Token comes from the `x-turnstile-token` header (JSON
 * forms) or a `cf-turnstile-response` field. Returns null to proceed, or a
 * { status, message } to reject with. Call AFTER the honeypot check.
 */
export async function checkTurnstile(
  request: Request,
  productionHosts: string[],
  bodyToken?: unknown,
  opts: { rateLimit?: boolean } = {},
): Promise<{ status: number; message: string } | null> {
  const ip = clientIp(request);
  if (opts.rateLimit !== false && isRateLimited(`turnstile:${ip}`)) {
    return { status: 429, message: "Too many tries. Please wait a few minutes, or call us." };
  }
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return null;
  const token = request.headers.get("x-turnstile-token") || (typeof bodyToken === "string" ? bodyToken : "");
  const ok = await verifyTurnstile(secret, token, ip, productionHosts);
  return ok ? null : { status: 403, message: "We could not verify this request. Refresh the page and try again." };
}
