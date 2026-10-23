import { agency, carrierPartners, products, publicAgentRoster } from "@/lib/site-data";
import { absoluteUrl } from "@/lib/utils";
import { WEBMCP_TOOLS } from "@/lib/webmcp-tools";

type ToolResult = { content: { type: "text"; text: string }[] };
type Registration = { unregister?: () => void } | undefined;
export type ModelContext = {
  registerTool: (tool: Record<string, unknown>) => Registration;
  unregisterTool?: (name: string) => void;
};

const asResult = (data: unknown): ToolResult => ({
  content: [{ type: "text", text: JSON.stringify(data) }],
});

const handlers: Record<string, () => Promise<ToolResult>> = {
  get_agency_info: async () =>
    asResult({
      name: agency.name,
      address: agency.fullAddress,
      phone: agency.phone,
      email: agency.email,
      hours: agency.hours,
      licenses: agency.licenses,
      serviceArea: agency.serviceArea,
      quoteUrl: absoluteUrl("/quote"),
      googleReviewUrl: agency.googleReviewUrl,
    }),
  list_products: async () =>
    asResult(
      products.map((product) => ({
        name: product.name,
        category: product.category,
        description: product.description,
      })),
    ),
  list_agents: async () =>
    asResult(
      publicAgentRoster.map((agent) => ({
        name: agent.name,
        title: agent.title,
        specialties: agent.specialties,
        languages: agent.languages ?? [],
        license: agent.license,
        pageUrl: absoluteUrl(`/agents/${agent.slug}`),
      })),
    ),
  list_carriers: async () => asResult(carrierPartners.map((carrier) => carrier.name)),
  get_contact_options: async () =>
    asResult({
      quote: absoluteUrl("/quote"),
      evidenceOfInsurance: absoluteUrl("/evidence-of-insurance"),
      contact: absoluteUrl("/contact"),
      review: absoluteUrl("/review"),
      phone: agency.phone,
      email: agency.email,
    }),
};

export function registerWebMcpTools(modelContext: ModelContext) {
  const registrations = WEBMCP_TOOLS.map((tool) => {
    try {
      return {
        name: tool.name,
        handle: modelContext.registerTool({
          ...tool,
          annotations: { readOnlyHint: true },
          execute: handlers[tool.name],
        }),
      };
    } catch {
      return { name: tool.name, handle: undefined };
    }
  });

  return () => {
    registrations.forEach(({ name, handle }) => {
      if (handle?.unregister) handle.unregister();
      else modelContext.unregisterTool?.(name);
    });
  };
}
