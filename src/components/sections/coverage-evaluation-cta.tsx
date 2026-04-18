"use client";

import { ArrowRight, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

import { haptic, press } from "@/lib/haptics";
import { agency, getAgentBySlug } from "@/lib/site-data";

const brahm = getAgentBySlug("brahm");

export function CoverageEvaluationCta() {
  const t = useTranslations("home.coverageEvaluation");
  const mailto = `mailto:${brahm?.email ?? agency.email}?subject=${encodeURIComponent(
    t("emailSubject"),
  )}&body=${encodeURIComponent(t("emailBody"))}`;

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="parallax-card relative overflow-hidden rounded-[2.25rem] bg-[linear-gradient(160deg,#6b0f12_0%,#da291c_45%,#e8534a_80%,#f09080_100%)] p-8 text-center text-white shadow-[0_24px_70px_-30px_rgba(180,20,20,0.5),0_8px_20px_-8px_rgba(218,41,28,0.3)] sm:p-10">
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/6 blur-3xl" />
          <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-white/4 blur-3xl" />
          <div className="relative mx-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em]">
            <ShieldCheck className="h-4 w-4" />
            {t("badge")}
          </div>

          <h2 className="mt-5 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            {t("heading")}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-white/80">
            {t("body")}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={mailto}
              className="cta-glow inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-gray-900 transition hover:bg-blue-light"
              onClick={() => { haptic("nudge"); }}
            >
              {t("emailCta")}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={agency.calendlyUrl}
              target="_blank"
              rel="noreferrer"
              className="glass-btn-dark inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white"
              onClick={() => { press(); }}
            >
              {t("scheduleCta")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
