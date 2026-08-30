import { expectEvidenceScreenshot, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/mark");

test("Mark overview and closed recipes", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="mark.overview"]'), "overview-light.png");
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="mark.recipes"]'), "recipes-light.png");
});

test("Mark dark, mobile, and forced colors", async ({ page }) => {
  await setAppearance(page, "dark");
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="mark.recipes"]'), "recipes-dark.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="mark.native"]'), "native-mobile.png");
  await useForcedColors(page);
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="mark.overview"]'), "overview-forced-colors.png");
});
