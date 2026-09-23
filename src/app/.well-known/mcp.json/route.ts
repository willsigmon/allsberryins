import { NextResponse } from "next/server";

import { agency } from "@/lib/site-data";
import { absoluteUrl } from "@/lib/utils";
import { WEBMCP_TOOLS } from "@/lib/webmcp-tools";

export const dynamic = "force-static";

/**
 * Discovery document for AI agents: where the plain-text summaries live and
 * the read-only WebMCP tools the pages register in the browser.
 */
const manifest = {
  name: agency.name,
  description: `Independent insurance agency in Corona, California, serving Southern California households and businesses since ${agency.founded}.`,
  url: absoluteUrl("/"),
  contact: { phone: agency.phoneHref, email: agency.email },
  documentation: {
    llms: absoluteUrl("/llms.txt"),
    llmsFull: absoluteUrl("/llms-full.txt"),
  },
  webmcp: {
    transport: "in-page",
    api: "document.modelContext.registerTool",
    readOnly: true,
    tools: WEBMCP_TOOLS,
  },
  quote: {
    url: absoluteUrl("/quote"),
    note: "Quote requests are submitted by the visitor on the quote page; agents cannot submit them on the visitor's behalf.",
  },
};

export function GET() {
  return NextResponse.json(manifest, {
    headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
  });
}
