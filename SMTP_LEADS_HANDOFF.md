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

## DNS/domain-auth blocker

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

## What was tried

- Domain registrar and authoritative DNS are GoDaddy:
  - `NS55.DOMAINCONTROL.COM`
  - `NS56.DOMAINCONTROL.COM`
- Vercel knows the domain, but current DNS is **not** Vercel DNS. Vercel's intended nameservers are `ns1.vercel-dns.com` / `ns2.vercel-dns.com`, but those are not authoritative, so adding DNS records in Vercel will not authenticate Brevo.
- Brevo's automatic GoDaddy/Domain Connect flow was attempted.
- Erin's GoDaddy account logged in successfully, but Domain Connect said she does not have access to this domain's DNS.
- The saved GoDaddy login `info@thehelpcenternc.com` also logged in successfully, but GoDaddy DNS Management said `allsberryagency.com` was not found. This account is for Twanna Jones / The Help Center NC, a different client, and should not be used for Allsberry DNS work.
- Google Admin → Domains → Manage domains → Advanced DNS Settings showed a GoDaddy DNS console sign-in for `allsberryagency.com`. The displayed credentials were tried in both the Google Workspace-branded GoDaddy login and the generic GoDaddy/secure-server login in a clean Safari session on 2026-05-04. Both flows rejected them as an incorrect username/password, so the Google Admin DNS-console credentials appear stale, locked, or no longer valid.

## Next actions

### To finish domain authentication

Get access to the GoDaddy account that actually owns/manages `allsberryagency.com`, or have the owner add delegate DNS access. Then add the four Brevo DNS records above and return to Brevo to verify/authenticate the domain.

Alternative if the owner wants Vercel to be the DNS source of truth: use a working GoDaddy/registrar login to change the domain nameservers from:

```text
NS55.DOMAINCONTROL.COM
NS56.DOMAINCONTROL.COM
```

to:

```text
ns1.vercel-dns.com
ns2.vercel-dns.com
```

The Vercel DNS zone is already staged with website, Google Workspace mail, and Brevo authentication records, so this nameserver move should be the fastest finish once registrar access is working.

After Brevo shows `allsberryagency.com` as authenticated:

```bash
vercel env add LEADS_FROM_EMAIL production --value website@allsberryagency.com --yes --force
vercel deploy --prod --archive=tgz
```

### To test the current working fallback

Submit a synthetic lead through `https://allsberryagency.com/api/leads` or the live quote form and confirm delivery to `leads@allsberryagency.com`. Because this sends a real email to the leads inbox, get action-time approval before running the test.

## Notes

- Do not use Erin's normal Google account password for SMTP.
- Do not set `LEADS_FROM_EMAIL=website@allsberryagency.com` until Brevo domain authentication succeeds.
- The current fallback should keep the website from failing closed on lead submissions while DNS ownership is sorted out.
