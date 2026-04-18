import type { Metadata } from "next";

import { sharedMetadata } from "@/lib/metadata";

export const metadata: Metadata = sharedMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
