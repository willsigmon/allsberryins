import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  console.info("[api/chat] message received", body);
  // TODO: Replace this stub with the real AI chatbot provider and guardrail logic.

  return NextResponse.json({
    message:
      "Thanks for reaching out! One of our agents will be in touch shortly. For immediate help, call us at (951) 739-5959.",
  });
}
