import { expectEvidenceScreenshot, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/blockquote?qualification=1");

test("Blockquote documentation recipes and composed decoration", async ({ page }) => {
  await page.goto("/blockquote");
  await expectEvidenceScreenshot(page, page.locator('#variants'), "docs-variants.png");
  await expectEvidenceScreenshot(page, page.locator('#icon'), "docs-icon.png");
  await expectEvidenceScreenshot(page, page.locator('#with-avatar'), "docs-avatar.png");
  await expectEvidenceScreenshot(page, page.locator('#typography'), "docs-typography.png");
});

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
