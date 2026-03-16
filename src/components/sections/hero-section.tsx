"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, CheckCircle2, MapPin, ShieldCheck } from "lucide-react";
import { useState } from "react";

import { getIcon } from "@/components/ui/icon-registry";
import { agency, agents, heroProductSlugs, products } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const heroProducts = products.filter((p) => heroProductSlugs.includes(p.slug));
const erin = agents.find((agent) => agent.slug === "erin");
const brahm = agents.find((agent) => agent.slug === "brahm");

export function HeroSection() {
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState(heroProducts[0]?.slug ?? "home");
  const [zipCode, setZipCode] = useState("");

  const startQuote = () => {
    const p = new URLSearchParams();
    p.set("product", selectedProduct);
    if (zipCode.trim()) {
      p.set("zip", zipCode.trim());
    }
    router.push(`/quote?${p.toString()}`);
  };

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#eef6fd_100%)] pt-28 sm:pt-32">
      <div className="absolute inset-x-0 top-0 h-[36rem] bg-[radial-gradient(circle_at_top_right,rgba(0,102,179,0.18),transparent_34%),radial-gradient(circle_at_top_left,rgba(0,32,92,0.08),transparent_32%)]" />

      <div className="relative mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
        {/* ── Agency header pill ── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="inline-flex items-center rounded-full border border-blue/12 bg-white/85 px-4 py-2 text-sm font-semibold text-navy shadow-sm"
        >
          <ShieldCheck className="mr-2 h-4 w-4 text-blue" />
          Allsberry Insurance Agency • Serving Corona &amp; Inland Empire
        </motion.div>

        {/* ── Headline ── */}
        <motion.h1
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.07 }}
          className="mt-3 font-display text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
        >
          We Specialize in{" "}
          <span className="text-blue">Home</span>, <span className="text-blue">Auto</span>, and{" "}
          <span className="text-blue">Business</span> Insurance
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="mt-4 max-w-2xl text-lg leading-8 text-gray-600"
        >
          What are you looking to protect? Choose a coverage type, add your ZIP code, and we&apos;ll
          take you straight to a quote with that option already selected.
        </motion.p>

        {/* ── Product cards + form + trusted social proof chips ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.24 }}
          className="mt-8 grid gap-4 sm:grid-cols-2"
        >
          {heroProducts.map((product, index) => {
            const Icon = getIcon(product.icon);
            const isActive = selectedProduct === product.slug;
            return (
              <motion.button
                key={product.slug}
                type="button"
                aria-pressed={isActive}
                onClick={() => setSelectedProduct(product.slug)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.34, delay: 0.3 + index * 0.08 }}
                className={cn(
                  "group relative overflow-hidden rounded-[1.6rem] border p-5 text-left transition-all duration-200",
                  isActive
                    ? "border-blue bg-navy text-white shadow-[0_24px_55px_-32px_rgba(0,32,92,0.7)]"
                    : "border-gray-100 bg-white text-gray-700 shadow-[0_16px_36px_-30px_rgba(0,32,92,0.35)] hover:-translate-y-0.5 hover:border-blue/40 hover:shadow-[0_24px_50px_-30px_rgba(0,102,179,0.26)]",
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div
                    className={cn(
                      "flex h-14 w-14 items-center justify-center rounded-2xl border transition",
                      isActive
                        ? "border-white/14 bg-white/10 text-white"
                        : "border-blue/10 bg-blue-light text-blue",
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <CheckCircle2
                    className={cn(
                      "h-5 w-5 transition",
                      isActive ? "text-white" : "text-gray-300 group-hover:text-blue/55",
                    )}
                  />
                </div>
                <p
                  className={cn(
                    "mt-5 font-display text-xl font-bold",
                    isActive ? "text-white" : "text-gray-900",
                  )}
                >
                  {product.shortName}
                </p>
                <p className={cn("mt-2 text-sm leading-7", isActive ? "text-white/76" : "text-gray-600")}>
                  {product.description}
                </p>
              </motion.button>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, delay: 0.45 }}
          className="mt-6 rounded-[1.6rem] border border-gray-100 bg-white p-5 shadow-[0_20px_60px_-42px_rgba(0,32,92,0.6)]"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <label className="grid flex-1 gap-2 text-sm font-semibold text-gray-900">
              ZIP Code
              <input
                type="text"
                value={zipCode}
                onChange={(event) => setZipCode(event.target.value)}
                inputMode="numeric"
                maxLength={10}
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
          <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-blue">
            <BadgeCheck className="h-4 w-4" />
            Bundle up for potential savings by comparing with your agent team.
          </p>
          <div className="mt-4 grid gap-2 text-sm font-semibold text-gray-600 sm:flex sm:flex-wrap sm:gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-100 bg-blue-light px-3 py-1.5">
              <MapPin className="h-4 w-4 text-blue" />
              355 N Sheridan St, Ste 100
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-100 bg-blue-light px-3 py-1.5">
              <ShieldCheck className="h-4 w-4 text-blue" />
              {agency.phone} • {agency.hours}
            </span>
          </div>
        </motion.div>

        {/* ── Right: agency team visual ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mt-10 lg:hidden"
        >
          <div className="rounded-[1.6rem] border border-blue/12 bg-white p-5 shadow-[0_24px_70px_-46px_rgba(0,32,92,0.5)]">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue">
                Serving Corona &amp; the Inland Empire
              </p>
              <span className="text-xs font-semibold text-gray-500">Allsberry Insurance Agency</span>
            </div>
            <p className="mt-3 text-xl font-display font-bold text-gray-900">
              Trusted local support for families, drivers, and business owners.
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Home. Auto. Business. Life. Clear answers, fast follow-up, and one local team.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.26 }}
          className="relative mt-10 hidden lg:block"
        >
          <div className="absolute -left-6 top-10 h-24 w-24 rounded-full bg-blue/10 blur-2xl" />
          <div className="absolute -right-6 bottom-10 h-28 w-28 rounded-full bg-red/12 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-blue/12 bg-[linear-gradient(145deg,#0d2f73_0%,#0066b3_55%,#dbeafe_100%)] p-6 shadow-[0_35px_90px_-48px_rgba(0,32,92,0.8)]">
            <div className="relative rounded-[1.5rem] border border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.26),rgba(255,255,255,0.08))] p-6 text-white backdrop-blur-sm">
              <div className="flex flex-col gap-6 sm:grid sm:grid-cols-[auto_1fr] sm:items-start">
                <div className="flex items-center">
                  {erin?.photo ? (
                    <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-white/30 shadow-[0_16px_38px_-18px_rgba(0,0,0,0.5)]">
                      <Image
                        src={erin.photo.src}
                        alt={erin.photo.alt}
                        width={96}
                        height={96}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : null}
                  {brahm?.photo ? (
                    <div className="-ml-5 relative h-24 w-24 overflow-hidden rounded-full border-2 border-white/30 shadow-[0_16px_38px_-18px_rgba(0,0,0,0.5)]">
                      <Image
                        src={brahm.photo.src}
                        alt={brahm.photo.alt}
                        width={96}
                        height={96}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : null}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/75">Allsberry Insurance Agency</p>
                  <p className="mt-1 font-display text-2xl font-extrabold text-white">Local agency team in Corona</p>
                  <p className="mt-1 text-sm text-white/78">
                    Serving families and businesses across the Inland Empire since {agency.founded}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  "Home • Auto • Business • Life",
                  "Farmers Agency Network",
                  "Dedicated licensed agent support",
                  "Claims and renewal help from one local team",
                ].map((badge) => (
                  <div
                    key={badge}
                    className="rounded-[1rem] border border-white/14 bg-white/10 px-4 py-3 text-sm text-white"
                  >
                    {badge}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
