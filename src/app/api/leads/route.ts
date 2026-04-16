import { NextResponse } from "next/server";

import { sendLeadEmail } from "@/lib/lead-email";
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

  return NextResponse.json({ success: true });
}
