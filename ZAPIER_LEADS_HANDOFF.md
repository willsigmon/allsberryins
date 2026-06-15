# Zapier Lead Automation — Design & Handoff

**Date:** 2026-06-15 (rev. 2 — research-backed, two-channel)
**Status:** Design finalized. Build blocked on a few inputs from Brahm (see "Build inputs still needed").
**Requirements from:** Brahm Shank (Allsberry). Owner contacts: Erin / Brahm.

## ▶ Resume here (EOD 2026-06-15)

**Done today:** email live (`quotes@` + `brahm@` + `leads@`); site emits source-tagged lead payload (committed); Zapier MCP connected + inventoried; Brahm's answers locked; editor build recipe written.

**Tomorrow, in order:**
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

Every lead, from either channel: (1) email `quotes@` + `brahm@`, (2) land in **Ricochet** + **Farmers Apex**, (3) fire an SMS alert to **(951) 266-2019**.

## Decisions (locked — Brahm confirmed 2026-06-15)

- **Email** = site-side SMTP to `quotes@allsberryagency.com` + `brahm@allsberryagency.com`, with `leads@` kept as a silent backup. (`quotes@` confirmed as a real mailbox.) [Q1=B, Q2=A]
- **Lead owner** = every lead assigned to **Brahm Shank** (`brahm@allsberryagency.com`) in Ricochet — overrides the on-form agent pick; keep the visitor's chosen agent in lead notes so it's not lost. [Q6]
- **COI / evidence-of-insurance** = flows into Ricochet/Farmers like other leads, tagged **"Existing Customer"**. [Q4=A]
- **Customer auto-reply** = none; internal alerts only. [Q7=C]
- **Provider leads** = bring them in; pursue SmartFinancial direct-to-Ricochet first. Email-only providers parsed via **AI by Zapier** (native — no personal API keys; keeps client billing self-contained). [Q3=A]
- **Extra automations (Phase 2)** = none for now; core lead pipeline only. [Q8=D]
- **SMS** = SMS by Zapier → +1 951 266 2019 (stays on Zapier — no personal Twilio; keep client separate). Fires on every **new** lead; **skips COI/evidence** requests (a Filter on `type != evidence-request` before the SMS step). [Q5: Brahm 2026-06-15]
- **CRMs** = Ricochet + Farmers Apex. AgencyZoom out of scope.
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
