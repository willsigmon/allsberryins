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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const elevatedHeader = pathname !== "/" || scrolled || menuOpen;

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
        <Link href="/" className="flex items-center" aria-label="Allsberry Insurance Agency home">
          <Image
            src="/media/brand/logos/allsberry-starlight.png"
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
                "text-white/88 hover:text-white focus-visible:ring-white focus-visible:ring-offset-navy",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Link
            href={agency.phoneHref}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition",
              "border-white/18 text-white hover:border-white/35 hover:bg-white/8",
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
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/18 text-white md:hidden"
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
