# SEO + AIO Implementation Notes

_Last updated: April 6, 2026_

This repo now includes the first SEO/AIO content wedge for Allsberry Insurance:

- `/california-home-insurance`
- `/wildfire-home-insurance-california`
- `/ca-fair-plan-guide`
- `/difference-in-conditions-insurance-california`
- `/home-insurance-in-a-fire-zone-california`
- `/insurance-agency-corona-ca`
- `/resources`

## What changed in the site

- Added a typed SEO content model in `src/lib/seo-content.ts`
- Added a reusable App Router page template for search-focused content
- Added homepage and internal links into the new wedge pages
- Expanded `InsuranceAgency` schema with address, geo, and Google profile references
- Added optional Search Console / Bing verification support via metadata env vars
- Added sitemap coverage for the new pages
- Kept bots open for modern discovery, including `OAI-SearchBot` and `bingbot`
- Added an IndexNow key file and submission script for faster Bing-compatible URL discovery

## Week 1 platform checklist

### Google Business Profile
- Confirm primary category and secondary categories
- Confirm business name, suite, phone, and hours
- Confirm the website points to `https://allsberryagency.com`
- Add fresh office/team photos
- Add services and business description updates
- Start review request cadence again

### Apple Business Connect
- Confirm address, phone, hours, and website
- Confirm **Call** and **Website** actions are enabled
- Check for duplicate or stale records

### Google Search Console
- Verify the property for `allsberryagency.com`
- Submit the sitemap
- Watch indexing for the new wedge pages
- Review query/page pairs every 30 days

### Bing Webmaster Tools
- Verify the site
- Submit the sitemap
- Review IndexNow submissions and monitor discovery after each major content release

## Verification env vars

Add these when platform access is available:

- `GOOGLE_SITE_VERIFICATION`
- `BING_SITE_VERIFICATION`

The metadata layer is already ready to output both verification tags once those values are set.

## Initial keyword basket

See `SEO_KEYWORD_BASKET.csv` for the tracked set.

## IndexNow

- Hosted key file: `https://allsberryagency.com/e0022f32345a418e8badda0d9a7a1f1f.txt`
- Submission script: `npm run seo:indexnow`

The current script submits the homepage, resources hub, wedge pages, and the key supporting pages that were updated in this rollout.

## Review cadence

- **30 days:** indexing, impressions, and early local actions
- **60 days:** movement for the keyword basket and local-pack visibility
- **90 days:** conversions, page/query winners, and next wedge decision

## Manual AI-search spot checks

During each 30/60/90-day review, manually check:

- Google Search results for the keyword basket
- Google AI Overviews where they appear
- ChatGPT Search results for the core wedge topics
- Bing / Copilot-style results for the same topics

Do not treat AI-search visibility as a separate technical system from SEO. Use the same fundamentals:

- crawlable pages
- clear answers near the top
- strong entity signals
- clean metadata and schema
- real local proof

## Expansion order after this wedge

Default next wedge:

1. workers comp / contractor insurance
2. then auto + bundle

Do not mass-produce city pages until there is unique proof, local demand, and enough content to avoid thin doorway pages.

## Research anchors

- Google AI features and websites: <https://developers.google.com/search/docs/appearance/ai-features>
- Google people-first content guidance: <https://developers.google.com/search/docs/fundamentals/creating-helpful-content>
- Google local ranking guidance: <https://support.google.com/business/answer/7091?hl=en>
- OpenAI crawler controls: <https://platform.openai.com/docs/bots>
- ChatGPT Search overview: <https://help.openai.com/en/articles/9237897-chatgpt-search>
- Bing IndexNow overview: <https://www.bing.com/indexnow>
