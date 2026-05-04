# SMTP Lead Delivery Handoff

## Status

The Allsberry site sends quote/contact/evidence leads through `/api/leads`, which calls `src/lib/lead-email.ts` and uses Nodemailer SMTP.

On 2026-05-04, these Vercel **production** environment variables were configured for project `wsmco/allsberryagency`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=erin@allsberryagency.com
LEADS_TO_EMAIL=leads@allsberryagency.com
LEADS_FROM_EMAIL=erin@allsberryagency.com
```

`SMTP_PASSWORD` was intentionally **not** set because the value provided was still the placeholder `PASTE_16_CHAR_APP_PASSWORD_HERE`.

## Next action

1. Log into Erin's Google Workspace account.
2. Ensure 2-Step Verification is enabled.
3. Create a Google App Password for the website SMTP integration.
4. Add that 16-character app password to Vercel production as `SMTP_PASSWORD`.
5. Redeploy production.
6. Submit a test quote/contact form and verify delivery to `leads@allsberryagency.com`.

## Important checks

- Do not use Erin's normal Google account password for SMTP.
- Confirm `leads@allsberryagency.com` exists as a Google Workspace mailbox, group, or alias.
- Keep `LEADS_FROM_EMAIL` aligned with the authenticated sender unless Google Workspace has the sender configured as a permitted alias.
- Production lead submissions fail closed if SMTP is missing or broken, so test after redeploy.
