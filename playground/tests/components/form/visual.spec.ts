import { expect, expectEvidenceScreenshot, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/form");

test("Form default, validation, and appearance", async ({ page }) => {
  await expect(page.getByTestId("form-overview")).toHaveScreenshot("overview-light.png");
  await expect(page.getByTestId("form-validation")).toHaveScreenshot("validation-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("form-composition"), "composition-output-light.png");
  await setAppearance(page, "dark");
  await expect(page.getByTestId("form-appearance")).toHaveScreenshot("appearance-dark.png");
});

test("Form constrained and forced-color evidence", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("form-stress")).toHaveScreenshot("stress-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.getByTestId("form-overview")).toHaveScreenshot("overview-forced-colors.png");
});
