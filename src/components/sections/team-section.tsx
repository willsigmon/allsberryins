"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Globe, Handshake, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

import { SectionHeading } from "@/components/ui/section-heading";
import { Link } from "@/i18n/navigation";
import { press, tap } from "@/lib/haptics";
import {
  agents,
  fellows,
  primaryProducerSlug,
  type Agent,
  type AgentAccent,
} from "@/lib/site-data";
import { buildTrackedHref } from "@/lib/tracking";
import { cn } from "@/lib/utils";

const accentClasses: Record<AgentAccent, string> = {
  blue: "bg-[linear-gradient(145deg,#0066b3_0%,#5da7df_100%)]",
  navy: "bg-[linear-gradient(145deg,#00205c_0%,#33599d_100%)]",
  red: "bg-[linear-gradient(145deg,#da291c_0%,#f6685d_100%)]",
  purple: "bg-[linear-gradient(145deg,#7c3aed_0%,#a78bfa_100%)]",
  emerald: "bg-[linear-gradient(145deg,#059669_0%,#6ee7b7_100%)]",
  rose: "bg-[linear-gradient(145deg,#e11d48_0%,#fb7185_100%)]",
  slate: "bg-[linear-gradient(145deg,#475569_0%,#94a3b8_100%)]",
  indigo: "bg-[linear-gradient(145deg,#4338ca_0%,#818cf8_100%)]",
  teal: "bg-[linear-gradient(145deg,#0d9488_0%,#5eead4_100%)]",
  amber: "bg-[linear-gradient(145deg,#d97706_0%,#fbbf24_100%)]",
};

const ownerAgent = agents.find((a) => a.slug === "erin");
const primaryProducerAgent = agents.find((a) => a.slug === primaryProducerSlug);
const teamAgents = agents.filter(
  (a) => a.slug !== "erin" && a.slug !== primaryProducerSlug,
);

export function TeamSection() {
  const t = useTranslations("home.team");
  const bio = useTranslations("agents.bios");
  const fellowT = useTranslations("agents.fellows");

  return (
    <section className="section-muted-bg py-20 sm:py-24" id="team">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          align="center"
        />

        {ownerAgent && (
          <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="parallax-card relative mt-12 overflow-hidden rounded-[2.5rem] bg-[linear-gradient(160deg,#08214f_0%,#0c2d6b_20%,#0f3a87_50%,#2d7bc6_85%,#5da7df_100%)] p-8 text-white shadow-[0_32px_80px_-32px_rgba(0,32,92,0.7)] sm:p-10 lg:p-12"
          >
            <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-blue/8 blur-3xl" />
            <div className="absolute inset-x-0 top-0 h-1.5 bg-[linear-gradient(90deg,#ffffff_0%,rgba(255,255,255,0.75)_28%,rgba(245,197,24,0.92)_62%,#da291c_100%)]" />

            <div className="relative grid items-center gap-8 lg:grid-cols-[auto_1fr_auto]">
              {ownerAgent.photo ? (
                <div className="relative mx-auto h-32 w-32 shrink-0 overflow-hidden rounded-full border-[3px] border-white/30 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] lg:mx-0 lg:h-36 lg:w-36">
                  <Image
                    src={ownerAgent.photo.src}
                    alt={ownerAgent.photo.alt}
                    width={144}
                    height={144}
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              ) : (
                <div className={cn("mx-auto flex h-32 w-32 shrink-0 items-center justify-center rounded-full text-4xl font-display font-extrabold text-white shadow-xl lg:mx-0", accentClasses[ownerAgent.accent])}>
                  {ownerAgent.initials}
                </div>
              )}

              <div className="text-center lg:text-left">
                <h3 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                  {ownerAgent.name}
                </h3>
                <p className="mt-1.5 text-sm font-semibold uppercase tracking-[0.24em] text-white/70">
                  {ownerAgent.title}
                </p>
                <p className="mt-4 max-w-2xl text-base leading-7 text-white/80 lg:text-[15px]">
                  {bio(ownerAgent.slug)}
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start">
                  {ownerAgent.specialties.map((specialty) => (
                    <span key={specialty} className="rounded-full border border-white/14 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/86">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3 lg:flex-col">
                <a
                  href={`mailto:${ownerAgent.email}`}
                  className="glass-btn-dark inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white"
                  onClick={tap}
                >
                  <Mail className="h-4 w-4" />
                  {t("emailAgent", { name: ownerAgent.firstName })}
                </a>
                <Link
                  href={buildTrackedHref(`/agents/${ownerAgent.slug}`, { agent: ownerAgent.slug, entry: "owner-team-card" })}
                  className="cta-glow inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-gray-900 transition hover:bg-blue-light"
                  onClick={press}
                >
                  {t("meetAgent", { name: ownerAgent.firstName })}
                  <Handshake className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.article>
        )}

        {primaryProducerAgent ? (
          <div className="mt-6">
            <LeadershipCard agent={primaryProducerAgent} index={0} />
          </div>
        ) : null}

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamAgents.map((agent, index) => (
            <TeamMemberCard key={agent.slug} agent={agent} index={index} />
          ))}

          {fellows.map((fellow) => (
            <motion.div
              key={fellow.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="fellow-card-bg parallax-card relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-gold/20 p-5"
            >
              <div className="shimmer-border absolute inset-x-0 top-0 h-1 opacity-50" />
              <div className="flex items-center gap-4">
                {fellow.photo ? (
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-gold/30 shadow-lg">
                    <Image
                      src={fellow.photo.src}
                      alt={fellow.photo.alt}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                ) : (
                  <div className="ambient-glow flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(145deg,#b8860b_0%,#daa520_100%)] text-xl font-display font-extrabold text-white shadow-lg">
                    {fellow.initials}
                  </div>
                )}
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-bold text-gray-900">{fellow.name}</h3>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                    <Award className="mr-1 inline h-3 w-3" />
                    {t("fellowLabel")}
                  </p>
                </div>
              </div>
              <p className="mt-4 flex-1 text-sm leading-7 text-gray-600">
                {fellowT(`${fellow.slug}.career`)}
              </p>
              <p className="mt-3 text-xs leading-5 text-gray-400">
                <span className="font-semibold text-gold/90">{t("fellowDefinitionIntro")}</span>{" "}
                {t("fellowDefinition")}
              </p>
              <p className="mt-2 text-xs leading-5 text-gold/80 italic">
                {t("officeMomQuote")}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LeadershipCard({ agent, index }: { agent: Agent; index: number }) {
  const t = useTranslations("home.team");
  const bio = useTranslations("agents.bios");

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.08 }}
      className="parallax-card relative overflow-hidden rounded-[2rem] bg-[linear-gradient(160deg,#08214f_0%,#0c2d6b_25%,#0f3a87_55%,#2d7bc6_100%)] p-8 text-white shadow-[0_28px_70px_-32px_rgba(0,32,92,0.65),0_8px_20px_-8px_rgba(0,32,92,0.2)] lg:p-10"
    >
      <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-blue/10 blur-3xl" />
      <div className="absolute inset-x-0 top-0 h-1.5 bg-[linear-gradient(90deg,#ffffff_0%,rgba(255,255,255,0.75)_28%,rgba(245,197,24,0.92)_62%,#da291c_100%)]" />
      <div className="relative grid items-center gap-6 text-center sm:grid-cols-[auto_minmax(0,1fr)] sm:text-left lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-8">
        {agent.photo ? (
          <div className="relative mx-auto h-28 w-28 shrink-0 overflow-hidden rounded-full border-2 border-white/30 shadow-xl sm:mx-0">
            <Image
              src={agent.photo.src}
              alt={agent.photo.alt}
              width={112}
              height={112}
              className="h-full w-full object-cover object-top"
            />
          </div>
        ) : (
          <div
            className={cn(
              "mx-auto flex h-28 w-28 shrink-0 items-center justify-center rounded-full text-3xl font-display font-extrabold text-white shadow-xl sm:mx-0",
              accentClasses[agent.accent],
            )}
          >
            {agent.initials}
          </div>
        )}

        <div className="min-w-0">
          <h3 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            {agent.name}
          </h3>
          <p className="mt-1 text-sm font-semibold uppercase tracking-[0.24em] text-white/74">
            {agent.title}
          </p>
          {agent.languages && agent.languages.length > 1 && (
            <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-yellow-300">
              <Globe className="h-3.5 w-3.5" />
              {t("seHablaEspanol")}
            </p>
          )}
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/82">
            {bio(agent.slug)}
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-2 sm:justify-start">
            {agent.specialties.map((specialty) => (
              <span
                key={specialty}
                className="rounded-full border border-white/14 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/86"
              >
                {specialty}
              </span>
            ))}
          </div>

        </div>

        <div className="flex flex-wrap justify-center gap-3 sm:col-span-2 lg:col-span-1 lg:flex-col lg:items-stretch">
          <a
            href={`mailto:${agent.email}`}
            className="glass-btn-dark inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-white"
            aria-label={t("emailAgent", { name: agent.firstName })}
            onClick={tap}
          >
            <Mail className="h-4 w-4" />
            {t("emailAgent", { name: agent.firstName })}
          </a>
          <Link
            href={buildTrackedHref(`/agents/${agent.slug}`, {
              agent: agent.slug,
              entry: "primary-producer-team-card",
            })}
            className="cta-glow inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-gray-900 transition hover:bg-blue-light"
            onClick={press}
          >
            {t("meetAgent", { name: agent.firstName })}
            <Handshake className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

function TeamMemberCard({ agent, index }: { agent: Agent; index: number }) {
  const t = useTranslations("home.team");
  const bio = useTranslations("agents.bios");

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.42, ease: "easeOut", delay: index * 0.06 }}
      className="card-elevated parallax-card relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-gray-100 p-5"
    >
      <div className="brand-stripe absolute inset-x-0 top-0 h-1" />

      <div className="flex items-center gap-4">
        {agent.photo ? (
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-white shadow-lg">
            <Image
              src={agent.photo.src}
              alt={agent.photo.alt}
              width={64}
              height={64}
              className="h-full w-full object-cover object-top"
            />
          </div>
        ) : (
          <div
            className={cn(
              "flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-xl font-display font-extrabold text-white shadow-lg",
              accentClasses[agent.accent],
            )}
          >
            {agent.initials}
          </div>
        )}
        <div className="min-w-0">
          <h3 className="font-display text-lg font-bold text-gray-900">{agent.name}</h3>
          <p className="text-[11px] font-semibold text-blue">
            {agent.title}
          </p>
          {agent.languages && agent.languages.length > 1 && (
            <p className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-amber-600">
              <Globe className="h-3 w-3" />
              {t("seHablaEspanol")}
            </p>
          )}
        </div>
      </div>

      <p className="mt-4 flex-1 text-sm leading-7 text-gray-600">{bio(agent.slug)}</p>

      <Link
        href={buildTrackedHref(`/agents/${agent.slug}`, {
          agent: agent.slug,
          entry: "team-card-learn-more",
        })}
        className="mt-2 text-sm font-semibold text-blue transition hover:text-gray-900"
        onClick={tap}
      >
        {t("learnMore")} &rarr;
      </Link>

      <div className="mt-4 flex flex-wrap gap-3">
        <a
          href={`mailto:${agent.email}`}
          className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 transition hover:border-blue hover:text-blue"
          onClick={tap}
        >
          <Mail className="h-3.5 w-3.5" />
          {t("emailShort")}
        </a>
        <Link
            href={buildTrackedHref(`/agents/${agent.slug}`, {
            agent: agent.slug,
            entry: "team-card",
          })}
          className="inline-flex items-center gap-1.5 rounded-full bg-navy px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue"
          onClick={press}
        >
          <Handshake className="h-3.5 w-3.5" />
          {t("meetAgent", { name: agent.firstName })}
        </Link>
      </div>
    </motion.article>
  );
}
