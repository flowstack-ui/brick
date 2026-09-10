import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";

test.beforeEach(async ({ page }) => { await page.goto("/stat"); });
test("Stat remains readable in forced-colors", async ({ page }) => {
  await page.emulateMedia({ forcedColors: "active" });
  await expect(page.locator("#scenario-stat-basic .brick-stat-label")).toBeVisible();
  const paint = await page.locator("#scenario-stat-basic .brick-stat-label").evaluate(node => getComputedStyle(node).color);
  expect(paint).not.toBe("rgba(0, 0, 0, 0)");
});
test("Stat sizes, native grammar and group overrides remain coherent", async ({ page }) => {
  const values = page.locator("#scenario-stat-sizes .brick-stat-value-text");
  expect(await values.evaluateAll(nodes => nodes.map(node => getComputedStyle(node).fontSize))).toEqual(["20px", "24px", "30px"]);
  expect(await page.locator("#scenario-stat-group .brick-stat-value-text").evaluateAll(nodes => nodes.map(node => getComputedStyle(node).fontSize))).toEqual(["30px", "20px", "30px"]);
  const root = page.locator("#scenario-stat-basic dl");
  expect(await root.evaluate(node => Array.from(node.children, child => child.tagName))).toEqual(["DT", "DD", "DD"]);
  expect(await root.evaluate(node => getComputedStyle(node).backgroundColor)).toBe("rgba(0, 0, 0, 0)");
  await expect(root.locator("[aria-live]")).toHaveCount(0);
});
test("Stat formatting, narrow containment and baseline alignment", async ({ page }) => {
  const unit = page.locator("#scenario-stat-units .brick-stat-value-unit");
  const value = page.locator("#scenario-stat-units [data-slot='format-number']");
  const [u, v] = await Promise.all([unit.boundingBox(), value.boundingBox()]);
  expect(await unit.evaluate(node => getComputedStyle(node).fontSize)).toBe("12px");
  expect(u!.y).toBeGreaterThan(v!.y);
  expect(u!.y + u!.height).toBeLessThanOrEqual(v!.y + v!.height + 2);
  await page.setViewportSize({ width: 390, height: 900 });
  for (const root of await page.locator(".brick-stat").all()) {
    expect(await root.evaluate(node => node.scrollWidth <= node.clientWidth + 1)).toBe(true);
  }
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
