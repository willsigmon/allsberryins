export type RateLimitWindow = {
  count: number;
  resetAt: number;
};

export function clientIpFromForwardedFor(value: string | null | undefined): string {
  const firstHop = value?.split(",")[0]?.trim();
  return firstHop || "unknown";
}

export function allowRequest(options: {
  store: Map<string, RateLimitWindow>;
  key: string;
  limit: number;
  windowMs: number;
  now?: number;
}): boolean {
  const now = options.now ?? Date.now();
  const record = options.store.get(options.key);

  if (!record || now > record.resetAt) {
    options.store.set(options.key, {
      count: 1,
      resetAt: now + options.windowMs,
    });
    return true;
  }

  if (record.count >= options.limit) {
    return false;
  }

  options.store.set(options.key, {
    count: record.count + 1,
    resetAt: record.resetAt,
  });
  return true;
}
