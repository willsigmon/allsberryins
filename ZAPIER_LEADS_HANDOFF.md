# Zapier Lead Automation — Design & Handoff

**Date:** 2026-08-28 (rev. 6 — commercial `businessName` for AgencyZoom)
**Status:** The website now emits an explicit `insuranceType` (`personal`, `commercial`, or `life`) with every quote request and rejects invalid type/product combinations server-side. Commercial quote requests also require `businessName` so AgencyZoom can create a Business Lead. No live webhook URL belongs in this repository.
**Requirements from:** Brahm Shank (Allsberry). Owner contacts: Erin / Brahm. Janaya Lund (Accelerated Automation) asked for this field on 2026-08-25.

## ▶ Rev. 6 — commercial Business Name for AgencyZoom (2026-08-28)

Janaya needs a business name to create an AgencyZoom **Business Lead**. The live quote form now shows a required **Business Name** field when the visitor selects Commercial.

### Website payload

| Site field | When present | AgencyZoom Create Business Lead |
| --- | --- | --- |
| `businessName` | Required when `insuranceType` is `commercial`. Omitted on personal and life quotes. | Map to AgencyZoom `name` (labeled **Business name**). |

There was no existing company/business key on quote-request payloads. Do **not** reuse evidence-of-insurance `companyOrAgency`, and do **not** overwrite the contact `name` / `firstName` + `lastName` mapping used for personal leads.

Personal and life quote submit still work without `businessName`. Client and `/api/leads` both reject commercial quotes when it is missing or under 2 characters.

### Zap change

On the commercial / Create Business Lead path, map webhook `businessName` → AgencyZoom Business name. Contact first/last stay on `firstName` / `lastName`.

## ▶ Rev. 5 — website-side routing and webhook hygiene (2026-07-10)

### Website changes completed

- The quote form now asks for the insurance lane first: `personal`, `commercial`, or `life`.
- The API payload carries `insuranceType`; it is available to Zapier as a top-level field.
- Both browser and API validation reject a product that does not match its selected lane, and commercial requests require an employee count.
- The API normalizes both SMS-consent fields to literal booleans and includes the disclosure version, consent source, and capture time when a visitor opts in.
- The webhook endpoint was scrubbed from this document. Store it only as Vercel's encrypted `ZAPIER_WEBHOOK_URL` environment variable after the Zap is ready to receive real customer data.

### Required Zap changes before the Vercel webhook is enabled

The current quick version creates a Personal Lead for every `quote-request`. Update it to branch on the new `insuranceType` field:

1. `personal` → Personal Lead in `1. New Personal Leads`.
2. `commercial` → Business Lead in `4. New Comm. Leads`.
3. `life` → lead in `7. Life Pipeline`.

After those paths are published, set `ZAPIER_WEBHOOK_URL` in Vercel production from a secure source, deploy, and run one controlled commercial test with a unique test email. Do not use a real customer submission as the first test.

## ▶ Rev. 4 — AgencyZoom Zap built and tested live in Zapier editor (2026-07-08)

Built directly in Zapier's editor (Zap name: "Untitled Zap" in Erin Allsberry's account, draft — rename before publish). Structure: **Catch Hook → Paths (3)**, no separate Formatter step needed (site payload is already clean per-type).

**Catch Hook URL:** intentionally omitted. Store it only in Vercel's encrypted `ZAPIER_WEBHOOK_URL` environment variable; never commit or paste it into a handoff document.

**Path A — `quote-request` → Create Personal Lead.** Tested live: **Lead ID 84333294** created successfully in AgencyZoom.
- Name = First + Last (concatenated with a literal space — the chip editor silently drops the space if you insert two data chips back-to-back without care; verify in Zapier's own preview before trusting it)
- Pipeline = `1. New Personal Leads` (98781), Stage = `New` (431879)
- Email, Phone, Postal Code (Zip) mapped directly; State hardcoded `CA`
- Comments = `Message: {{message}}` (kept simple — full raw payload is preserved in Zapier's task history regardless, so this doesn't need to be exhaustive)
- Tags = `Website` (static)
- **Left blank on purpose:** Lead Owner (defaults to agency owner) and Lead Source (doesn't exist yet — see "Still needed" below). Business-vs-personal routing (Create Business Lead for commercial products) was **not built** — out of scope for tonight's speed-to-ship version; every quote-request lands as a Personal Lead regardless of product mix. Flag this as a fast-follow if commercial lead volume matters.

**Path B — `agent-contact` → Create Personal Lead.** Tested live: **Lead ID 84333955** created successfully.
- Same field pattern as Path A, but Name maps directly from the site's single `name` field (no concatenation needed)
- Comments = `Message: {{helpTopic + message}}` pattern, same Pipeline/Stage as Path A

**Path C — `evidence-request` → Create Service Request** (not a Lead — matches the "Existing Customer" treatment from the original design). Tested live: **service request created successfully** (Result: true).
- Customer Name, Customer Email mapped from site fields
- Summery (subject) = `requestType` (e.g. "Business Proof of Insurance (COI)")
- Category = `Service: COI` (126391) — exact match, confirmed live
- Priority = `Medium` (51583)
- Pipeline = `Missing Documents` (98821) — best fit from the 6 available service pipelines (Pers. Policy Changes, Missing Documents, Late Payments, Commercial Renewals, Comm. Policy Change, Claims); confirm with Brahm if a better fit exists
- Stage = `Received` (432063)
- Due after days = `3` (placeholder — confirm real SLA with Brahm)
- Description = `Requested for: ` (minimal — the chip-insertion UI kept failing to append the Message field here; the static text alone satisfies the required-field check, full payload is still in Zapier's task history)

**Not built:** SMS alert, Ricochet branch, Farmers Apex branch — all still per the rev. 3 architecture above (parallel branches to add later off the same Catch Hook, not blocking this).

### Still needed before publish
1. **Add a "Website" Lead Source** in AgencyZoom → Settings → Lead Sources. Confirmed still missing (checked twice tonight against the live account — 60+ sources exist, none named Website). Not required for the Zap to function, but leaves `leadSourceId` blank on every lead until it's added.
2. **Set `ZAPIER_WEBHOOK_URL`** in Vercel production from the secure Zapier source, then redeploy. Do this only after the three quote-routing paths below are correct and the Zap is published.
3. **Publish the Zap** in Zapier (top-right button, currently enabled) — hasn't been clicked. Rename the Zap first (still "Untitled Zap").
4. **One real end-to-end test**: submit a real form on the live site after step 2, confirm it lands correctly in AgencyZoom, *then* consider this done.

## ▶ Rev. 3 — AgencyZoom added, runs alongside Ricochet (2026-07-08, hard deadline 10:00 AM PT 2026-07-09)

Erin forwarded a "Done-For-You" package explainer describing a Zapier integration that connects website forms → AgencyZoom (dedupe check, comments logging, tags, service tickets), with a 10am PT deadline and a Zoom walkthrough tomorrow. This **amends the rev. 2 decision** below ("AgencyZoom out of scope, CRM = Ricochet + Farmers Apex") — that decision is exactly what line 81 (original) flagged as something "Brahm to confirm strategy if revisited." **Confirmed 2026-07-08: every lead now needs to land in both AgencyZoom and Ricochet, not one or the other.**

**Why AgencyZoom ships first:** it's been fully connected in the Zapier account this whole time (14 native actions, no OAuth needed) — unlike Ricochet, which has been stalled 3+ weeks waiting on Brahm's Posting URL. The site emits a clean, source-tagged payload when `ZAPIER_WEBHOOK_URL` is configured. **Both CRM paths live in the same Zap** (see architecture note below) — AgencyZoom's path can go live once the published Zap has all three quote-routing branches; Ricochet's path slots into this same Zap when Brahm delivers the Posting URL.

**The Gravity Forms / JotForm language in Erin's email is generic vendor boilerplate** — Allsberry's site is custom Next.js, not WordPress, so AgencyZoom's out-of-the-box form connectors don't apply. The build below uses the same Catch Hook → normalize → Paths pattern already designed for Ricochet, with AgencyZoom's native actions added as a parallel branch off the same trigger.

**Farmers Apex is unaffected** — still parked, still needs a Farmers-supplied endpoint. Once it lands it becomes a third parallel CRM branch off the same Catch Hook.

### Architecture — one Zap, three CRM branches

The Catch Hook stays singular (one `ZAPIER_WEBHOOK_URL`, configured in Vercel only after activation). After the Formatter/normalize step, the lead-type Paths (A/B/C below) each fan out into **parallel, independent branches** — AgencyZoom write, Ricochet write (once connected), Farmers Apex write (once the endpoint exists) — not a branching either/or. **SMS by Zapier fires once per lead, at the top level, not once per CRM branch** — it's a notification, not a CRM write, so it should not be duplicated inside the AgencyZoom path and the Ricochet path (that would text Brahm twice per lead). Wire it as its own parallel step off the Formatter, gated by the same `type != evidence-request` filter from the rev. 2 design.

One intentional divergence between the two CRM branches, worth a 10-second sanity check with Brahm: **Ricochet force-assigns every lead to Brahm**; the AgencyZoom branch below assigns to the **visitor's chosen agent** instead, since AgencyZoom already has clean per-agent producer IDs. That's fine as two independent systems, but flag it so it's a decision, not an inconsistency nobody noticed.

### Same-day update — build AgencyZoom-only for tomorrow; Ricochet vendor is Accelerated Automation, not AgencyZoom's own onboarding

Two things came in after the section above was written:

1. **The vendor is a third party ("Accelerated Automation," rep Janaya), already paid, running tomorrow's 10am PT call.** Their onboarding portal (`acceleratedautomation.launchportal.com`) is templated for a WordPress + Gravity Forms/JotForm site and asks for three sets of raw plaintext credentials: website login, Zapier login, and form-system login. **None of the first apply here** — this site has no CMS/login system to give them, and it isn't Gravity Forms or JotForm. **Do not submit the Zapier account password into that form** — that hands a third party full account access (every connected app, not just this one integration), not a scoped grant. Correct alternative: Zapier's own team-member invite (Settings → Team) for scoped, revocable access under Janaya's own login, **or** Will builds it live on the call using the recipe already documented here, so no credentials change hands at all. **Recommend Erin rotate the Zapier password regardless** — it was visible on-screen in a screen recording that's since been forwarded by email, so treat it as exposed.
2. **Erin authorized dropping Ricochet if that's what it takes to hit the deadline.** Given Ricochet has been stalled 3+ weeks on Brahm's missing Posting URL with no forward motion, and AgencyZoom is fully connected and ready now: **build AgencyZoom-only for tomorrow.** Ricochet stays documented above as a future add-on (same Zap, new parallel branch) if/when Brahm ever delivers the Posting URL — not deleted, just no longer blocking.

**Clean division of labor for tomorrow's call, with zero credential sharing either direction:**
- Hand Janaya the field-mapping spec above (Paths A/B/C, pipeline/stage/producer IDs, dedupe logic) instead of a login — she has everything needed to build the AgencyZoom action steps in Erin's Zapier account via a proper scoped invite, or by screen-sharing with Erin driving.
- The **one thing this build still needs from that call**: once Janaya (or whoever) creates the "Webhooks by Zapier → Catch Hook" trigger step, it generates a unique Catch Hook URL. That URL is the only artifact that needs to come back to Will/Claude — everything downstream (setting it as `ZAPIER_WEBHOOK_URL` in Vercel production + redeploy) can be done immediately once it's in hand.

### Live AgencyZoom account data (pulled via Zapier MCP, 2026-07-08)

- **Pipelines** (shared list for Personal + Business leads): `1. New Personal Leads` (98781), `2. Quotes Not Closed` (98784), `3. Leads Not Quoted` (98785), `4. New Comm. Leads` (98786), `5. Comm. Quotes Not Closed` (98787), `6. Comm. Leads Not Quoted` (98788), `7. Life Pipeline` (98789), `8. Referral Partnership` (98791).
- **Personal lead stages** (pipeline 98781): New (431879), Contacted (431880), Quoted (431881), Folio This Month (431882), Folio Next Month (431883). → use **New (431879)** for fresh web leads.
- **Producers (`assignTo`)** — maps cleanly to the site's existing `agentSlug` values in `src/lib/site-data.ts`:

  | Site `agentSlug` | AgencyZoom `assignTo` |
  |---|---|
  | erin | 171855 |
  | brahm | 171865 |
  | dakota | 171862 |
  | alex | 173933 |
  | vanessa | 173972 |
  | heidi | 173966 |
  | jenn | 173977 |
  | anna | 171955 |
  | jason | *(not a producer — no mapping; default to Round Robin)* |
  | *(none / round robin)* | 0 |

- **Service Request categories** — `Service: COI` (126391) is an exact match for evidence-of-insurance/certificate requests.
- **Service Request pipelines**: `Pers. Policy Changes` (98823), `Missing Documents` (98821), `Late Payments` (98818), `Commercial Renewals` (98827), `Comm. Policy Change` (98824), `Claims` (98819). No pipeline is named "COI" — best fit is **Missing Documents (98821)**; confirm live.
- **Service Request priorities**: High (51582), Medium (51583), Low (51584), Urgent Agency Mistake (52161), Urgent (52162), Today (52163), Low-Automation Only (52164). Default **Medium**.
- **Gap found — blocks clean segmentation:** no "Website" Lead Source exists yet among the 60+ configured sources (Google, Facebook, EverQuote, SMART FINANCIAL, agent names, etc.). Needs Brahm/Erin to add one in **AgencyZoom → Settings → Lead Sources** — a 30-second task, but it's the one blocking input, same category as Ricochet's Posting URL just much smaller.

### Zap build recipe: "Allsberry Website Leads → AgencyZoom"

1. **Trigger** — Webhooks by Zapier → Catch Hook (same pattern as the parked Ricochet recipe below; must be built in Zapier's web editor — the connected Zapier MCP can test/execute AgencyZoom actions but can't publish a live webhook-triggered Zap). Point `ZAPIER_WEBHOOK_URL` at it.
2. **Formatter** — normalize `full_name`; site is CA-only so `state` can be hardcoded `CA`.
3. **Paths** (mirrors the 3 site lead types):
   - **Path A — `quote-request`:** if `products` includes `business` or `workers-comp` → **Create Business Lead** (pipeline 98786 `4. New Comm. Leads`); else → **Create Personal Lead** (pipeline 98781, stage 431879 `New`).
     - `name` = firstName + lastName · `notes` = products list + message + referralSource + employees
     - `leadSourceId` = new "Website" source (pending creation) · `tagNames` = `Website` + `Opt-In` when `marketingTextOptIn` is true
     - `assignTo` = map `assignedAgentSlug` to the producer table above when present, else Round Robin (0). **This intentionally diverges from the Ricochet plan's "force everything to Brahm" rule** — AgencyZoom already has clean per-agent producer IDs, so honoring the visitor's chosen agent is the better default. Flag for a 10-second confirm with Erin/Brahm.
   - **Path B — `agent-contact`:** Create Personal Lead (or Business if `helpTopic` is "Business Insurance" or "Workers Comp"); `notes` = helpTopic + message; `assignTo` = the specific `agentSlug` the visitor contacted (always known here).
   - **Path C — `evidence-request`:** **Create Service Request**, not a lead — matches both the rev. 2 "Existing Customer" treatment and the vendor pitch's "creates Service Tickets for certificate requests." `categoryId` = 126391 `Service: COI`, `pipelineId` = 98821 `Missing Documents` (confirm), `priorityId` = Medium default, `subject`/`serviceDesc` = requestType + requestedFor + companyOrAgency + dueDate + message.
4. **Duplicate check** (matches the vendor pitch's "checks for duplicates: updates instead of creating a duplicate") — insert **Find a Lead** (search by phone, `createIfMissing=No`) ahead of Paths A/B; if found, branch to **Update Lead** + **Create a Note** (append, don't overwrite `notes`) instead of Create.
5. Comments/logging live directly in the `notes` field on the Create action — no separate step needed except in the dedupe-found branch.

### Needed from Brahm/Erin before or during the call

1. Add a **"Website"** Lead Source in AgencyZoom (Settings → Lead Sources).
2. Confirm: assign website leads to the **visitor's chosen agent** (recommended above) or force everything to **Brahm** (matches the parked Ricochet decision, for consistency across CRMs)?
3. Confirm the Service Request **pipeline** for COI/evidence requests — `Missing Documents` (98821) is the best guess from the existing pipeline list; pick a different one if it doesn't fit.
4. ~~Confirm replace-vs-alongside~~ — resolved 2026-07-08: **runs alongside Ricochet**, both CRMs get every lead. Still bring the Ricochet Posting URL if Brahm has it — the moment it's connected, its branch slots into this same Zap.

## ▶ Resume here (EOD 2026-06-15) — parked, Ricochet plan below

**Done that day:** email live (`quotes@` + `brahm@` + `leads@`); site emits source-tagged lead payload (committed); Zapier MCP connected + inventoried; Brahm's answers locked; editor build recipe written.

**Was next, in order (superseded by the AgencyZoom pivot above unless Brahm says otherwise):**
1. **Brahm** — bring the **Ricochet Posting URL** from his Ricochet meeting + connect Ricochet in their Zapier. ← the gate.
2. **Will** — connect **SMS by Zapier** and verify **(951) 266-2019** (path A) via the app-auth URL, so the alert + a test text can fire.
3. **Claude** — build the editor Zap per "Editor build recipe": Catch Hook → normalize → Paths (new-business → Ricochet + SMS; COI → Ricochet "Existing Customer", no SMS). Set `ZAPIER_WEBHOOK_URL` in Vercel prod + redeploy.
4. **Claude + Will** — go-live test (Will's OK) → fire a test lead per form type.

**Still gathering:** real SmartFinancial lead email (true From:/Subject), provider count, Farmers Apex endpoint.

## What changed in rev. 2

Rev. 1 covered one channel (website forms). Research confirmed Allsberry has **two** lead channels and surfaced a cleaner architecture, plus corrections that prevent building on unverified assumptions:

- Ricochet has a **native Zapier "Create Lead" action** AND a per-account **Posting URL** — this is the single shared dependency for both channels.
- SmartFinancial can likely **post leads directly into Ricochet** (real-time, no email, no parsing) — confirm per-account with SmartFinancial support (877-323-7750).
- The `info@contact-corp.com` sender and `pro.smartfinancial.com …` subject are **inbox-derived and unconfirmed** — verify the real `From:`/`Subject` before building any Gmail filter.
- "Farmers Apex = Salesforce" is **unverified**, and a franchise agent has no admin rights there — Apex stays a Zapier-webhook-to-whatever-Farmers-supplies, email as fallback.

## Intake channels

| # | Channel | How it arrives | Notes |
|---|---------|----------------|-------|
| A | **Website forms** | quote / agent-contact / evidence-of-insurance → `POST /api/leads` | Instant. Already emits clean JSON to Zapier. |
| B | **Lead-provider emails** | e.g. SmartFinancial → HTML email into the agency Gmail | Richer (~28 fields). Prefer direct-post; else Gmail + AI extraction. |

## Goal

Every lead, from either channel: (1) email `quotes@` + `brahm@`, (2) land in **Ricochet** + **AgencyZoom** (rev. 3) + **Farmers Apex**, (3) fire an SMS alert to **(951) 266-2019** (once per lead, not once per CRM).

## Decisions (locked — Brahm confirmed 2026-06-15)

- **Email** = site-side SMTP to `quotes@allsberryagency.com` + `brahm@allsberryagency.com`, with `leads@` kept as a silent backup. (`quotes@` confirmed as a real mailbox.) [Q1=B, Q2=A]
- **Lead owner** = every lead assigned to **Brahm Shank** (`brahm@allsberryagency.com`) in Ricochet — overrides the on-form agent pick; keep the visitor's chosen agent in lead notes so it's not lost. [Q6]
- **COI / evidence-of-insurance** = flows into Ricochet/Farmers like other leads, tagged **"Existing Customer"**. [Q4=A]
- **Customer auto-reply** = none; internal alerts only. [Q7=C]
- **Provider leads** = bring them in; pursue SmartFinancial direct-to-Ricochet first. Email-only providers parsed via **AI by Zapier** (native — no personal API keys; keeps client billing self-contained). [Q3=A]
- **Extra automations (Phase 2)** = none for now; core lead pipeline only. [Q8=D]
- **SMS** = SMS by Zapier → +1 951 266 2019 (stays on Zapier — no personal Twilio; keep client separate). Fires on every **new** lead; **skips COI/evidence** requests (a Filter on `type != evidence-request` before the SMS step). [Q5: Brahm 2026-06-15]
- **CRMs** = Ricochet + Farmers Apex. ~~AgencyZoom out of scope.~~ **Superseded by rev. 3 (2026-07-08): AgencyZoom is back in scope, runs alongside Ricochet — every lead goes to both.**
- **Zapier plan** = Pro (750 tasks/mo).

## Architecture (hub-and-spoke)

```
SPOKES (per source → map to ONE canonical lead shape)
  A. Website form   → /api/leads POST ───────────────┐
  B. SmartFinancial → direct-post to Ricochet (if enabled)   ← skips the hub entirely
                    └ else: Gmail label → AI extract → ──────┐
                                                             ▼
                                        ROUTER (single Zapier Zap)
                                          normalize →
                                            • Ricochet  (native "Create Lead")
                                            • Farmers Apex (Webhooks by Zapier — parked)
                                            • SMS by Zapier (after validation)
```

For v1 a single Zap with a Formatter normalize step is fine. Adopt true hub-and-spoke (a dedicated "Router" Catch Hook all spokes POST into) once a second provider arrives — then adding a provider is "add a spoke," never touching routing.

## The single blocking dependency: Ricochet Posting URL

Ricochet360 ingests inbound leads via a **per-account, per-source "Posting URL"** generated inside Brahm's account (lead-posting settings). Form-encoded params; the URL itself usually carries the credential/vendor token. **Required field: Vendor Name.** Two ways to feed it:

1. **Direct POST** to the Posting URL (server-to-server, real-time, no Zapier) — also how provider integrations (EverQuote/QuoteWizard) feed Ricochet under the hood.
2. **Native Zapier "Ricochet – Speed to Contact" → Create Lead** action (Brahm OAuths the app) — no-code; preferred for our fan-out Zap.

Native "Create Lead" fields: Vendor Name (required), First/Last Name, Phone, Email, State, Status, Company Name, + custom fields.

**Need from Brahm:** the Posting URL + exact param key names (`first_name` vs `firstname`, `phone` vs `phone_number`, the vendor/source token) + GET or POST + which Vendor Name labels to use per source + which custom fields exist (state, ZIP, DOB, line of business, home details).

## Zapier account state (2026-06-15, via Zapier MCP)

- **Only AgencyZoom is enabled** (full CRM toolkit: Create Personal/Business Lead, Update Lead, Notes, Tasks, Service Requests, triggers). **Per Will's call we leave AgencyZoom untouched** — CRM = Ricochet + Farmers only. (Flagged that AgencyZoom is fully wired despite "drop it" — Brahm to confirm strategy if revisited.)
- **Ricochet — Speed to Contact** is an official Zapier app with a Create Lead write action — **available but not connected**; needs Brahm to OAuth his Ricochet login + the Posting URL.
- **SMS by Zapier** available (built-in number).
- **Farmers Insurance** has **no Zapier connector** → Apex must be a Farmers-supplied webhook (Webhooks by Zapier) or email. Parked.
- Note: the Zapier MCP executes/tests actions; it does **not** build published, webhook-triggered Zaps. The always-on pipeline below is built in the Zapier **editor** (Pro).

## Editor build recipe — website pipeline (build once Ricochet is connected)

Zap: **"Allsberry Website Leads → Ricochet + SMS"**

1. **Trigger** — Webhooks by Zapier → **Catch Hook**. Copy the hook URL → set as `ZAPIER_WEBHOOK_URL` in Vercel production. (Site already POSTs `source`, `leadTypeLabel`, `type`, all lead fields + `timestamp`.)
2. **Formatter** (normalize) — build `full_name` (`firstName`+`lastName`, else `name`); map `interest` (`products` / `helpTopic` / `requestType`); derive `state` from `zipCode` if needed.
3. **Paths** (Pro):
   - **Path A — new business** (`type` = `quote-request` OR `agent-contact`):
     1. **Ricochet → Create Lead** — Vendor Name = "Allsberry Website"; map full_name/first/last, phone, email, state, interest → Ricochet fields; **owner = Brahm**.
     2. **SMS by Zapier → Send SMS** — To `+19512662019`, Message: `New {{leadTypeLabel}} lead: {{full_name}} · {{phone}} · {{interest}} — call now`.
   - **Path B — COI** (`type` = `evidence-request`):
     1. **Ricochet → Create Lead** — tag/status **"Existing Customer"**; owner = Brahm. **No SMS.**
4. **Farmers Apex** (parked) — add a **Webhooks by Zapier → POST** step to both paths once Farmers supplies the endpoint/fields.

Finalize exact Ricochet field/param names + the "Existing Customer" tag field when Ricochet is connected (from Brahm's Posting URL or the native action schema).

## Channel A — Website forms (site side DONE)

`/api/leads` validates, emails the team, and POSTs to `ZAPIER_WEBHOOK_URL`. As of rev. 2 the payload also carries `source: "website"` and a human `leadTypeLabel`. Remaining (config, not code): point `ZAPIER_WEBHOOK_URL` at the Zap's Catch Hook (or omit if using the native Ricochet action) + set the email env (below) in Vercel, then redeploy.

## Channel B — Provider emails

**First choice: direct-post.** If SmartFinancial direct-post is enabled for this account, leads land in Ricochet with no email/parsing. Call SmartFinancial agent support **877-323-7750** to confirm and get the field schema.

**Fallback (email-only providers): Gmail → AI extraction.**

1. Gmail **filter** matches the **verified** sender/subject → applies label `leads/provider` (+ per-provider sub-label).
2. Zapier "New Email Matching Search" on `label:leads/provider` → **AI by Zapier "Analyze and Return Data"** with explicit named output fields → **validation Filter** (halt if name + (phone OR email) missing) → normalize → Router tail.
3. Guardrails: low-temperature model; store `raw_email_body` on every lead; route failed parses to a `leads/needs-review` label + alert (never silently drop). Email Parser by Zapier is a deterministic fallback only (can't parse HTML tables; ~15-template cap).

⚠️ **Verify the real sender first.** Open a real SmartFinancial lead email and read the actual `From:`/`Subject` before building the filter — `contact-corp.com` is unattested publicly. The Gmail filter/labels can be set via SigComms once Brahm confirms the agency Gmail account + real headers (live-inbox action — needs go-ahead).

## Farmers Apex

"Apex = Salesforce" is **unverified**, and a Farmers franchise agent has no admin rights in the corporate org, so direct Salesforce injection (Web-to-Lead, REST, native Zapier Salesforce) is not feasible. Mechanic: **Webhooks by Zapier → whatever inbound endpoint Farmers supplies** (must come from Farmers; no public spec). Email is the guaranteed fallback. **Parked** until Brahm returns the endpoint.

**Need from Brahm/Farmers:** Apex inbound URL + method + field schema + auth; whether the agency owns a separate Salesforce org; whether ePartner vetting is required; accepted email format if there is no API.

## Unified normalized lead model

| Field | Sources | Notes |
|-------|---------|-------|
| `lead_source` / Vendor Name | all (required) | `website` or provider name. Ricochet REQUIRES it; routing/segmentation key. |
| `lead_type` | all | website: Quote/Agent/Evidence label; provider: line of business. |
| `first_name` / `last_name` | both | website: split from `name` for agent/evidence; provider: parsed. |
| `full_name` | all | SMS + Apex convenience. |
| `phone` | all (required) | coerce to E.164; primary dedupe/dialer key. |
| `email` | all | website validated; secondary dedupe key. |
| `zip_code` / `state` | website (quote/evidence) + provider | territory routing; derive state from ZIP if missing. |
| `interest` | all | products[] / helpTopic / requestType / provider coverage → one field. |
| `dob`, `gender`, `marital_status`, `credit_rating` | provider only | null for website. **Sensitive — never in SMS.** |
| `home_details` (~28 fields) | provider only | keep as sub-object; website has none. |
| `assigned_agent` / `agent_slug` | website only | provider: round-robin/default desk. |
| attribution (utm*, gclid, fbclid, referrer, landing_page) | website only | always null on provider leads (provider IS the source). |
| `timestamp` | all | website instant; provider = email received time (polling adds 1–2 min). |
| `raw_payload` / `raw_email_body` | all | audit + recovery; essential for the AI path. |

## SMS

Fire **after** validation; tag the source; never include DOB/credit. Suggested: `New {{leadTypeLabel}} lead: {{full_name}} · {{phone}} · {{interest}} — call now`. Watch SMS-by-Zapier's shared-number monthly cap given higher provider volume → move to Twilio if needed. **Decide:** should provider leads fire SMS at all, or only website leads?

## Email (site-side) — DONE (2026-06-15, live)

`LEADS_TO_EMAIL` set in Vercel **production** to `quotes@allsberryagency.com, brahm@allsberryagency.com, leads@allsberryagency.com` and redeployed (deployment `allsberryagency-9gd3qgtyz`, aliased to allsberryagency.com, HTTP 200). Every website lead now emails all three; `leads@` is the silent backup. Redeployed from the committed source (`eea530a`) — the rev. 2 payload code changes remain local/uncommitted until the Zapier build.

## Site-side changes made (rev. 2)

- `src/lib/lead-schemas.ts` — added exported `leadTypeLabels` (single source of truth).
- `src/lib/lead-email.ts` — imports that map (removed the duplicate const).
- `src/app/api/leads/route.ts` — Zapier payload now includes `source: "website"` + `leadTypeLabel`. `npm run check` passes (lint + typecheck).

## Build inputs still needed (maps to the Brahm questionnaire)

1. **Ricochet Posting URL** + param keys + GET/POST + Vendor Name labels + existing custom fields. ← the blocker for both channels.
2. Whether **SmartFinancial can direct-post** into Ricochet for this account (877-323-7750).
3. Real **`From:`/`Subject`** of an actual SmartFinancial lead email.
4. **Farmers Apex** inbound endpoint + fields + auth (Brahm digging).
5. Confirm **`quotes@`** mailbox/alias/group.
6. Should **provider leads fire SMS**? **AI by Zapier vs BYO key**? **PII retention** for `raw_email_body`?

## Test plan

Per channel, submit a synthetic lead and confirm: email to `quotes@` + `brahm@`; Ricochet record with correct fields + Vendor Name; Farmers Apex record (once endpoint live); SMS received; failed parses land in `leads/needs-review`. Email path goes to the real leads inbox — get action-time approval before a live test.

## Open questions / uncertainty (honest list)

- Ricochet "URL is the credential" auth pattern is typical but not verified for Ricochet specifically.
- "Same Posting URL under the hood" for provider direct-posts is inferred, not documented per provider.
- SmartFinancial direct-post availability on THIS account is unconfirmed until support says so.
- Apex internals (Salesforce org? ePartner required?) unknown until Farmers responds.
- AI-extraction cost depends on monthly provider-lead volume (need an estimate) and current Zapier AI credit pricing.
