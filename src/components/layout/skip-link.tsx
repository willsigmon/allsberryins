"use client";

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-navy focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
    >
      Skip to content
    </a>
  );
}
