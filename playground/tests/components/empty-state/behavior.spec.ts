import { expect, test } from "../../evidence-test.js";
import AxeBuilder from "@axe-core/playwright";
test("empty state recipes keep transparent roots and square indicators", async ({ page }) => {
  await page.goto("/empty-state");
  const roots = page.locator('[data-scenario="empty-state.sizes"] .brick-empty-state');
  expect(await roots.evaluateAll(elements => elements.map(el => getComputedStyle(el).paddingInlineStart))).toEqual(["16px", "32px", "48px"]);
  expect(await roots.locator('.brick-empty-state-title').evaluateAll(elements => elements.map(el => getComputedStyle(el).fontSize))).toEqual(["16px", "18px", "20px"]);
  const indicators = roots.locator('.brick-empty-state-indicator');
  for (let i = 0; i < 3; i++) {
    const box = await indicators.nth(i).boundingBox();
    expect(box!.width).toBe([24, 36, 60][i]); expect(box!.height).toBe(box!.width);
  }
  await expect(roots.first()).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
test("empty state application actions and result messages stay outside the recipe", async ({ page }) => {
  await page.goto("/empty-state");
  await page.getByRole("button", { name: "Create project", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Project created" })).toBeVisible();
  await page.getByRole("button", { name: "Clear search", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("Showing all projects.");
  await expect(page.getByRole("textbox", { name: "Find projects" })).toHaveValue("");
  await expect(page.locator('td[colspan="2"] .brick-empty-state')).toHaveCount(1);
});
test("empty state reflows at narrow width with RTL and system colors", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/empty-state");
  await page.locator("html").evaluate(el => el.setAttribute("dir", "rtl"));
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  const indicator = page.locator('[data-scenario="empty-state.narrow"] .brick-empty-state-indicator');
  const box = await indicator.boundingBox(); expect(box!.width).toBe(box!.height);
  await page.emulateMedia({ forcedColors: "active" });
  await expect(page.locator('.brick-empty-state-title').first()).toHaveCSS("color", "rgb(0, 0, 0)");
});
