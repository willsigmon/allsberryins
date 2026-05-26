# Allsberry Insurance

Custom Next.js marketing + lead-capture site for Allsberry Insurance Agency (Corona, CA). Erin/Brahm handoff.

## Stack
- Next.js 16 App Router (webpack), React 19, TypeScript
- Tailwind CSS 4
- Framer Motion, Lucide, qrcode.react
- React Hook Form + Zod
- next-intl (i18n)
- nodemailer (`/api/leads`)
- Vercel Analytics + Speed Insights

## Layout
- `src/app/` — App Router pages (home, quote, agents, blog, evidence-of-insurance, team-attribution)
- `src/components/` — header, hero, product grids, carrier wall, footer, theme toggle
- `src/i18n/` — next-intl messages
- `src/lib/` — shared utilities, constants
- `messages/` — translation JSON
- `public/` — illustrations, email-signatures, favicons
- `scripts/` — bootstrap-local, build-local, clean-local, IndexNow submitter
- `middleware.ts` — Basic Auth gate for `/team-attribution` when env set

## Deploy
- Vercel (auto from main)
- Domain: TBD — currently lives on Vercel preview/handoff URL
- Node `22.17.1` (`.nvmrc`)
- Local builds use `.next-build` dir; Vercel uses default `.next`

## Conventions
- 800-line file max, organized by feature/domain
- Immutability enforced
- No hardcoded values — constants/config files
- No console.log in committed code
- Run `npm run check` (lint + typecheck) before committing
- Use `npm run setup` first when running off external `/Volumes/...` drive

## Do not touch
- `middleware.ts` Basic Auth logic — env-driven by `TEAM_ATTRIBUTION_USERNAME`/`PASSWORD`
- SITELEADS / Stealth ID tracking snippet integration — route-aware loader preserves agent attribution across client navigations
- `OWNER_ACTIONS_FOR_ERIN.md`, `ERIN_HANDOFF_MESSAGE.md`, `BRAHM_ERIN_MEETING_PREP.md` — handoff docs, do not silently rewrite
- `.next-build/` — local build output, ignored

## Open questions / known gaps
- `/api/leads` still has TODO for AgencyZoom integration — currently logs only
- `/api/chat` returns placeholder text — chatbot vendor not selected
- Production domain not yet pointed at Vercel
- Team-attribution Basic Auth creds live in Vercel env, not in repo

<!-- NOT_ANOTHER_AI_WEBSITE_DESIGN_BIBLE_START -->
## Global Design Bible: Not-Another-AI-Website

Default for all website/app UI design work unless the user gives a more specific art direction or an existing repo design system requires otherwise.

### Role
Act as a senior brand-led web designer + frontend engineer. Ship work that feels intentional, editorial, premium, and brand-specific — closer to MetaLab, Active Theory, Resn, Locomotive, or Awwwards SOTD than a default LLM template.

### Forbidden AI house style
Do not ship these unless explicitly requested:
- Inter, Geist, or system-ui as the headline font.
- Generic purple/blue/indigo gradient blobs.
- Dark glassmorphism heroes with backdrop-blur cards.
- 3-up feature grids with default Lucide icons in colored circles.
- Vercel-clone “Built with Next.js / Powered by AI” heroes.
- rounded-2xl everything and shadow-lg on every card.
- Generic grayscale “Trusted by” logo strips.
- Default Free / Pro / Enterprise pricing cards.
- Tailwind slate/zinc/neutral as the whole palette.
- Hero copy that starts “Build / Ship / Create [X] in seconds.”

### Required design process and output contract
For every proposed design, provide before or with the code:
1. Brand North Star — one sentence for the core feeling/message.
2. Reference Pull — use available design tools first; cite at least two visual references by name. Preferred when available: Mobbin, Magic / 21st.dev, shadcn primitives only, Aceternity when justified, Figma Dev Mode if a file exists, Lottie/Rive for motion beyond fades. If a required tool is unavailable, say so instead of guessing.
3. Design Tokens — JSON covering expressive typography, OKLCH color, 8pt spacing, one radius personality, motion tokens, and one texture choice.
4. Code.
5. Three bullets: “What makes this not look AI-generated.” If the design cannot be justified, redesign before shipping.

### Token defaults
If unspecified, use editorial-modern: expressive display serif mood (PP Editorial New / Tiempos / Migra / Domaine / Newsreader / similar), Söhne or personality grotesk mood for body, warm off-white background, oxblood accent, asymmetric grid, slow spring motion, subtle grain. If exact commercial fonts are unavailable, choose accessible equivalents with the same intent.

Token JSON shape:
```json
{
  "typography": {
    "display": "expressive foundry or strong Google/Fontshare alternative; not Inter/Geist",
    "body": "complementary sans or serif",
    "mono": "only if needed",
    "scale": "modular ratio"
  },
  "color": {
    "model": "OKLCH",
    "palette_strategy": "60/30/10 with one unexpected accent",
    "tokens": { "bg":"", "surface":"", "ink":"", "muted":"", "accent":"", "signal":"" }
  },
  "spacing": "8pt grid with t-shirt scale",
  "radius": "flat, soft, or pill — pick one personality",
  "motion": "spring/ease curves plus duration tokens",
  "texture": "grain / noise / paper / none — pick one"
}
```

### Execution rules
- Typography carries the design: tighten headlines, loosen all-caps eyebrows, use clamp() fluid type, real ligatures/stylistic sets, oldstyle figures where appropriate, and tabular nums for data.
- Layout should favor asymmetry, named CSS Grid areas, one hero move, and real content density instead of centered-stack sameness.
- Color should be OKLCH when possible, avoid pure black/white, honor 60/30/10, and use one unexpected accent sparingly.
- Motion should reveal hierarchy, use spring physics when practical, include reduced-motion support, and avoid decoration-only animation.
- Add one premium tell: subtle grain/paper/noise, duotone, custom cursor, kinetic marquee, horizontal scroll, sticky reveal, real photography, curated/custom icons, or a small delight moment.
- Build quality: Tailwind v4 CSS variables or vanilla CSS @layer; shadcn as unstyled primitives only; WCAG AA contrast; semantic HTML; keyboard nav; 44px touch targets; visible focus; self-host fonts and preload hero assets when practical; Lighthouse target >= 95.

### Vibe calibration
- Editorial: display serif, asymmetric grid, generous leading, photography-first.
- Brutalist: mono, hard edges, exposed grid lines, system colors, zero shadows.
- Swiss: Helvetica/Söhne mood, strict grid, red accent, ruthless hierarchy.
- Y2K/playful: chrome, intentional gradients, oversized cursor, sticker UI.
- Quiet luxury: off-white, oxblood/forest, serif, slow motion, negative space.
- Cyberpunk: mono, neon on near-black, scan lines, glitch micro-animations.
- Analog/craft: paper texture, hand-set type, irregular grid, warm palette.
<!-- NOT_ANOTHER_AI_WEBSITE_DESIGN_BIBLE_END -->
