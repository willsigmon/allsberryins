# Allsberry Insurance Agency

Custom Next.js website prototype for **Allsberry Insurance Agency** in Corona, California.

## Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- React Hook Form + Zod
- Lucide React
- qrcode.react

## Implemented

- Custom homepage with:
  - sticky transparent-to-solid header
  - hero product selector + ZIP CTA
  - value props
  - reviews section
  - clickable personal/commercial product grids
  - carrier wall
  - team preview
  - CTA banner
  - custom footer
- Quote page with conditional business/workers comp fields
- Agent profile pages with QR codes and contact forms
- Blog index + article pages
- Lead capture endpoint at `/api/leads` with SMTP delivery when env vars are configured
- API stub for `/api/chat`
- SEO foundation:
  - metadata templates
  - Open Graph / Twitter images
  - JSON-LD
  - robots.txt
  - sitemap
- Sunset-aware theme system:
  - Auto / Light / Dark theme toggle
  - Auto mode can follow local sunset when location is available
- Evidence-of-insurance request flow:
  - dedicated `/evidence-of-insurance` page
  - lender / escrow / COI-oriented request form
- SEO / AIO content upgrades:
  - FAQ section + FAQ schema
  - expanded InsuranceAgency schema
  - stronger internal linking for quotes, proof requests, and agent pages

## Local scripts

```bash
npm run setup
npm run dev
npm run lint
npm run typecheck
npm run check
npm run build
npm run start
```

## Notes

- Use Node `22.17.1` (`.nvmrc` is included).
- If you run this repo from an external `/Volumes/...` drive, start with `npm run setup`.
  That script installs dependencies into a stable home-directory cache and symlinks `node_modules`
  back into the repo so local installs are reproducible across machines.
- Local non-Vercel builds use `.next-build` as the dist dir. The clean script aggressively rotates
  stale local build folders first because Finder/SMB locks on external drives can leave behind busy
  files from prior sessions. Vercel still uses the default build output.
- `/api/leads` emails form submissions through SMTP. Configure `SMTP_HOST`,
  `SMTP_USER`, `SMTP_PASSWORD`, `LEADS_TO_EMAIL`, and `LEADS_FROM_EMAIL` in
  Vercel before relying on production lead capture.
- `/api/chat` currently returns placeholder text and includes a TODO for chatbot integration.
- The Stealth ID / SITE I.D. LEADS tracking snippet is now embedded by default.
- The site now parses that snippet into a route-aware loader so tracking still updates on
  Next.js client-side navigation and keeps agent/team attribution as visitors move from an
  agent page into quote or proof-of-insurance flows.
- To override or replace that client tracking snippet, add the raw embed code to either:
  - `SITELEADS_EMBED_CODE`
  - or `NEXT_PUBLIC_SITELEADS_EMBED_CODE`
- `.env.example` is included for that handoff.
- `/team-attribution` is an internal noindex workbench for tracked link QA, exports, and agent
  handoff prep.
- If you set both `TEAM_ATTRIBUTION_USERNAME` and `TEAM_ATTRIBUTION_PASSWORD`, middleware will
  protect `/team-attribution` with HTTP Basic Auth. If those vars are blank, the page stays open
  for local QA.
