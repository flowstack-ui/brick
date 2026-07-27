import { expect, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";
installVisualDefaults("/progress-circle");
test("Progress Circle defaults, recipes, geometry, and content", async ({ page }) => {
  await expect(page.getByTestId("progress-circle-overview")).toHaveScreenshot("overview-light.png");
  await expect(page.getByTestId("progress-circle-states")).toHaveScreenshot("states-light.png");
  await expect(page.getByTestId("progress-circle-tones")).toHaveScreenshot("tones-light.png");
  await expect(page.getByTestId("progress-circle-sizes")).toHaveScreenshot("sizes-light.png");
  await expect(page.getByTestId("progress-circle-thickness")).toHaveScreenshot("thickness-light.png");
  await expect(page.getByTestId("progress-circle-content")).toHaveScreenshot("content-light.png");
  await setAppearance(page, "dark");
  await expect(page.getByTestId("progress-circle-appearance")).toHaveScreenshot("appearance-dark.png");
});
test("Progress Circle mobile and forced colors", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("progress-circle-stress")).toHaveScreenshot("stress-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.getByTestId("progress-circle-states")).toHaveScreenshot("states-forced-colors.png");
});
