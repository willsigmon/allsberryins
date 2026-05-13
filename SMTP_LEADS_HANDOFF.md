# SMTP Lead Delivery Handoff

## Current production status

The Allsberry site sends quote/contact/evidence leads through `/api/leads`, which calls `src/lib/lead-email.ts` and uses Nodemailer SMTP.

On 2026-05-04, production Vercel project `wsmco/allsberryagency` was switched from Google Workspace SMTP to Brevo SMTP because Erin's Google mailbox should not be used as the website SMTP identity.

Current Vercel **production** email variables:

```env
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=<Brevo SMTP login>
SMTP_PASSWORD=<encrypted Brevo SMTP key in Vercel>
LEADS_TO_EMAIL=leads@allsberryagency.com
LEADS_FROM_EMAIL=will@willsigmon.media
```

`LEADS_FROM_EMAIL` is temporarily set to `will@willsigmon.media` because that sender is already verified in the Brevo account. This keeps lead delivery unblocked without relying on Erin's mailbox or unauthenticated Allsberry DNS.

Production was redeployed after the switch:

- Deployment: `dpl_GvJgVRRswuVhpJvoqeG3j5XFkkbm`
- Production alias: `https://allsberryagency.com`

## 2026-05-12 GoDaddy migration update

Erin received Google's post-migration notice confirming that `allsberryagency.com`
has moved from Google-managed domain registration to a newly created GoDaddy
account. This does not change the Google Workspace mailbox subscription, but it
does make GoDaddy the required place to manage renewal billing, domain contact
details, nameservers, and DNS records.

Immediate owner-side action:

1. Find the GoDaddy welcome email sent to the domain account contact.
2. Sign in to the newly created GoDaddy account from that email.
3. Accept GoDaddy's terms.
4. Add/update billing and domain-contact information before the next renewal.
5. Either:
   - add the Brevo records in GoDaddy DNS, or
   - delegate DNS/domain access so we can add them, or
   - change nameservers to Vercel using the prepared Vercel zone below.

If Erin cannot find the GoDaddy welcome email, contact GoDaddy Support and ask
them to recover the newly created account for `allsberryagency.com`.

## 2026-05-12 DNS/domain-auth update

The GoDaddy account that manages `allsberryagency.com` was recovered by customer
number and used to add the four Brevo authentication records directly in live
GoDaddy DNS.

Confirmed live against both authoritative GoDaddy nameservers
(`ns55.domaincontrol.com` and `ns56.domaincontrol.com`):

| Type | Host | Live value |
| --- | --- | --- |
| TXT | `@` | `brevo-code:5c72a10a14d5f5d95eeaf277557c9adf` |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:rua@dmarc.brevo.com` |
| CNAME | `brevo1._domainkey` | `b1.allsberryagency-com.dkim.brevo.com` |
| CNAME | `brevo2._domainkey` | `b2.allsberryagency-com.dkim.brevo.com` |

Public recursive DNS also returned `_dmarc`, `brevo1._domainkey`, and
`brevo2._domainkey`, so the DNS side is no longer the blocker.

Remaining dashboard-side step: authenticate/verify `allsberryagency.com` inside
Brevo. Brevo's API supports domain authentication through
`PUT /v3/senders/domains/{domainName}/authenticate`, but this repo currently
does not have a usable Brevo API key available. Browser login also requires the
actual Brevo account; Google OAuth with `wjsigmon@gmail.com` is not associated
with the Brevo account.

Do **not** switch `LEADS_FROM_EMAIL` to `website@allsberryagency.com` until
Brevo reports the domain as authenticated.

## 2026-05-12 Brevo authentication + production sender flip

Brevo API access was recovered for the `will@willsigmon.media` Brevo account.
Using Brevo's `/v3/senders/domains/allsberryagency.com` endpoints:

- Before authentication, Brevo already saw all four DNS records as `status: true`.
- `PUT /v3/senders/domains/allsberryagency.com/authenticate` returned
  `Domain has been authenticated successfully.`
- A follow-up domain fetch returned `verified: true` and `authenticated: true`.

After Brevo confirmed authentication, production Vercel env values were updated
for the live website:

```env
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=<Brevo SMTP login>
SMTP_PASSWORD=<Brevo SMTP key>
LEADS_TO_EMAIL=leads@allsberryagency.com
LEADS_FROM_EMAIL=website@allsberryagency.com
```

Production was redeployed after the env update:

- Deployment: `dpl_CnpGniezh8nMprScMeXXk5SqYDLk`
- Production alias: `https://allsberryagency.com`
- Vercel ready state: `READY`

The live homepage returned `HTTP/2 200` from Vercel after the deploy.

## DNS/domain-auth background

The preferred final sender is:

```env
LEADS_FROM_EMAIL=website@allsberryagency.com
```

That requires authenticating `allsberryagency.com` in Brevo first.

Brevo generated these DNS records:

| Type | Host | Value |
| --- | --- | --- |
| TXT | `@` | `brevo-code:5c72a10a14d5f5d95eeaf277557c9adf` |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:rua@dmarc.brevo.com` |
| CNAME | `brevo1._domainkey` | `b1.allsberryagency-com.dkim.brevo.com` |
| CNAME | `brevo2._domainkey` | `b2.allsberryagency-com.dkim.brevo.com` |

Important: do **not** delete the existing Google SPF TXT record at `@` unless replacing it with a correctly merged SPF record. Brevo's generated records above do not require changing the existing SPF record.


## Vercel DNS zone prepared

On 2026-05-04, the Vercel DNS zone for `allsberryagency.com` was filled out with the records needed to survive a future nameserver move to Vercel:

- Google Workspace MX records
- existing Google site verification TXT
- existing Google SPF TXT
- Brevo domain verification TXT
- Brevo DKIM CNAME records
- Brevo DMARC TXT record

Vercel DNS record IDs created:

| Purpose | ID |
| --- | --- |
| Google MX `aspmx.l.google.com` | `rec_19ebf857464baa123ecc33b3` |
| Google MX `alt1.aspmx.l.google.com` | `rec_cd0bc02f17ccf6f4e6f56efd` |
| Google MX `alt2.aspmx.l.google.com` | `rec_ba356297a9b05a7eac1bb077` |
| Google MX `aspmx2.googlemail.com` | `rec_4647309dcf94b5bca49348cb` |
| Google MX `aspmx3.googlemail.com` | `rec_a875f9b18a1e2b8a4d7e91c3` |
| Google verification TXT | `rec_09fa8744040aab60eb57a199` |
| SPF TXT | `rec_3600d713f5d5614621479379` |
| Brevo verification TXT | `rec_2919cbaab0fcb60aa67d2308` |
| Brevo DKIM 1 CNAME | `rec_57b152d09b4ebdae1ebe0b21` |
| Brevo DKIM 2 CNAME | `rec_f6cf692e12bf11a29820ed7b` |
| Brevo DMARC TXT | `rec_b76be87a7717709bf0df4dc8` |

This does **not** affect live DNS yet because authoritative nameservers are still GoDaddy (`NS55.DOMAINCONTROL.COM` / `NS56.DOMAINCONTROL.COM`). If the real GoDaddy domain owner changes nameservers to `ns1.vercel-dns.com` and `ns2.vercel-dns.com`, the Vercel zone is now ready and should preserve website + Google Workspace mail + Brevo authentication.

Live check before the GoDaddy fix on 2026-05-12:

- Authoritative nameservers are still GoDaddy:
  - `ns55.domaincontrol.com`
  - `ns56.domaincontrol.com`
- Google Workspace MX records are still present.
- Brevo verification, DKIM, and DMARC records were **not** present in live DNS.
- `www.allsberryagency.com` now resolves through Vercel and redirects to
  `https://allsberryagency.com/`.

## What was tried

- Domain registrar and authoritative DNS are GoDaddy:
  - `NS55.DOMAINCONTROL.COM`
  - `NS56.DOMAINCONTROL.COM`
- Vercel knows the domain, but current DNS is **not** Vercel DNS. Vercel's intended nameservers are `ns1.vercel-dns.com` / `ns2.vercel-dns.com`, but those are not authoritative, so adding DNS records in Vercel will not authenticate Brevo.
- Brevo's automatic GoDaddy/Domain Connect flow was attempted.
- Erin's GoDaddy account logged in successfully, but Domain Connect said she does not have access to this domain's DNS.
- The saved GoDaddy login `info@thehelpcenternc.com` also logged in successfully, but GoDaddy DNS Management said `allsberryagency.com` was not found. This account is for Twanna Jones / The Help Center NC, a different client, and should not be used for Allsberry DNS work.
- Google Admin → Domains → Manage domains → Advanced DNS Settings showed a GoDaddy DNS console sign-in for `allsberryagency.com`. The displayed credentials were tried in both the Google Workspace-branded GoDaddy login and the generic GoDaddy/secure-server login in a clean Safari session on 2026-05-04. Both flows rejected them as an incorrect username/password, so the Google Admin DNS-console credentials appear stale, locked, or no longer valid.
- On 2026-05-12, Google's migration notice made the likely path clearer: the
  working registrar login is the newly created GoDaddy account referenced in the
  GoDaddy welcome email, not the older Google Admin DNS-console credential.

## Next actions

### To finish domain authentication

Complete as of 2026-05-12: live GoDaddy DNS records are in place, Brevo reports
`allsberryagency.com` as verified/authenticated, Vercel env was flipped to
`website@allsberryagency.com`, and production was redeployed.

Alternative if the owner later wants Vercel to be the DNS source of truth: use a
working GoDaddy/registrar login to change the domain nameservers from:

```text
NS55.DOMAINCONTROL.COM
NS56.DOMAINCONTROL.COM
```

to:

```text
ns1.vercel-dns.com
ns2.vercel-dns.com
```

The Vercel DNS zone is already staged with website, Google Workspace mail, and
Brevo authentication records, so this nameserver move should be safe if the
owner deliberately wants Vercel to manage DNS. It is no longer required just to
finish Brevo authentication.

Historical command pattern used after Brevo authentication:

```bash
vercel env update LEADS_FROM_EMAIL production --value website@allsberryagency.com --yes
vercel deploy --prod --archive=tgz
```

### To test the current working fallback

Submit a synthetic lead through `https://allsberryagency.com/api/leads` or the live quote form and confirm delivery to `leads@allsberryagency.com`. Because this sends a real email to the leads inbox, get action-time approval before running the test.

## Notes

- Do not use Erin's normal Google account password for SMTP.
- Do not set `LEADS_FROM_EMAIL=website@allsberryagency.com` until Brevo domain authentication succeeds.
- The current fallback should keep the website from failing closed on lead submissions while DNS ownership is sorted out.
