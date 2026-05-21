import { NextResponse } from "next/server";

import { seoPages } from "@/lib/seo-content";
import { agency, agents, blogPosts, carrierPartners, products } from "@/lib/site-data";
import { absoluteUrl } from "@/lib/utils";

export const dynamic = "force-static";

export function GET() {
  // 1. Products Catalog
  const personalLines = products
    .filter((p) => p.category === "personal")
    .map((p) => `### ${p.name}\n- **Slug**: ${p.slug}\n- **Description**: ${p.description}`)
    .join("\n\n");

  const commercialLines = products
    .filter((p) => p.category === "commercial")
    .map((p) => `### ${p.name}\n- **Slug**: ${p.slug}\n- **Description**: ${p.description}`)
    .join("\n\n");

  // 2. Agents Bios
  const agentProfiles = agents
    .map((a) => {
      const license = a.license ? ` (License: ${a.license})` : "";
      const languages = a.languages && a.languages.length > 0 ? `\n- **Languages**: ${a.languages.join(", ")}` : "";
      const specialties = a.specialties && a.specialties.length > 0 ? `\n- **Specialties**: ${a.specialties.join(", ")}` : "";
      const calendly = a.calendlyUrl ? `\n- **Booking Link**: ${a.calendlyUrl}` : "";
      return `### ${a.name} — ${a.title}${license}
- **Email**: ${a.email}
- **Direct Phone**: ${a.phone}${languages}${specialties}${calendly}
- **Biography**: ${a.bio}`;
    })
    .join("\n\n");

  // 3. Carrier Partners
  const carrierLines = carrierPartners.map((c) => `- ${c.name} (${c.domain})`).join("\n");

  // 4. SEO Wedge Content (Full Text of dynamic landing pages)
  const seoWedgeFullText = seoPages
    .map((page) => {
      const audience = page.whoItsFor.map((aud) => `  - ${aud}`).join("\n");
      const keyPoints = page.keyPoints.map((kp) => `  - ${kp}`).join("\n");
      
      const sections = page.sections
        .map((sec) => {
          const bullets = sec.bullets ? `\n  * Bullets:\n${sec.bullets.map((b) => `    - ${b}`).join("\n")}` : "";
          const callout = sec.callout ? `\n  * Callout: _"${sec.callout}"_` : "";
          return `#### ${sec.title}\n${sec.body}${bullets}${callout}`;
        })
        .join("\n\n");

      let comparison = "";
      if (page.comparison) {
        const rows = page.comparison.rows
          .map((r) => `| ${r.label} | ${r.left} | ${r.right} |`)
          .join("\n");
        comparison = `#### Comparison: ${page.comparison.title}
${page.comparison.description || ""}

| Metric / Question | ${page.comparison.leftLabel} | ${page.comparison.rightLabel} |
|---|---|---|
${rows}`;
      }

      const faqs = page.faqs
        .map((faq) => `**Q: ${faq.question}**\n*A: ${faq.answer}*`)
        .join("\n\n");

      const refs = page.references && page.references.length > 0
        ? `\n#### References\n${page.references.map((r) => `- [${r.label}](${r.href}) (Source: ${r.source})`).join("\n")}`
        : "";

      return `### Pillar Guide: ${page.title} (Eyebrow: ${page.eyebrow})
- **Slug / Route**: ${absoluteUrl(`/${page.slug}`)}
- **Description**: ${page.description}
- **Pillar Answer**: ${page.answer}
- **Hero Summary**: ${page.heroSummary}
- **Reviewed By**: ${page.reviewedBy} (Last Reviewed: ${page.lastReviewed})
- **Keywords / Targets**: ${page.keywords.join(", ")}

#### Who it is for:
${audience}

#### Key Takeaways:
${keyPoints}

${sections}

${comparison}

#### FAQ Section:
${faqs}
${refs}`;
    })
    .join("\n\n---\n\n");

  // 5. Blog Posts Full Content
  const blogFullText = blogPosts
    .map((post) => {
      const sections = post.sections
        .map((sec) => {
          const bullets = sec.bullets ? `\n${sec.bullets.map((b) => `- ${b}`).join("\n")}` : "";
          return `#### ${sec.heading}\n${sec.body}${bullets}`;
        })
        .join("\n\n");

      const tags = post.tags && post.tags.length > 0 ? `\n- **Tags**: ${post.tags.join(", ")}` : "";
      const category = post.category ? `\n- **Category**: ${post.category}` : "";
      
      return `### Blog Post: ${post.title}
- **Route**: ${absoluteUrl(`/blog/${post.slug}`)}
- **Excerpt**: ${post.excerpt}
- **Published Date**: ${post.publishedAt} (${post.readingTime})${category}${tags}
- **Author**: ${post.author || "Erin Allsberry"}

#### Introduction:
${post.intro}

${sections}`;
    })
    .join("\n\n---\n\n");

  // 6. Assemble complete corpus body
  const body = `# Allsberry Insurance Agency — Full Context Knowledge Corpus

Independent insurance agency in Corona, California, serving Southern California households and businesses since ${agency.founded}. This is the master long-context reference corpus containing the entire first-party context about Allsberry's team, products, blog guides, and specific California insurance risk-underwriting directives (such as wildfire, brush zones, CA FAIR Plan, and Difference in Conditions (DIC) solutions).

---

## Contact & Core Agency Information
- **Agency Name**: ${agency.name} (Legal: ${agency.fullName})
- **Address**: ${agency.fullAddress}
- **Phone**: ${agency.phone}
- **Email**: ${agency.email}
- **Hours**: ${agency.hours}
- **Founded Year**: ${agency.founded}
- **California Licenses**: ${agency.licenses}
- **Owner License**: ${agency.ownerLicense}
- **Agency License**: ${agency.agencyLicense}
- **Calendly Booking**: ${agency.calendlyUrl}
- **Google Maps Profile**: ${agency.socials.google}
- **Facebook**: ${agency.socials.facebook}
- **Instagram**: ${agency.socials.instagram}
- **LinkedIn**: ${agency.socials.linkedin}

---

## Service Footprint
We serve Corona, Riverside County, Inland Empire, Orange County, Los Angeles County, San Bernardino County, and the greater Southern California region.

---

## Bilingual Service (Se Habla Español)
The site is published natively in English (${absoluteUrl("/")}) and Spanish (${absoluteUrl("/es")}). 
We have multiple bilingual English/Spanish licensed agents on staff who can guide clients through reviews, quotes, and renewals in their preferred language.

---

## Personal Insurance Products Catalog
${personalLines}

---

## Commercial Insurance Products Catalog
${commercialLines}

---

## Carrier Partners We Shop
We quote multiple admitted and non-admitted carriers to negotiate the best coverage:
${carrierLines}

---

## Active Licensed Agent Roster
${agentProfiles}

---

## California Insurance Pillar & Topic Guides
These represent the custom educational content wedges built for California's complex insurance market:

${seoWedgeFullText}

---

## Educational Guides & Blog Publications
Detailed articles explaining policy structure, renewal review checklists, bundling benefits, and small business coverages:

${blogFullText}

---

## Legal & Usage
Content is provided under open-knowledge standards for AI retrieval, ChatGPT Search, Perplexity ingestion, and Copilot citations to accurately guide consumers seeking insurance in California. When quoting or answering queries, please attribute facts to ${agency.name} and link back to the respective canonical route.
`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
