"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";

import { getIcon } from "@/components/ui/icon-registry";
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
const heroProductPreferenceKey = "allsberry-hero-product-usage";
const supportModes = [
  {
    id: "quote",
    label: "I need a quote",
    description: "Preselect the right form and route.",
  },
  {
    id: "proof",
    label: "I need evidence of insurance",
    description: "Use the documentation request flow.",
  },
] as const;

type SupportMode = (typeof supportModes)[number]["id"];

function readHeroProductUsage() {
  if (typeof window === "undefined") {
    return {} as Partial<Record<ProductSlug, number>>;
  }

  try {
    const raw = window.localStorage.getItem(heroProductPreferenceKey);

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
  window.localStorage.setItem(heroProductPreferenceKey, JSON.stringify(usage));
}

function getPreferredHeroProduct() {
  const usage = readHeroProductUsage();

  return heroProducts.reduce<ProductSlug>((currentBest, product) => {
    const currentCount = usage[currentBest] ?? 0;
    const nextCount = usage[product.slug] ?? 0;

    return nextCount > currentCount ? product.slug : currentBest;
  }, heroProducts[0]?.slug ?? "home");
}

export function HeroSection() {
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState<ProductSlug>(
    heroProducts[0]?.slug ?? "home",
  );
  const [zipCode, setZipCode] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [supportMode, setSupportMode] = useState<SupportMode>("quote");

  useEffect(() => {
    const id = setInterval(
      () => setWordIndex((index) => (index + 1) % cyclingWords.length),
      2500,
    );
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const preferredProduct = getPreferredHeroProduct();

    if (preferredProduct === selectedProduct) {
      return;
    }

    const animationFrame = window.requestAnimationFrame(() => {
      setSelectedProduct(preferredProduct);
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [selectedProduct]);

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
    <section className="relative overflow-hidden pt-28 sm:pt-32" style={{ backgroundImage: "var(--hero-bg)" }}>
      <div
        className="absolute inset-x-0 top-0 h-[38rem]"
        style={{ backgroundImage: "var(--hero-glow)" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue/10 bg-white/90 px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm">
          <ShieldCheck className="h-4 w-4 text-blue" />
          Serving families and businesses across Southern California
        </div>

        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
          We Specialize in{" "}
          <span
            key={cyclingWords[wordIndex]}
            className="text-gradient transition-opacity duration-300"
            style={{ WebkitTextFillColor: "transparent" }}
          >
            {cyclingWords[wordIndex]}
          </span>{" "}
          Insurance
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
          <p className="max-w-xl text-lg leading-8 text-gray-600">
            Tell us what you need and we will guide you to the right coverage.
          </p>
          <div className="flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-100 bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm">
              <Sparkles className="h-4 w-4 text-blue" />
              SoCal families & businesses
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm">
              <Star className="h-4 w-4 fill-gold text-gold" />
              Fast follow-up
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-100 bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm">
              <BadgeCheck className="h-4 w-4 text-blue" />
              Flexible coverage
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">
              {heroProducts.map((product) => {
                const Icon = getIcon(product.icon);
                const isActive = selectedProduct === product.slug;
                return (
                  <button
                    key={product.slug}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => handleProductSelect(product.slug)}
                    className={cn(
                      "inline-flex w-full items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-all duration-200",
                      isActive
                        ? "border-blue bg-navy text-white shadow-[0_8px_24px_-10px_rgba(0,32,92,0.6)]"
                        : "border-gray-200 bg-white text-gray-600 hover:border-blue hover:text-blue",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {product.shortName}
                  </button>
                );
              })}
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-400">
              These shortcuts also tune the panel below, and this browser will gradually default to
              the coverage people use most.
            </p>

            <div className="surface-card-strong mt-6 rounded-[2rem] border border-gray-100 p-4 shadow-[0_20px_60px_-42px_rgba(0,32,92,0.22)] sm:p-5">
              <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,17rem)] lg:items-start">
                <div className="lg:min-h-[8.25rem]">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue">
                    How can we help?
                  </p>
                  <h2 className="mt-2 min-h-[3.75rem] font-display text-2xl font-extrabold text-gray-900 sm:text-[1.9rem]">
                    {selectedHelpContent.headline}
                  </h2>
                  <p className="mt-2 min-h-[3.25rem] max-w-2xl text-sm leading-6 text-gray-600 sm:text-[15px]">
                    {selectedHelpContent.description}
                  </p>
                </div>
                <fieldset className="w-full">
                  <legend className="sr-only">Choose the type of help you need</legend>
                  <div
                    role="radiogroup"
                    aria-label="Choose the type of help you need"
                    className="grid gap-2 sm:grid-cols-2"
                  >
                    {supportModes.map((mode) => {
                      const active = supportMode === mode.id;

                      return (
                        <button
                          key={mode.id}
                          type="button"
                          role="radio"
                          aria-checked={active}
                          onClick={() => setSupportMode(mode.id)}
                          className={cn(
                            "min-h-[4.25rem] rounded-[1.25rem] border px-3 py-2 text-left transition",
                            active
                              ? "border-blue bg-blue-light text-gray-900 shadow-[0_18px_36px_-28px_rgba(0,102,179,0.3)]"
                              : "border-gray-200 bg-white text-gray-600 hover:border-blue/35 hover:text-gray-900",
                          )}
                        >
                          <span className="block text-sm font-bold">{mode.label}</span>
                          <span className="mt-1 block text-[11px] leading-4 text-gray-400">
                            {mode.description}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              </div>

              <div className="mt-4 min-h-[4.5rem] rounded-[1.35rem] border border-blue/10 bg-blue-light px-3.5 py-2.5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue">
                  {selectedProductDetails?.shortName ?? "Coverage"} quick starts
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {selectedHelpContent.quickReasons.map((reason) => (
                    <span
                      key={reason}
                      className="rounded-full border border-white/12 bg-white/70 px-2.5 py-1 text-[11px] font-semibold text-gray-900"
                    >
                      {reason}
                    </span>
                  ))}
                </div>
              </div>

              <ul className="mt-4 grid auto-rows-fr gap-3 md:grid-cols-3" role="list">
                {selectedHelpContent.cards.map((card) => {
                  const Icon = getIcon(card.icon);
                  const action = supportMode === "quote" ? card.quote : card.proof;
                  const href = buildTrackedHref(action.href, {
                    audience: action.audience,
                    entry: action.entry,
                    product: action.product ?? selectedProduct,
                  });
                  const ctaLabel = action.label;

                  return (
                    <li key={card.id}>
                      <Link
                        href={href}
                        className="surface-card group flex h-full min-h-[14rem] flex-col rounded-[1.55rem] border border-gray-100 p-4 shadow-[0_18px_44px_-36px_rgba(0,32,92,0.38)] transition hover:-translate-y-1 hover:border-blue/30 hover:shadow-[0_24px_50px_-34px_rgba(0,102,179,0.3)]"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-light text-blue">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="mt-4 min-h-[3rem] font-display text-xl font-bold leading-tight text-gray-900">
                          {card.title}
                        </h3>
                        <p className="mt-2.5 min-h-[5.5rem] flex-1 text-sm leading-6 text-gray-600">
                          {card.description}
                        </p>
                        <div className="mt-4 inline-flex items-center gap-2 pt-1 text-[13px] font-semibold text-blue transition group-hover:gap-3">
                          {ctaLabel}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-4 grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="rounded-[1.35rem] border border-gray-100 bg-white/70 p-3.5 lg:min-h-[6.5rem]">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue">
                    Most common next step
                  </p>
                  <p className="mt-2 text-xs leading-6 text-gray-600 sm:text-sm">
                    {selectedHelpContent.helperText}
                  </p>
                </div>
                <div className="surface-card rounded-[1.35rem] border border-gray-100 p-3.5 lg:min-h-[6.5rem]">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue">
                    Selected line
                  </p>
                  <p className="mt-2 text-xs leading-6 text-gray-600 sm:text-sm">
                    We&apos;ll keep the quote flow centered on{" "}
                    <span className="font-semibold text-gray-900">
                      {selectedProductDetails?.name ?? "the selected coverage"}
                    </span>{" "}
                    unless one of the tailored cards above intentionally routes to a better-fit intake.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="animate-float absolute -left-6 top-10 hidden h-24 w-24 rounded-full bg-blue/10 blur-2xl sm:block" />
            <div className="animate-float-delayed absolute -right-6 bottom-10 hidden h-28 w-28 rounded-full bg-red/12 blur-3xl sm:block" />

            <div className="shimmer-border relative overflow-hidden rounded-[2rem] p-[3px] shadow-[0_35px_90px_-48px_rgba(0,32,92,0.8)]">
              <div className="hero-profile-shell relative overflow-hidden rounded-[1.85rem] p-5 sm:p-6">
                <div className="hero-profile-inner relative rounded-[1.65rem] border p-5 text-white backdrop-blur-sm">
                  <div className="hero-profile-glass flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold backdrop-blur-sm">
                    <MapPin className="h-4 w-4" />
                    Southern California
                  </div>

                  <div className="mt-5 flex items-center gap-5">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-white/30 shadow-[0_16px_38px_-18px_rgba(0,0,0,0.5)]">
                      <Image
                        src={officialProfile.headshot.src}
                        alt={officialProfile.headshot.alt}
                        width={96}
                        height={96}
                        priority
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/70">
                        Agency leadership
                      </p>
                      <p className="mt-1 font-display text-2xl font-extrabold text-white">
                        Erin Allsberry
                      </p>
                      <p className="mt-1 text-sm font-medium text-white/78">
                        Owner & Principal Agent
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {officialProfile.badges.map((badge) => (
                      <div
                        key={badge.title}
                        className="hero-profile-glass flex items-center gap-3 rounded-[1.2rem] border px-4 py-3 backdrop-blur"
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/95 p-1.5">
                          <Image
                            src={badge.image.src}
                            alt={badge.image.alt}
                            width={1258}
                            height={658}
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <p className="font-display text-sm font-bold text-white">{badge.title}</p>
                      </div>
                    ))}
                  </div>

                  <div className="hero-profile-glass mt-4 overflow-hidden rounded-[1.2rem] border backdrop-blur">
                    <div className="flex items-center gap-4 p-4">
                      <div className="h-16 w-24 shrink-0 overflow-hidden rounded-xl">
                        <Image
                          src={officialProfile.recognition[1].image.src}
                          alt={officialProfile.recognition[1].image.alt}
                          width={2395}
                          height={2252}
                          className="h-full w-full object-cover object-top"
                        />
                      </div>
                      <div>
                        <p className="font-display text-sm font-bold text-white">
                          {officialProfile.recognition[1].title}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-white/70">Farmers Insurance</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {officialProfile.highlights.map((highlight) => (
                      <div
                        key={highlight.label}
                        className="hero-profile-pill rounded-full border px-3 py-1.5 text-xs font-semibold text-white/80"
                      >
                        {highlight.value}
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href={buildTrackedHref("/agents/erin", {
                        agent: "erin",
                        entry: "hero-leadership-card",
                      })}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-gray-900 transition hover:bg-blue-light"
                    >
                      Meet Erin
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href={agency.phoneHref}
                      className="hero-profile-glass inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-bold text-white transition hover:brightness-110"
                    >
                      <Phone className="h-4 w-4" />
                      Contact Erin
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="surface-card mt-5 rounded-[2rem] border border-gray-100 p-5 shadow-[0_20px_60px_-42px_rgba(0,32,92,0.6)]">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                <label className="grid flex-1 gap-2 text-sm font-semibold text-gray-900">
                  ZIP Code
                  <input
                    value={zipCode}
                    onChange={(event) => setZipCode(event.target.value)}
                    inputMode="numeric"
                    placeholder="Enter ZIP code"
                    className="h-13 rounded-2xl border border-gray-200 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue focus:ring-4 focus:ring-blue/10"
                  />
                </label>
                <button
                  type="button"
                  onClick={startQuote}
                  className="cta-glow inline-flex h-13 items-center justify-center gap-2 rounded-2xl bg-red px-8 text-base font-bold text-white transition hover:bg-red-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red focus-visible:ring-offset-2"
                >
                  Start Quote
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-3 flex flex-col gap-2 text-sm font-medium text-blue sm:flex-row sm:items-center sm:justify-between">
                <p className="inline-flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4" />
                  {selectedProductDetails?.shortName ?? "Coverage"} shoppers often save more when they
                  bundle.
                </p>
                <Link
                  href={buildTrackedHref("/evidence-of-insurance", {
                    audience: selectedHelpContent.cards[0]?.proof.audience,
                    entry: `hero-proof-inline-${selectedProduct}`,
                    product: selectedProduct,
                  })}
                  className="inline-flex items-center gap-2 font-semibold text-blue transition hover:text-gray-900"
                >
                  <Mail className="h-4 w-4" />
                  Need proof instead?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
