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

const nextConfig: NextConfig = process.env.VERCEL
  ? {}
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
