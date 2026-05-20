import { NextResponse } from "next/server";

import { agency } from "@/lib/site-data";
import { chatRequestSchema } from "@/lib/lead-schemas";

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

  const parsed = chatRequestSchema.safeParse(body);
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

  // TODO: Replace this stub with the real AI chatbot provider and guardrail logic.

  return NextResponse.json({
    success: true,
    message: `Thanks for reaching out! One of our agents will be in touch shortly. For immediate help, call us at ${agency.phone}.`,
  });
}
