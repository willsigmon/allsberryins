import type { Metadata } from "next";

import { absoluteUrl, siteUrl } from "@/lib/utils";

const defaultDescription =
  "Allsberry Insurance Agency provides personalized home, auto, business, and life insurance solutions across Southern California. Get a free quote today.";

const defaultKeywords = [
  "insurance agency Southern California",
  "home insurance Southern California",
  "auto insurance Southern California",
  "personalized insurance agency",
  "business insurance Southern California",
  "life insurance Southern California",
  "certificate of insurance request",
  "evidence of insurance request",
  "commercial insurance Southern California",
];

export const sharedMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Allsberry Insurance Agency | Southern California",
    template: "%s | Allsberry Insurance Agency | Southern California",
  },
  description: defaultDescription,
  keywords: defaultKeywords,
  alternates: {
    canonical: "/",
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
    title: "Allsberry Insurance Agency | Southern California",
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
        alt: "Allsberry Insurance Agency serving Southern California",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Allsberry Insurance Agency | Southern California",
    description: defaultDescription,
    images: [absoluteUrl("/twitter-image")],
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
      canonical: path,
    },
    openGraph: {
      title: `${title} | Allsberry Insurance Agency | Southern California`,
      description,
      url: absoluteUrl(path),
      images: [
        {
          url: absoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: "Allsberry Insurance Agency serving Southern California",
        },
      ],
    },
    twitter: {
      title: `${title} | Allsberry Insurance Agency | Southern California`,
      description,
      images: [absoluteUrl("/twitter-image")],
    },
  };
}
