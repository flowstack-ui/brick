import { expect, expectEvidenceScreenshot, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/data-grid");

test("Data Grid defaults, recipes, sizing, selection, and sorting", async ({ page }) => {
  await page.setViewportSize({ width: 1120, height: 1500 });
  await expect(page.locator("#scenario-data-grid-overview")).toHaveScreenshot("overview-light.png");
  await expect(page.locator("#scenario-data-grid-variants")).toHaveScreenshot("variants-light.png");
  await expect(page.locator("#scenario-data-grid-sizing")).toHaveScreenshot("sizing-light.png");
  await expect(page.locator("#scenario-data-grid-selection")).toHaveScreenshot("selection-light.png");
  await expect(page.locator("#scenario-data-grid-sorting")).toHaveScreenshot("sorting-light.png");
});

test("Data Grid appearance, RTL, responsive overflow, and forced colors", async ({ page }) => {
  await setAppearance(page, "dark");
  await expectEvidenceScreenshot(page, page.locator("#scenario-data-grid-appearance"), "appearance-dark.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator("#scenario-data-grid-stress .data-grid-cell").first()).toHaveScreenshot("responsive-mobile.png");
  await expect(page.locator("#scenario-data-grid-stress .data-grid-cell").last()).toHaveScreenshot("rtl-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expectEvidenceScreenshot(page, page.locator("#scenario-data-grid-appearance"), "appearance-forced-colors.png");
});
