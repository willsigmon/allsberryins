# Brahm + Erin meeting prep — GBP mirror & local visibility

Purpose: everything needed to mirror Apple Business Connect into Google Business Profile in one sitting, plus the follow-on local-SEO fixes that move the map-pack needle.

Source of truth for business data (all of the below is pulled from `src/lib/site-data.ts`, NOT invented):

- **Business name:** Allsberry Insurance Agency
- **Legal name:** Allsberry Insurance Agency Inc
- **Phone:** (951) 739-5959 — tel:+19517395959
- **Office email:** office@allsberryagency.com
- **Address:** 355 N Sheridan St, Ste 100, Corona, CA 92878
- **Hours:** Mon–Fri, 8:00 AM – 5:00 PM (confirm Sat/Sun — currently "closed")
- **Website:** https://allsberryagency.com
- **Founded:** 1994
- **Erin took over:** 2009
- **Licenses:** CA #0E91043 (Erin), Agency #6001414
- **Geo:** 33.88454, -117.56837

If Apple Business Connect has anything different, flag it — we shouldn't ship the mirror with a mismatch.

---

## Part 1 — GBP field-by-field worksheet

Work through in this order. Each section has: (a) what to paste, (b) what to confirm from Apple, (c) notes.

### 1.1 Business name
**Paste:** `Allsberry Insurance Agency`
**Do not** add "Corona" or "Farmers" or a keyword tail. Google penalizes keyword stuffing in the name field, and Apple won't have it stuffed either.

### 1.2 Primary category
**Recommend:** `Insurance agency`
Not "Auto insurance agency" or "Home insurance agency" — those are narrower and cost you the broader queries. Confirm what Apple has set; mirror only if Apple also uses the broadest term.

### 1.3 Secondary categories (add all that apply)
- Auto insurance agency
- Home insurance agency
- Life insurance agency
- Renter's insurance agency
- Business insurance agency
- Commercial agent

GBP allows up to 9 secondaries. More = more query surface area, no downside as long as each is genuinely something you sell.

### 1.4 Address
**Paste:** `355 N Sheridan St, Ste 100, Corona, CA 92878`
Ste 100 matters — if Apple has the suite, mirror exactly. Google's validator is picky about "Ste" vs "Suite" vs "#100" — keep it consistent with what's on the storefront signage and on the site.

### 1.5 Service area
Add each city you serve. Start with:
- Corona
- Norco
- Eastvale
- Riverside
- Chino
- Chino Hills
- Ontario
- Fontana
- Mira Loma
- Jurupa Valley

(Expand to whatever Apple lists, but keep it honest — Google can flag service areas that are too broad.)

### 1.6 Phone
**Primary:** (951) 739-5959
**Additional phone:** add Brahm's direct line (951) 266-2019 if Apple has it listed.

### 1.7 Website
**Paste:** `https://allsberryagency.com` (no trailing slash, no "www")
**Also check the other URL fields** (see Part 3 — this is probably where the Farmers URL is hiding).

### 1.8 Hours
- Mon: 8:00 AM – 5:00 PM
- Tue: 8:00 AM – 5:00 PM
- Wed: 8:00 AM – 5:00 PM
- Thu: 8:00 AM – 5:00 PM
- Fri: 8:00 AM – 5:00 PM
- Sat: Closed (confirm)
- Sun: Closed (confirm)

If Apple shows different hours, Apple is probably current — mirror Apple's values.

### 1.9 Business description (750 char max)

Paste this (740 chars):

> Allsberry Insurance Agency is a Corona, CA insurance office serving the Inland Empire and Southern California since 1994, led by Erin Allsberry since 2009. Our team of 10 licensed agents provides auto, home, renters, life, business, and umbrella insurance — plus coverage for classic cars, motorcycles, boats, RVs, and rental properties. We shop rates across carriers including Farmers, Travelers, The Hartford, Progressive, Liberty Mutual, Chubb, and Hagerty. We build policies around your real life and are reachable by phone, text, email, or in person at our N Sheridan Street office. Every policy comes with an annual review so you're never paying for what you don't need. Call (951) 739-5959 or quote at allsberryagency.com.

If Apple has a shorter version already, we can paste that too — Google's is allowed to be longer and more descriptive.

### 1.10 Opening date
**Paste:** 1994 (agency founding)
Or 2009 if Apple uses Erin's start date. Earlier = more prominence signal.

### 1.11 Attributes (check all that apply)
- Identifies as women-owned ✓ (Erin)
- Appointment required: No
- Online appointments: Yes (Brahm has Calendly)
- Onsite services: Yes
- Online estimates: Yes
- Wheelchair accessible entrance/parking: confirm at the office
- Languages: English, Spanish (confirm — Alex, Vanessa, Julie listed bilingual)

### 1.12 Services (list every one)

Paste these as individual services. Each line = one entry in GBP's "Services" section.

**Personal lines:**
- Home insurance
- Auto insurance
- Renters insurance
- Condo insurance
- Life insurance
- Umbrella insurance
- Classic car insurance (Hagerty)
- Motorcycle insurance
- Boat insurance
- RV insurance
- Landlord / rental property insurance

**Commercial lines:**
- Business insurance
- General liability insurance
- Workers compensation
- Commercial property insurance
- Commercial auto insurance
- Professional liability insurance
- Specialty business coverage

**Service offerings (not product lines, but valid GBP entries):**
- Policy review
- Certificate of insurance / evidence of insurance
- Multi-policy bundling
- Claims support
- Annual coverage check-up

### 1.13 Products
GBP has a "Products" section that's separate from Services — use it for packaged offerings. Add at least 4 to start:
1. **Home + Auto Bundle** — our most common package, typically saves clients 15–25%.
2. **Small Business Package** — GL + commercial property + workers comp bundled.
3. **Classic Car Coverage (Hagerty)** — agreed-value policies for collector vehicles.
4. **Landlord Policy** — for rental property owners in Riverside County.

Each product entry supports a photo, short description, and category tag.

### 1.14 Questions & Answers (seed these yourself)

Google allows the business to post Q&A. Seed 5 so new visitors see them first and Google has more indexed content:

1. **Q:** What insurance companies does Allsberry work with?
   **A:** We're an independent Farmers agency and also place policies with Travelers, The Hartford, Progressive, Liberty Mutual, Chubb, Hagerty, MetLife, Nationwide, Safeco, and 10+ other carriers so we can shop your rate.

2. **Q:** Do you offer insurance outside of Corona?
   **A:** Yes. We serve clients across the Inland Empire and broader Southern California, including Norco, Eastvale, Riverside, Chino, Ontario, Fontana, and beyond.

3. **Q:** Can I get a certificate of insurance the same day?
   **A:** In most cases yes. Request one through allsberryagency.com or call our office at (951) 739-5959.

4. **Q:** Do you insure classic cars?
   **A:** Yes — we write classic car, motorcycle, boat, and RV policies through Hagerty and specialty carriers. Ask for Erin.

5. **Q:** Do you do free policy reviews for people who aren't clients yet?
   **A:** Yes. We'll review your existing policies and show you what's covered, what's missing, and whether we can do better. No obligation.

### 1.15 Photos (minimum upload list)

GBP ranks profiles with more and newer photos higher. Target is 30+ photos, refreshed monthly. Start with:

- Exterior: storefront with signage (2 angles)
- Interior: reception, meeting area, open office
- Team: headshots of all 10 agents (already on the site — reuse)
- "At work" candids: Erin with a client, Brahm on a call
- Agency logo (square + horizontal)
- Awards: District 30 2020 Agency of the Year, Topper Club, Agent of the Year (already on site at `/media/farmers/`)
- Products in action: classic car the team insured (with owner permission), commercial property

### 1.16 Logo + cover photo
- Logo: square, 250×250 minimum, solid background
- Cover: 1080×608 minimum — storefront or team group shot works best

---

## Part 2 — Google Posts queue (paste one per week)

Each ~250–300 words. Schedule one per Monday for the next 4 weeks. These are ranking signals AND conversion content.

### Week 1 — "Offer" post
> **Free policy review — 15 minutes, no obligation**
>
> Most people haven't looked at their policies since they signed up. Rates have shifted, coverage gaps have appeared, and discounts have been added. We'll review what you have — from any carrier — and show you what's working, what's outdated, and where we can save you money. Book a 15-minute call at allsberryagency.com or text (951) 739-5959.
>
> Button: *Book* → calendly.com/brahm-allsberryagency/30min

### Week 2 — "Update" post
> **Wildfire season prep for Corona & Inland Empire homeowners**
>
> Fire insurance is harder to come by in California than it used to be. If you've gotten a non-renewal notice or a big rate hike, you have options — CA FAIR Plan, dual-policy structures, and specialty carriers like SageSure and Chubb. Before you assume you're stuck, let us run a second quote. We place with 20+ carriers.
>
> Button: *Learn more* → allsberryagency.com/wildfire-home-insurance-california

### Week 3 — "Event" post
> **Small business insurance: what Corona owners actually need**
>
> If you're running a business in Corona or the IE, there are four policies most people overlook until they have a claim: general liability, workers comp, commercial property, and commercial auto. We put together a plain-language guide so you can walk through each one. Prefer a conversation? Brahm and Heidi handle our commercial desk — happy to meet at our N Sheridan office or over Zoom.
>
> Button: *Call* → (951) 739-5959

### Week 4 — "Update" post
> **Classic car, boat, RV, motorcycle — we write the specialty stuff too**
>
> Regular auto policies don't value a collector car the way Hagerty does. We write agreed-value classic car, motorcycle, boat, and RV policies so you're covered for what the vehicle is actually worth, not what a standard insurer decides it's worth at claim time. If you've got something unusual in the garage, let us take a look.
>
> Button: *Learn more* → allsberryagency.com

---

## Part 3 — Website-field investigation (why GBP still shows Farmers)

Run through these in order. One of them is the culprit.

1. **Primary website field** — confirm it's exactly `https://allsberryagency.com`. No www, no tracking params, no trailing slash.
2. **Appointment URL field** (separate from website) — if set, it may be the one Google is surfacing. Set to `https://allsberryagency.com/quote` or clear it.
3. **Services URL field** (per-service) — each service in the Services section can have its own URL. If any are stale, they may link to Farmers. Clear or update each.
4. **Menu URL** — not usually relevant for insurance, but confirm it's not set to an old link.
5. **Duplicate listing check (critical)** — in GBP search, look for a *second* listing for the business, possibly:
   - Owned by "Farmers Group, Inc." or Farmers corporate
   - Named slightly differently ("Farmers Insurance – Erin Allsberry" vs "Allsberry Insurance Agency")
   - At the same address with a different phone
   If one exists, it's probably the one Erin is seeing when she searches. Request ownership transfer or suppression through Google's duplicate-removal process.
6. **Agent-network listing** — Farmers corporate sometimes maintains a listing per agent at agents.farmers.com/ca/corona/erin-allsberry/. That's a separate page and not a GBP duplicate, but it can confuse Google. Make sure it also points to allsberryagency.com in the contact section.

---

## Part 4 — Map-pack ranking levers (4–8 week climb)

We're not in the pack for "insurance corona ca" because the top 5 have 50–640 reviews and 15–25 years of listing history. The only way to climb is to add signals faster than they do. Concrete levers:

### 4.1 Reviews (biggest lever, by far)

Current review count is a bottleneck. Target: **add 15–25 new 5-star reviews in the next 60 days.**

Implementation:
- After every policy bind, Alex sends a review-ask email (template below) within 24 hours.
- Add a review-ask line to the office email signature (already in repo).
- Brahm includes a review-ask line in his Calendly confirmation emails.
- For in-office clients, print a small card with the QR code to `g.page/r/...` (Erin's GBP review shortlink).

**Review-ask email template:**
> Subject: Quick favor if you have 30 seconds
>
> Hi {First name},
>
> Thanks for trusting us with your {home/auto/business} coverage — we really appreciate it.
>
> One small ask: if you feel like we did right by you, would you drop us a Google review? It takes about 30 seconds and genuinely moves the needle for a small local agency like ours.
>
> Here's the link: {Google review shortlink}
>
> Either way, thanks for being a client. If there's ever anything we can do better, I'd rather hear it from you directly — just reply to this email.
>
> — Alex
> Allsberry Insurance Agency

**Review-ask text template:**
> Hey {First name}, it's Alex at Allsberry. Thanks again for {today's call / your new policy}. If you've got a sec, a quick Google review would mean a lot — {shortlink}. No pressure!

### 4.2 On-site schema (we handle)

TODO for me after the meeting:
- Audit `src/lib/seo.ts` — our `InsuranceAgency` schema currently emits name, address, phone, geo. Add: `areaServed` (array of cities), `aggregateRating` (pending real review count env vars), `openingHoursSpecification`, `sameAs` (linked to all socials + the new GBP and Apple listings).
- Add `FAQPage` schema to the home page using the existing `homePageFaqs` array.
- Make sure the schema's `url` matches GBP's website field exactly — character for character.

### 4.3 NAP consistency (Name, Address, Phone)

Audit these citations for exact-match NAP. Inconsistent NAP is a major map-pack killer.

- [ ] Google Business Profile (this doc's output)
- [ ] Apple Business Connect (already approved)
- [ ] Yelp
- [ ] Bing Places
- [ ] Facebook Page (facebook.com/AllsberryInsuranceagency)
- [ ] Instagram bio (instagram.com/allsberry_insurance)
- [ ] LinkedIn Company Page (separate from Erin's personal)
- [ ] Farmers agent-network page
- [ ] Better Business Bureau
- [ ] Chamber of Commerce (Corona Chamber)
- [ ] Manta, YellowPages, Superpages — low signal but still crawled

### 4.4 Local content (we handle)

Already in flight on a side branch:
- `/insurance-agency-corona-ca` page exists (in `quickLinks`)
- Other city pages — Norco, Eastvale, Riverside, Chino — should each get a dedicated page with local hook content. WIP on `wip/local-seo-expansion-2026-04-17`.

### 4.5 Weekly GBP Posts

Handled via Part 2. Consistency matters more than perfection — posting something every week outperforms posting three times one month and nothing the next.

---

## Part 5 — What competitors are doing (quick intel)

From the screenshot Erin shared, top 5 for "insurance corona ca":

| Agency | Reviews | Years | Notable |
|---|---|---|---|
| Cost-U-Less Insurance | 637 | 10+ | Onsite services attribute, aggressive review volume |
| Erika's Insurance | 176 | 25+ | Long history = prominence moat |
| Caruso Insurance Services | 144 | 25+ | Onsite services + online appointments, high conversion |
| Top One Insurance Services | 53 | 15+ | Lower reviews but active posts |
| Farmers – Vince Mansour | 11 | ~5 | Sponsored ad — paid placement, not organic |

Takeaways:
- None of them are doing anything special. Volume of reviews + years in the listing is doing most of the work.
- "Onsite services" and "Online appointments" attributes show on the map card and appear to correlate with higher click-through. Make sure both are ON in our GBP.
- The sponsored ad (Vince Mansour) confirms Google Ads is a viable short-term play while organic catches up — worth discussing separately.

---

## Part 6 — After-meeting checklist (for Will)

- [ ] Commit this doc to the repo so it's not lost.
- [ ] Once Brahm confirms the Apple source-of-truth values, diff them against Part 1 and flag mismatches.
- [ ] Update `src/lib/seo.ts` with the improvements in 4.2.
- [ ] Ship the WIP local-SEO content on `wip/local-seo-expansion-2026-04-17` (needs manual conflict resolution — don't auto-merge).
- [ ] Get a shortlink for GBP reviews (`g.page/r/...`) from Erin and plug it into the email signature templates + blog CTA block.
- [ ] Decide re: Google Ads paid placement as a short-term bridge (separate conversation).
