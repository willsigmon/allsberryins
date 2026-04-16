import fs from "node:fs";
import type { NextConfig } from "next";

// Local builds on the external repo volume have hit intermittent `.next/trace`
// lock issues. We keep Vercel on the default output directory, but use
// `.next-build` locally so preview/dev flows stay stable on this machine class.
//
// Middleware + custom local dist dirs are still brittle on Next 16 in this repo,
// so local middleware-enabled runs fall back to the default `.next` directory.
const hasMiddleware = fs.existsSync("./middleware.ts") || fs.existsSync("./src/middleware.ts");
const localDistDir = process.env.LOCAL_NEXT_DIST_DIR;

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const longCacheHeader = {
  key: "Cache-Control",
  value: "public, max-age=31536000, immutable",
};

const productionConfig: NextConfig = {
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      { source: "/media/:path*", headers: [longCacheHeader] },
      { source: "/fonts/:path*", headers: [longCacheHeader] },
      {
        source: "/email-signatures/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600" }],
      },
    ];
  },
};

const nextConfig: NextConfig = process.env.VERCEL
  ? productionConfig
  : localDistDir
    ? {
        distDir: localDistDir,
      }
    : hasMiddleware
      ? {}
      : {
          distDir: ".next-build",
        };

export default nextConfig;
