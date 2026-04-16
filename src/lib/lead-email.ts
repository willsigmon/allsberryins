import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

import { agency } from "@/lib/site-data";

type LeadPayload = Record<string, unknown> & { type: string };

type SendResult =
  | { ok: true; provider: "smtp" | "log" }
  | { ok: false; provider: "smtp"; error: string };

const LEAD_TYPE_LABELS: Record<string, string> = {
  "quote-request": "Quote Request",
  "agent-contact": "Agent Contact",
  "evidence-request": "Evidence of Insurance Request",
};

function formatValue(value: unknown): string {
  if (value === null || value === undefined || value === "") return "—";
  if (Array.isArray(value)) return value.join(", ") || "—";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

function renderTextBody(lead: LeadPayload): string {
  const entries = Object.entries(lead)
    .filter(([key]) => key !== "honeypot")
    .map(([key, value]) => `${key}: ${formatValue(value)}`);
  return entries.join("\n");
}

function renderHtmlBody(lead: LeadPayload): string {
  const rows = Object.entries(lead)
    .filter(([key]) => key !== "honeypot")
    .map(
      ([key, value]) =>
        `<tr><td style="padding:6px 12px;border:1px solid #e5e7eb;font-weight:600;background:#f8fafc;">${escapeHtml(key)}</td><td style="padding:6px 12px;border:1px solid #e5e7eb;">${escapeHtml(formatValue(value))}</td></tr>`,
    )
    .join("");
  const label = LEAD_TYPE_LABELS[lead.type] ?? "Lead";
  return `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#0f172a;">
<h2 style="margin:0 0 12px;">New ${escapeHtml(label)}</h2>
<p style="margin:0 0 16px;color:#475569;">Submitted via ${escapeHtml(agency.domain)}</p>
<table style="border-collapse:collapse;width:100%;max-width:640px;font-size:14px;">${rows}</table>
</body></html>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function leadSubject(lead: LeadPayload): string {
  const label = LEAD_TYPE_LABELS[lead.type] ?? "Website Lead";
  const name =
    typeof lead.firstName === "string" && typeof lead.lastName === "string"
      ? `${lead.firstName} ${lead.lastName}`
      : typeof lead.name === "string"
        ? lead.name
        : "Website Visitor";
  return `[Allsberry Site] ${label} — ${name}`;
}

let cachedTransporter: Transporter | undefined;

function getTransporter(): Transporter | undefined {
  if (cachedTransporter) return cachedTransporter;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) return undefined;

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  return cachedTransporter;
}

export async function sendLeadEmail(lead: LeadPayload): Promise<SendResult> {
  const toEmail = process.env.LEADS_TO_EMAIL ?? agency.email;
  const fromEmail = process.env.LEADS_FROM_EMAIL ?? process.env.SMTP_USER ?? agency.email;
  const replyTo =
    typeof lead.email === "string" && lead.email.includes("@") ? lead.email : undefined;

  const transporter = getTransporter();
  if (!transporter) {
    console.info("[lead-email] SMTP not configured — logging lead only", {
      type: lead.type,
      to: toEmail,
    });
    return { ok: true, provider: "log" };
  }

  try {
    await transporter.sendMail({
      from: `Allsberry Site <${fromEmail}>`,
      to: toEmail,
      subject: leadSubject(lead),
      text: renderTextBody(lead),
      html: renderHtmlBody(lead),
      replyTo,
    });
    return { ok: true, provider: "smtp" };
  } catch (error) {
    console.error("[lead-email] SMTP send failed", error);
    return {
      ok: false,
      provider: "smtp",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
