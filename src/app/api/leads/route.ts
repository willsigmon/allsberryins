import { NextResponse } from "next/server";

import { sendLeadEmail } from "@/lib/lead-email";
import { leadsApiSchema } from "@/lib/lead-schemas";

export async function POST(request: Request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON format." },
      { status: 400 },
    );
  }

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

  const emailResult = await sendLeadEmail(parsed.data);
  if (!emailResult.ok) {
    console.error("[api/leads] email delivery failed", emailResult);
    return NextResponse.json(
      { success: false, message: "We couldn't deliver your request. Please call or email us directly." },
      { status: 502 },
    );
  }

  console.info("[api/leads] lead delivered", {
    type: parsed.data.type,
    provider: emailResult.provider,
  });

  // Optional: Send lead data to Zapier webhook if configured
  const zapierUrl = process.env.ZAPIER_WEBHOOK_URL;
  if (zapierUrl) {
    try {
      const zapierResponse = await fetch(zapierUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...parsed.data,
          timestamp: new Date().toISOString(),
        }),
      });
      if (!zapierResponse.ok) {
        console.error("[api/leads] Zapier webhook failed", zapierResponse.status, zapierResponse.statusText);
      } else {
        console.info("[api/leads] Zapier webhook delivered successfully");
      }
    } catch (err) {
      console.error("[api/leads] Zapier webhook request error", err);
    }
  }

  return NextResponse.json({ success: true });
}
