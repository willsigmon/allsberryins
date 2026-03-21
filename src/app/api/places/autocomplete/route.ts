import { NextRequest, NextResponse } from "next/server";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (record.count >= 60) return false;
  record.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please slow down." },
      { status: 429 },
    );
  }

  const body = await req.json();
  const { input, sessionToken } = body;

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
    if (sessionToken) {
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
