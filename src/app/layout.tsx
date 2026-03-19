import type { Metadata } from "next";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { TrackingPageView } from "@/components/seo/tracking-page-view";
import { SkipLink } from "@/components/layout/skip-link";
import { TrackingScripts } from "@/components/seo/tracking-scripts";
import { ThemeScript } from "@/components/theme/theme-script";
import { sharedMetadata } from "@/lib/metadata";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = sharedMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" data-theme-mode="auto" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <TrackingScripts />
      </head>
      <body className={`${dmSans.variable} ${plusJakartaSans.variable} bg-white font-sans text-gray-600 antialiased`}>
        <SkipLink />
        <Suspense fallback={null}>
          <TrackingPageView />
        </Suspense>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
