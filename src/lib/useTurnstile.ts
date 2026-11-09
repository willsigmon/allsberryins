"use client";

import { useEffect, useRef } from "react";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type Turnstile = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};
declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

let loader: Promise<void> | null = null;
function loadScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  loader ??= new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("turnstile load failed"));
    document.head.appendChild(s);
  });
  return loader;
}

/**
 * Invisible Cloudflare Turnstile (challenge shown only when needed). The widget
 * injects a hidden `cf-turnstile-response` input into the enclosing form, so
 * `new FormData(form)` carries the token. No-op until the site key is set.
 */
export function useTurnstile() {
  const ref = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);

  useEffect(() => {
    if (!SITE_KEY || !ref.current) return;
    let cancelled = false;
    loadScript()
      .then(() => {
        if (cancelled || !ref.current || !window.turnstile) return;
        widget.current = window.turnstile.render(ref.current, {
          sitekey: SITE_KEY,
          action: "contact",
          appearance: "interaction-only",
        });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      if (widget.current && window.turnstile) window.turnstile.remove(widget.current);
      widget.current = null;
    };
  }, []);

  const reset = () => {
    if (widget.current && window.turnstile) window.turnstile.reset(widget.current);
  };
  /** Current token (empty until solved / when no site key). */
  const token = () =>
    (ref.current?.querySelector<HTMLInputElement>('input[name="cf-turnstile-response"]')?.value ?? "");
  /** Spread into fetch headers for JSON submissions. */
  const headers = (): Record<string, string> => {
    const t = token();
    // Tokens are single-use: fetch a fresh one for any retry.
    if (t) window.setTimeout(reset, 0);
    return t ? { "x-turnstile-token": t } : {};
  };
  return { ref, reset, token, headers };
}
