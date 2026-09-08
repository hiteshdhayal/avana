import { expect, test } from "@playwright/test";

/**
 * The two regulatory gates (spec 3.3, 3.4), tested against the shipped
 * content — MahaRERA unregistered, Plan A off — so a regression here is a
 * compliance regression, not a cosmetic one.
 */

test("no price or plan table renders while MahaRERA registration is unconfirmed", async ({
  page,
}) => {
  await page.goto("/");
  const body = await page.locator("body").innerText();

  // The source seed's own price string must not appear anywhere.
  expect(body).not.toContain("₹1.60 Cr");
  expect(body).not.toContain("1.60 Cr");

  // The three ownership-plan sections are absent, not just visually hidden.
  await expect(page.locator("#plans")).toHaveCount(0);
  await expect(page.locator("#payment")).toHaveCount(0);

  // The reg block says registration is in process rather than showing a number.
  await expect(
    page.locator('[data-reg-block="header"]').getByText(/in process/i),
  ).toBeVisible();
});

test("Plan A never appears with its flag unset", async ({ page }) => {
  await page.goto("/");
  const body = await page.locator("body").innerText();
  expect(body).not.toMatch(/assured return/i);
  expect(body).not.toMatch(/guaranteed/i);
});

test("unverified bedroom count is not stated as fact", async ({ page }) => {
  await page.goto("/");
  const body = await page.locator("body").innerText();
  // "4 BHK" is `bedroomsVerified: false` in the seed (spec 3.1, conflict 3).
  expect(body).not.toMatch(/4\s*BHK/i);
});
