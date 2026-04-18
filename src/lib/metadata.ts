import type { Metadata } from "next";

import { routing } from "@/i18n/routing";
import { absoluteUrl, siteUrl } from "@/lib/utils";

const googleSiteVerification =
  process.env.GOOGLE_SITE_VERIFICATION ?? process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingSiteVerification =
  process.env.BING_SITE_VERIFICATION ?? process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

const defaultDescription =
  "Allsberry Insurance Agency is a Corona, California insurance office helping Southern California households and businesses with home, auto, business, life, FAIR Plan, wildfire, and coverage-review questions.";

const defaultKeywords = [
  "insurance agency corona ca",
  "insurance agent corona ca",
  "homeowners insurance california",
  "home insurance corona ca",
  "wildfire insurance california",
  "ca fair plan guide",
  "difference in conditions insurance california",
  "insurance inland empire",
  "business insurance southern california",
  "evidence of insurance request",
];

export const sharedMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Allsberry Insurance Agency | Corona, CA Insurance Guidance",
    template: "%s | Allsberry Insurance Agency",
  },
  description: defaultDescription,
  keywords: defaultKeywords,
  verification: {
    google: googleSiteVerification || undefined,
    other: bingSiteVerification
      ? {
          "msvalidate.01": bingSiteVerification,
        }
      : undefined,
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      es: "/es",
      "x-default": "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "Insurance",
  openGraph: {
    title: "Allsberry Insurance Agency | Corona, CA Insurance Guidance",
    description: defaultDescription,
    url: absoluteUrl(),
    siteName: "Allsberry Insurance Agency",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: "Allsberry Insurance Agency serving Corona, the Inland Empire, and Southern California",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Allsberry Insurance Agency | Corona, CA Insurance Guidance",
    description: defaultDescription,
    images: [absoluteUrl("/twitter-image")],
  },
};

const ogLocaleByLocale: Record<string, string> = {
  en: "en_US",
  es: "es_US",
};

function localizedPath(locale: string | undefined, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (!locale || locale === routing.defaultLocale) {
    return normalized;
  }
  if (normalized === "/") {
    return `/${locale}`;
  }
  return `/${locale}${normalized}`;
}

export function createPageMetadata(options: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  locale?: string;
}): Metadata {
  const { title, description, path, keywords, locale } = options;
  const canonical = localizedPath(locale, path);
  const englishPath = localizedPath("en", path);
  const spanishPath = localizedPath("es", path);

  return {
    title,
    description,
    keywords: keywords ?? defaultKeywords,
    alternates: {
      canonical,
      languages: {
        en: englishPath,
        es: spanishPath,
        "x-default": englishPath,
      },
    },
    openGraph: {
      title: `${title} | Allsberry Insurance Agency`,
      description,
      url: absoluteUrl(canonical),
      locale: locale ? ogLocaleByLocale[locale] ?? "en_US" : "en_US",
      images: [
        {
          url: absoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: "Allsberry Insurance Agency serving Corona, the Inland Empire, and Southern California",
        },
      ],
    },
    twitter: {
      title: `${title} | Allsberry Insurance Agency`,
      description,
      images: [absoluteUrl("/twitter-image")],
    },
  };
}
