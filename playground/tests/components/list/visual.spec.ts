import { expect, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/list");

test("List defaults, recipes, markers, and structured anatomy", async ({ page }) => {
  await page.setViewportSize({ width: 1120, height: 1600 });
  await expect(page.locator("#scenario-list-overview")).toHaveScreenshot("overview-light.png");
  await expect(page.locator("#scenario-list-variants")).toHaveScreenshot("variants-light.png");
  await expect(page.locator("#scenario-list-sizing")).toHaveScreenshot("sizing-light.png");
  await expect(page.locator("#scenario-list-markers")).toHaveScreenshot("markers-light.png");
  await expect(page.locator("#scenario-list-anatomy")).toHaveScreenshot("anatomy-light.png");
});

test("List appearance, customization, mobile RTL, and forced colors", async ({ page }) => {
  await page.setViewportSize({ width: 1120, height: 1200 });
  await setAppearance(page, "dark");
  await expect(page.locator("#scenario-list-appearance")).toHaveScreenshot("appearance-dark.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator("#scenario-list-stress")).toHaveScreenshot("stress-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.locator("#scenario-list-appearance")).toHaveScreenshot("appearance-forced-colors.png");
});
