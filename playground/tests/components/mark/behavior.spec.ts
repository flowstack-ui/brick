import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/mark"); });

test("Mark preserves native semantics and closed recipes", async ({ page }) => {
  const overview = page.getByTestId("mark-overview").locator(".brick-mark");
  await expect(overview).toHaveJSProperty("tagName", "MARK");
  await expect(overview).toHaveAttribute("data-slot", "mark");
  await expect(overview).toHaveAttribute("data-variant", "subtle");
  await expect(overview).toHaveAttribute("data-tone", "accent");
  await expect(page.getByTestId("mark-recipes").locator(".brick-mark")).toHaveCount(5);
});

test("Mark forwards native hooks without adding interaction", async ({ page }) => {
  const native = page.getByTestId("mark-native").locator(".consumer-mark");
  await expect(native).toHaveAttribute("data-owner", "playground");
  await expect(native).toHaveAttribute("data-slot", "result");
  await page.keyboard.press("Tab");
  await expect(page.locator(".brick-mark:focus")).toHaveCount(0);
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
