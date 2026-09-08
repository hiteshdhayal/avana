import localFont from "next/font/local";
import { Geist } from "next/font/google";
import fs from "node:fs";
import path from "node:path";

/**
 * Display family — spec 4.3. Fraunces carries display *and* captions through
 * its optical-size axis, so the two scales are the same voice, not two fonts.
 *
 * Self-hosted from a subset rather than `next/font/google`, because the stock
 * Google build of this design costs 494 KB and spec 11 budgets 110 KB for all
 * fonts. `scripts/build-fonts.sh` bakes SOFT to 0 and WONK to 1 (the values
 * spec 4.3 pins and never varies), keeps the `opsz` axis, and cuts the
 * character set to Latin plus the rupee sign — 37.7 KB roman, 26.3 KB italic.
 *
 * Fraunces is OFL; see public/fonts/OFL-Fraunces.txt.
 */
export const fraunces = localFont({
  src: [
    {
      path: "../public/fonts/Fraunces-subset.woff2",
      weight: "300 500",
      style: "normal",
    },
    {
      path: "../public/fonts/Fraunces-Italic-subset.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-fraunces",
  fallback: ["ui-serif", "Georgia", "serif"],
  // Fraunces runs small against Georgia; keeps the swap from jumping.
  adjustFontFallback: false,
});

/**
 * Data / UI family.
 *
 * The spec names Switzer (Fontshare, self-hosted). Switzer is not
 * redistributable through a package registry, so it is not vendored here.
 * Drop `Switzer-Variable.woff2` (and optionally `Switzer-Variable-Italic.woff2`)
 * into `public/fonts/` and it takes over automatically — see `switzerFace()`
 * below and README "Fonts". Until then this neo-grotesque stands in: it holds
 * the same role (quiet, tabular figures, clearly not the display face) and is
 * explicitly not Inter, per spec 4.3.
 */
export const grotesque = Geist({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-grotesque",
});

const SWITZER_FILE = "Switzer-Variable.woff2";
const SWITZER_ITALIC_FILE = "Switzer-Variable-Italic.woff2";

function hasFont(file: string): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", "fonts", file));
  } catch {
    return false;
  }
}

/**
 * Returns the @font-face CSS for Switzer, but only when the licensed files are
 * actually present. Emitting the rule unconditionally would cost every visitor
 * a 404 on a font that is not there; checking at build time means the stack in
 * `--font-sans` simply resolves to the fallback instead.
 */
export function switzerFace(): string | null {
  if (!hasFont(SWITZER_FILE)) return null;

  const italic = hasFont(SWITZER_ITALIC_FILE)
    ? `
@font-face {
  font-family: "Switzer";
  src: url("/fonts/${SWITZER_ITALIC_FILE}") format("woff2-variations");
  font-weight: 400 600;
  font-style: italic;
  font-display: swap;
}`
    : "";

  return `@font-face {
  font-family: "Switzer";
  src: url("/fonts/${SWITZER_FILE}") format("woff2-variations");
  font-weight: 400 600;
  font-style: normal;
  font-display: swap;
}${italic}`;
}
