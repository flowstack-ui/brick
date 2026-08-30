import { expectEvidenceScreenshot, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/blockquote");

test("Blockquote overview and recipes", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="blockquote.overview"]'), "overview-light.png");
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="blockquote.recipes"]'), "recipes-light.png");
});

test("Blockquote dark, mobile RTL, and forced colors", async ({ page }) => {
  await setAppearance(page, "dark");
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="blockquote.recipes"]'), "recipes-dark.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="blockquote.adaptation"]'), "adaptation-mobile.png");
  await useForcedColors(page);
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="blockquote.overview"]'), "overview-forced-colors.png");
});
