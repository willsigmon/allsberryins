import type { Metadata } from "next";

import { absoluteUrl, shouldIndexSite, siteUrl } from "@/lib/utils";

const defaultDescription =
  "Allsberry Insurance Agency provides personalized home, auto, business, and life insurance solutions in Corona, CA. Get a free quote today. Serving the Inland Empire since 1994.";

const defaultKeywords = [
  "insurance agency Corona CA",
  "home insurance Corona",
  "auto insurance Corona",
  "Farmers Insurance agent Corona",
  "business insurance Inland Empire",
  "life insurance Corona CA",
];

export const sharedMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Allsberry Insurance Agency | Corona, CA",
    template: "%s | Allsberry Insurance Agency | Corona, CA",
  },
  description: defaultDescription,
  keywords: defaultKeywords,
  openGraph: {
    title: "Allsberry Insurance Agency | Corona, CA",
    description: defaultDescription,
    url: siteUrl,
    siteName: "Allsberry Insurance Agency",
    locale: "en_US",
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
    title: "Allsberry Insurance Agency | Corona, CA",
    description: defaultDescription,
    images: [absoluteUrl("/twitter-image")],
  },
  robots: {
    index: shouldIndexSite,
    follow: shouldIndexSite,
  },
};

export function createPageMetadata(options: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const { title, description, path, keywords } = options;

  return {
    title,
    description,
    keywords: keywords ?? defaultKeywords,
    alternates: {
      canonical: absoluteUrl(path),
    },
    openGraph: {
      title: `${title} | Allsberry Insurance Agency | Corona, CA`,
      description,
      url: absoluteUrl(path),
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
      title: `${title} | Allsberry Insurance Agency | Corona, CA`,
      description,
      images: [absoluteUrl("/twitter-image")],
    },
    robots: {
      index: shouldIndexSite,
      follow: shouldIndexSite,
    },
  };
}
