import fs from "node:fs";
import type { NextConfig } from "next";

// Local builds on the external repo volume have hit intermittent `.next/trace`
// lock issues. We keep Vercel on the default output directory, but use
// `.next-build` locally so preview/dev flows stay stable on this machine class.
//
// Middleware + custom local dist dirs have been brittle on Next 16 in this repo,
// so local middleware-enabled runs fall back to the default `.next` directory.
const hasMiddleware = fs.existsSync("./middleware.ts") || fs.existsSync("./src/middleware.ts");

const nextConfig: NextConfig = process.env.VERCEL || hasMiddleware
  ? {}
  : {
      distDir: ".next-build",
    };

export default nextConfig;
