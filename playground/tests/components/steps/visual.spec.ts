import { expectEvidenceScreenshot, installVisualDefaults, setAppearance, useForcedColors, test } from "../../visual-harness.js";
installVisualDefaults("/steps");
test("Steps recipes", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.getByTestId("steps-recipes"), "recipes-light.png");
});
test("Steps vertical RTL", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.getByTestId("steps-vertical"), "vertical-rtl.png");
});
test("Steps dark recipes", async ({ page }) => {
  await setAppearance(page, "dark");
  await expectEvidenceScreenshot(page, page.getByTestId("steps-recipes"), "recipes-dark.png");
});
test("Steps narrow forced colors", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await useForcedColors(page);
  await expectEvidenceScreenshot(page, page.getByTestId("steps-vertical"), "vertical-forced-narrow.png");
});
