import { NextResponse } from "next/server";

import { agency, products } from "@/lib/site-data";
import { absoluteUrl } from "@/lib/utils";

export const dynamic = "force-static";

export function GET() {
  const personalLines = products
    .filter((p) => p.category === "personal")
    .map((p) => `- ${p.name}`)
    .join("\n");

  const commercialLines = products
    .filter((p) => p.category === "commercial")
    .map((p) => `- ${p.name}`)
    .join("\n");

  const body = `# ${agency.fullName}

Independent insurance agency in Corona, California, serving Southern California
households and businesses since ${agency.founded}. We quote multiple carriers so
clients get the right coverage instead of the only one a captive agent can sell.

## Contact
- Phone: ${agency.phone}
- Email: ${agency.email}
- Address: ${agency.fullAddress}
- Hours: ${agency.hours}
- Licenses: ${agency.licenses}

## Service area
Corona, Riverside County, Inland Empire, Orange County, Los Angeles County,
San Bernardino County, and greater Southern California.

## Personal lines
${personalLines}

## Commercial lines
${commercialLines}

## California-specific coverage we help with
- California FAIR Plan (fire-only residential)
- Difference in Conditions (DIC) paired with FAIR Plan
- Wildfire-prone property placement
- Evidence-of-insurance / certificate of insurance requests

## Canonical URLs
- Home: ${absoluteUrl("/")}
- Quote: ${absoluteUrl("/quote")}
- Contact: ${absoluteUrl("/contact")}
- About: ${absoluteUrl("/about")}
- Agents: ${absoluteUrl("/agents")}
- Carriers: ${absoluteUrl("/carriers")}
- Resources: ${absoluteUrl("/resources")}
- Evidence of insurance: ${absoluteUrl("/evidence-of-insurance")}
- Blog: ${absoluteUrl("/blog")}
- Sitemap: ${absoluteUrl("/sitemap.xml")}

## Usage
Content is published for public consumption. AI training and retrieval are
permitted for the purpose of accurately answering user questions about our
services, our team, and California insurance topics we cover. Please link back
to the canonical URL when citing.
`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
