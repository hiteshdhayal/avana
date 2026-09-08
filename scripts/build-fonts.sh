#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# Regenerate the Fraunces subsets in public/fonts/.
#
# Why this exists: spec 11 budgets 110 KB for *all* fonts, and Google's stock
# Fraunces is 494 KB across the four files this design would pull (roman and
# italic × latin and latin-ext, with the SOFT and WONK axes carried along).
# Spec 4.3 pins SOFT to 0 and WONK to 1 and never varies them, and spec 11 asks
# for a subset — so we bake those two axes to their pinned values, keep `opsz`
# (the axis the whole type system is built on) and a 300–500 weight range, and
# cut the character set to what the page actually sets.
#
# Output is committed, so a normal `npm run build` needs none of this.
# Re-run it when the content file gains characters outside the current subset —
# `npm run audit:content` says when that happens.
#
# Requires: python3, network access to raw.githubusercontent.com.
# Usage: ./scripts/build-fonts.sh
# ---------------------------------------------------------------------------
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WORK="$(mktemp -d)"
OUT="$ROOT/public/fonts"
trap 'rm -rf "$WORK"' EXIT

UPSTREAM="https://raw.githubusercontent.com/google/fonts/main/ofl/fraunces"

# Basic Latin + the typographic marks this page sets, + the rupee sign, which
# lives in latin-ext and would otherwise fall back to a system face on prices.
BASE_UNICODES="U+0020-007E,U+00A0,U+00B7,U+00D7,U+2010-2015,U+2018-201D,U+2026,U+2212,U+20B9"

echo "→ workspace $WORK"
python3 -m venv "$WORK/venv"
"$WORK/venv/bin/pip" install --quiet --upgrade pip
"$WORK/venv/bin/pip" install --quiet fonttools brotli

echo "→ fetching Fraunces (OFL) from google/fonts"
curl -sSL -o "$WORK/Fraunces.ttf" "$UPSTREAM/Fraunces%5BSOFT%2CWONK%2Copsz%2Cwght%5D.ttf"
curl -sSL -o "$WORK/Fraunces-Italic.ttf" "$UPSTREAM/Fraunces-Italic%5BSOFT%2CWONK%2Copsz%2Cwght%5D.ttf"
curl -sSL -o "$OUT/OFL-Fraunces.txt" "$UPSTREAM/OFL.txt"

mkdir -p "$OUT"

# Roman: display (wght 300) through section heads (wght 400), headroom to 500.
"$WORK/venv/bin/fonttools" varLib.instancer -q "$WORK/Fraunces.ttf" \
  SOFT=0 WONK=1 wght=300:500 -o "$WORK/roman.ttf"
"$WORK/venv/bin/pyftsubset" "$WORK/roman.ttf" \
  --unicodes="$BASE_UNICODES" \
  --layout-features='kern,liga,calt,ccmp,tnum,frac' \
  --flavor=woff2 --output-file="$OUT/Fraunces-subset.woff2"

# Italic is only ever set at wght 400 (spec 4.3: captions and image credits),
# so it is instanced to a single weight — that alone halves it.
"$WORK/venv/bin/fonttools" varLib.instancer -q "$WORK/Fraunces-Italic.ttf" \
  SOFT=0 WONK=1 wght=400 -o "$WORK/italic.ttf"
"$WORK/venv/bin/pyftsubset" "$WORK/italic.ttf" \
  --unicodes="$BASE_UNICODES" \
  --layout-features='kern,liga,calt,ccmp' \
  --flavor=woff2 --output-file="$OUT/Fraunces-Italic-subset.woff2"

echo
for f in "$OUT/Fraunces-subset.woff2" "$OUT/Fraunces-Italic-subset.woff2"; do
  printf "  %-36s %6.1f KB\n" "$(basename "$f")" "$(echo "scale=1;$(stat -c%s "$f")/1024" | bc)"
done
echo
echo "Budget (spec 11): 110 KB for all fonts, including the grotesque."
