import { expect, test } from "@playwright/test";
import { existsSync, readFileSync, unlinkSync } from "node:fs";
import path from "node:path";

/**
 * The enquiry pipeline (spec 6.14, 8, 10) end to end: this drives the real
 * server action, not a mock, and reads the local lead fallback that
 * `lib/leads.ts` writes when Resend/Sheets are unconfigured (as they are in
 * this environment) — so a passing run means a submission genuinely reached
 * persistence, not just that a success message appeared.
 */

// These tests share one file on disk (the real local-lead fallback, not a
// mock) and each resets it in beforeEach, so they cannot run concurrently
// with each other — under the suite's default fullyParallel, one test's
// reset can race another's write to the same file. Serialize this file only.
test.describe.configure({ mode: "serial" });

const LEAD_FILE = path.join(process.cwd(), "data", "leads.local.jsonl");

function leadLines(): string[] {
  if (!existsSync(LEAD_FILE)) return [];
  return readFileSync(LEAD_FILE, "utf8").split("\n").filter(Boolean);
}

function resetLeadFile() {
  if (existsSync(LEAD_FILE)) unlinkSync(LEAD_FILE);
}

test.beforeEach(() => {
  resetLeadFile();
});

test("submit button is disabled until consent is given", async ({ page }) => {
  await page.goto("/");
  await page.locator("#enquire").scrollIntoViewIfNeeded();
  await expect(page.locator('button[type="submit"]')).toBeDisabled();
  await page.check("#enquiry-consent");
  await expect(page.locator('button[type="submit"]')).toBeEnabled();
});

test("a genuine submission is validated, persisted, and shows the success panel", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator("#enquire").scrollIntoViewIfNeeded();
  await page.fill("#enquiry-name", "Playwright Visitor");
  await page.fill("#enquiry-phone", "98765 00001");
  await page.selectOption("#enquiry-interest", "Buy a villa");
  await page.check("#enquiry-consent");
  // Clears the 3s minimum-fill-time anti-spam guard (spec 6.14).
  await page.waitForTimeout(3200);
  await page.click('button[type="submit"]');
  await expect(page.locator('[role="status"]')).toBeVisible({ timeout: 15000 });

  const lines = leadLines();
  expect(lines.length).toBe(1);
  const lead = JSON.parse(lines[0]);
  expect(lead.name).toBe("Playwright Visitor");
  expect(lead.phone).toBe("+919876500001");
});

test("the honeypot silently blocks a bot-shaped submission", async ({ page }) => {
  await page.goto("/");
  await page.locator("#enquire").scrollIntoViewIfNeeded();
  await page.fill("#enquiry-name", "Bot");
  await page.fill("#enquiry-phone", "98765 00002");
  await page.selectOption("#enquiry-interest", "Buy a villa");
  await page.fill("#enquiry-company", "Acme Corp"); // the honeypot
  await page.check("#enquiry-consent");
  await page.waitForTimeout(3200);
  await page.click('button[type="submit"]');
  await page.waitForTimeout(1500);

  await expect(page.locator('[role="status"]')).toHaveCount(0);
  expect(leadLines().length).toBe(0);
});

test("submitting faster than the minimum fill time is rejected", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator("#enquire").scrollIntoViewIfNeeded();
  await page.fill("#enquiry-name", "Too Fast");
  await page.fill("#enquiry-phone", "98765 00003");
  await page.selectOption("#enquiry-interest", "Buy a villa");
  await page.check("#enquiry-consent");
  await page.click('button[type="submit"]'); // no wait — under 3s
  await page.waitForTimeout(1500);

  await expect(page.locator('[role="status"]')).toHaveCount(0);
  expect(leadLines().length).toBe(0);
});

test("the pool preference is only carried into the lead when actually selected", async ({
  page,
}) => {
  await page.goto("/");

  // Submit without ever touching the pool configurator.
  await page.locator("#enquire").scrollIntoViewIfNeeded();
  await page.fill("#enquiry-name", "No Pool Chosen");
  await page.fill("#enquiry-phone", "98765 00004");
  await page.selectOption("#enquiry-interest", "Buy a villa");
  await page.check("#enquiry-consent");
  await page.waitForTimeout(3200);
  await page.click('button[type="submit"]');
  await expect(page.locator('[role="status"]')).toBeVisible({ timeout: 15000 });

  const lead = JSON.parse(leadLines()[0]);
  expect(lead.poolPreference).toBe("");
});

test("selecting a pool carries it into the enquiry form", async ({ page }) => {
  await page.goto("/");
  await page.locator("#pools").scrollIntoViewIfNeeded();
  await page.locator("#pools [role='radio']").nth(2).click(); // Pool C

  await page.locator("#enquire").scrollIntoViewIfNeeded();
  await page.fill("#enquiry-name", "Pool C Visitor");
  await page.fill("#enquiry-phone", "98765 00005");
  await page.selectOption("#enquiry-interest", "Buy a villa");
  await page.check("#enquiry-consent");
  await page.waitForTimeout(3200);
  await page.click('button[type="submit"]');
  await expect(page.locator('[role="status"]')).toBeVisible({ timeout: 15000 });

  const lead = JSON.parse(leadLines()[0]);
  expect(lead.poolPreference).toBe("C");
});

test("a site-visit enquiry with a date offers the calendar download", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator("#enquire").scrollIntoViewIfNeeded();
  await page.fill("#enquiry-name", "Site Visit Visitor");
  await page.fill("#enquiry-phone", "98765 00006");
  // "Site visit" is the default `interest` value — no need to select it.
  await page.fill("#enquiry-date", "2026-12-20");
  await page.check("#enquiry-consent");
  await page.waitForTimeout(3200);
  await page.click('button[type="submit"]');
  await expect(page.locator('[role="status"]')).toBeVisible({ timeout: 15000 });
  await expect(
    page.getByText("Add the site visit to your calendar"),
  ).toBeVisible();
});

test.afterAll(() => {
  resetLeadFile();
});
