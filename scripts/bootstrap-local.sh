#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
INSTALL_ROOT="${ALLSBERRY_LOCAL_INSTALL_ROOT:-$HOME/.cache/allsberryins-local}"

mkdir -p "$INSTALL_ROOT"

cp "$ROOT_DIR/package.json" "$ROOT_DIR/package-lock.json" "$INSTALL_ROOT"/

echo "Installing dependencies into $INSTALL_ROOT ..."
(cd "$INSTALL_ROOT" && npm ci)

link_path() {
  local target="$1"
  local link_path="$2"

  if [ -L "$link_path" ]; then
    rm -f "$link_path"
  elif [ -e "$link_path" ]; then
    local backup_path="${link_path}_stale_$(date +%s)"
    mv "$link_path" "$backup_path" 2>/dev/null || rm -rf "$link_path" 2>/dev/null || true
  fi

  ln -sfn "$target" "$link_path"
}

link_path "$INSTALL_ROOT/node_modules" "$ROOT_DIR/node_modules"

echo "Linked $ROOT_DIR/node_modules -> $INSTALL_ROOT/node_modules"
