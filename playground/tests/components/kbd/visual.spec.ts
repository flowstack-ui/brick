import { expectEvidenceScreenshot, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/kbd");

test("Kbd overview and closed recipes", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="kbd.overview"]'), "overview-light.png");
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="kbd.recipes"]'), "recipes-light.png");
});

test("Kbd dark, mobile, and forced colors", async ({ page }) => {
  await setAppearance(page, "dark");
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="kbd.recipes"]'), "recipes-dark.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="kbd.sequence"]'), "sequence-mobile.png");
  await useForcedColors(page);
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="kbd.overview"]'), "overview-forced-colors.png");
});
