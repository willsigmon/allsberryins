import Script from "next/script";

/**
 * GA4 + Google Ads tracking. Renders nothing unless at least one env var is set.
 *
 * Set via Vercel / .env.local:
 *   NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
 *   NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX
 *   NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL=XXXXXXX  (used by fireLeadConversion)
 *
 * Inline script contents below are fully static (only injected values are
 * env-controlled measurement IDs, JSON-stringified) so there is no user-supplied
 * content reaching the DOM. This mirrors Google's official gtag.js install snippet.
 */
export function GoogleAnalytics() {
  const ga4Id = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

  if (!ga4Id && !adsId) return null;

  const loaderSrc = ga4Id
    ? `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4Id)}`
    : `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(adsId ?? "")}`;

  const configLines = [
    ga4Id ? `gtag('config', ${JSON.stringify(ga4Id)});` : "",
    adsId ? `gtag('config', ${JSON.stringify(adsId)});` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const initScript = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
${configLines}`;

  return (
    <>
      <Script id="gtag-loader" src={loaderSrc} strategy="afterInteractive" />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
      >
        {initScript}
      </Script>
    </>
  );
}
