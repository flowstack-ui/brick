import { expect, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/table?qualification=1");
test("TanStack sorting indicators align with their labels", async ({ page }) => {
  await page.goto("/table");
  await expect(page.locator("#engine table")).toHaveScreenshot("engine-indicators-light.png");
});
test.beforeEach(async ({ page }) => {
  // Keep sticky application chrome out of component evidence crops.
  await page.addStyleTag({ content: ".brick-app-bar { visibility: hidden !important; }" });
});

test("Table defaults, recipes, anatomy, and sorting", async ({ page }) => {
  await page.setViewportSize({ width: 1120, height: 1500 });
  await expect(page.locator("#scenario-table-overview")).toHaveScreenshot("overview-light.png");
  await expect(page.locator("#scenario-table-variants")).toHaveScreenshot("variants-light.png");
  await expect(page.locator("#scenario-table-sizing")).toHaveScreenshot("sizing-light.png");
  await expect(page.locator("#scenario-table-alignment")).toHaveScreenshot("alignment-light.png");
  await expect(page.locator("#scenario-table-sorting")).toHaveScreenshot("sorting-light.png");
});

test("Table sticky, appearance, responsive overflow, RTL, and forced colors", async ({ page }) => {
  await page.setViewportSize({ width: 1120, height: 1000 });
  await expect(page.locator("#scenario-table-sticky")).toHaveScreenshot("sticky-light.png");
  await setAppearance(page, "dark");
  await expect(page.locator("#scenario-table-appearance")).toHaveScreenshot("appearance-dark.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator("#scenario-table-stress .table-cell").nth(0)).toHaveScreenshot("responsive-mobile.png");
  await expect(page.locator("#scenario-table-stress .table-cell").nth(1)).toHaveScreenshot("rtl-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.locator("#scenario-table-appearance")).toHaveScreenshot("appearance-forced-colors.png");
});
