import { expect, expectEvidenceScreenshot, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/icon-button");

test("Icon Button recipes", async ({ page }) => {
  await expect(page.getByTestId("icon-button-variants")).toHaveScreenshot("variants-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("icon-button-composition"), "composition-output-light.png");
  await setAppearance(page, "dark");
  await expect(page.getByTestId("icon-button-tones")).toHaveScreenshot("tones-dark.png");
});

test("Icon Button constrained and preference evidence", async ({ page }) => {
  await useForcedColors(page);
  await expect(page.getByTestId("icon-button-states")).toHaveScreenshot("states-forced-colors.png");
  await page.emulateMedia({ forcedColors: "none", reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("icon-button-stress")).toHaveScreenshot("stress-mobile.png");
});
