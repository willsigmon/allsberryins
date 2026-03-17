import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  console.info("[api/leads] lead received", body);
  // TODO: Send lead data to AgencyZoom once integration credentials and endpoint details are confirmed.

  return NextResponse.json({ success: true });
}
