import { expectEvidenceScreenshot, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/highlight");

test("Highlight overview and recipes", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="highlight.overview"]'), "overview-light.png");
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="highlight.recipes"]'), "recipes-light.png");
});

test("Highlight dark, mobile RTL, and forced colors", async ({ page }) => {
  await setAppearance(page, "dark");
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="highlight.recipes"]'), "recipes-dark.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="highlight.adaptation"]'), "adaptation-mobile.png");
  await useForcedColors(page);
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="highlight.overview"]'), "overview-forced-colors.png");
});
