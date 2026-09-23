/**
 * Read-only tools this site exposes to in-browser AI agents through WebMCP
 * (document.modelContext / navigator.modelContext). They only read public
 * business information already published on the site; none of them submits
 * a form, sends an email/SMS, or books anything.
 * Shared by <WebMcpProvider /> and /.well-known/mcp.json.
 */
export interface WebMcpToolSpec {
  readonly name: string;
  readonly description: string;
  readonly inputSchema: { readonly type: "object"; readonly properties: Record<string, unknown> };
}

export const WEBMCP_TOOLS: readonly WebMcpToolSpec[] = [
  {
    name: "get_agency_info",
    description:
      "Address, phone, email, hours, and CA license numbers for Allsberry Insurance Agency in Corona, CA.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "list_products",
    description:
      "Personal and commercial insurance products Allsberry Insurance Agency offers, with descriptions.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "list_agents",
    description: "Licensed agents on staff, with title, specialties, and languages spoken.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "list_carriers",
    description: "Insurance carrier partners Allsberry Insurance Agency shops for quotes.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "get_contact_options",
    description:
      "Ways to reach Allsberry Insurance Agency: quote request, evidence-of-insurance request, contact page, and review link.",
    inputSchema: { type: "object", properties: {} },
  },
];
