import { expect, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";
installVisualDefaults("/tabs?qualification=1");
test("Tabs defaults, recipes, behavior, and appearance", async ({ page }) => {
  await expect(page.getByTestId("tabs-overview")).toHaveScreenshot("overview-light.png");
  await expect(page.getByTestId("tabs-variants")).toHaveScreenshot("variants-light.png");
  await expect(page.getByTestId("tabs-neutral")).toHaveScreenshot("neutral-light.png");
  await expect(page.getByTestId("tabs-sizes")).toHaveScreenshot("sizes-light.png");
  await expect(page.getByTestId("tabs-layout")).toHaveScreenshot("layout-light.png");
  await expect(page.getByTestId("tabs-content")).toHaveScreenshot("content-light.png");
  await setAppearance(page, "dark"); await expect(page.getByTestId("tabs-appearance")).toHaveScreenshot("appearance-dark.png");
});
test("Tabs responsive RTL and forced colors", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 }); await expect(page.getByTestId("tabs-stress")).toHaveScreenshot("stress-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 }); await useForcedColors(page); await expect(page.getByTestId("tabs-variants")).toHaveScreenshot("variants-forced-colors.png");
});
test("Tabs documentation recipes in both appearances", async ({ page }) => {
  await page.goto("/tabs?appearance=light");
  await expect(page.locator("#variants")).toHaveScreenshot("documentation-variants-light.png");
  await page.goto("/tabs?appearance=dark");
  await expect(page.locator("#variants")).toHaveScreenshot("documentation-variants-dark.png");
  await expect(page.locator("#indicator")).toHaveScreenshot("documentation-indicator-dark.png");
});
