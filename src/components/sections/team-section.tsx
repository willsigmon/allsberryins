"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Handshake, Mail } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { agents, type Agent, type AgentAccent } from "@/lib/site-data";
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
};

const leadershipSlugs = ["erin", "brahm"] as const;
const leadershipAgents = agents.filter((a) => (leadershipSlugs as readonly string[]).includes(a.slug));
const teamAgents = agents.filter((a) => !(leadershipSlugs as readonly string[]).includes(a.slug));

export function TeamSection() {
  return (
    <section className="section-muted-bg py-20 sm:py-24" id="team">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Meet our team"
          title="Local Agents Who Know Your Coverage"
          description="Every client gets a dedicated agent who listens, explains the tradeoffs clearly, and now has a direct shareable profile page for follow-up."
          align="center"
        />

        {/* Leadership row */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {leadershipAgents.map((agent, index) => (
            <LeadershipCard key={agent.slug} agent={agent} index={index} />
          ))}
        </div>

        {/* Full team grid */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamAgents.map((agent, index) => (
            <TeamMemberCard key={agent.slug} agent={agent} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LeadershipCard({ agent, index }: { agent: Agent; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.08 }}
      className="relative overflow-hidden rounded-[2rem] border border-gray-100 bg-[linear-gradient(160deg,#08214f_0%,#0f3a87_55%,#2d7bc6_100%)] p-8 text-white shadow-[0_24px_60px_-38px_rgba(0,32,92,0.62)]"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#ffffff_0%,rgba(255,255,255,0.75)_28%,rgba(245,197,24,0.92)_62%,#da291c_100%)]" />
      <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-start sm:text-left">
        {agent.photo ? (
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-white/30 shadow-xl">
            <Image
              src={agent.photo.src}
              alt={agent.photo.alt}
              width={96}
              height={96}
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div
            className={cn(
              "flex h-24 w-24 shrink-0 items-center justify-center rounded-full text-3xl font-display font-extrabold text-white shadow-xl",
              accentClasses[agent.accent],
            )}
          >
            {agent.initials}
          </div>
        )}

        <div>
          <h3 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            {agent.name}
          </h3>
          <p className="mt-1 text-sm font-semibold uppercase tracking-[0.24em] text-white/74">
            {agent.title}
          </p>
          {agent.languages && agent.languages.length > 1 && (
            <p className="mt-2 text-sm font-medium text-yellow-300">
              Se habla Español
            </p>
          )}
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/82">
            {agent.bio}
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

          <div className="mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
            <Link
              href={`mailto:${agent.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/24 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/10"
            >
              <Mail className="h-4 w-4" />
              Email
            </Link>
            <Link
              href={buildTrackedHref(`/agents/${agent.slug}`, {
                agent: agent.slug,
                entry: "leadership-team-card",
              })}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-gray-900 transition hover:bg-blue-light"
            >
              Meet {agent.firstName}
              <Handshake className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function TeamMemberCard({ agent, index }: { agent: Agent; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.42, ease: "easeOut", delay: index * 0.06 }}
      className="surface-card relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-gray-100 p-5 shadow-[0_18px_45px_-38px_rgba(0,32,92,0.5)]"
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
              className="h-full w-full object-cover"
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
        <div>
          <h3 className="font-display text-lg font-bold text-gray-900">{agent.name}</h3>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue">
            {agent.title}
          </p>
          {agent.languages && agent.languages.length > 1 && (
            <p className="mt-1 text-xs font-semibold text-amber-600">
              Se habla Español
            </p>
          )}
        </div>
      </div>

      <p className="mt-4 flex-1 text-sm leading-7 text-gray-600">{agent.bio}</p>

      <div className="mt-4 flex flex-wrap gap-3">
        <Link
          href={`mailto:${agent.email}`}
          className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 transition hover:border-blue hover:text-blue"
        >
          <Mail className="h-3.5 w-3.5" />
          Email
        </Link>
        <Link
          href={buildTrackedHref(`/agents/${agent.slug}`, {
            agent: agent.slug,
            entry: "team-card",
          })}
          className="inline-flex items-center gap-1.5 rounded-full bg-navy px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue"
        >
          <Handshake className="h-3.5 w-3.5" />
          Meet {agent.firstName}
        </Link>
      </div>
    </motion.article>
  );
}
