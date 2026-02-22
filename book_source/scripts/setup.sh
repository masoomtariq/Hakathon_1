#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

run_stage() {
  local stage="$1"
  shift
  echo "[setup][$stage] starting"
  if ! "$@"; then
    echo "[setup][$stage] ERROR: stage failed" >&2
    exit 1
  fi
  echo "[setup][$stage] done"
}

deps_stage() {
  if npm --prefix "$ROOT_DIR" ci; then
    return 0
  fi
  echo "[setup][deps] npm ci failed, retrying with npm install"
  npm --prefix "$ROOT_DIR" install
}

run_stage "deps" deps_stage
run_stage "fonts" "$ROOT_DIR/scripts/setup-fonts.sh"
run_stage "scaffold" npm --prefix "$ROOT_DIR" run build:scaffold
run_stage "typecheck" npm --prefix "$ROOT_DIR" run typecheck

echo "[setup] complete"
