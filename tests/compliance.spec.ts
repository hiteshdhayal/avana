import { expect, test } from "@playwright/test";

/**
 * MahaRERA Order 46C/2025 (spec 3.3) expressed as assertions.
 *
 * These are not style tests. Each one corresponds to a requirement of the
 * order, and a failure here means the page is a non-compliant advertisement
 * (₹50,000 per advertisement), not that something looks wrong.
 */

const BREAKPOINTS = [
  { name: "360", width: 360, height: 740 },
  { name: "390", width: 390, height: 844 },
  { name: "768", width: 768, height: 1024 },
  { name: "1024", width: 1024, height: 768 },
  { name: "1440", width: 1440, height: 900 },
];

for (const bp of BREAKPOINTS) {
  test(`reg block sits in the top-right quadrant at ${bp.name}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: bp.width, height: bp.height });
    await page.goto("/");

    const header = page.locator('[data-reg-block="header"]');
    await expect(header).toBeVisible();

    const box = await header.boundingBox();
    expect(box).not.toBeNull();
    if (!box) return;

    // Top half of the viewport…
    expect(box.y).toBeLessThan(bp.height / 2);
    // …and anchored to the right half.
    expect(box.x + box.width).toBeGreaterThan(bp.width / 2);
  });

  test(`registration type is not smaller than any contact detail at ${bp.name}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: bp.width, height: bp.height });
    await page.goto("/");

    const regSize = await page
      .locator("[data-reg-number]")
      .first()
      .evaluate((el) => parseFloat(getComputedStyle(el).fontSize));

    const contactSizes = await page
      .locator("[data-contact-detail]")
      .evaluateAll((els) =>
        els.map((el) => parseFloat(getComputedStyle(el).fontSize)),
      );

    expect(regSize).toBeGreaterThan(0);
    for (const size of contactSizes) {
      expect(
        regSize,
        `registration number (${regSize}px) must be >= every contact detail (${size}px)`,
      ).toBeGreaterThanOrEqual(size);
    }
  });
}

test("the QR keeps a true 1:1 aspect ratio and is at least 96px", async ({
  page,
}) => {
  await page.goto("/");
  const qr = page
    .locator('[data-reg-block="header"] img, [data-reg-block="header"] [role="img"]')
    .first();
  const box = await qr.boundingBox();
  expect(box).not.toBeNull();
  if (!box) return;

  expect(Math.abs(box.width - box.height)).toBeLessThanOrEqual(1);
  expect(box.width).toBeGreaterThanOrEqual(96);
});

test("the reg block never disappears, and repeats in the footer", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 740 });
  await page.goto("/");
  await expect(page.locator('[data-reg-block="header"]')).toBeVisible();
  await expect(page.locator('[data-reg-block="footer"]')).toBeVisible();
});

test("the MahaRERA website address is linked wherever the block appears", async ({
  page,
}) => {
  await page.goto("/");
  const links = page.locator(
    '[data-reg-block] a[href="https://maharera.maharashtra.gov.in"]',
  );
  expect(await links.count()).toBeGreaterThanOrEqual(2);
});
