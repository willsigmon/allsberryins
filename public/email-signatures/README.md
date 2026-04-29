# Allsberry Insurance — Email Signatures

## Setup

### Google Workspace (Gmail)
1. Open Gmail > Settings (gear icon) > "See all settings"
2. Scroll to "Signature" section
3. Click "Create new"
4. Open the agent's HTML file in a browser
5. Select all (Cmd+A / Ctrl+A), copy (Cmd+C / Ctrl+C)
6. Paste into the Gmail signature editor
7. Save Changes

### AgencyZoom
1. Go to Settings > Email Signatures
2. Click "Edit" or "Create New"
3. Switch to HTML/Source mode
4. Paste the contents of the agent's HTML file
5. Save

## Files

- `signature-template.html` — Base template with placeholder values
- `erin-allsberry.html` — Erin Allsberry (Agency Owner)
- `alex-coria.html` — Alex Coria (Office Manager)
- `vanessa-rios.html` — Vanessa Rios
- `brahm-shank.html` — Brahm Shank (SVP of Sales Development)
- `julie-ortiz.html` — Julie Ortiz
- `dakota-allsberry.html` — Dakota Allsberry
- `jason-allsberry.html` — Jason Allsberry
- `anna-gonzalez.html` — Anna Gonzalez
- `heidi-melzer.html` — Heidi Melzer
- `jenn-van-buskirk.html` — Jennifer Van Buskirk

## Notes

- Photos reference the live site at allsberryagency.com
- All signatures use inline CSS for maximum email client compatibility
- The gradient brand stripe may render as solid navy in older Outlook versions
- Production-safe defaults:
  - Keep the "Book an Appointment" CTA only on signatures for agents with a confirmed personal booking link (currently Brahm).
  - Keep the personal LinkedIn cell only on signatures for agents with a confirmed personal profile (currently Erin).
  - Use the main office phone for everyone except agents with a confirmed direct line (currently Brahm).
- Review pill links to `/review` → Google Business Profile (shared across all signatures).
- Brahm's business-card QR asset lives at `/media/agents/qr/brahm-business-card.svg` and points to his tracked profile URL.

## QA checklist

Before shipping a signature, confirm:

- Agent name, title, email, and phone all match the latest team roster.
- Every CTA points to the correct person, not a shared placeholder.
- Gmail paste-in keeps spacing, image size, and link styling intact.
- AgencyZoom source paste preserves the same layout and links.
- Mobile and desktop previews both keep the contact block readable.
