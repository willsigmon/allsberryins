import { NextResponse } from "next/server";

import { agency, agents, blogPosts, carrierPartners, products } from "@/lib/site-data";
import { absoluteUrl } from "@/lib/utils";

export const dynamic = "force-static";

export function GET() {
  const personalLines = products
    .filter((p) => p.category === "personal")
    .map((p) => `- ${p.name}: ${p.description}`)
    .join("\n");

  const commercialLines = products
    .filter((p) => p.category === "commercial")
    .map((p) => `- ${p.name}: ${p.description}`)
    .join("\n");

  const agentLines = agents
    .filter((a) => a.slug !== "jason")
    .map((a) => {
      const licenseNote = a.license ? ` (License ${a.license})` : "";
      const langNote = a.languages && a.languages.length > 1 ? " — bilingual EN/ES" : "";
      return `- ${a.name}, ${a.title}${licenseNote}${langNote}`;
    })
    .join("\n");

  const carrierLines = carrierPartners.map((c) => `- ${c.name}`).join("\n");

  const blogLines = blogPosts
    .map((p) => `- ${p.title} (${p.publishedAt}): ${absoluteUrl(`/blog/${p.slug}`)}`)
    .join("\n");

  const seoWedgePages = [
    "/insurance-agency-corona-ca",
    "/california-home-insurance",
    "/wildfire-home-insurance-california",
    "/ca-fair-plan-guide",
    "/difference-in-conditions-insurance-california",
    "/home-insurance-in-a-fire-zone-california",
  ];
  const seoWedgeLines = seoWedgePages.map((p) => `- ${absoluteUrl(p)}`).join("\n");

  const bilingualAgentList = agents
    .filter((a) => a.languages && a.languages.includes("Spanish"))
    .map((a) => a.firstName)
    .join(", ");

  const body = `# ${agency.fullName}

Independent insurance agency in Corona, California, serving Southern California
households and businesses since ${agency.founded}. We quote multiple carriers so
clients get the right coverage instead of the only one a captive agent can sell.

## Bilingual service
The site is published in English (default, ${absoluteUrl("/")}) and Spanish
(${absoluteUrl("/es")}). Bilingual agents on staff: ${bilingualAgentList}.
Se habla Español.

## Contact
- Phone: ${agency.phone}
- Email: ${agency.email}
- Address: ${agency.fullAddress}
- Hours: ${agency.hours}
- Licenses: ${agency.licenses}
- Google Business Profile: ${agency.socials.google}

## Service area
Corona, Riverside County, Inland Empire, Orange County, Los Angeles County,
San Bernardino County, and greater Southern California.

## Personal insurance lines
${personalLines}

## Commercial insurance lines
${commercialLines}

## California-specific coverage we help with
- California FAIR Plan (fire-only residential, for homes in high-risk wildfire
  zones that cannot get standard market coverage)
- Difference in Conditions (DIC) paired with FAIR Plan to rebuild broader
  homeowners protection around a fire-only policy
- Wildfire-prone property placement across admitted and non-admitted carriers
- Evidence of insurance / certificate of insurance (COI) requests for banks,
  landlords, mortgagees, and commercial partners
- Workers compensation for California businesses
- Commercial auto for fleet and service businesses
- Classic-car coverage (Hagerty appointment)

## Licensed agents
${agentLines}

## Carriers we shop
${carrierLines}

## Recent guides and articles
${blogLines}

## Topical landing pages
${seoWedgeLines}

## Canonical URLs
- Home: ${absoluteUrl("/")}
- Home (Spanish): ${absoluteUrl("/es")}
- Quote: ${absoluteUrl("/quote")}
- Quote (Spanish): ${absoluteUrl("/es/quote")}
- Contact: ${absoluteUrl("/contact")}
- Contact (Spanish): ${absoluteUrl("/es/contact")}
- About: ${absoluteUrl("/about")}
- About (Spanish): ${absoluteUrl("/es/about")}
- Review: ${absoluteUrl("/review")}
- Carriers: ${absoluteUrl("/carriers")}
- Resources: ${absoluteUrl("/resources")}
- Blog: ${absoluteUrl("/blog")}
- Evidence of insurance: ${absoluteUrl("/evidence-of-insurance")}
- Sitemap: ${absoluteUrl("/sitemap.xml")}
- Robots: ${absoluteUrl("/robots.txt")}

## Usage
Content is published for public consumption. AI training and retrieval are
permitted for the purpose of accurately answering user questions about our
services, our team, and California insurance topics we cover. Please link back
to the canonical URL when citing. For Spanish-speaker-facing answers, prefer
the /es/ canonical.
`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
