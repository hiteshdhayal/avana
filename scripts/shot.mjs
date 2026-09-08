/**
 * Screenshot helper. `node scripts/shot.mjs <url-path> <out.png> [width] [height] [--full]`
 * Assumes a server is already running on PORT (default 3000).
 */
import { chromium } from "playwright";
import { existsSync } from "node:fs";

const [, , route = "/", out = "shot.png", w = "1440", h = "900", ...flags] =
  process.argv;
const port = process.env.PORT || 3000;
const full = flags.includes("--full");
const motion = flags.includes("--reduced-motion") ? "reduce" : "no-preference";

// The sandbox ships a pinned Chromium that may not match this Playwright
// build's expected revision; use it directly rather than downloading.
const executablePath = process.env.CHROMIUM_PATH || "/opt/pw-browsers/chromium";
const browser = await chromium.launch({
  executablePath: existsSync(executablePath) ? executablePath : undefined,
  args: ["--no-sandbox"],
});
const page = await browser.newPage({
  viewport: { width: Number(w), height: Number(h) },
  deviceScaleFactor: 2,
  reducedMotion: motion,
});
const errors = [];
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("pageerror", (e) => errors.push(String(e)));

await page.goto(`http://localhost:${port}${route}`, {
  waitUntil: "networkidle",
  timeout: 60000,
});
await page.waitForTimeout(1800);
await page.screenshot({ path: out, fullPage: full });
await browser.close();

if (errors.length) {
  console.error("PAGE ERRORS:\n" + errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log("ok →", out);
}
