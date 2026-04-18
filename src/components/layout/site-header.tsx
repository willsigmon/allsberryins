"use client";

import Image from "next/image";
import { Menu, Phone, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { LanguageSwitcher } from "@/components/language/language-switcher";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Link, usePathname } from "@/i18n/navigation";
import { haptic, press, tap } from "@/lib/haptics";
import { agency } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const tNav = useTranslations("nav");
  const tCta = useTranslations("cta");
  const tHeader = useTranslations("header");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const elevatedHeader = pathname !== "/" || scrolled || menuOpen;

  const navigation = [
    { label: tNav("personal"), href: "/#personal-insurance" as const },
    { label: tNav("commercial"), href: "/#commercial-insurance" as const },
    { label: tNav("resources"), href: "/resources" as const },
    { label: tNav("about"), href: "/about" as const },
    { label: tNav("blog"), href: "/blog" as const },
    { label: tNav("contact"), href: "/contact" as const },
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-navy/92 backdrop-blur-xl backdrop-saturate-[1.8] transition-all duration-300",
        elevatedHeader
          ? "shadow-[0_20px_50px_-24px_rgba(0,32,92,0.6)]"
          : "shadow-[0_18px_34px_-32px_rgba(0,32,92,0.3)]",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center" aria-label={tHeader("agencyHome")}>
          <Image
            src="/media/brand/logos/allsberry-starlight.png"
            alt={tHeader("logoAlt")}
            width={260}
            height={86}
            priority
            className="h-14 w-auto sm:h-16 lg:h-[4.5rem]"
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => { tap(); }}
              className={cn(
                "text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                "text-white/88 hover:text-white focus-visible:ring-white focus-visible:ring-offset-navy",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <ThemeToggle />
          <a
            href={agency.phoneHref}
            onClick={() => { press(); }}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition",
              "border-white/18 text-white hover:border-white/35 hover:bg-white/8",
            )}
          >
            <Phone className="h-4 w-4" />
            {agency.phone}
          </a>
          <Link
            href="/quote"
            onClick={() => { haptic("nudge"); }}
            className="cta-attention inline-flex items-center justify-center rounded-full bg-red px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-red"
          >
            {tCta("getQuote")}
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/18 text-white md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? tHeader("closeMenu") : tHeader("openMenu")}
          onClick={() => { press(); setMenuOpen((value) => !value); }}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen ? (
        <div
          id="mobile-nav"
          className="border-t border-white/12 bg-navy/98 px-4 pb-6 pt-4 shadow-xl md:hidden"
        >
          <nav className="mx-auto flex max-w-7xl flex-col gap-2">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => { tap(); setMenuOpen(false); }}
                className="rounded-2xl px-4 py-3 text-base font-semibold text-white transition hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 grid gap-3 rounded-3xl border border-white/12 bg-white/5 p-4">
              <a
                href={agency.phoneHref}
                onClick={() => { tap(); setMenuOpen(false); }}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/90"
              >
                <Phone className="h-4 w-4" />
                {agency.phone}
              </a>
              <div className="grid grid-cols-2 gap-2">
                <LanguageSwitcher className="inline-flex justify-center border-white/12 bg-white/6 text-white hover:border-white/25 hover:bg-white/10 focus-visible:ring-white focus-visible:ring-offset-navy" />
                <ThemeToggle className="inline-flex justify-center border-white/12 bg-white/6 text-white hover:border-white/25 hover:bg-white/10 focus-visible:ring-white focus-visible:ring-offset-navy" />
              </div>
              <Link
                href="/quote"
                onClick={() => { haptic("nudge"); setMenuOpen(false); }}
                className="inline-flex items-center justify-center rounded-full bg-red px-5 py-3 text-sm font-bold text-white transition hover:bg-red-hover"
              >
                {tCta("getQuote")}
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
