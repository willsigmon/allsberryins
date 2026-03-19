"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import {
  Check,
  Copy,
  Download,
  ExternalLink,
  QrCode,
  Route,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

import {
  buildSiteLeadsLabel,
  createTeamTrackingContext,
  defaultSiteLeadsConfig,
  mergeTeamTrackingContext,
  siteLeadsSessionKey,
  type SiteLeadsConfig,
  type TeamTrackingContext,
} from "@/lib/tracking";

type AgentLinkSet = {
  directUrl: string;
  name: string;
  proofUrl: string;
  quoteUrl: string;
  slug: string;
  title: string;
};

type AttributionWorkbenchProps = {
  agents: AgentLinkSet[];
};

type DebugState = {
  activeContext: TeamTrackingContext;
  currentContext: TeamTrackingContext;
  label: string;
  storedContext?: TeamTrackingContext;
  trackerConfig: SiteLeadsConfig;
};

function readStoredTrackingContext() {
  try {
    const rawValue = window.sessionStorage.getItem(siteLeadsSessionKey);

    if (!rawValue) {
      return undefined;
    }

    return JSON.parse(rawValue) as TeamTrackingContext;
  } catch {
    return undefined;
  }
}

function getTrackerConfig() {
  const appWindow = window as Window & {
    __SITELEADS_CONFIG?: SiteLeadsConfig;
  };

  return appWindow.__SITELEADS_CONFIG ?? defaultSiteLeadsConfig;
}

export function AttributionWorkbench({ agents }: AttributionWorkbenchProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const debugState = useSyncExternalStore(subscribeToBrowserState, getDebugSnapshot, () => null);

  const workbookExport = useMemo(() => {
    if (!debugState) {
      return null;
    }

    return buildWorkbookExport(debugState, agents);
  }, [agents, debugState]);

  const copyText = async (value: string, key: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedKey(key);
    setStatusMessage("Copied to clipboard.");
    window.setTimeout(() => {
      setCopiedKey((current) => (current === key ? null : current));
      setStatusMessage((current) => (current ? null : current));
    }, 2200);
  };

  const copyAllLinks = async () => {
    const text = agents
      .map((agent) => {
        return [
          `${agent.name} — ${agent.title}`,
          `Profile: ${agent.directUrl}`,
          `Quote: ${agent.quoteUrl}`,
          `Proof: ${agent.proofUrl}`,
        ].join("\n");
      })
      .join("\n\n");

    await navigator.clipboard.writeText(text);
    setStatusMessage("Copied all team links.");
    window.setTimeout(() => setStatusMessage((current) => (current ? null : current)), 2400);
  };

  const downloadWorkbook = () => {
    if (!workbookExport) {
      return;
    }

    const blob = new Blob([JSON.stringify(workbookExport, null, 2)], {
      type: "application/json;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `allsberry-team-attribution-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    setStatusMessage("Downloaded workbook JSON.");
    window.setTimeout(() => setStatusMessage((current) => (current ? null : current)), 2400);
  };

  return (
    <div className="grid gap-8">
      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-blue/10 bg-white p-6 shadow-[0_18px_45px_-38px_rgba(0,32,92,0.45)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-light px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue">
              <ShieldCheck className="h-4 w-4" />
              Team readout
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              <Sparkles className="h-4 w-4" />
              Internal QA only
            </div>
          </div>

          <h2 className="mt-4 font-display text-3xl font-extrabold text-gray-900">
            Live attribution snapshot
          </h2>
          <p className="mt-3 text-sm leading-7 text-gray-600">
            This is a clean QA readout and link builder so the team can confirm attribution is
            sticking to the right agent and entry point before a lead lands.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={copyAllLinks}
              className="inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue"
            >
              <Copy className="h-4 w-4" />
              Copy all links
            </button>
            <button
              type="button"
              onClick={downloadWorkbook}
              disabled={!workbookExport}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-blue hover:text-blue disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Download className="h-4 w-4" />
              Download JSON
            </button>
            {statusMessage ? (
              <p className="text-sm font-medium text-gray-500" role="status" aria-live="polite">
                {statusMessage}
              </p>
            ) : null}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <DebugTile
              label="Tracker label ID"
              value={debugState?.trackerConfig.labelId ?? "Loading…"}
            />
            <DebugTile
              label="Active agent"
              value={debugState?.activeContext.agentSlug ?? "No agent in session"}
            />
            <DebugTile
              label="Entry point"
              value={debugState?.activeContext.entryPoint ?? "No stored entry"}
            />
            <DebugTile
              label="Current page"
              value={debugState?.activeContext.pageType ?? "Loading…"}
            />
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-gray-100 bg-gray-50 px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              QA checklist
            </p>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-gray-600 sm:grid-cols-2">
              <li>• Confirm the active agent matches the intended team member.</li>
              <li>• Confirm the entry point is preserved after navigation.</li>
              <li>• Use copy-all before handing the links to sales or print.</li>
              <li>• Download JSON when you need a quick handoff or audit trail.</li>
            </ul>
          </div>
        </div>

        <div className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-[0_18px_45px_-38px_rgba(0,32,92,0.45)]">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue">
            <Route className="h-4 w-4" />
            Resolved payload
          </div>
          <p className="mt-3 text-sm leading-7 text-gray-600">
            What the tracker sees right now. Handy for checking if the Siteleads label and route
            context are being stitched together the way we expect.
          </p>
          <div className="mt-5 grid gap-4">
            <DebugTile
              label="Live Siteleads label"
              value={debugState?.label ?? "Loading…"}
              mono
            />
            <DebugTile
              label="Current route context"
              value={JSON.stringify(debugState?.currentContext ?? {}, null, 2)}
              mono
            />
            <DebugTile
              label="Stored session context"
              value={JSON.stringify(debugState?.storedContext ?? {}, null, 2)}
              mono
            />
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-[0_18px_45px_-38px_rgba(0,32,92,0.45)]">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue">
          <Users className="h-4 w-4" />
          Agent link builder
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-600">
          These are the clean tracked URLs the team can use in texts, emails, QR codes, or print
          materials. Each one carries the agent plus a readable entry point so the follow-up path
          stays obvious.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {agents.map((agent) => (
            <article
              key={agent.slug}
              className="rounded-[1.8rem] border border-gray-100 bg-gray-50 p-5 shadow-[0_16px_40px_-34px_rgba(0,32,92,0.35)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl font-bold text-gray-900">{agent.name}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue">
                    {agent.title}
                  </p>
                </div>
                <div className="rounded-[1.4rem] border border-gray-200 bg-white p-2">
                  <QRCodeSVG
                    value={agent.directUrl}
                    size={92}
                    fgColor="#00205C"
                    bgColor="#ffffff"
                    includeMargin
                  />
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                <LinkRow
                  copied={copiedKey === `${agent.slug}-profile`}
                  label="Direct profile / QR"
                  value={agent.directUrl}
                  onCopy={() => copyText(agent.directUrl, `${agent.slug}-profile`)}
                />
                <LinkRow
                  copied={copiedKey === `${agent.slug}-quote`}
                  label="Quote flow"
                  value={agent.quoteUrl}
                  onCopy={() => copyText(agent.quoteUrl, `${agent.slug}-quote`)}
                />
                <LinkRow
                  copied={copiedKey === `${agent.slug}-proof`}
                  label="Proof request flow"
                  value={agent.proofUrl}
                  onCopy={() => copyText(agent.proofUrl, `${agent.slug}-proof`)}
                />
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function subscribeToBrowserState(callback: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  window.addEventListener("storage", callback);
  window.addEventListener("popstate", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("popstate", callback);
  };
}

function getDebugSnapshot(): DebugState | null {
  if (typeof window === "undefined") {
    return null;
  }

  const url = new URL(window.location.href);
  const currentContext = createTeamTrackingContext(
    url.pathname,
    url.searchParams.toString(),
    window.location.href,
  );
  const storedContext = readStoredTrackingContext();
  const activeContext = mergeTeamTrackingContext(currentContext, storedContext);
  const trackerConfig = getTrackerConfig();

  return {
    activeContext,
    currentContext,
    label: buildSiteLeadsLabel(trackerConfig.labelId, activeContext),
    storedContext,
    trackerConfig,
  };
}

function DebugTile({
  label,
  mono = false,
  value,
}: {
  label: string;
  mono?: boolean;
  value: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-gray-100 bg-gray-50 px-4 py-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">{label}</p>
      <pre
        className={`mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-gray-900 ${mono ? "font-mono" : "font-semibold"}`}
      >
        {value}
      </pre>
    </div>
  );
}

function LinkRow({
  copied,
  label,
  onCopy,
  value,
}: {
  copied: boolean;
  label: string;
  onCopy: () => void;
  value: string;
}) {
  return (
    <div className="rounded-[1.4rem] border border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-gray-900">{label}</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCopy}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:border-blue hover:text-blue"
            aria-label={`Copy ${label}`}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
          <a
            href={value}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:border-blue hover:text-blue"
            aria-label={`Open ${label}`}
          >
            {label.toLowerCase().includes("qr") ? (
              <QrCode className="h-4 w-4" />
            ) : (
              <ExternalLink className="h-4 w-4" />
            )}
          </a>
        </div>
      </div>
      <p className="mt-3 break-all text-xs leading-6 text-gray-500">{value}</p>
    </div>
  );
}

function buildWorkbookExport(debugState: DebugState, agents: AgentLinkSet[]) {
  return {
    generatedAt: new Date().toISOString(),
    label: debugState.label,
    trackerConfig: debugState.trackerConfig,
    contexts: {
      active: debugState.activeContext,
      current: debugState.currentContext,
      stored: debugState.storedContext ?? null,
    },
    agents: agents.map((agent) => ({
      name: agent.name,
      slug: agent.slug,
      title: agent.title,
      directUrl: agent.directUrl,
      quoteUrl: agent.quoteUrl,
      proofUrl: agent.proofUrl,
    })),
  };
}
