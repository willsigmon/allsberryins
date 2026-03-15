"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, CheckCircle2, MapPin, ShieldCheck, Sparkles, Star } from "lucide-react";
import { useMemo, useState } from "react";

import { getIcon } from "@/components/ui/icon-registry";
import { agency, heroProductSlugs, officialProfile, products } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const heroProducts = products.filter((product) => heroProductSlugs.includes(product.slug));
const heroStats = [
  { label: "Serving Inland Empire", value: "Since 1994" },
  { label: "Official public profile", value: "Corona, CA" },
  { label: "Specialized focus", value: "Home • Auto • Business • Life" },
];

export function HeroSection() {
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState(heroProducts[0]?.slug ?? "home");
  const [zipCode, setZipCode] = useState("");

  const activeProduct = useMemo(
    () => heroProducts.find((product) => product.slug === selectedProduct) ?? heroProducts[0],
    [selectedProduct],
  );

  const startQuote = () => {
    const params = new URLSearchParams();
    params.set("product", selectedProduct);
    if (zipCode.trim()) {
      params.set("zip", zipCode.trim());
    }
    router.push(`/quote?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#eef6fd_100%)] pt-32 sm:pt-36">
      <div className="absolute inset-x-0 top-0 h-[38rem] bg-[radial-gradient(circle_at_top_right,rgba(0,102,179,0.18),transparent_34%),radial-gradient(circle_at_top_left,rgba(0,32,92,0.08),transparent_32%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-20 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:px-8 lg:pb-24">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-blue/10 bg-white/90 px-4 py-2 text-sm font-semibold text-navy shadow-sm"
          >
            <ShieldCheck className="h-4 w-4 text-blue" />
            Serving clients across Corona & the Inland Empire
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
            className="mt-6 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
          >
            We Specialize in <span className="text-blue">Home</span>,{" "}
            <span className="text-blue">Auto</span>, and <span className="text-blue">Business</span>{" "}
            Insurance
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.16 }}
            className="mt-5 max-w-2xl text-lg leading-8 text-gray-600"
          >
            What are you looking to protect? Pick the coverage you need and we will point you toward a quote that feels tailored, not templated.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
            className="mt-6 flex flex-wrap gap-3"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-100 bg-white px-4 py-2 text-sm font-semibold text-navy shadow-sm">
              <Sparkles className="h-4 w-4 text-blue" />
              Custom coverage guidance for Corona families and businesses
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-white px-4 py-2 text-sm font-semibold text-navy shadow-sm">
              <Star className="h-4 w-4 fill-gold text-gold" />
              Clean experience. Fast follow-up.
            </div>
          </motion.div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {heroProducts.map((product, index) => {
              const Icon = getIcon(product.icon);
              const isActive = activeProduct.slug === product.slug;

              return (
                <motion.button
                  key={product.slug}
                  type="button"
                  aria-pressed={isActive}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut", delay: 0.18 + index * 0.1 }}
                  onClick={() => setSelectedProduct(product.slug)}
                  className={cn(
                    "group relative rounded-3xl border p-5 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2",
                    isActive
                      ? "border-blue bg-white shadow-[0_22px_45px_-30px_rgba(0,102,179,0.45)]"
                      : "border-gray-100 bg-white/80 hover:-translate-y-1 hover:border-blue/60 hover:shadow-[0_18px_40px_-34px_rgba(0,32,92,0.55)]",
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-light text-blue">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CheckCircle2
                      className={cn(
                        "h-6 w-6 transition",
                        isActive ? "text-blue" : "text-gray-200 group-hover:text-blue/55",
                      )}
                    />
                  </div>
                  <h2 className="mt-4 font-display text-xl font-bold text-gray-900">{product.shortName}</h2>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{product.description}</p>
                </motion.button>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: "easeOut", delay: 0.58 }}
            className="mt-8 rounded-[2rem] border border-gray-100 bg-white p-4 shadow-[0_20px_60px_-42px_rgba(0,32,92,0.6)]"
          >
            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <label className="grid gap-2 text-sm font-semibold text-gray-900">
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
                className="mt-7 inline-flex h-13 items-center justify-center gap-2 rounded-2xl bg-red px-6 text-base font-bold text-white transition hover:bg-red-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red focus-visible:ring-offset-2"
              >
                Start Quote
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-blue">
              <BadgeCheck className="h-4 w-4" />
              Savings Tip: Save more when you bundle!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.66 }}
            className="mt-6 grid gap-3 sm:grid-cols-3"
          >
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[1.6rem] border border-white bg-white/90 px-5 py-4 shadow-[0_20px_45px_-40px_rgba(0,32,92,0.6)] backdrop-blur"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">{stat.label}</p>
                <p className="mt-2 font-display text-lg font-extrabold text-gray-900">{stat.value}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -left-6 top-10 hidden h-24 w-24 rounded-full bg-blue/10 blur-2xl sm:block" />
          <div className="absolute -right-6 bottom-10 hidden h-28 w-28 rounded-full bg-red/12 blur-3xl sm:block" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-[linear-gradient(145deg,#0d2f73_0%,#0066b3_55%,#dbeafe_100%)] p-6 shadow-[0_35px_90px_-48px_rgba(0,32,92,0.8)] sm:p-8 lg:p-10">
            <div className="relative rounded-[1.65rem] border border-white/20 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.32),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.24),rgba(255,255,255,0.08))] p-5 text-white backdrop-blur-sm sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 rounded-full bg-white/14 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
                  <MapPin className="h-4 w-4" />
                  Corona, California
                </div>
                <div className="rounded-full border border-white/18 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
                  Public profile highlights
                </div>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
                <div className="relative overflow-hidden rounded-[1.8rem] border border-white/14 bg-white/10 p-3 shadow-[0_24px_60px_-34px_rgba(0,0,0,0.45)] backdrop-blur">
                  <div className="relative overflow-hidden rounded-[1.45rem]">
                    <Image
                      src={officialProfile.headshot.src}
                      alt={officialProfile.headshot.alt}
                      width={500}
                      height={500}
                      priority
                      className="h-[23rem] w-full object-cover sm:h-[25rem]"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(0,32,92,0)_0%,rgba(0,32,92,0.88)_74%,rgba(0,32,92,0.96)_100%)] p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/70">
                        Agency leadership
                      </p>
                      <p className="mt-2 font-display text-2xl font-extrabold text-white">
                        Erin Allsberry
                      </p>
                      <p className="mt-1 text-sm font-medium text-white/78">
                        Owner & Principal Agent
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4">
                  {officialProfile.recognition.map((item) => (
                    <div
                      key={item.title}
                      className="overflow-hidden rounded-[1.55rem] border border-white/14 bg-white/10 p-3 shadow-[0_18px_45px_-30px_rgba(0,0,0,0.45)] backdrop-blur"
                    >
                      <div className="overflow-hidden rounded-[1.2rem]">
                        <Image
                          src={item.image.src}
                          alt={item.image.alt}
                          width={item.title.includes("District") ? 2395 : 3264}
                          height={item.title.includes("District") ? 2252 : 1958}
                          className="h-36 w-full object-cover"
                        />
                      </div>
                      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-white/72">
                        Public media
                      </p>
                      <p className="mt-2 font-display text-lg font-bold text-white">{item.title}</p>
                      <p className="mt-2 text-sm leading-6 text-white/78">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {officialProfile.badges.map((badge) => (
                  <div
                    key={badge.title}
                    className="flex items-center gap-4 rounded-[1.5rem] border border-white/14 bg-white/10 px-4 py-3 shadow-[0_16px_38px_-30px_rgba(0,0,0,0.45)] backdrop-blur"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/95 p-2">
                      <Image
                        src={badge.image.src}
                        alt={badge.image.alt}
                        width={badge.title.includes("Prime") ? 5111 : 1258}
                        height={badge.title.includes("Prime") ? 5037 : 658}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/68">
                        Recognition
                      </p>
                      <p className="mt-1 font-display text-lg font-bold text-white">
                        {badge.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {officialProfile.productIcons.map((icon) => (
                  <div
                    key={icon.label}
                    className="flex items-center gap-3 rounded-2xl border border-white/14 bg-white/10 px-4 py-3 text-left shadow-[0_16px_38px_-30px_rgba(0,0,0,0.45)] backdrop-blur"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/92">
                      <Image
                        src={icon.src}
                        alt={icon.alt}
                        width={30}
                        height={30}
                        className="h-7 w-7 object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/65">
                        Quote line
                      </p>
                      <p className="mt-1 font-semibold text-white">{icon.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {officialProfile.highlights.map((highlight) => (
                  <div
                    key={highlight.label}
                    className="rounded-2xl border border-white/14 bg-white/10 px-4 py-3 shadow-[0_16px_38px_-30px_rgba(0,0,0,0.45)] backdrop-blur"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/68">
                      {highlight.label}
                    </p>
                    <p className="mt-1 font-display text-lg font-bold text-white">{highlight.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-gray-600">
            <span className="rounded-full bg-white px-4 py-2 shadow-sm">{agency.fullName}</span>
            <span className="rounded-full bg-white px-4 py-2 shadow-sm">Farmers Insurance agency in Corona, California</span>
            <span className="rounded-full bg-white px-4 py-2 shadow-sm">Official profile highlights and recognition</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
