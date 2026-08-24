# Allsberry campaign design contract

## Scope

This contract applies only to the paid-campaign route `/allsberry-agency`. It derives from the repository-root `brand.md` and records the owner-approved exception to match Frank's supplied pink Farmers campaign template. It does not change the visual direction of the main Allsberry marketing site.

## Brand North Star

Make a California homeowner feel that one clear phone call connects them to a real Allsberry agent, not an anonymous comparison funnel.

## Reference pull

1. **Frank's supplied Ricochet campaign template** — `/Users/wsig/Library/Containers/com.mimestream.Mimestream/Data/Library/Application Support/Mimestream/Attachments/p4138/allsberry-agency-allsberryagency.com.zip`. Preserve the narrow mobile-first funnel, pink hero, navy call actions, hand-written sticky-note moment, carrier strip, compact call rows, trust band, local agent proof, review card, and sticky call bar.
2. **Live source/reference page** — `https://homeinsurancecompare.net/allsberry-agency/`. Use only as a visual reference. The Allsberry implementation must keep its own canonical, legal links, ownership cues, and approved tracking boundary.
3. **Allsberry project brand system** — `/Volumes/SitHub/clients/allsberryins/brand.md`, especially the local-team proof, accessibility, no-binding language, and campaign tracking rules.
4. **Mobbin testimonial references** — [V7 testimonial section](https://mobbin.com/sites/sections/c88fcff1-cbaa-4aa3-afe4-aa757bf75fd5) and [Vanta testimonial section](https://mobbin.com/sites/sections/7c356d68-1f67-4b57-8bc1-359e85a3300c). Use their single-dominant-quote hierarchy and explicit directional controls as a pattern reference; do not copy their colors, branding, or layout.

Mobbin is used here as a visual reference only. No Magic UI, Figma, or external component primitive is used: faithful adaptation of the supplied campaign remains the approved direction, and decorative library components would add drift.

## Design tokens

```json
{
  "typography": {
    "display": "Inter via next/font/google; semibold, tight tracking",
    "body": "Inter via next/font/google",
    "handwritten": "Caveat via next/font/google, cursive fallback",
    "mono": "none",
    "scale": "fluid clamp with 1.04 display line-height"
  },
  "color": {
    "model": "hex with OKLCH conversion deferred until visual equivalence is verified",
    "palette_strategy": "pink 60 / white 25 / navy 10 / red and yellow accents 5",
    "tokens": {
      "bg": "#FDF4FA",
      "surface": "#FFFFFF",
      "ink": "#141414",
      "muted": "#6B7280",
      "accent": "#F0ACD8",
      "signal": "#0A2C63",
      "red": "#C8102E",
      "note": "#FFF188"
    }
  },
  "spacing": "8pt base grid; 16px mobile gutters; 40px section rhythm",
  "radius": "soft controlled: 12px actions, 16-18px cards, no universal rounding",
  "motion": "one-time springy note and CTA reveals; brief phone-ring and quote-icon feedback; spring sticky CTA; 150-480ms review transitions; no loops; reduced-motion disables animation",
  "texture": "subtle dotted pink trust band; otherwise clean flat surfaces"
}
```

## Implementation rules

- Keep the campaign shell light-themed even when the main site is in dark mode.
- Do not render the global site header or footer on this route; the campaign has its own minimal header/footer.
- Keep the phone CTA as the primary conversion action. The online quote link remains a secondary fallback only where it is already required by the campaign contract.
- Preserve `data-campaign-call`, CallRail number swapping, consent-aware Google/Meta loading, PageView-only Meta behavior, route-level `noindex`, Allsberry canonical/OG URLs, `/privacy`, `/terms`, and no-binding language.
- Avoid source-domain canonicals, external source legal pages, unapproved logo-host dependencies, new Farmers lockups, or invented claims.
- Keep carrier logos static. Motion is reserved for the hierarchy reveal, one-time sticky-note settle and pin pop, brief phone/quote-icon feedback, spring sticky-call appearance, and the user-controlled one-card review slide. Do not add looping motion.
- Keep all interactive targets keyboard accessible and at least 44px tall. Respect `prefers-reduced-motion`.

## Verification checklist

- [ ] Compare mobile and desktop layout against the supplied pink template.
- [ ] Confirm the Allsberry URL is the only canonical/OG URL and remains `noindex, nofollow`.
- [ ] Confirm every phone CTA retains `tel:+18666886145`, campaign tracking, and CallRail attributes.
- [ ] Confirm the Meta implementation emits PageView only and Google call conversion remains label-gated.
- [ ] Confirm privacy, terms, address, license, no-binding, and savings disclosures remain Allsberry-owned and readable.
- [ ] Run `npm run check` and `npm run build:clean`.
