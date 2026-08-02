import { expect, expectEvidenceScreenshot, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";
installVisualDefaults("/progress");
test("Progress defaults, recipes, geometry, buffer, and output", async ({ page }) => {
  await expect(page.getByTestId("progress-overview")).toHaveScreenshot("overview-light.png");
  await expect(page.getByTestId("progress-states")).toHaveScreenshot("states-light.png");
  await expect(page.getByTestId("progress-tones")).toHaveScreenshot("tones-light.png");
  await expect(page.getByTestId("progress-sizes")).toHaveScreenshot("sizes-light.png");
  await expect(page.getByTestId("progress-orientation")).toHaveScreenshot("orientation-light.png");
  await expect(page.getByTestId("progress-buffer")).toHaveScreenshot("buffer-light.png");
  await setAppearance(page, "dark");
  await expect(page.getByTestId("progress-appearance")).toHaveScreenshot("appearance-dark.png");
  await page.addStyleTag({ content: ".evidence-app-bar, .evidence-review-header, .scenario-nav { display: none !important; }" });
  await expectEvidenceScreenshot(page, page.locator("#scenario-progress-appearance"), "theme-dark.png");
});
test("Progress mobile and forced colors", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("progress-stress")).toHaveScreenshot("stress-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.getByTestId("progress-states")).toHaveScreenshot("states-forced-colors.png");
});
