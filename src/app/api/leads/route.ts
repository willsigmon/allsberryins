import { NextResponse } from "next/server";

import { leadsApiSchema } from "@/lib/lead-schemas";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = leadsApiSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        errors: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  if (parsed.data.honeypot) {
    return NextResponse.json({ success: true });
  }

  console.info("[api/leads] lead received", parsed.data);
  // TODO: Send lead data to AgencyZoom once integration credentials and endpoint details are confirmed.

  return NextResponse.json({ success: true });
}
