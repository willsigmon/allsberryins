import type { AgentSlug } from "@/lib/site-data";
import { buildTrackedHref } from "@/lib/tracking";
import { absoluteUrl } from "@/lib/utils";

export type AgentQrDestination = {
  absoluteUrl: string;
  entryLabel: string;
  href: string;
  isMainLandingPage: boolean;
};

const mainLandingQrAgents = new Set<AgentSlug>(["brahm"]);

export function getAgentQrDestination(agentSlug: AgentSlug): AgentQrDestination {
  const isMainLandingPage = mainLandingQrAgents.has(agentSlug);
  const href = isMainLandingPage
    ? "/"
    : buildTrackedHref(`/agents/${agentSlug}`, {
        agent: agentSlug,
        entry: "qr-profile",
      });

  return {
    absoluteUrl: absoluteUrl(href),
    entryLabel: isMainLandingPage ? "Main landing QR" : "Tracked profile QR",
    href,
    isMainLandingPage,
  };
}
