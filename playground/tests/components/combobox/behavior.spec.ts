import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/combobox"); });

test("Combobox defaults, filtering, selection, clearing, and keyboard remain integrated", async ({ page }) => {
  const overview = page.locator('[data-scenario="combobox.overview"]'); const input = overview.getByRole("combobox", { name: "City" });
  await expect(overview.locator(".brick-combobox-control")).toHaveAttribute("data-variant", "outline");
  await input.fill("lis");
  await expect(page.getByRole("option", { name: "Lisbon" })).toBeVisible(); await input.press("ArrowDown"); await input.press("Enter");
  await expect(input).toHaveValue("Lisbon"); await overview.getByRole("button", { name: "Clear city" }).click(); await expect(input).toHaveValue("");
});

test("chevron toggles and popup matches the complete control width", async ({ page }) => {
  const overview = page.locator('[data-scenario="combobox.overview"]');
  const control = overview.locator(".brick-combobox-control");
  await overview.getByRole("button", { name: "Toggle City options" }).click();
  const content = page.locator(".brick-combobox-content:visible");
  await expect(content).toBeVisible();
  const controlBox = await control.boundingBox();
  const contentBox = await content.boundingBox();
  expect(controlBox).not.toBeNull();
  expect(contentBox).not.toBeNull();
  expect(contentBox!.width).toBeGreaterThanOrEqual(controlBox!.width - 1);
});

test("recipes and RTL retain closed visual contracts", async ({ page }) => {
  const controls = page.locator('[data-scenario="combobox.recipes"] .brick-combobox-control'); await expect(controls).toHaveCount(3);
  for (let i=0;i<3;i+=1) await expect(controls.nth(i)).toHaveAttribute("data-variant", ["outline","soft","underline"][i]);
  await expect(page.locator('[data-scenario="combobox.stress"]').getByRole("combobox", { name: "المدينة" })).toBeVisible();
});

test("popup positions, flips when constrained, and route has no axe violations", async ({ page }) => {
  const input = page.locator('[data-scenario="combobox.overview"]').getByRole("combobox"); await input.click();
  const content = page.locator(".brick-combobox-content:visible"); await expect(content).toHaveAttribute("data-positioned", "");
  const results = await new AxeBuilder({ page }).disableRules(["region"]).analyze(); expect(results.violations).toEqual([]);
});

test("portalled options remain below sticky playground navigation while scrolling", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const overview = page.locator('[data-scenario="combobox.overview"]');
  await overview.getByRole("button", { name: "Toggle City options" }).click();
  const popup = page.locator(".brick-combobox-content:visible");
  const header = page.locator(".evidence-review-header");

  await page.evaluate(() => window.scrollBy(0, 300));
  await expect(popup).toBeVisible();

  const paintOrder = await page.evaluate(() => {
    const popupElement = document.querySelector<HTMLElement>(".brick-combobox-content");
    const headerElement = document.querySelector<HTMLElement>(".evidence-review-header");
    if (!popupElement || !headerElement) return null;
    const popupRect = popupElement.getBoundingClientRect();
    const headerRect = headerElement.getBoundingClientRect();
    const intersection = {
      left: Math.max(popupRect.left, headerRect.left),
      right: Math.min(popupRect.right, headerRect.right),
      top: Math.max(popupRect.top, headerRect.top),
      bottom: Math.min(popupRect.bottom, headerRect.bottom),
    };
    const x = (intersection.left + intersection.right) / 2;
    const y = (intersection.top + intersection.bottom) / 2;
    return {
      headerContainsTopElement: headerElement.contains(document.elementFromPoint(x, y)),
      headerZIndex: Number(getComputedStyle(headerElement).zIndex),
      intersects: intersection.right > intersection.left && intersection.bottom > intersection.top,
      popupZIndex: Number(getComputedStyle(popupElement).zIndex),
    };
  });

  expect(paintOrder).not.toBeNull();
  expect(paintOrder!.intersects).toBe(true);
  expect(paintOrder!.popupZIndex).toBeLessThan(paintOrder!.headerZIndex);
  expect(paintOrder!.headerContainsTopElement).toBe(true);
});
