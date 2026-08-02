import { expect, expectEvidenceScreenshot, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";
installVisualDefaults("/collapsible");
test("Collapsible defaults, variants, sizes, states, anatomy, and orientation", async ({ page }) => {
  await expect(page.getByTestId("collapsible-overview")).toHaveScreenshot("overview-light.png");
  await expect(page.getByTestId("collapsible-variants")).toHaveScreenshot("variants-light.png");
  await expect(page.getByTestId("collapsible-sizes")).toHaveScreenshot("sizes-light.png");
  await expect(page.getByTestId("collapsible-states")).toHaveScreenshot("states-light.png");
  await expect(page.getByTestId("collapsible-indicator")).toHaveScreenshot("indicator-light.png");
  await expect(page.getByTestId("collapsible-orientation")).toHaveScreenshot("orientation-light.png");
  await expectEvidenceScreenshot(page, page.locator(".collapsible-customization"), "customization-light.png");
  await setAppearance(page, "dark");
  await expect(page.getByTestId("collapsible-appearance")).toHaveScreenshot("appearance-dark.png");
});
test("Collapsible responsive and forced colors", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("collapsible-stress")).toHaveScreenshot("stress-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.getByTestId("collapsible-variants")).toHaveScreenshot("variants-forced-colors.png");
});
