import { expect, expectEvidenceScreenshot, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/toggle");

test("Toggle recipes and state", async ({ page }) => {
  await expect(page.getByTestId("toggle-variants")).toHaveScreenshot("variants-light.png");
  await expect(page.getByTestId("toggle-recipes")).toHaveScreenshot("recipes-light.png");
  await expect(page.getByTestId("toggle-sizes")).toHaveScreenshot("sizes-light.png");
  await expect(page.getByTestId("toggle-shapes-icons")).toHaveScreenshot("shapes-icons-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("toggle-composition"), "composition-output-light.png");
  await expect(page.getByTestId("toggle-disabled")).toHaveScreenshot("disabled-light.png");
  await expect(page.locator("#scenario-toggle-appearance")).toHaveScreenshot("appearance-customization-light.png");
  await setAppearance(page, "dark");
  await expect(page.getByTestId("toggle-overview")).toHaveScreenshot("overview-dark.png");
});

test("Toggle constrained and forced-color evidence", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("toggle-stress")).toHaveScreenshot("stress-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.getByTestId("toggle-variants")).toHaveScreenshot("variants-forced-colors.png");
});
