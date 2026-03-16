import { NextResponse } from "next/server";

import { leadsApiSchema } from "@/lib/lead-schemas";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch (error) {
    console.error("[api/leads] invalid request body", error);
    return NextResponse.json(
      { success: false, error: "Invalid request payload." },
      { status: 400 },
    );
  }

  const parsed = leadsApiSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "Invalid request payload." },
      { status: 400 },
    );
  }

  if (parsed.data.honeypot?.trim()) {
    return NextResponse.json({ success: true });
  }

  console.info("[api/leads] lead received", {
    type: parsed.data.type,
    productCount: parsed.data.type === "quote-request" ? parsed.data.products.length : undefined,
    agentSlug: parsed.data.type === "agent-contact" ? parsed.data.agentSlug : undefined,
    submittedAt: new Date().toISOString(),
  });
  // TODO: Send lead data to AgencyZoom once integration credentials and endpoint details are confirmed.

  return NextResponse.json({ success: true });
}
