import { expectEvidenceScreenshot, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/code");

test("Code defaults and recipes", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="code.overview"]'), "overview-light.png");
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="code.variants"]'), "variants-light.png");
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="code.sizes"]'), "sizes-light.png");
});

test("Code appearance, stress, and forced colors", async ({ page }) => {
  await setAppearance(page, "dark");
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="code.appearance"]'), "appearance-dark.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="code.stress"]'), "stress-mobile.png");
  await useForcedColors(page);
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="code.overview"]'), "overview-forced-colors.png");
});
