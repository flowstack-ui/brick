import { expect, expectEvidenceScreenshot, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/field");

test("Field anatomy, errors, and appearance", async ({ page }) => {
  await expect(page.getByTestId("field-overview")).toHaveScreenshot("overview-light.png");
  await expect(page.getByTestId("field-errors")).toHaveScreenshot("errors-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("field-relationships"), "relationships-output-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("field-composition"), "composition-output-light.png");
  await setAppearance(page, "dark");
  await expect(page.getByTestId("field-appearance")).toHaveScreenshot("appearance-dark.png");
});

test("Field constrained and forced-color evidence", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("field-stress")).toHaveScreenshot("stress-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.getByTestId("field-errors")).toHaveScreenshot("errors-forced-colors.png");
});
