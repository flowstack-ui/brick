import { expect, expectEvidenceScreenshot, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/card");

test("Card hierarchy and recipes", async ({ page }) => {
  await expect(page.getByTestId("card-variants")).toHaveScreenshot("variants-light.png");
  await expect(page.getByTestId("card-sizes")).toHaveScreenshot("sizes-light.png");
  await expectEvidenceScreenshot(page, page.locator(".card-customization-list"), "customization-light.png");
  await setAppearance(page, "dark");
  await expect(page.getByTestId("card-overview")).toHaveScreenshot("overview-dark.png");
  await expect(page.getByTestId("card-appearance")).toHaveScreenshot("appearance-scopes.png");
});

test("Card constrained and forced-color evidence", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("card-stress")).toHaveScreenshot("stress-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.getByTestId("card-variants")).toHaveScreenshot("variants-forced-colors.png");
});
