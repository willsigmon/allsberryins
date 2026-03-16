"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BadgeCheck, MapPin, ShieldCheck, Sparkles, Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { getIcon } from "@/components/ui/icon-registry";
import { agency, heroProductSlugs, officialProfile, products } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const heroProducts = products.filter((p) => heroProductSlugs.includes(p.slug));
const CYCLING_WORDS = ["Home", "Auto", "Life", "Business"] as const;

export function HeroSection() {
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState(heroProducts[0]?.slug ?? "home");
  const [zipCode, setZipCode] = useState("");
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % CYCLING_WORDS.length), 2500);
    return () => clearInterval(id);
  }, []);

  const startQuote = () => {
    const p = new URLSearchParams();
    p.set("product", selectedProduct);
    if (zipCode.trim()) p.set("zip", zipCode.trim());
    router.push(`/quote?${p.toString()}`);
  };

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#eef6fd_100%)] pt-28 sm:pt-32">
      <div className="absolute inset-x-0 top-0 h-[38rem] bg-[radial-gradient(circle_at_top_right,rgba(0,102,179,0.18),transparent_34%),radial-gradient(circle_at_top_left,rgba(0,32,92,0.08),transparent_32%)]" />

      <div className="relative mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
        {/* ── Badge ── */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          className="inline-flex items-center gap-2 rounded-full border border-blue/10 bg-white/90 px-4 py-2 text-sm font-semibold text-navy shadow-sm"
        >
          <ShieldCheck className="h-4 w-4 text-blue" />
          Serving clients across Corona & the Inland Empire
        </motion.div>

        {/* ── Headline ── */}
        <motion.h1
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mt-3 font-display text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
        >
          We Specialize in{" "}
          <span className="relative inline-flex h-[1.18em] items-baseline overflow-hidden align-baseline">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={CYCLING_WORDS[wordIndex]}
                className="text-gradient"
                style={{ WebkitTextFillColor: "transparent" }}
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: "0%" }}
                exit={{ opacity: 0, y: "-100%" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {CYCLING_WORDS[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>{" "}
          Insurance
        </motion.h1>

        {/* ── Subtitle + trust pills ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.16 }}
          className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3"
        >
          <p className="max-w-xl text-lg leading-8 text-gray-600">
            Tell us what you need and we will guide you to the right coverage.
          </p>
          <div className="flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-100 bg-white px-4 py-2 text-sm font-semibold text-navy shadow-sm">
              <Sparkles className="h-4 w-4 text-blue" />
              Corona families & businesses
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-white px-4 py-2 text-sm font-semibold text-navy shadow-sm">
              <Star className="h-4 w-4 fill-gold text-gold" />
              Fast follow-up
            </div>
          </div>
        </motion.div>

        {/* ── Two-column: pills+CTA left, profile card right ── */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          {/* Left: product pills + helper text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.22 }}
              className="flex flex-wrap gap-2"
            >
              {heroProducts.map((product) => {
                const Icon = getIcon(product.icon);
                const isActive = selectedProduct === product.slug;
                return (
                  <button
                    key={product.slug}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setSelectedProduct(product.slug)}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all duration-200",
                      isActive
                        ? "border-blue bg-navy text-white shadow-[0_8px_24px_-10px_rgba(0,32,92,0.6)]"
                        : "border-gray-200 bg-white text-gray-700 hover:border-blue hover:text-blue",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {product.shortName}
                  </button>
                );
              })}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="mt-5 max-w-lg text-base leading-7 text-gray-500"
            >
              Select a coverage type and enter your ZIP to start a personalized quote in under two minutes.
            </motion.p>
          </div>

          {/* Right: profile card + ZIP */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="relative"
          >
            <div className="animate-float absolute -left-6 top-10 hidden h-24 w-24 rounded-full bg-blue/10 blur-2xl sm:block" />
            <div className="animate-float-delayed absolute -right-6 bottom-10 hidden h-28 w-28 rounded-full bg-red/12 blur-3xl sm:block" />

            {/* Shimmer border wrapper */}
            <div className="shimmer-border relative overflow-hidden rounded-[2rem] p-[3px] shadow-[0_35px_90px_-48px_rgba(0,32,92,0.8)]">
              <div className="relative overflow-hidden rounded-[1.85rem] bg-[linear-gradient(145deg,#0d2f73_0%,#0066b3_55%,#dbeafe_100%)] p-5 sm:p-6">
                <div className="relative rounded-[1.65rem] border border-white/20 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.32),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.24),rgba(255,255,255,0.08))] p-5 text-white backdrop-blur-sm">
                  <div className="flex items-center gap-2 rounded-full bg-white/14 px-4 py-2 text-sm font-semibold backdrop-blur-sm w-fit">
                    <MapPin className="h-4 w-4" />
                    Corona, California
                  </div>

                  <div className="mt-5 flex items-center gap-5">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-white/30 shadow-[0_16px_38px_-18px_rgba(0,0,0,0.5)]">
                      <Image src={officialProfile.headshot.src} alt={officialProfile.headshot.alt} width={96} height={96} priority className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/70">Agency leadership</p>
                      <p className="mt-1 font-display text-2xl font-extrabold text-white">Erin Allsberry</p>
                      <p className="mt-1 text-sm font-medium text-white/78">Owner & Principal Agent</p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {officialProfile.badges.map((badge) => (
                      <div key={badge.title} className="flex items-center gap-3 rounded-[1.2rem] border border-white/14 bg-white/10 px-4 py-3 backdrop-blur">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/95 p-1.5">
                          <Image src={badge.image.src} alt={badge.image.alt} width={badge.title.includes("Prime") ? 5111 : 1258} height={badge.title.includes("Prime") ? 5037 : 658} className="h-full w-full object-contain" />
                        </div>
                        <p className="font-display text-sm font-bold text-white">{badge.title}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 overflow-hidden rounded-[1.2rem] border border-white/14 bg-white/10 backdrop-blur">
                    <div className="flex items-center gap-4 p-4">
                      <div className="h-16 w-24 shrink-0 overflow-hidden rounded-xl">
                        <Image src={officialProfile.recognition[1].image.src} alt={officialProfile.recognition[1].image.alt} width={2395} height={2252} className="h-full w-full object-cover object-top" />
                      </div>
                      <div>
                        <p className="font-display text-sm font-bold text-white">{officialProfile.recognition[1].title}</p>
                        <p className="mt-1 text-xs leading-5 text-white/70">Farmers Insurance</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {officialProfile.highlights.map((h) => (
                      <div key={h.label} className="rounded-full border border-white/14 bg-white/8 px-3 py-1.5 text-xs font-semibold text-white/80">{h.value}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ZIP Code form */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: 0.58 }}
              className="mt-5 rounded-[2rem] border border-gray-100 bg-white p-5 shadow-[0_20px_60px_-42px_rgba(0,32,92,0.6)]"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                <label className="grid flex-1 gap-2 text-sm font-semibold text-gray-900">
                  ZIP Code
                  <input value={zipCode} onChange={(e) => setZipCode(e.target.value)} inputMode="numeric" placeholder="Enter ZIP code" className="h-13 rounded-2xl border border-gray-200 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue focus:ring-4 focus:ring-blue/10" />
                </label>
                <button type="button" onClick={startQuote} className="cta-glow inline-flex h-13 items-center justify-center gap-2 rounded-2xl bg-red px-8 text-base font-bold text-white transition hover:bg-red-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red focus-visible:ring-offset-2">
                  Start Quote
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-blue">
                <BadgeCheck className="h-4 w-4" />
                Savings Tip: Save more when you bundle!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
