import { expect, test } from "@playwright/test";

/** Spec 6.5 / 14 P4: all 18 plots operable by keyboard alone. */
test("every plot is reachable and openable with the keyboard", async ({
  page,
}) => {
  await page.goto("/");
  const plots = page.locator("#plan [data-plot]");
  await expect(plots).toHaveCount(18);

  // Tab enters the map at the first plot; arrows walk the rest.
  await plots.first().focus();
  await expect(plots.first()).toBeFocused();

  const seen = new Set<string>();
  for (let i = 0; i < 18; i += 1) {
    const id = await page.evaluate(
      () => document.activeElement?.getAttribute("data-plot") ?? "",
    );
    seen.add(id);
    await page.keyboard.press("ArrowRight");
  }
  expect(seen.size).toBe(18);

  // Enter opens the drawer; Escape closes it.
  await plots.nth(6).focus();
  await page.keyboard.press("Enter");
  const drawer = page.getByRole("dialog", { name: /Plot 7/i });
  await expect(drawer).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(drawer).toBeHidden();
});

test("the map has a text alternative listing all 18 plots", async ({ page }) => {
  await page.goto("/");
  const table = page.locator("#plan table");
  await expect(table).toHaveCount(1);
  await expect(table.locator("tbody tr")).toHaveCount(18);
});

test("availability is not claimed while nobody maintains it", async ({
  page,
}) => {
  await page.goto("/");
  const aside = page.locator("#plan").getByText(/confirmed by the sales team/i);
  await expect(aside).toBeVisible();
  // No availability counts anywhere in the section.
  await expect(page.locator("#plan")).not.toContainText("Available");
});
