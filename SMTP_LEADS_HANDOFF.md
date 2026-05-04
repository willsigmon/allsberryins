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

## What was tried

- Domain registrar and authoritative DNS are GoDaddy:
  - `NS55.DOMAINCONTROL.COM`
  - `NS56.DOMAINCONTROL.COM`
- Vercel knows the domain, but current DNS is **not** Vercel DNS. Vercel's intended nameservers are `ns1.vercel-dns.com` / `ns2.vercel-dns.com`, but those are not authoritative, so adding DNS records in Vercel will not authenticate Brevo.
- Brevo's automatic GoDaddy/Domain Connect flow was attempted.
- Erin's GoDaddy account logged in successfully, but Domain Connect said she does not have access to this domain's DNS.
- The saved GoDaddy login `info@thehelpcenternc.com` also logged in successfully, but GoDaddy DNS Management said `allsberryagency.com` was not found.

## Next actions

### To finish domain authentication

Get access to the GoDaddy account that actually owns/manages `allsberryagency.com`, or have the owner add delegate DNS access. Then add the four Brevo DNS records above and return to Brevo to verify/authenticate the domain.

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
