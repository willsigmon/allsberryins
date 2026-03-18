"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";

import { agency, navigation } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solidHeader = pathname !== "/" || scrolled || menuOpen;
  const textClassName = solidHeader ? "text-white" : "text-navy";
  const subtextClassName = solidHeader ? "text-white/80" : "text-navy/70";
  const phoneClassName = solidHeader
    ? "border-white/18 text-white hover:border-white/35 hover:bg-white/8"
    : "border-navy/10 bg-white/85 text-navy hover:border-blue/35 hover:text-blue";
  const menuButtonClassName = solidHeader
    ? "border-white/18 text-white"
    : "border-navy/10 bg-white/85 text-navy shadow-sm";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solidHeader
          ? "bg-navy/95 shadow-[0_20px_45px_-28px_rgba(0,32,92,0.55)] backdrop-blur"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Allsberry Insurance Agency home">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-2xl border shadow-lg backdrop-blur overflow-hidden",
              solidHeader
                ? "border-white/20 bg-white/12"
                : "border-white bg-white/95",
            )}
          >
            <Image
              src="/media/brand/aia-logo.png"
              alt="Allsberry Insurance Agency logo"
              width={36}
              height={36}
              className={cn("h-9 w-9 object-contain", solidHeader ? "brightness-0 invert" : "")}
            />
          </div>
          <div>
            <p className={cn("font-display text-xl font-extrabold tracking-[0.18em] sm:text-2xl", textClassName)}>
              ALLSBERRY
            </p>
            <p className={cn("text-[0.68rem] font-semibold uppercase tracking-[0.32em]", subtextClassName)}>
              Insurance Agency
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                solidHeader
                  ? "text-white/92 hover:text-white focus-visible:ring-white focus-visible:ring-offset-navy"
                  : "text-navy/86 hover:text-blue focus-visible:ring-blue focus-visible:ring-offset-white",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href={agency.phoneHref}
            className={cn("inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition", phoneClassName)}
          >
            <Phone className="h-4 w-4" />
            {agency.phone}
          </Link>
          <Link
            href="/quote"
            className="inline-flex items-center justify-center rounded-full bg-red px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-red"
          >
            Get a Quote
          </Link>
        </div>

        <button
          type="button"
          className={cn("inline-flex h-11 w-11 items-center justify-center rounded-full border md:hidden", menuButtonClassName)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen ? (
        <div className="border-t border-white/12 bg-navy/98 px-4 pb-6 pt-4 shadow-xl md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl px-4 py-3 text-base font-semibold text-white transition hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 grid gap-3 rounded-3xl border border-white/12 bg-white/5 p-4">
              <Link
                href={agency.phoneHref}
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/90"
              >
                <Phone className="h-4 w-4" />
                {agency.phone}
              </Link>
              <Link
                href="/quote"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center rounded-full bg-red px-5 py-3 text-sm font-bold text-white transition hover:bg-red-hover"
              >
                Get a Quote
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
