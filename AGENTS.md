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
