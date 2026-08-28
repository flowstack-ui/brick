import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/bleed");
});

test("Bleed crosses the selected logical edges without leaking props", async ({ page }) => {
  const inline = page.getByTestId("bleed-inline");
  const block = page.getByTestId("bleed-block");
  await expect(inline).toHaveCSS("margin-left", "-24px");
  await expect(inline).toHaveCSS("margin-right", "-24px");
  await expect(block).toHaveCSS("margin-bottom", "-24px");
  await expect(inline).not.toHaveAttribute("inline");
  await expect(block).not.toHaveAttribute("blockEnd");
});

test("responsive spacing and asChild preserve the authored host", async ({ page }) => {
  const responsive = page.getByTestId("bleed-responsive");
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(responsive).toHaveCSS("margin-left", "-8px");
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(responsive).toHaveCSS("margin-left", "-24px");
  await expect(responsive).toHaveCSS("margin-top", "-32px");
  await expect(page.getByTestId("bleed-composed")).toHaveJSProperty("tagName", "FIGURE");
});

test("Bleed remains contained and accessible at narrow widths", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
