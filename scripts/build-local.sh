#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if [ -z "${VERCEL:-}" ] && [ -z "${LOCAL_NEXT_DIST_DIR:-}" ]; then
  export LOCAL_NEXT_DIST_DIR=".next-check-$(date +%s)"
  echo "Using local Next dist dir: ${LOCAL_NEXT_DIST_DIR}"
fi

exec npx next build --webpack
