import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/blockquote"); });

test("Blockquote preserves native direct-child semantics and source metadata", async ({ page }) => {
  const root = page.getByTestId("blockquote-overview").locator(".brick-blockquote");
  await expect(root).toHaveJSProperty("tagName", "FIGURE");
  await expect(root.locator(":scope > blockquote")).toHaveCount(1);
  await expect(root.locator(":scope > figcaption")).toHaveCount(1);
  await expect(root.locator("blockquote figcaption")).toHaveCount(0);
  await expect(root.locator(":scope > blockquote")).toHaveAttribute("cite", "https://example.com/durable-systems");
  await expect(root.locator("cite")).toHaveText("Designing Durable Systems");
  await expect(root.locator(".brick-blockquote__icon")).toHaveAttribute("aria-hidden", "true");
});

test("Blockquote recipes stay passive, logical, and accessible", async ({ page }) => {
  await expect(page.getByTestId("blockquote-recipes").locator(".brick-blockquote")).toHaveCount(3);
  await expect(page.getByTestId("blockquote-adaptation").locator(".consumer-blockquote")).toHaveAttribute("dir", "rtl");
  await page.keyboard.press("Tab");
  await expect(page.locator(".brick-blockquote :focus")).toHaveCount(0);
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
