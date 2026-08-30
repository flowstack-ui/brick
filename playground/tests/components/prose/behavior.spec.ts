import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/prose"); });

test("Prose preserves trusted native structure and contains editorial overflow", async ({ page }) => {
  const overview = page.getByTestId("prose-overview").locator(".brick-prose");
  await expect(overview).toHaveJSProperty("tagName", "ARTICLE");
  await expect(overview).toHaveAttribute("data-size", "md");
  await expect(overview).toHaveAttribute("data-measure", "default");
  await expect(overview.locator("h1")).toHaveText("Designing release evidence");
  await expect(overview.locator("a")).toHaveAttribute("href", "#verification");
  const content = page.getByTestId("prose-content").locator(".brick-prose");
  await expect(content.locator("table")).toHaveCSS("table-layout", "fixed");
  await expect(content.locator("pre code")).toHaveCSS("white-space", "pre-wrap");
  const width = await content.evaluate((node) => ({ client: node.clientWidth, scroll: node.scrollWidth }));
  expect(width.scroll).toBeLessThanOrEqual(width.client + 1);
});

test("Prose remains accessible and direct Brick typography keeps its owner", async ({ page }) => {
  const adaptation = page.getByTestId("prose-adaptation").locator(".consumer-prose");
  await expect(adaptation).toHaveAttribute("dir", "rtl");
  await expect(adaptation.locator(".brick-text")).toHaveAttribute("data-tone", "secondary");
  await page.setViewportSize({ width: 320, height: 760 });
  const geometry = await adaptation.evaluate((node) => ({ client: node.clientWidth, scroll: node.scrollWidth }));
  expect(geometry.scroll).toBeLessThanOrEqual(geometry.client + 1);
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
