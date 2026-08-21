"use client";

import Image from "next/image";
import { ArrowRight, Check, Clock3, MapPin, Phone, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Link } from "@/i18n/navigation";
import { allsberryCampaign } from "@/lib/allsberry-campaign";
import { agency } from "@/lib/site-data";

declare global {
  interface Window {
    fbq?: (action: string, event: string, parameters?: Record<string, string>) => void;
  }
}

type AllsberryAgencyCampaignProps = {
  googleAdsSendTo?: string;
};

const carrierLogos = [
  { name: "Farmers", src: "/media/carriers/farmers.png" },
  { name: "Bristol West", src: "/media/carriers/bristol-west.png" },
  { name: "Foremost", src: "/media/carriers/foremost.png" },
  { name: "Progressive", src: "/media/carriers/progressive.png" },
] as const;

function reportCallIntent(location: string, googleAdsSendTo?: string) {
  window.gtag?.("event", "campaign_call_click", {
    campaign: "allsberry-agency",
    location,
  });

  if (googleAdsSendTo) {
    window.gtag?.("event", "conversion", { send_to: googleAdsSendTo });
  }

  window.fbq?.("track", "Lead", {
    content_name: "phone_call",
    content_category: location,
  });
}

function CallLink({
  location,
  googleAdsSendTo,
  compact = false,
}: {
  location: string;
  googleAdsSendTo?: string;
  compact?: boolean;
}) {
  return (
    <a
      href={allsberryCampaign.phoneHref}
      data-campaign-call
      onClick={() => reportCallIntent(location, googleAdsSendTo)}
      className={
        compact
          ? "inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-bold text-white shadow-[0_12px_30px_-18px_rgba(0,32,92,0.8)] transition hover:bg-blue focus-visible:outline-white"
          : "inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-[1.1rem] bg-navy px-6 py-4 text-lg font-extrabold text-white shadow-[0_20px_45px_-20px_rgba(0,32,92,0.75)] transition hover:-translate-y-0.5 hover:bg-blue sm:w-auto"
      }
      aria-label={`Call Allsberry Insurance Agency at ${allsberryCampaign.phone}`}
    >
      <Phone className={compact ? "h-4 w-4" : "h-5 w-5"} aria-hidden="true" />
      {compact ? "Call an agent" : `Call ${allsberryCampaign.phone}`}
    </a>
  );
}

export function AllsberryAgencyCampaign({ googleAdsSendTo }: AllsberryAgencyCampaignProps) {
  const heroCallRef = useRef<HTMLDivElement>(null);
  const [showStickyCall, setShowStickyCall] = useState(false);

  useEffect(() => {
    const target = heroCallRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyCall(!entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="campaign-shell relative overflow-hidden bg-[#f7f9fc] text-gray-900">
      <section className="relative overflow-hidden border-b border-blue/10 bg-[linear-gradient(155deg,#ffffff_0%,#e8f0f8_62%,#dceafa_100%)] pt-28 sm:pt-32">
        <div className="campaign-grid absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 pb-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:pb-20">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue/15 bg-white/85 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-navy">
              <MapPin className="h-4 w-4 text-red" aria-hidden="true" />
              Corona-based · Serving California
            </div>
            <h1 className="mt-6 max-w-3xl text-balance font-display text-[clamp(2.55rem,7vw,5.2rem)] font-extrabold leading-[0.98] tracking-[-0.055em] text-gray-900">
              California home insurance starts with one clear conversation.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600 sm:text-xl">
              {allsberryCampaign.description}
            </p>
            <div ref={heroCallRef} className="mt-8">
              <CallLink location="hero" googleAdsSendTo={googleAdsSendTo} />
              <p className="mt-3 text-sm font-medium text-gray-600">
                Prefer not to call?{" "}
                <Link className="font-bold text-blue underline underline-offset-4" href="/quote">
                  Request a quote online
                </Link>
                .
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-gray-700">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-blue" aria-hidden="true" />
                Licensed California agency
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 className="h-5 w-5 text-blue" aria-hidden="true" />
                {agency.hours}
              </span>
            </div>
          </div>

          <aside className="relative mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end" aria-label="Your local Allsberry agent">
            <div className="absolute -inset-7 rounded-full bg-blue/15 blur-3xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-navy p-3 shadow-[0_35px_90px_-45px_rgba(0,32,92,0.85)]">
              <div className="relative min-h-[31rem] overflow-hidden rounded-[1.45rem] bg-[linear-gradient(180deg,#0c4a86_0%,#00205c_100%)]">
                <Image
                  src="/media/agents/erin-allsberry.png"
                  alt="Erin Allsberry, agency owner in Corona, California"
                  width={491}
                  height={571}
                  priority
                  className="absolute inset-x-0 bottom-0 h-[62%] w-full object-contain object-bottom"
                />
                <div className="absolute inset-x-0 top-0 p-7 text-white">
                  <Image
                    src="/media/brand/aia-logo-full.png"
                    alt="Allsberry Insurance Agency"
                    width={210}
                    height={120}
                    className="h-auto w-36 rounded-xl bg-white p-2"
                  />
                  <p className="mt-5 font-display text-2xl font-extrabold">A real local team picks up.</p>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-white/78">
                    Get straightforward guidance about your property and the available next steps.
                  </p>
                </div>
                <div className="absolute inset-x-4 bottom-4 rounded-[1.15rem] border border-white/15 bg-navy/88 p-4 text-white shadow-lg backdrop-blur-md">
                  <p className="font-display text-xl font-extrabold">Erin Allsberry</p>
                  <p className="mt-1 text-sm text-white/75">Agency Owner · CA License #0E91043</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-b border-gray-200 bg-white py-8" aria-label="Available insurance carriers">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
            Coverage options from recognized carriers
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-7 sm:gap-10">
            {carrierLogos.map((carrier) => (
              <div key={carrier.name} className="flex min-h-14 min-w-28 items-center justify-center">
                <Image
                  src={carrier.src}
                  alt={carrier.name}
                  width={96}
                  height={48}
                  className="h-12 w-24 object-contain"
                />
              </div>
            ))}
          </div>
          <p className="mx-auto mt-4 max-w-2xl text-center text-xs leading-5 text-gray-500">
            Carrier availability and eligibility vary by applicant, property, underwriting, and location.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue">Start with what you need</p>
              <h2 className="mt-4 font-display text-4xl font-extrabold tracking-[-0.04em] text-gray-900 sm:text-5xl">
                One call, with the right context.
              </h2>
              <p className="mt-5 text-base leading-7 text-gray-600">
                Tell the team what is changing, what coverage you have now, and where the property is located. They will explain the appropriate next step.
              </p>
            </div>
            <div className="grid gap-4">
              {allsberryCampaign.coverageOptions.map((option, index) => (
                <a
                  key={option.title}
                  href={allsberryCampaign.phoneHref}
                  data-campaign-call
                  onClick={() => reportCallIntent(`coverage-${index + 1}`, googleAdsSendTo)}
                  className="group grid min-h-32 gap-4 rounded-[1.5rem] border border-gray-200 bg-white p-6 shadow-[0_22px_55px_-45px_rgba(0,32,92,0.55)] transition hover:-translate-y-0.5 hover:border-blue/35 sm:grid-cols-[auto_1fr_auto] sm:items-center"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-light text-lg font-extrabold text-navy">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block font-display text-xl font-extrabold text-gray-900">{option.title}</span>
                    <span className="mt-2 block text-sm leading-6 text-gray-600">{option.description}</span>
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy text-white transition group-hover:bg-blue">
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy py-14 text-white sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-light">What happens next</p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-extrabold tracking-[-0.035em] sm:text-4xl">
              Bring the address and your current policy if you have one. We will help you understand the options.
            </h2>
            <ul className="mt-6 grid gap-3 text-sm text-white/80 sm:grid-cols-3">
              {["Explain the property", "Review current coverage", "Discuss available next steps"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="h-5 w-5 shrink-0 text-blue-light" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <CallLink location="closing" googleAdsSendTo={googleAdsSendTo} />
        </div>
      </section>

      <section className="bg-white px-4 py-10 text-center text-xs leading-6 text-gray-500 sm:px-6">
        <p className="mx-auto max-w-4xl">
          Allsberry Insurance Agency Inc · {agency.fullAddress} · {agency.licenses}. Coverage is subject to carrier terms, underwriting eligibility, and availability. Coverage cannot be bound, altered, or canceled through this page or an email message unless confirmed by the agency.
        </p>
        <p className="mt-3">
          <Link className="font-bold text-gray-700 underline underline-offset-4" href="/privacy">Privacy Policy</Link>
          <span aria-hidden="true"> · </span>
          <Link className="font-bold text-gray-700 underline underline-offset-4" href="/terms">Terms of Service</Link>
        </p>
      </section>

      <div
        className={`fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white/95 px-4 py-3 shadow-[0_-18px_55px_-35px_rgba(0,32,92,0.7)] backdrop-blur-xl transition duration-300 motion-reduce:transition-none ${showStickyCall ? "translate-y-0" : "translate-y-full"}`}
        aria-hidden={!showStickyCall}
      >
        <div className="mx-auto flex max-w-md items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-extrabold text-gray-900">Talk with an Allsberry agent</p>
            <p className="text-xs text-gray-500">{allsberryCampaign.phone}</p>
          </div>
          <CallLink location="sticky" googleAdsSendTo={googleAdsSendTo} compact />
        </div>
      </div>
    </div>
  );
}
