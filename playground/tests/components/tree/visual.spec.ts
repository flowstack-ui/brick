import { expect, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/tree");

test("Tree defaults, recipes, sizing, and selection", async ({ page }) => {
  await page.setViewportSize({ width: 1120, height: 1400 });
  await expect(page.locator("#scenario-tree-overview")).toHaveScreenshot("overview-light.png");
  await expect(page.locator("#scenario-tree-variants")).toHaveScreenshot("variants-light.png");
  await expect(page.locator("#scenario-tree-sizing")).toHaveScreenshot("sizing-light.png");
  await expect(page.locator("#scenario-tree-selection")).toHaveScreenshot("selection-light.png");
});

test("Tree appearance, responsive RTL, and forced colors", async ({ page }) => {
  await page.addStyleTag({ content: ".evidence-review-header { position: static !important; }" });
  await setAppearance(page, "dark");
  await page.setViewportSize({ width: 1120, height: 1600 });
  await expect(page.locator("#scenario-tree-appearance")).toHaveScreenshot("appearance-dark.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator("#scenario-tree-stress .tree-cell").first()).toHaveScreenshot("responsive-mobile.png");
  await expect(page.locator("#scenario-tree-stress .tree-cell").last()).toHaveScreenshot("rtl-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.locator("#scenario-tree-overview")).toHaveScreenshot("overview-forced-colors.png");
});
