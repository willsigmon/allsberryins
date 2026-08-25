import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { AllsberryAgencyCampaign } from "@/components/campaigns/allsberry-agency-campaign";
import { StructuredData } from "@/components/seo/structured-data";
import { allsberryCampaign } from "@/lib/allsberry-campaign";
import { agency } from "@/lib/site-data";
import { absoluteUrl } from "@/lib/utils";

type CampaignPageProps = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: { absolute: "California Home Insurance Quotes | Allsberry Insurance Agency" },
  description: allsberryCampaign.description,
  alternates: { canonical: absoluteUrl(allsberryCampaign.path) },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  openGraph: {
    title: "California Home Insurance Quotes | Allsberry Insurance Agency",
    description: allsberryCampaign.description,
    url: absoluteUrl(allsberryCampaign.path),
    siteName: agency.name,
    type: "website",
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: "Allsberry Insurance Agency in Corona, California",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "California Home Insurance Quotes | Allsberry Insurance Agency",
    description: allsberryCampaign.description,
    images: [absoluteUrl("/twitter-image")],
  },
};

export default async function AllsberryAgencyPage({ params }: CampaignPageProps) {
  const { locale } = await params;
  if (locale === "es") redirect(allsberryCampaign.path);
  setRequestLocale(locale);

  const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const googleAdsLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;
  const googleAdsSendTo =
    googleAdsId && googleAdsLabel ? `${googleAdsId}/${googleAdsLabel}` : undefined;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  const campaignSchema = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "@id": `${absoluteUrl(allsberryCampaign.path)}#agency`,
    name: agency.fullName,
    url: absoluteUrl(allsberryCampaign.path),
    telephone: allsberryCampaign.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: agency.addressLine1,
      addressLocality: "Corona",
      addressRegion: "CA",
      postalCode: "92878",
      addressCountry: "US",
    },
    areaServed: { "@type": "State", name: "California" },
  };

  return (
    <>
      <StructuredData data={campaignSchema} />
      <AllsberryAgencyCampaign
        googleAdsSendTo={googleAdsSendTo}
        metaPixelId={metaPixelId}
      />
    </>
  );
}
