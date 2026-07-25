import { expectEvidenceScreenshot, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/scroll-area");

test("Scroll Area defaults, axes, gutter, and visibility", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="scroll-area.overview"]'), "overview-light.png");
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="scroll-area.orientations"]'), "orientations-light.png");
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="scroll-area.gutter"]'), "gutter-light.png");
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="scroll-area.visibility"]'), "visibility-light.png");
});

test("Scroll Area appearance, stress, and forced colors", async ({ page }) => {
  await setAppearance(page, "dark");
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="scroll-area.appearance"]'), "appearance-dark.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="scroll-area.stress"]'), "stress-mobile.png");
  await useForcedColors(page);
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="scroll-area.visibility"]'), "visibility-forced-colors.png");
});
