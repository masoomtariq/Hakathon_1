#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FONTS_DIR="$ROOT_DIR/static/fonts"
INTER_DIR="$FONTS_DIR/inter"
JETBRAINS_DIR="$FONTS_DIR/jetbrains-mono"
URDU_DIR="$FONTS_DIR/noto-nastaliq-urdu"

mkdir -p "$INTER_DIR" "$JETBRAINS_DIR" "$URDU_DIR"

fetch_font() {
  local url="$1"
  local out="$2"
  if [[ -f "$out" ]]; then
    echo "[fonts] exists: $out"
    return 0
  fi

  echo "[fonts] downloading: $out"
  if ! curl -fsSL "$url" -o "$out"; then
    echo "[fonts] ERROR: failed to download $url" >&2
    return 1
  fi
}

resolve_google_font_url() {
  local family="$1"
  local css
  css="$(curl -fsSL -A 'Mozilla/5.0' "https://fonts.googleapis.com/css2?family=${family}:wght@400&display=swap")"
  local font_url
  font_url="$(echo "$css" | grep -oE 'https://[^)]+' | head -n 1 || true)"
  if [[ -z "$font_url" ]]; then
    echo "[fonts] ERROR: no downloadable font URL found for ${family}" >&2
    return 1
  fi
  echo "$font_url"
}

inter_url="$(resolve_google_font_url 'Inter')"
jetbrains_url="$(resolve_google_font_url 'JetBrains+Mono')"
urdu_url="$(resolve_google_font_url 'Noto+Nastaliq+Urdu')"

fetch_font "$inter_url" "$INTER_DIR/Inter-Regular.woff2"
fetch_font "$jetbrains_url" "$JETBRAINS_DIR/JetBrainsMono-Regular.woff2"
fetch_font "$urdu_url" "$URDU_DIR/NotoNastaliqUrdu-Regular.woff2"

echo "[fonts] setup complete"
