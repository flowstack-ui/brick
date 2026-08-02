import { expect, expectEvidenceScreenshot, installVisualDefaults, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/badge");

test("Badge recipes and geometry", async ({ page }) => {
  await expect(page.getByTestId("badge-variants")).toHaveScreenshot("variants-light.png");
  await expect(page.getByTestId("badge-tones")).toHaveScreenshot("tones-light.png");
  await expect(page.getByTestId("badge-sizes")).toHaveScreenshot("sizes-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("badge-composition"), "composition-output-light.png");
  await expect(page.getByTestId("badge-appearance")).toHaveScreenshot("appearance-light.png");
  await expectEvidenceScreenshot(page, page.locator(".badge-customization"), "customization-light.png");
});

test("Badge constrained and forced-color evidence", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("badge-stress")).toHaveScreenshot("stress-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.getByTestId("badge-variants")).toHaveScreenshot("variants-forced-colors.png");
});
