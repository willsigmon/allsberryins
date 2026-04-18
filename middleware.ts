import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";

const CANONICAL_HOST = "allsberryagency.com";
const TEAM_ATTRIBUTION_USERNAME = process.env.TEAM_ATTRIBUTION_USERNAME;
const TEAM_ATTRIBUTION_PASSWORD = process.env.TEAM_ATTRIBUTION_PASSWORD;

const intlMiddleware = createIntlMiddleware(routing);

function isProtectionEnabled() {
  return Boolean(TEAM_ATTRIBUTION_USERNAME && TEAM_ATTRIBUTION_PASSWORD);
}

function unauthorizedResponse() {
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "Cache-Control": "private, no-store, max-age=0",
      "WWW-Authenticate": 'Basic realm="Allsberry Team Attribution", charset="UTF-8"',
    },
  });
}

function readBasicAuthCredentials(request: NextRequest) {
  const authorizationHeader = request.headers.get("authorization");

  if (!authorizationHeader) {
    return null;
  }

  const [scheme, encodedCredentials] = authorizationHeader.split(" ");

  if (scheme !== "Basic" || !encodedCredentials) {
    return null;
  }

  try {
    const decodedCredentials = atob(encodedCredentials);
    const separatorIndex = decodedCredentials.indexOf(":");

    if (separatorIndex === -1) {
      return null;
    }

    return {
      password: decodedCredentials.slice(separatorIndex + 1),
      username: decodedCredentials.slice(0, separatorIndex),
    };
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

  if (host === `www.${CANONICAL_HOST}`) {
    const url = request.nextUrl.clone();
    url.host = CANONICAL_HOST;
    url.port = "";
    return NextResponse.redirect(url, 301);
  }

  if (request.nextUrl.pathname.startsWith("/team-attribution")) {
    if (!isProtectionEnabled()) {
      return intlMiddleware(request);
    }

    const credentials = readBasicAuthCredentials(request);

    if (
      !credentials ||
      credentials.username !== TEAM_ATTRIBUTION_USERNAME ||
      credentials.password !== TEAM_ATTRIBUTION_PASSWORD
    ) {
      return unauthorizedResponse();
    }

    const response = intlMiddleware(request);
    response.headers.set("Cache-Control", "private, no-store, max-age=0");
    response.headers.set("Vary", "Authorization");
    return response;
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|apple-icon|opengraph-image|twitter-image|sitemap.xml|robots.txt|llms.txt|manifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?|xml|txt|json)$).*)",
  ],
};
