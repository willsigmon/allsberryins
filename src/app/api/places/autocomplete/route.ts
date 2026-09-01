import { NextRequest, NextResponse } from "next/server";

import { allowPlacesRequest } from "@/lib/places-rate-limit";

export async function POST(req: NextRequest) {
  if (!allowPlacesRequest(req)) {
    return NextResponse.json(
      { error: "Too many requests. Please slow down." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON format." },
      { status: 400 },
    );
  }

  const input =
    typeof body === "object" && body !== null && "input" in body
      ? (body as { input?: unknown }).input
      : undefined;
  const sessionToken =
    typeof body === "object" && body !== null && "sessionToken" in body
      ? (body as { sessionToken?: unknown }).sessionToken
      : undefined;

  if (!input || typeof input !== "string" || input.length < 3) {
    return NextResponse.json(
      { error: "Input must be at least 3 characters" },
      { status: 400 },
    );
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Places API not configured" },
      { status: 500 },
    );
  }

  try {
    const url = new URL(
      "https://maps.googleapis.com/maps/api/place/autocomplete/json",
    );
    url.searchParams.set("input", input);
    url.searchParams.set("types", "address");
    url.searchParams.set("components", "country:us");
    url.searchParams.set("key", apiKey);
    if (typeof sessionToken === "string" && sessionToken) {
      url.searchParams.set("sessiontoken", sessionToken);
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
      return NextResponse.json(
        { error: "Places API error" },
        { status: response.status },
      );
    }

    const data = await response.json();

    if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
      return NextResponse.json(
        { error: data.error_message ?? data.status },
        { status: data.status === "REQUEST_DENIED" ? 403 : 400 },
      );
    }

    const suggestions = (data.predictions ?? []).map(
      (pred: {
        place_id: string;
        description: string;
        structured_formatting?: {
          main_text: string;
          secondary_text: string;
        };
      }) => ({
        placePrediction: {
          placeId: pred.place_id,
          text: { text: pred.description },
          structuredFormat: pred.structured_formatting
            ? {
                mainText: { text: pred.structured_formatting.main_text },
                secondaryText: {
                  text: pred.structured_formatting.secondary_text,
                },
              }
            : undefined,
        },
      }),
    );

    return NextResponse.json({ suggestions });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch suggestions" },
      { status: 500 },
    );
  }
}
