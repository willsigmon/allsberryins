# Owner Action Items for Erin

_Last updated: April 15, 2026_

This document is the external follow-through list after the site-side SEO/AIO implementation.

## What is already done

The code/site side is live:

- canonical domain fixed to `https://allsberryagency.com`
- first SEO wedge published:
  - `/california-home-insurance`
  - `/wildfire-home-insurance-california`
  - `/ca-fair-plan-guide`
  - `/difference-in-conditions-insurance-california`
  - `/home-insurance-in-a-fire-zone-california`
  - `/insurance-agency-corona-ca`
  - `/resources`
- sitemap updated
- robots updated for modern discovery
- schema expanded
- IndexNow submitted

## Status from Erin (April 13, 2026 Loom)

Erin confirmed these items in a Loom video recorded April 13:

- **Google Business Profile** — business name, address, suite, phone, hours, category, services all verified as correct
- **Website URL** — was pointing to the old Farmers agent page (`agents.farmers.com/ca/corona/erin-allsberry/`). Erin updated it to `allsberryagency.com` in the profile editor and hit Save. Waiting on Google approval.
- **www issue** — when Erin tested `www.allsberryagency.com` it did not load. **Fixed on our side**: we added a www-to-non-www redirect in the site middleware and need to add the `www` subdomain in Vercel + DNS (see below).
- **Photos** — Erin will work on uploading fresh office/team photos
- **Apple Business Connect** — application is under review; Erin submitted a utility bill as proof of business
- **Duplicates** — Erin wants help understanding how to check for duplicate Google listings
- **Email signatures** — Erin asked for a follow-up. Signatures are already built and deployed at `allsberryagency.com/email-signatures/` (see `public/email-signatures/README.md` for setup instructions)

## What we fixed (April 15, 2026)

- Added `www.allsberryagency.com` → `allsberryagency.com` permanent redirect in site middleware
- This means once DNS is configured, anyone visiting the www version will be properly redirected

## What still needs to happen (infrastructure)

### Add www subdomain in Vercel + DNS

The `www` subdomain is not yet configured. Two steps:

1. **Vercel dashboard** → Project Settings → Domains → Add `www.allsberryagency.com`
   - Vercel will automatically redirect it to the primary `allsberryagency.com` domain
2. **DNS provider** → Add a CNAME record:
   - Name: `www`
   - Value: `cname.vercel-dns.com`

Until both steps are done, `www.allsberryagency.com` will not resolve at all.

## What Erin / the team needs to do now

## 1) Google Business Profile

Open the Google Business Profile and verify all of this matches exactly:

- business name — **verified by Erin**
- address — **verified by Erin**
- suite number — **verified by Erin**
- primary phone — **verified by Erin**
- website URL = `https://allsberryagency.com` (no www) — **updated by Erin, pending Google approval**
- hours — **verified by Erin**
- primary category — **verified by Erin**
- secondary categories
- services list
- business description

Still to do:

- check for duplicate or stale listings (Erin requested help with this)
- make sure the office is pinned correctly on the map
- upload fresh office/team photos (Erin confirmed she will do this)
- upload any recent branding-consistent exterior/interior photos

## 2) Apple Business Connect

Application is under review (utility bill submitted as documentation).

Once approved, confirm:

- same name / address / suite / phone / website as above
- map pin is correct
- **Call** button is enabled — Erin confirmed enabled
- **Website** button is enabled — Erin confirmed enabled
- hours are current
- no duplicate or outdated business records exist

## 3) Review freshness

Restart review collection immediately.

Priority:

- recent Google reviews from real clients
- ideally mention real service lines naturally:
  - home insurance
  - business insurance
  - service/helpfulness
  - Corona / local office experience if authentic

Do **not** script fake-looking keyword reviews.

Goal:

- steady new review activity
- not a one-time burst

## 4) Photo freshness

Upload recent, real photos:

- office exterior
- lobby / front desk
- team photos
- Erin headshot if newer
- branding / signage if available

This helps local trust more than people realize.

## 5) Search Console

Once Google Search Console access is available:

- verify `allsberryagency.com`
- submit `https://allsberryagency.com/sitemap.xml`
- monitor indexing for the new wedge pages
- watch which query/page pairs start earning impressions

## 6) Bing Webmaster Tools

Once Bing access is available:

- verify `allsberryagency.com`
- submit the sitemap
- monitor indexing and discovery

IndexNow is already set up and submitted from the site side.

## What Erin should NOT do

Do **not**:

- paste giant keyword lists into the homepage
- force unnatural keywords into every paragraph
- create a bunch of thin city pages
- publish generic AI filler blog posts
- keep changing business name/address/phone formatting across platforms

## What success should look like

### In 30 days

- new wedge pages indexed
- impressions begin showing in Search Console
- local profile actions start improving

### In 60 days

- movement on the first keyword basket
- stronger visibility on home / wildfire / FAIR queries
- clearer local-pack signals

### In 90 days

- enough data to decide whether to expand into:
  - workers comp / contractor insurance
  - then auto + bundle

## 7) Email Signatures

Email signatures are built and deployed for every team member. Setup instructions:

1. Go to `https://allsberryagency.com/email-signatures/` and open the agent's HTML file
2. For **Gmail**: Settings > See all settings > Signature > Create new > open the HTML file in a browser > Select All > Copy > Paste into Gmail editor > Save
3. For **AgencyZoom**: Settings > Email Signatures > Edit > switch to HTML/Source mode > paste the HTML > Save

Available signatures:
- Erin Allsberry (Agency Owner)
- Alex Coria (Office Manager)
- Vanessa Rios, Brahm Shank, Julie Ortiz, Dakota Allsberry, Jason Allsberry, Anna Gonzalez, Heidi Melzer, Jennifer Van Buskirk

See `public/email-signatures/README.md` for full details.

## Short version Will can send Erin (updated April 15)

> Hey Erin, watched the Loom — thanks for going through all of that.
>
> **Website issue**: the reason `www.allsberryagency.com` wasn't loading is that the www subdomain wasn't set up yet. We've added the redirect on our end. I just need to add it in Vercel and DNS — I'll handle that. In Google Business Profile, make sure the website URL is `https://allsberryagency.com` (no www).
>
> **Google Business Profile**: looks like you verified everything correctly. Once Google approves the website URL change, that should be all set. For checking duplicates — search your business name on Google Maps and look for any stale or duplicate pins. If you find one, you can report it to Google as a duplicate through the "Suggest an edit" option on the listing.
>
> **Email signatures**: those are ready to go! Open any of the signature files at `allsberryagency.com/email-signatures/` in your browser, Select All, Copy, and paste into Gmail's signature editor. There's one for every team member.
>
> **Apple Business Connect**: sounds like that's in review — just let me know when it's approved.
>
> **Still need from your side**:
> 1. Upload fresh office/team photos to Google Business Profile
> 2. Restart a steady Google review cadence
> 3. Get us Google Search Console + Bing Webmaster access when you can
