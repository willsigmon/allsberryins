"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { agency, navigation } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const syncTheme = () => {
      setResolvedTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
    };

    syncTheme();
    window.addEventListener("themechange", syncTheme as EventListener);

    return () => window.removeEventListener("themechange", syncTheme as EventListener);
  }, []);

  const solidHeader = pathname !== "/" || scrolled || menuOpen;
  const shouldUseLightChrome = solidHeader || resolvedTheme === "dark";
  const phoneClassName = shouldUseLightChrome
    ? "border-white/18 text-white hover:border-white/35 hover:bg-white/8"
    : "border-navy/10 bg-white/85 text-navy hover:border-blue/35 hover:text-blue";
  const menuButtonClassName = shouldUseLightChrome
    ? "border-white/18 text-white"
    : "border-navy/10 bg-white/85 text-navy shadow-sm";
  const themeButtonClassName = shouldUseLightChrome
    ? "border-white/18 text-white hover:border-white/35 hover:bg-white/8 focus-visible:ring-white focus-visible:ring-offset-navy"
    : "border-navy/10 bg-white/85 text-navy shadow-sm hover:border-blue/35 hover:text-blue focus-visible:ring-blue focus-visible:ring-offset-white";
  const logoSrc = shouldUseLightChrome
    ? "/media/brand/logos/allsberry-starlight.png"
    : "/media/brand/logos/allsberry-deep-blue.png";

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
        <Link href="/" className="flex items-center" aria-label="Allsberry Insurance Agency home">
          <Image
            src={logoSrc}
            alt="Allsberry Insurance Agency logo"
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
              className={cn(
                "text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                shouldUseLightChrome
                  ? "text-white/92 hover:text-white focus-visible:ring-white focus-visible:ring-offset-navy"
                  : "text-navy/86 hover:text-blue focus-visible:ring-blue focus-visible:ring-offset-white",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle className={themeButtonClassName} />
          <Link
            href={agency.phoneHref}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition",
              phoneClassName,
            )}
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
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((value) => !value)}
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
              <ThemeToggle className="inline-flex justify-center border-white/12 bg-white/6 text-white hover:border-white/25 hover:bg-white/10 focus-visible:ring-white focus-visible:ring-offset-navy" />
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
