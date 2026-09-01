import { NextResponse } from "next/server";

import { buildChatUnavailablePayload } from "@/lib/chat-response";
import { chatRequestSchema } from "@/lib/lead-schemas";
import { agency } from "@/lib/site-data";

const unavailable = () => buildChatUnavailablePayload(agency.phone, agency.email);

export async function GET() {
  return NextResponse.json(unavailable());
}

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

  // Vendor is not selected. Do not pretend a lead was captured.
  return NextResponse.json(unavailable(), { status: 501 });
}
