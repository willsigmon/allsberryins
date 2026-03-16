import type { NextConfig } from "next";

// Local builds on the external repo volume have hit intermittent `.next/trace`
// lock issues. We keep Vercel on the default output directory, but use
// `.next-build` locally so preview/dev flows stay stable on this machine class.
const nextConfig: NextConfig = process.env.VERCEL
  ? {}
  : {
      distDir: ".next-build",
    };

export default nextConfig;
