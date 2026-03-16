import type { NextConfig } from "next";

const nextConfig: NextConfig = process.env.VERCEL
  ? {}
  : {
      distDir: ".next-build",
    };

export default nextConfig;
