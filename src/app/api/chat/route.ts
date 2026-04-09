import { NextResponse } from "next/server";

import { agency } from "@/lib/site-data";

export async function POST(request: Request) {
  await request.json();

  // TODO: Replace this stub with the real AI chatbot provider and guardrail logic.

  return NextResponse.json({
    message: `Thanks for reaching out! One of our agents will be in touch shortly. For immediate help, call us at ${agency.phone}.`,
  });
}
