#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

safe_remove() {
  local path="$1"

  if [ -z "$path" ] || [ ! -e "$path" ] && [ ! -L "$path" ]; then
    return
  fi

  if [ -L "$path" ]; then
    local target
    target="$(readlink "$path")"

    if [ -n "$target" ] && [ -d "$target" ]; then
      find "$target" -mindepth 1 -maxdepth 1 -exec rm -rf {} + 2>/dev/null || true
    fi

    return
  fi

  mv "$path" "${path}_stale_$(date +%s)" 2>/dev/null || rm -rf "$path" 2>/dev/null || true
}

shopt -s nullglob dotglob

for path in \
  .next \
  .next-build \
  .next-demo-build \
  .app-build \
  .next-build_prev_* \
  node_modules_broken_* \
  node_modules_partial_* \
  node_modules_old; do
  safe_remove "$path"
done
