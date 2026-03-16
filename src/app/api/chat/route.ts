import { NextResponse } from "next/server";

import { chatRequestSchema } from "@/lib/lead-schemas";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch (error) {
    console.error("[api/chat] invalid request body", error);
    return NextResponse.json(
      {
        message:
          "Thanks for reaching out! One of our agents will be in touch shortly. For immediate help, call us at (951) 739-5959.",
        error: "Invalid request payload.",
      },
      { status: 400 },
    );
  }

  const parsed = chatRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message:
          "Thanks for reaching out! One of our agents will be in touch shortly. For immediate help, call us at (951) 739-5959.",
        error: "Invalid request payload.",
      },
      { status: 400 },
    );
  }

  if (parsed.data.honeypot?.trim()) {
    return NextResponse.json({
      message:
        "Thanks for reaching out! One of our agents will be in touch shortly. For immediate help, call us at (951) 739-5959.",
    });
  }

  console.info("[api/chat] message received", {
    messageLength: parsed.data.message.length,
    submittedAt: new Date().toISOString(),
  });
  // TODO: Replace this stub with the real AI chatbot provider and guardrail logic.

  return NextResponse.json({
    message:
      "Thanks for reaching out! One of our agents will be in touch shortly. For immediate help, call us at (951) 739-5959.",
  });
}
