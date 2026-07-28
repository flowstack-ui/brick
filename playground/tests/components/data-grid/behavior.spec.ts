import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/data-grid"); await expect(page.locator("#scenario-data-grid-overview .brick-data-grid")).toBeVisible(); });

test("defaults and grid anatomy are deterministic", async ({ page }) => {
  const root = page.locator("#scenario-data-grid-overview .brick-data-grid");
  await expect(root).toHaveAttribute("role", "grid");
  await expect(root).toHaveAttribute("data-variant", "line");
  await expect(root).toHaveAttribute("data-size", "md");
  await expect(root).toHaveAttribute("data-density", "comfortable");
  await expect(root).toHaveAttribute("aria-colcount", "3");
  await expect(root.locator("tbody tr")).toHaveCount(3);
  await expect(root.locator("caption")).toHaveCSS("caption-side", "bottom");
  await expect(root.locator("tbody tr").first()).toHaveAttribute("aria-selected", "true");
  await root.locator("tbody tr").nth(1).click();
  await expect(root.locator("tbody tr").nth(1)).toHaveAttribute("aria-selected", "true");
  await expect(root.locator("tbody tr").first()).toHaveAttribute("aria-selected", "false");
});

test("navigation, selection, sorting, and containment remain Atom-owned", async ({ page }) => {
  const navigable = page.locator("#scenario-data-grid-navigation .brick-data-grid");
  await navigable.focus();
  await page.keyboard.press("ArrowRight");
  await expect(navigable).toHaveAttribute("aria-activedescendant", /cell/);
  const selected = page.locator("#scenario-data-grid-selection tbody tr").nth(1);
  await selected.click();
  await expect(selected).toHaveAttribute("aria-selected", "true");
  const sortable = page.locator("#scenario-data-grid-sorting [data-actionable]");
  await expect(sortable).toHaveAttribute("aria-sort", "ascending");
  await sortable.click();
  await expect(sortable).toHaveAttribute("aria-sort", "descending");
  await page.locator("#scenario-data-grid-sorting .brick-data-grid").evaluate(node => node.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key: "Enter" })));
  await expect(sortable).toHaveAttribute("aria-sort", "ascending");
  await page.setViewportSize({ width: 390, height: 844 });
  const container = page.locator("#scenario-data-grid-stress .brick-data-grid-container").first();
  expect(await container.evaluate(node => node.scrollWidth > node.clientWidth)).toBe(true);
});

test("Data Grid passes accessibility checks", async ({ page }) => {
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
