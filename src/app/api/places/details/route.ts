import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const placeId = req.nextUrl.searchParams.get("placeId");
  const sessionToken = req.nextUrl.searchParams.get("sessionToken");

  if (!placeId) {
    return NextResponse.json(
      { error: "placeId is required" },
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
      "https://maps.googleapis.com/maps/api/place/details/json",
    );
    url.searchParams.set("place_id", placeId);
    url.searchParams.set("fields", "address_components,formatted_address");
    url.searchParams.set("key", apiKey);
    if (sessionToken) {
      url.searchParams.set("sessiontoken", sessionToken);
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
      return NextResponse.json(
        { error: "Place details error" },
        { status: response.status },
      );
    }

    const data = await response.json();

    if (data.status !== "OK") {
      return NextResponse.json(
        { error: data.error_message ?? data.status },
        { status: 400 },
      );
    }

    const result = data.result;

    return NextResponse.json({
      addressComponents: (result.address_components ?? []).map(
        (c: { long_name: string; short_name: string; types: string[] }) => ({
          longText: c.long_name,
          shortText: c.short_name,
          types: c.types,
        }),
      ),
      formattedAddress: result.formatted_address,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch place details" },
      { status: 500 },
    );
  }
}
