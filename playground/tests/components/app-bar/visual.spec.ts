import { expect, expectEvidenceScreenshot, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/app-bar");

test("App Bar surfaces and options", async ({ page }) => {
  await expect(page.getByTestId("app-bar-variants")).toHaveScreenshot("variants-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("app-bar-composition"), "composition-output-light.png");
  await setAppearance(page, "dark");
  await expect(page.getByTestId("app-bar-options")).toHaveScreenshot("options-dark.png");
});

test("App Bar constrained and preference evidence", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("app-bar-stress")).toHaveScreenshot("stress-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.getByTestId("app-bar-density")).toHaveScreenshot("density-forced-colors.png");
});
