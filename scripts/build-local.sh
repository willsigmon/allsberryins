#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if [ -z "${VERCEL:-}" ] && [ -z "${LOCAL_NEXT_DIST_DIR:-}" ]; then
  export LOCAL_NEXT_DIST_DIR=".next-check-$(date +%s)"
  echo "Using local Next dist dir: ${LOCAL_NEXT_DIST_DIR}"
fi

TSCONFIG_PATH="$ROOT_DIR/tsconfig.json"
TSCONFIG_BACKUP=""

if [ -f "$TSCONFIG_PATH" ]; then
  TSCONFIG_BACKUP="$(mktemp "${TMPDIR:-/tmp}/allsberry-tsconfig.XXXXXX")"
  cp "$TSCONFIG_PATH" "$TSCONFIG_BACKUP"
fi

cleanup() {
  if [ -n "$TSCONFIG_BACKUP" ] && [ -f "$TSCONFIG_BACKUP" ]; then
    cp "$TSCONFIG_BACKUP" "$TSCONFIG_PATH"
    rm -f "$TSCONFIG_BACKUP"
  fi
}

trap cleanup EXIT

npx next build --webpack
