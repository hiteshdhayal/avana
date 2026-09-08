import { defineConfig, devices } from "@playwright/test";
import { existsSync } from "node:fs";

/** The sandbox ships a pinned Chromium; use it rather than downloading. */
const executablePath = process.env.CHROMIUM_PATH ?? "/opt/pw-browsers/chromium";
const launchOptions = existsSync(executablePath)
  ? { executablePath, args: ["--no-sandbox"] }
  : { args: ["--no-sandbox"] };

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: [["list"]],
  timeout: 45_000,
  use: {
    baseURL: process.env.BASE_URL ?? "http://localhost:3000",
    launchOptions,
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"], launchOptions } },
  ],
  webServer: {
    command: "npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
