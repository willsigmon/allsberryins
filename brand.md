# Brand — Allsberry Insurance Agency

> Status: Approved for campaign implementation on 2026-08-21; third-party tracking identifiers and any future Farmers co-branding remain partner-controlled inputs.
> Owner: Erin Allsberry (brand/compliance); Brahm Shank (project handoff)
> Last updated: 2026-08-21

## 1. Brand core

- **Purpose:** Help Southern California households and businesses understand their insurance options and reach a real local team when they need a quote, proof of insurance, or coverage guidance.
- **Promise:** Clear, responsive guidance from a Corona-based agency that compares appropriate coverage options and stays available before, during, and after a claim.
- **Primary audience:** Homeowners and prospective homeowners in Corona, the Inland Empire, and Southern California, including people navigating wildfire exposure, non-renewal, FAIR Plan, or DIC questions.
- **Secondary audience:** Drivers, families, landlords, renters, and local small-business owners seeking personal or commercial coverage; English- and Spanish-speaking customers.
- **What they should feel:** Reassured, respected, informed, and confident that a reachable local person will help them take the next step.
- **Personality:**
  - Clear, not jargon-heavy.
  - Neighborly, not folksy or overfamiliar.
  - Responsive, not frantic or sales-pressured.
  - Experienced, not institutional or aloof.
  - Practical, not fear-driven.

## 2. Positioning

- **Category / frame of reference:** Independent local insurance agency and Farmers-affiliated agency serving Southern California.
- **Core problem:** Insurance shoppers face confusing choices, high-friction quote processes, California availability constraints, and uncertainty about who will actually help when coverage becomes difficult.
- **Differentiator:** A real Corona-based team combines local California coverage knowledge with access to multiple carrier relationships and direct, bilingual service.
- **Reasons to believe / proof:** Operating since 1994; Corona office and published California license numbers; named local team; English/Spanish service; public Farmers profile; real carrier roster; District 30 recognition and other published profile awards; dedicated proof-of-insurance and quote-request flows.
- **Competitors or alternatives:** Direct-to-consumer carrier sites, national comparison funnels, captive-agent landing pages, generic lead aggregators, and other Inland Empire agencies.
- **Must never resemble:** An anonymous quote farm, a carrier-impersonation page, a high-pressure call-transfer funnel, or a generic national insurer whose local ownership and accountability are unclear.

## 3. Voice and message

- **Voice:** Plainspoken, calm, capable, and locally accountable. Lead with the customer's immediate question, explain the next step in ordinary language, and avoid unsupported promises.
- **Vocabulary to use:** guidance, options, coverage review, local team, compare, help, straightforward, Southern California, Corona, talk with an agent, request a quote.
- **Vocabulary to avoid:** cheapest, guaranteed savings, best rates, instant approval, everyone qualifies, beat any price, risk-free, exclusive deal, or language implying that coverage is bound through the website.
- **Sample headline:** Insurance guidance from a local team that knows Southern California.
- **Sample supporting copy:** Tell us what you need help protecting. We will review the details, explain the available options, and connect you with a real Allsberry agent.
- **Sample CTA:** Talk with an Allsberry agent
- **Copy anti-patterns:** Manufactured urgency; fear-based wildfire messaging; unverified savings or superiority claims; competitor names presented as if the page represents those companies; dense insurance jargon without explanation; invented customer counts, ratings, testimonials, or turnaround times.

## 4. Visual direction

- **Reference 1:** Current Allsberry website implementation (`src/app/globals.css`, `src/components/sections/hero-section.tsx`) — preserve the recognizable navy/blue/red agency system, approachable team photography, high-contrast calls to action, and the existing light/dark accessibility model.
- **Reference 2:** Official Erin Allsberry Farmers profile (`https://agents.farmers.com/ca/corona/erin-allsberry/`) — use real local leadership, verifiable recognition, and Farmers relationship cues as trust evidence rather than decorative co-branding.
- **Reference 3:** Supplied Ricochet campaign page (`allsberry-agency (1).zip`, received 2026-08-20) — retain its narrow call-first conversion intent and campaign-number tracking, but not its source-domain canonicals, generic comparison-site framing, placeholder ad pixels, or unapproved legal language.
- **Anti-reference:** `homeinsurancecompare.net/allsberry-agency/` — do not reproduce an anonymous comparison-funnel aesthetic or ownership ambiguity on the Allsberry domain.
- **Design-tool note:** No Mobbin, Magic/21st.dev, Figma, or other external design reference was supplied or available in this review; the references above are the verified project and partner sources.
- **Art direction in one sentence:** A bright, locally grounded insurance experience where real people, clear choices, and Farmers-compatible trust cues feel more prominent than advertising technology.
- **Logo rules:** Use repository-owned Allsberry marks from `public/media/brand/`; preserve aspect ratio and clear space; favor full agency marks when ownership must be explicit; do not redraw, recolor, or combine the Allsberry and Farmers marks into a new lockup; any Farmers mark usage must follow confirmed Farmers compliance requirements.
- **Typography roles:** Plus Jakarta Sans for display hierarchy and DM Sans for body/interface copy, matching the existing application; use bold display weight sparingly for decisive headings and readable body weights for explanations and disclosures.
- **Color tokens:** Existing source-of-truth colors are `navy #00205C`, `blue #0066B3`, `red #DA291C`, `surface #FFFFFF`, `soft-blue #E8F0F8`, `ink #1A202C`, and `warm-accent #C2610C`. Convert to OKLCH only as an implementation detail after visual equivalence and Farmers compliance are verified.
- **Photography / illustration / iconography:** Prefer real Allsberry team photography and verified local/profile assets. Use simple line icons only to clarify insurance categories or actions. Avoid stock families, catastrophe imagery, AI-generated people, and generic shield-icon wallpaper.
- **Layout and composition:** Strong left-aligned hierarchy, short decision paths, visible local contact information, and asymmetry that pairs customer action with human proof. Campaign pages should remain focused and should not inherit the full marketing-site density if that weakens call conversion.
- **Shape / radius language:** Soft but controlled; existing card radii may frame people and grouped decisions, while buttons/pills remain reserved for compact actions and filters. Avoid rounding every surface.
- **Texture:** Very subtle grain or clean flat surfaces only; never let texture reduce disclosure or form legibility.
- **Motion:** Brief hierarchy-revealing transitions and functional feedback only. Respect `prefers-reduced-motion`; no decorative parallax, looping distractions, or motion near legal disclosures and phone CTAs.

## 5. Product experience

- **UX principles:** Make the next step obvious; keep a real agent reachable; explain why information is requested; preserve campaign attribution without obscuring ownership; keep quote, call, and proof-of-insurance flows distinct; never imply that submitting a form binds coverage.
- **Accessibility requirements:** WCAG 2.2 AA contrast; semantic headings and landmarks; visible keyboard focus; 44px minimum touch targets; labeled inputs and errors; reduced-motion support; readable disclosures; no color-only state; English and Spanish parity where a route is part of the main site.
- **Loading / empty / error-state tone:** Calm and specific. Say what happened, whether information was received, and what the customer can do next; provide the office phone as a resilient fallback when appropriate.
- **Trust signals:** Agency name and local address; license numbers; named agents; real team photography; published phone and hours; carrier/Farmers relationship stated accurately; privacy and terms ownership; clear no-binding disclosure; secure, minimal data collection.
- **Platform and performance constraints:** Next.js App Router, mobile-first campaign traffic, Vercel deployment, route-aware SITELEADS attribution, CallRail number swapping where approved, minimal third-party JavaScript, good Core Web Vitals, and no crawler blocking that prevents a `noindex` directive from being read.

## 6. Distinctiveness contract

- **Signature visual move:** Pair the agency's deep-blue trust field with a verified portrait or local proof panel, then use the red accent only on the single most important next action or location cue.
- **Signature interaction or content move:** Let visitors choose the kind of help they need, then immediately explain what an Allsberry agent will do next in plain language.
- **Reusable motifs:** Local map/location cue; named-agent handoff; compact coverage-choice controls; verified license/service facts; blue-to-light-blue depth used as structure rather than decoration.
- **Do not repeat from other projects:** No borrowed oxblood editorial palette, serif luxury treatment, glassmorphism shell, kinetic marquee, or unrelated product's hero composition.
- **Generic patterns forbidden here:** Purple/indigo AI gradients; anonymous stock-photo hero; three generic feature cards; unverifiable logo strips; floating chatbot as the primary CTA; every surface rounded and shadowed; “get the best rate in seconds” copy.
- **Swap-test explanation:** This direction depends on Allsberry's Corona location, named team, California coverage expertise, bilingual service, published licenses, and specific Farmers relationship. Replacing the name and logo would leave core proof, copy, and interactions factually wrong for an unrelated company.

## 7. Sources and governance

- **Briefs / research:** `README.md`; `SEO_PAGE_TO_KEYWORD_MAP.md`; `src/lib/site-data.ts`; `src/lib/metadata.ts`; `src/app/[locale]/page.tsx`; `src/app/[locale]/about/page.tsx`; `src/app/globals.css`; `messages/en.json`; Brahm Shank email thread “Fwd: Question From Ricochet” received 2026-08-20; supplied `allsberry-agency (1).zip`.
- **Asset paths / design files:** `public/media/brand/`; `public/media/agents/`; `public/media/farmers/`; `public/media/carriers/`; no Figma or formal design-source file was found during this review.
- **Decisions confirmed by:** Project owner confirmed the recommended campaign direction on 2026-08-21. The implementation uses the Allsberry system, keeps the ad route `noindex`, links to the existing agency legal pages, and avoids new or altered Farmers marks.
- **Open partner-controlled inputs:**
  1. Frank supplied Google Ads tag `AW-695248855` and a Meta Pixel ID on 2026-08-21; both are configured in Vercel Production. Frank's updated package specifies Meta `PageView` only, so the page does not emit a Meta `Lead` event for call clicks. A Google Ads conversion label was not supplied, so the Google tag loads but no direct Google Ads conversion event is emitted.
  2. Erin or the appropriate Farmers reviewer must approve any future expansion of Farmers marks, co-branding, or campaign-specific compliance language.
  3. The deployed production origin must be checked after release before campaign traffic is switched over.
- **Confidence / evidence gaps:** Brand direction is strongly grounded in the current application, but co-branding authority, campaign legal ownership, final domain, tracking configuration, and campaign-layout intent are not confirmed.
- **Change rule:** Proposed brand changes must update this file, state the reason, and receive Erin's or the designated owner's confirmation before implementation. Tracking or compliance changes also require the responsible campaign owner to confirm them.

## Approval checklist

- [x] No unresolved consequential implementation choices
- [x] At least two named references and one anti-reference with concrete lessons
- [x] Real headline, body, and CTA examples
- [x] Project-specific visual, voice, and UX rules
- [x] Signature moves are not copied from another project
- [x] Swap test fails for unrelated brands
- [x] Owner confirmed the direction
