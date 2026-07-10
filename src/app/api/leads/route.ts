import { NextResponse } from "next/server";

import { sendLeadEmail } from "@/lib/lead-email";
import { leadsApiSchema, leadTypeLabels } from "@/lib/lead-schemas";
import { normalizeSmsConsent, smsConsentDisclosureVersion } from "@/lib/sms-consent";

const zapierWebhookTimeoutMs = 8_000;

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

  const submittedAt = new Date().toISOString();
  const marketingTextOptIn = normalizeSmsConsent(parsed.data.marketingTextOptIn);
  const nonMarketingTextOptIn = normalizeSmsConsent(parsed.data.nonMarketingTextOptIn);
  const lead = {
    ...parsed.data,
    marketingTextOptIn,
    nonMarketingTextOptIn,
    consentCapturedAt:
      marketingTextOptIn || nonMarketingTextOptIn ? submittedAt : undefined,
    consentDisclosureVersion: smsConsentDisclosureVersion,
    consentSource: "website-form",
    submittedAt,
  };

  const emailResult = await sendLeadEmail(lead);
  if (!emailResult.ok) {
    console.error("[api/leads] email delivery failed", emailResult);
    return NextResponse.json(
      { success: false, message: "We couldn't deliver your request. Please call or email us directly." },
      { status: 502 },
    );
  }

  console.info("[api/leads] lead delivered", {
    type: lead.type,
    provider: emailResult.provider,
  });

  // Optional: forward the lead to Zapier (the website "spoke" of the lead pipeline).
  // Zapier normalizes this payload and routes it to AgencyZoom plus future CRM branches.
  // `source` and `leadTypeLabel` are stamped here so the downstream Zap can segment
  // website leads from provider-email leads.
  const zapierUrl = process.env.ZAPIER_WEBHOOK_URL;
  if (zapierUrl) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), zapierWebhookTimeoutMs);

    try {
      const zapierResponse = await fetch(zapierUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...lead,
          source: "website",
          leadTypeLabel: leadTypeLabels[lead.type],
          timestamp: submittedAt,
        }),
        signal: controller.signal,
      });
      if (!zapierResponse.ok) {
        console.error("[api/leads] Zapier webhook failed", zapierResponse.status, zapierResponse.statusText);
      } else {
        console.info("[api/leads] Zapier webhook delivered successfully");
      }
    } catch (err) {
      const reason = err instanceof DOMException && err.name === "AbortError" ? "timeout" : "request-error";
      console.error("[api/leads] Zapier webhook request error", { reason });
    } finally {
      clearTimeout(timeout);
    }
  }

  return NextResponse.json({ success: true });
}
