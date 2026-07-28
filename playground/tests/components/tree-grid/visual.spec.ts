import { expect, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/tree-grid");

test("Tree Grid defaults, recipes, sizing, hierarchy, and controlled state", async ({ page }) => {
  await page.setViewportSize({ width: 1120, height: 1600 });
  await expect(page.locator("#scenario-tree-grid-overview")).toHaveScreenshot("overview-light.png");
  await expect(page.locator("#scenario-tree-grid-variants")).toHaveScreenshot("variants-light.png");
  await expect(page.locator("#scenario-tree-grid-sizing")).toHaveScreenshot("sizing-light.png");
  await expect(page.locator("#scenario-tree-grid-hierarchy")).toHaveScreenshot("hierarchy-light.png");
  await expect(page.locator("#scenario-tree-grid-controlled")).toHaveScreenshot("controlled-light.png");
});

test("Tree Grid appearance, RTL, responsive overflow, and forced colors", async ({ page }) => {
  await setAppearance(page, "dark");
  await expect(page.locator("#scenario-tree-grid-appearance")).toHaveScreenshot("appearance-dark.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator("#scenario-tree-grid-stress .tree-grid-cell").first()).toHaveScreenshot("responsive-mobile.png");
  await expect(page.locator("#scenario-tree-grid-stress .tree-grid-cell").last()).toHaveScreenshot("rtl-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.locator("#scenario-tree-grid-overview")).toHaveScreenshot("overview-forced-colors.png");
});
