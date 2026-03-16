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
- API stubs for `/api/leads` and `/api/chat`
- SEO foundation:
  - metadata templates
  - Open Graph / Twitter images
  - JSON-LD
  - robots.txt
  - sitemap

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
- `/api/leads` currently logs submissions and includes a TODO for AgencyZoom integration.
- `/api/chat` currently returns placeholder text and includes a TODO for chatbot integration.
