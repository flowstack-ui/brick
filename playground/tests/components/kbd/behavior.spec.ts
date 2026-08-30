import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/kbd"); });

test("Kbd preserves native semantics and closed recipes", async ({ page }) => {
  const overview = page.getByTestId("kbd-overview").locator(".brick-kbd");
  await expect(overview).toHaveJSProperty("tagName", "KBD");
  await expect(overview).toHaveAttribute("data-slot", "kbd");
  await expect(overview).toHaveAttribute("data-variant", "raised");
  await expect(overview).toHaveAttribute("data-size", "md");
  await expect(page.getByTestId("kbd-recipes").locator(".brick-kbd")).toHaveCount(7);
});

test("Kbd sequences remain passive, selectable, and accessible", async ({ page }) => {
  const sequence = page.getByTestId("kbd-sequence");
  await expect(sequence.locator(".brick-kbd")).toHaveCount(5);
  await expect(sequence.locator(".consumer-kbd")).toHaveAttribute("data-slot", "key");
  await page.keyboard.press("Tab");
  await expect(page.locator(".brick-kbd:focus")).toHaveCount(0);
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
