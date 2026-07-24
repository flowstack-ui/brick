import { expect, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/toggle-group");

test("Toggle Group selection and recipes", async ({ page }) => {
  await expect(page.getByTestId("toggle-group-selection")).toHaveScreenshot("selection-light.png");
  await expect(page.getByTestId("toggle-group-variants")).toHaveScreenshot("variants-light.png");
  await setAppearance(page, "dark");
  await expect(page.getByTestId("toggle-group-overview")).toHaveScreenshot("overview-dark.png");
});

test("Toggle Group constrained and forced-color evidence", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("toggle-group-stress")).toHaveScreenshot("stress-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.getByTestId("toggle-group-variants")).toHaveScreenshot("variants-forced-colors.png");
});
