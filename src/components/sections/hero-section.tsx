"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useState } from "react";

import { getIcon } from "@/components/ui/icon-registry";
import { SaveContactButton } from "@/components/ui/save-contact-button";
import {
  buildHeroProductPreferenceCookie,
  getMostUsedHeroProduct,
  heroProductPreferenceStorageKey,
} from "@/lib/hero-product-preferences";
import { getHeroHelpContent } from "@/lib/hero-help-content";
import {
  agency,
  heroProductSlugs,
  officialProfile,
  products,
  type ProductSlug,
} from "@/lib/site-data";
import { buildTrackedHref } from "@/lib/tracking";
import { cn } from "@/lib/utils";

const heroProducts = products.filter((p) => heroProductSlugs.includes(p.slug));
const cyclingWords = ["Home", "Auto", "Life", "Business"] as const;

function readHeroProductUsage() {
  if (typeof window === "undefined") {
    return {} as Partial<Record<ProductSlug, number>>;
  }

  try {
    const raw = window.localStorage.getItem(heroProductPreferenceStorageKey);

    if (!raw) {
      return {} as Partial<Record<ProductSlug, number>>;
    }

    const parsed = JSON.parse(raw) as Partial<Record<ProductSlug, number>>;

    return typeof parsed === "object" && parsed ? parsed : {};
  } catch {
    return {} as Partial<Record<ProductSlug, number>>;
  }
}

function rememberHeroProductSelection(productSlug: ProductSlug) {
  if (typeof window === "undefined") {
    return;
  }

  const usage = readHeroProductUsage();
  usage[productSlug] = (usage[productSlug] ?? 0) + 1;
  window.localStorage.setItem(heroProductPreferenceStorageKey, JSON.stringify(usage));
  document.cookie = buildHeroProductPreferenceCookie(getMostUsedHeroProduct(usage));
}

type HeroSectionProps = {
  initialProduct?: ProductSlug;
};

export function HeroSection({ initialProduct }: HeroSectionProps) {
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState<ProductSlug>(
    initialProduct ?? heroProducts[0]?.slug ?? "home",
  );
  const [zipCode, setZipCode] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setWordIndex((index) => (index + 1) % cyclingWords.length),
      2500,
    );
    return () => clearInterval(id);
  }, []);

  const selectedProductDetails =
    heroProducts.find((product) => product.slug === selectedProduct) ?? heroProducts[0];
  const selectedHelpContent = getHeroHelpContent(selectedProduct);

  const startQuote = () => {
    router.push(
      buildTrackedHref("/quote", {
        entry: `hero-zip-${selectedProduct}`,
        product: selectedProduct,
        zip: zipCode.trim() || undefined,
      }),
    );
  };

  const handleProductSelect = (productSlug: ProductSlug) => {
    setSelectedProduct(productSlug);
    rememberHeroProductSelection(productSlug);
  };

  return (
    <section className="grain-overlay relative overflow-hidden pt-28 sm:pt-32" style={{ backgroundImage: "var(--hero-bg)" }}>
      <div
        className="absolute inset-x-0 top-0 h-[38rem]"
        style={{ backgroundImage: "var(--hero-glow)" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-14">
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
          We Specialize in{" "}
          <span
            key={cyclingWords[wordIndex]}
            className="hero-word-enter text-gradient-animated"
            style={{ WebkitTextFillColor: "transparent" }}
          >
            {cyclingWords[wordIndex]}
          </span>{" "}
          Insurance
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Tell us what you need and we&apos;ll guide you to the right coverage.
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
              {heroProducts.map((product) => {
                const Icon = getIcon(product.icon);
                const isActive = selectedProduct === product.slug;
                return (
                  <button
                    key={product.slug}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => { if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(10); handleProductSelect(product.slug); }}
                    className={cn(
                      "inline-flex min-w-0 w-full items-center justify-center gap-1.5 rounded-full border px-3 py-2.5 text-[13px] font-semibold whitespace-nowrap transition-[background-color,border-color,color,box-shadow] duration-150 sm:text-sm",
                      isActive
                        ? "border-blue bg-navy text-white shadow-[0_10px_24px_-14px_rgba(0,32,92,0.55)]"
                        : "border-gray-200 bg-white text-gray-600 hover:border-blue hover:text-blue",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{product.shortName}</span>
                  </button>
                );
              })}
            </div>

            <div className="surface-card-strong mt-5 rounded-[1.75rem] border border-gray-100 p-5 shadow-[0_16px_48px_-36px_rgba(0,32,92,0.2)]">
              <h2 className="font-display text-xl font-extrabold text-gray-900 sm:text-2xl">
                {selectedHelpContent.headline}
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-600">
                {selectedHelpContent.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedHelpContent.quickReasons.map((reason) => (
                  <span
                    key={reason}
                    className="rounded-full border border-blue/10 bg-blue-light px-3 py-1.5 text-[11px] font-semibold text-blue"
                  >
                    {reason}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 grid auto-rows-fr gap-3 sm:grid-cols-2">
              <div className="flex flex-col justify-between rounded-[1.25rem] border border-blue/10 bg-blue-light/50 px-4 py-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue shadow-sm">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Bundle and save</p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Many clients save by combining home, auto, and other coverage into one plan. We&apos;ll show you the options.
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="h-3.5 w-3.5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                  <span className="ml-1.5 text-[11px] font-semibold text-gray-400">5,000+ protected</span>
                </div>
              </div>
              <Link
                href="/evidence-of-insurance"
                onClick={() => { if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(10); }}
                className="group flex flex-col justify-between rounded-[1.25rem] border border-gray-100 bg-white/70 px-4 py-4 transition hover:border-blue/20 hover:bg-blue-light/30"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy text-white shadow-sm">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Need proof instead?</p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      If your bank, landlord, or business partner needs insurance paperwork, skip the quote and request it here.
                    </p>
                  </div>
                </div>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-blue transition group-hover:gap-2.5">
                  Start proof request
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
          </div>

          {/* Right column — Erin's profile card only */}
          <div className="relative">
            <div className="ambient-glow absolute -left-8 top-8 hidden h-32 w-32 rounded-full bg-blue/14 blur-3xl sm:block" />
            <div className="ambient-glow absolute -right-8 bottom-8 hidden h-36 w-36 rounded-full bg-red/16 blur-[40px] sm:block" style={{ animationDelay: "2s" }} />

            <div className="shimmer-border relative overflow-hidden rounded-[2rem] p-[3px] shadow-[0_35px_90px_-48px_rgba(0,32,92,0.8)]">
              <div className="hero-profile-shell relative overflow-hidden rounded-[1.85rem] p-4 sm:p-5">
                <div className="hero-profile-inner relative rounded-[1.65rem] border p-4 text-white backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="relative h-18 w-18 shrink-0 overflow-hidden rounded-full border-2 border-white/30 shadow-[0_16px_38px_-18px_rgba(0,0,0,0.5)]">
                      <Image
                        src={officialProfile.headshot.src}
                        alt={officialProfile.headshot.alt}
                        width={72}
                        height={72}
                        priority
                        className="h-full w-full object-cover object-top"
                      />
                    </div>
                    <div className="flex flex-1 items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-display text-xl font-extrabold text-white">
                          Erin Allsberry
                        </p>
                        <p className="mt-0.5 text-xs font-medium text-white/70">
                          Owner & Principal Agent
                        </p>
                      </div>

                      {/* SoCal animated map pin */}
                      <div className="pin-drop flex flex-col items-center gap-1 pt-0.5">
                        <div className="relative flex h-10 w-10 items-center justify-center">
                          <span className="pin-pulse-ring absolute h-10 w-10 rounded-full bg-red/20" />
                          <span className="pin-pulse-ring absolute h-10 w-10 rounded-full bg-red/15" style={{ animationDelay: "1.5s" }} />
                          <MapPin className="relative h-6 w-6 fill-red text-red drop-shadow-[0_2px_4px_rgba(218,41,28,0.4)]" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/60">
                          Southern CA
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {officialProfile.badges.map((badge) => (
                      <div
                        key={badge.title}
                        className="hero-profile-glass flex items-center gap-2 rounded-[0.85rem] border px-2.5 py-2 backdrop-blur"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/95 p-1">
                          <Image
                            src={badge.image.src}
                            alt={badge.image.alt}
                            width={1258}
                            height={658}
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <p className="font-display text-[11px] font-bold leading-tight text-white">{badge.title}</p>
                      </div>
                    ))}
                  </div>

                  <div className="hero-profile-glass mt-2.5 overflow-hidden rounded-[0.85rem] border backdrop-blur">
                    <div className="flex items-center gap-3 p-2.5">
                      <div className="h-10 w-16 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={officialProfile.recognition[1].image.src}
                          alt={officialProfile.recognition[1].image.alt}
                          width={2395}
                          height={2252}
                          className="h-full w-full object-cover object-top"
                        />
                      </div>
                      <div>
                        <p className="font-display text-[11px] font-bold leading-tight text-white">
                          {officialProfile.recognition[1].title}
                        </p>
                        <p className="text-[10px] text-white/60">Farmers Insurance</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                    {officialProfile.highlights
                      .filter((h) => h.label !== "Service area" && h.label !== "Phone")
                      .map((highlight) => (
                      <div
                        key={highlight.label}
                        className="hero-profile-pill rounded-full border px-2.5 py-1 text-[10px] font-semibold text-white/75"
                      >
                        {highlight.value}
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Link
                      href={buildTrackedHref("/agents/erin", { agent: "erin", entry: "hero-leadership-card" })}
                      onClick={() => { if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(10); }}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-bold text-gray-900 transition hover:bg-blue-light"
                    >
                      Meet Erin
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <Link
                      href={agency.phoneHref}
                      onClick={() => { if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(10); }}
                      className="hero-profile-glass inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-bold text-white transition hover:brightness-110"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      Contact
                    </Link>
                    <SaveContactButton
                      name="Erin Allsberry"
                      phone={agency.phone}
                      email={agency.email}
                      title="Agency Owner & Principal Agent"
                      address="355 N Sheridan St, Ste 100, Corona, CA 92878"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ZIP Code form — under Erin's card */}
            <div className="surface-card mt-4 flex items-center gap-3 rounded-2xl border border-gray-100 p-3 shadow-[0_12px_36px_-24px_rgba(0,32,92,0.4)]">
              <input
                value={zipCode}
                onChange={(event) => setZipCode(event.target.value)}
                inputMode="numeric"
                placeholder="Enter ZIP code"
                className="h-11 flex-1 rounded-xl border border-gray-200 px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue focus:ring-4 focus:ring-blue/10"
              />
              <button
                type="button"
                onClick={() => { if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(10); startQuote(); }}
                className="cta-glow inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-red px-5 text-sm font-bold text-white transition-all hover:bg-red-hover hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red focus-visible:ring-offset-2"
              >
                Start Quote
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
